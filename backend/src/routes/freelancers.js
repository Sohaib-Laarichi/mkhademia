const express = require('express');
const mongoose = require('mongoose');
const Freelancer = require('../models/Freelancer');
const User = require('../models/User');
const { authenticateToken, requireFreelancer, optionalAuth } = require('../middleware/auth');
const { validate, freelancerProfileSchema, portfolioItemSchema, searchSchema } = require('../middleware/validation');
const { searchLimiter } = require('../middleware/security');

const router = express.Router();

// GET /api/freelancers - Advanced search with filters
router.get('/', searchLimiter, validate(searchSchema, 'query'), async (req, res) => {
  try {
    const {
      q,
      category,
      stacks,
      mode,
      city,
      region,
      rate_min,
      rate_max,
      availability,
      experience,
      sort,
      page,
      limit
    } = req.query;

    // Build query
    let query = { visibility: 'public' };

    // Text search
    if (q) {
      query.$text = { $search: q };
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Stacks filter
    if (stacks) {
      const stacksArray = Array.isArray(stacks) ? stacks : stacks.split(',');
      query.stacks = { $in: stacksArray };
    }

    // Work mode filter
    if (mode) {
      query.mode = mode;
    }

    // Location filters
    if (city) {
      query['location.city'] = new RegExp(city, 'i');
    }
    if (region) {
      query['location.region'] = new RegExp(region, 'i');
    }

    // Rate filter
    if (rate_min || rate_max) {
      query['rate.isPublic'] = true;
      const rateQuery = {};
      if (rate_min) rateQuery.$gte = parseInt(rate_min);
      if (rate_max) rateQuery.$lte = parseInt(rate_max);
      query['rate.hourlyRate'] = rateQuery;
    }

    // Availability filter
    if (availability) {
      query.availability = availability;
    }

    // Experience filter
    if (experience) {
      query.experience = experience;
    }

    // Build sort
    let sortQuery = {};
    switch (sort) {
      case 'newest':
        sortQuery = { createdAt: -1 };
        break;
      case 'rating':
        sortQuery = { 'stats.profileViews': -1 }; // Could be replaced with actual rating
        break;
      case 'price_low':
        sortQuery = { 'rate.hourlyRate': 1 };
        break;
      case 'price_high':
        sortQuery = { 'rate.hourlyRate': -1 };
        break;
      case 'views':
        sortQuery = { 'stats.profileViews': -1 };
        break;
      default: // 'best'
        if (q) {
          sortQuery = { score: { $meta: 'textScore' } };
        } else {
          sortQuery = { 'stats.profileViews': -1, createdAt: -1 };
        }
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    const [freelancers, total] = await Promise.all([
      Freelancer.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .select('-user -testimonials -portfolio.description -seo')
        .lean(),
      Freelancer.countDocuments(query)
    ]);

    // Calculate pagination
    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    res.json({
      freelancers: freelancers.map(freelancer => ({
        ...freelancer,
        // Add computed fields
        totalTestimonials: freelancer.testimonials?.length || 0,
        averageRating: freelancer.testimonials?.length > 0 
          ? Math.round((freelancer.testimonials.reduce((acc, t) => acc + t.rating, 0) / freelancer.testimonials.length) * 10) / 10
          : 0
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrev
      },
      filters: {
        category,
        stacks: Array.isArray(stacks) ? stacks : (stacks ? stacks.split(',') : []),
        mode,
        city,
        region,
        rate_min,
        rate_max,
        availability,
        experience,
        sort
      }
    });

  } catch (error) {
    console.error('Search freelancers error:', error);
    res.status(500).json({
      error: 'Search failed',
      code: 'SEARCH_ERROR'
    });
  }
});

// GET /api/freelancers/featured - Get featured freelancers
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 8;

    const freelancers = await Freelancer.find({
      visibility: 'public',
      isVerified: true,
      'completeness.score': { $gte: 80 }
    })
    .sort({ 'stats.profileViews': -1, isPremium: -1 })
    .limit(limit)
    .select('name title category location.city avatar rate stacks stats averageRating totalTestimonials slug')
    .lean();

    res.json({ freelancers });

  } catch (error) {
    console.error('Get featured freelancers error:', error);
    res.status(500).json({
      error: 'Failed to get featured freelancers',
      code: 'FEATURED_ERROR'
    });
  }
});

// GET /api/freelancers/stats - Get platform statistics
router.get('/stats', async (req, res) => {
  try {
    const [
      totalFreelancers,
      activeFreelancers,
      categoriesStats,
      locationsStats
    ] = await Promise.all([
      Freelancer.countDocuments(),
      Freelancer.countDocuments({ visibility: 'public', availability: { $ne: 'unavailable' } }),
      Freelancer.aggregate([
        { $match: { visibility: 'public' } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      Freelancer.aggregate([
        { $match: { visibility: 'public' } },
        { $group: { _id: '$location.city', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ]);

    res.json({
      total: totalFreelancers,
      active: activeFreelancers,
      categories: categoriesStats,
      locations: locationsStats
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      error: 'Failed to get statistics',
      code: 'STATS_ERROR'
    });
  }
});

// GET /api/freelancers/:idOrSlug - Get freelancer profile
router.get('/:idOrSlug', optionalAuth, async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    
    // Build query
    const query = {
      $or: [
        { _id: mongoose.isValidObjectId(idOrSlug) ? idOrSlug : null },
        { slug: idOrSlug }
      ].filter(Boolean)
    };

    const freelancer = await Freelancer.findOne(query)
      .populate('user', 'email isVerified createdAt')
      .lean();

    if (!freelancer) {
      return res.status(404).json({
        error: 'Freelancer not found',
        code: 'FREELANCER_NOT_FOUND'
      });
    }

    // Check visibility (only owner or public profiles)
    if (freelancer.visibility !== 'public' && 
        (!req.user || freelancer.user._id.toString() !== req.user._id.toString())) {
      return res.status(404).json({
        error: 'Freelancer not found',
        code: 'FREELANCER_NOT_FOUND'
      });
    }

    // Increment profile views (only for public profiles and non-owners)
    if (freelancer.visibility === 'public' && 
        (!req.user || freelancer.user._id.toString() !== req.user._id.toString())) {
      await Freelancer.findByIdAndUpdate(freelancer._id, {
        $inc: { 'stats.profileViews': 1 }
      });
      freelancer.stats.profileViews += 1;
    }

    // Get similar freelancers
    const similarFreelancers = await Freelancer.find({
      _id: { $ne: freelancer._id },
      visibility: 'public',
      category: freelancer.category,
      'location.region': freelancer.location.region
    })
    .limit(4)
    .select('name title category location.city avatar rate stacks slug')
    .lean();

    res.json({
      freelancer: {
        ...freelancer,
        // Add computed fields
        averageRating: freelancer.testimonials?.length > 0 
          ? Math.round((freelancer.testimonials.reduce((acc, t) => acc + t.rating, 0) / freelancer.testimonials.length) * 10) / 10
          : 0,
        totalTestimonials: freelancer.testimonials?.length || 0
      },
      similar: similarFreelancers
    });

  } catch (error) {
    console.error('Get freelancer error:', error);
    res.status(500).json({
      error: 'Failed to get freelancer',
      code: 'GET_FREELANCER_ERROR'
    });
  }
});

// POST /api/freelancers - Create freelancer profile (authenticated)
router.post('/', authenticateToken, requireFreelancer, validate(freelancerProfileSchema), async (req, res) => {
  try {
    const user = req.user;

    // Check if user already has a profile
    const existingProfile = await Freelancer.findOne({ user: user._id });
    if (existingProfile) {
      return res.status(409).json({
        error: 'Profile already exists',
        code: 'PROFILE_EXISTS'
      });
    }

    // Create freelancer profile
    const freelancerData = {
      ...req.body,
      user: user._id
    };

    const freelancer = new Freelancer(freelancerData);
    await freelancer.save();

    // Update user profile reference
    await User.findByIdAndUpdate(user._id, { profile: freelancer._id });

    res.status(201).json({
      message: 'Profile created successfully',
      freelancer: {
        id: freelancer._id,
        slug: freelancer.slug,
        name: freelancer.name,
        title: freelancer.title,
        visibility: freelancer.visibility,
        completeness: freelancer.completeness
      }
    });

  } catch (error) {
    console.error('Create freelancer error:', error);
    res.status(500).json({
      error: 'Failed to create profile',
      code: 'CREATE_PROFILE_ERROR'
    });
  }
});

// PUT /api/freelancers/:id - Update freelancer profile
router.put('/:id', authenticateToken, requireFreelancer, validate(freelancerProfileSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Find freelancer and verify ownership
    const freelancer = await Freelancer.findOne({ _id: id, user: user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Profile not found or unauthorized',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Update freelancer
    const updatedFreelancer = await Freelancer.findByIdAndUpdate(
      id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      freelancer: updatedFreelancer
    });

  } catch (error) {
    console.error('Update freelancer error:', error);
    res.status(500).json({
      error: 'Failed to update profile',
      code: 'UPDATE_PROFILE_ERROR'
    });
  }
});

// POST /api/freelancers/:id/portfolio - Add portfolio item
router.post('/:id/portfolio', authenticateToken, requireFreelancer, validate(portfolioItemSchema), async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Find freelancer and verify ownership
    const freelancer = await Freelancer.findOne({ _id: id, user: user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Profile not found or unauthorized',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Add portfolio item
    freelancer.portfolio.push(req.body);
    await freelancer.save();

    res.status(201).json({
      message: 'Portfolio item added successfully',
      portfolio: freelancer.portfolio
    });

  } catch (error) {
    console.error('Add portfolio error:', error);
    res.status(500).json({
      error: 'Failed to add portfolio item',
      code: 'ADD_PORTFOLIO_ERROR'
    });
  }
});

// PUT /api/freelancers/:id/portfolio/:portfolioId - Update portfolio item
router.put('/:id/portfolio/:portfolioId', authenticateToken, requireFreelancer, validate(portfolioItemSchema), async (req, res) => {
  try {
    const { id, portfolioId } = req.params;
    const user = req.user;

    // Find freelancer and verify ownership
    const freelancer = await Freelancer.findOne({ _id: id, user: user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Profile not found or unauthorized',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Find and update portfolio item
    const portfolioItem = freelancer.portfolio.id(portfolioId);
    if (!portfolioItem) {
      return res.status(404).json({
        error: 'Portfolio item not found',
        code: 'PORTFOLIO_ITEM_NOT_FOUND'
      });
    }

    // Update portfolio item
    Object.assign(portfolioItem, req.body);
    await freelancer.save();

    res.json({
      message: 'Portfolio item updated successfully',
      portfolio: freelancer.portfolio
    });

  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({
      error: 'Failed to update portfolio item',
      code: 'UPDATE_PORTFOLIO_ERROR'
    });
  }
});

// DELETE /api/freelancers/:id/portfolio/:portfolioId - Delete portfolio item
router.delete('/:id/portfolio/:portfolioId', authenticateToken, requireFreelancer, async (req, res) => {
  try {
    const { id, portfolioId } = req.params;
    const user = req.user;

    // Find freelancer and verify ownership
    const freelancer = await Freelancer.findOne({ _id: id, user: user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Profile not found or unauthorized',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Remove portfolio item
    freelancer.portfolio.pull({ _id: portfolioId });
    await freelancer.save();

    res.json({
      message: 'Portfolio item deleted successfully',
      portfolio: freelancer.portfolio
    });

  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({
      error: 'Failed to delete portfolio item',
      code: 'DELETE_PORTFOLIO_ERROR'
    });
  }
});

// PATCH /api/freelancers/:id/visibility - Update profile visibility
router.patch('/:id/visibility', authenticateToken, requireFreelancer, async (req, res) => {
  try {
    const { id } = req.params;
    const { visibility } = req.body;
    const user = req.user;

    if (!['public', 'hidden'].includes(visibility)) {
      return res.status(400).json({
        error: 'Invalid visibility value',
        code: 'INVALID_VISIBILITY'
      });
    }

    // Find freelancer and verify ownership
    const freelancer = await Freelancer.findOne({ _id: id, user: user._id });
    if (!freelancer) {
      return res.status(404).json({
        error: 'Profile not found or unauthorized',
        code: 'PROFILE_NOT_FOUND'
      });
    }

    // Update visibility
    freelancer.visibility = visibility;
    await freelancer.save();

    res.json({
      message: 'Visibility updated successfully',
      visibility: freelancer.visibility
    });

  } catch (error) {
    console.error('Update visibility error:', error);
    res.status(500).json({
      error: 'Failed to update visibility',
      code: 'UPDATE_VISIBILITY_ERROR'
    });
  }
});

module.exports = router; 