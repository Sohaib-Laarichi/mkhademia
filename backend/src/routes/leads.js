const express = require('express');
const crypto = require('crypto');
const Lead = require('../models/Lead');
const Freelancer = require('../models/Freelancer');
const { authenticateToken, requireFreelancer } = require('../middleware/auth');
const { validate, leadSchema } = require('../middleware/validation');
const { leadLimiter } = require('../middleware/security');

const router = express.Router();

// POST /api/leads - Create new lead (public endpoint)
router.post('/', leadLimiter, validate(leadSchema), async (req, res) => {
  try {
    const leadData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };

    // Verify freelancer exists and is public
    const freelancer = await Freelancer.findById(req.body.freelancerId);
    if (!freelancer || freelancer.visibility !== 'public') {
      return res.status(404).json({
        error: 'Freelancer not found',
        code: 'FREELANCER_NOT_FOUND'
      });
    }

    // For form submissions, generate verification token
    if (req.body.channel === 'form') {
      leadData.verificationToken = crypto.randomBytes(32).toString('hex');
      leadData.verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    } else {
      // For direct contact methods, mark as verified
      leadData.isVerified = true;
    }

    const lead = new Lead(leadData);
    await lead.save();

    // Increment contact clicks for freelancer
    await Freelancer.findByIdAndUpdate(req.body.freelancerId, {
      $inc: { 'stats.contactClicks': 1 }
    });

    res.status(201).json({
      message: 'Contact request submitted successfully',
      lead: {
        id: lead._id,
        status: lead.status,
        channel: lead.channel,
        isVerified: lead.isVerified,
        createdAt: lead.createdAt
      },
      // Return verification info for form submissions
      ...(req.body.channel === 'form' && !leadData.isVerified && {
        verification: {
          required: true,
          message: 'Please check your email to verify your contact request'
        }
      })
    });

  } catch (error) {
    console.error('Create lead error:', error);
    res.status(500).json({
      error: 'Failed to submit contact request',
      code: 'CREATE_LEAD_ERROR'
    });
  }
});

// GET /api/leads/verify/:token - Verify lead email
router.get('/verify/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const lead = await Lead.findOne({
      verificationToken: token,
      verificationExpires: { $gt: new Date() },
      isVerified: false
    });

    if (!lead) {
      return res.status(400).json({
        error: 'Invalid or expired verification token',
        code: 'INVALID_VERIFICATION_TOKEN'
      });
    }

    // Mark as verified
    lead.isVerified = true;
    lead.verificationToken = undefined;
    lead.verificationExpires = undefined;
    await lead.save();

    res.json({
      message: 'Email verified successfully',
      lead: {
        id: lead._id,
        status: lead.status,
        isVerified: lead.isVerified
      }
    });

  } catch (error) {
    console.error('Verify lead error:', error);
    res.status(500).json({
      error: 'Verification failed',
      code: 'VERIFICATION_ERROR'
    });
  }
});

// GET /api/leads - Get leads for authenticated freelancer
router.get('/', authenticateToken, requireFreelancer, async (req, res) => {
  try {
    const {
      status,
      channel,
      priority,
      page = 1,
      limit = 20,
      sort = 'newest'
    } = req.query;

    // Get freelancer profile
    const freelancer = await Freelancer.findOne({ user: req.user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Freelancer profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Build query
    let query = { freelancerId: freelancer._id };

    if (status) {
      query.status = status;
    }
    if (channel) {
      query.channel = channel;
    }
    if (priority) {
      query.priority = priority;
    }

    // Build sort
    let sortQuery = {};
    switch (sort) {
      case 'oldest':
        sortQuery = { createdAt: 1 };
        break;
      case 'priority':
        sortQuery = { priority: -1, createdAt: -1 };
        break;
      case 'status':
        sortQuery = { status: 1, createdAt: -1 };
        break;
      default: // 'newest'
        sortQuery = { createdAt: -1 };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    const [leads, total] = await Promise.all([
      Lead.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Lead.countDocuments(query)
    ]);

    // Calculate pagination
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      leads,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages,
        hasNext,
        hasPrev
      },
      filters: {
        status,
        channel,
        priority,
        sort
      }
    });

  } catch (error) {
    console.error('Get leads error:', error);
    res.status(500).json({
      error: 'Failed to get leads',
      code: 'GET_LEADS_ERROR'
    });
  }
});

// GET /api/leads/stats - Get lead statistics for authenticated freelancer
router.get('/stats', authenticateToken, requireFreelancer, async (req, res) => {
  try {
    const { timeframe = 30 } = req.query;

    // Get freelancer profile
    const freelancer = await Freelancer.findOne({ user: req.user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Freelancer profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Get statistics
    const stats = await Lead.getStats(freelancer._id, parseInt(timeframe));
    
    // Get status breakdown
    const statusBreakdown = await Lead.aggregate([
      { $match: { freelancerId: freelancer._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Get channel breakdown
    const channelBreakdown = await Lead.aggregate([
      { $match: { freelancerId: freelancer._id } },
      { $group: { _id: '$channel', count: { $sum: 1 } } }
    ]);

    // Get recent activity
    const recentActivity = await Lead.find({ freelancerId: freelancer._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name channel status createdAt urgency')
      .lean();

    res.json({
      stats: stats[0] || {
        total: 0,
        responded: 0,
        converted: 0,
        avgResponseTime: null
      },
      breakdown: {
        status: statusBreakdown,
        channel: channelBreakdown
      },
      recentActivity,
      timeframe: parseInt(timeframe)
    });

  } catch (error) {
    console.error('Get lead stats error:', error);
    res.status(500).json({
      error: 'Failed to get lead statistics',
      code: 'GET_LEAD_STATS_ERROR'
    });
  }
});

// GET /api/leads/:id - Get specific lead
router.get('/:id', authenticateToken, requireFreelancer, async (req, res) => {
  try {
    const { id } = req.params;

    // Get freelancer profile
    const freelancer = await Freelancer.findOne({ user: req.user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Freelancer profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    const lead = await Lead.findOne({
      _id: id,
      freelancerId: freelancer._id
    });

    if (!lead) {
      return res.status(404).json({
        error: 'Lead not found',
        code: 'LEAD_NOT_FOUND'
      });
    }

    res.json({ lead });

  } catch (error) {
    console.error('Get lead error:', error);
    res.status(500).json({
      error: 'Failed to get lead',
      code: 'GET_LEAD_ERROR'
    });
  }
});

// PATCH /api/leads/:id/status - Update lead status
router.patch('/:id/status', authenticateToken, requireFreelancer, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'in_progress', 'qualified', 'converted', 'rejected', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
        code: 'INVALID_STATUS'
      });
    }

    // Get freelancer profile
    const freelancer = await Freelancer.findOne({ user: req.user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Freelancer profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    const lead = await Lead.findOne({
      _id: id,
      freelancerId: freelancer._id
    });

    if (!lead) {
      return res.status(404).json({
        error: 'Lead not found',
        code: 'LEAD_NOT_FOUND'
      });
    }

    // Update status
    lead.status = status;
    
    // Mark as responded if moving from 'new' to 'contacted'
    if (lead.status === 'new' && status === 'contacted') {
      await lead.markAsResponded();
    } else {
      await lead.save();
    }

    res.json({
      message: 'Lead status updated successfully',
      lead: {
        id: lead._id,
        status: lead.status,
        isResponded: lead.isResponded,
        responseTime: lead.responseTime
      }
    });

  } catch (error) {
    console.error('Update lead status error:', error);
    res.status(500).json({
      error: 'Failed to update lead status',
      code: 'UPDATE_LEAD_STATUS_ERROR'
    });
  }
});

// PATCH /api/leads/:id/priority - Update lead priority
router.patch('/:id/priority', authenticateToken, requireFreelancer, async (req, res) => {
  try {
    const { id } = req.params;
    const { priority } = req.body;

    const validPriorities = ['low', 'medium', 'high'];
    if (!validPriorities.includes(priority)) {
      return res.status(400).json({
        error: 'Invalid priority',
        code: 'INVALID_PRIORITY'
      });
    }

    // Get freelancer profile
    const freelancer = await Freelancer.findOne({ user: req.user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Freelancer profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    const lead = await Lead.findOneAndUpdate(
      { _id: id, freelancerId: freelancer._id },
      { priority },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({
        error: 'Lead not found',
        code: 'LEAD_NOT_FOUND'
      });
    }

    res.json({
      message: 'Lead priority updated successfully',
      lead: {
        id: lead._id,
        priority: lead.priority
      }
    });

  } catch (error) {
    console.error('Update lead priority error:', error);
    res.status(500).json({
      error: 'Failed to update lead priority',
      code: 'UPDATE_LEAD_PRIORITY_ERROR'
    });
  }
});

// POST /api/leads/:id/notes - Add note to lead
router.post('/:id/notes', authenticateToken, requireFreelancer, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        error: 'Note content is required',
        code: 'CONTENT_REQUIRED'
      });
    }

    // Get freelancer profile
    const freelancer = await Freelancer.findOne({ user: req.user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Freelancer profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    const lead = await Lead.findOne({
      _id: id,
      freelancerId: freelancer._id
    });

    if (!lead) {
      return res.status(404).json({
        error: 'Lead not found',
        code: 'LEAD_NOT_FOUND'
      });
    }

    // Add note
    await lead.addNote(content.trim(), req.user.email);

    res.status(201).json({
      message: 'Note added successfully',
      notes: lead.notes
    });

  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      error: 'Failed to add note',
      code: 'ADD_NOTE_ERROR'
    });
  }
});

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', authenticateToken, requireFreelancer, async (req, res) => {
  try {
    const { id } = req.params;

    // Get freelancer profile
    const freelancer = await Freelancer.findOne({ user: req.user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Freelancer profile not found',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    const lead = await Lead.findOneAndDelete({
      _id: id,
      freelancerId: freelancer._id
    });

    if (!lead) {
      return res.status(404).json({
        error: 'Lead not found',
        code: 'LEAD_NOT_FOUND'
      });
    }

    res.json({
      message: 'Lead deleted successfully'
    });

  } catch (error) {
    console.error('Delete lead error:', error);
    res.status(500).json({
      error: 'Failed to delete lead',
      code: 'DELETE_LEAD_ERROR'
    });
  }
});

module.exports = router;