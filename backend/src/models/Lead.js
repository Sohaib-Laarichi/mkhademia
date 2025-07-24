const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  freelancerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Freelancer', 
    required: true,
    index: true
  },
  channel: { 
    type: String, 
    enum: ['whatsapp', 'phone', 'email', 'form'], 
    required: true 
  },
  
  // Contact Information
  name: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 100
  },
  email: { 
    type: String,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^(\+212|0)[5-7][0-9]{8}$/.test(v.replace(/\s/g, ''));
      },
      message: 'Invalid Moroccan phone number'
    }
  },
  
  // Project Details
  message: { 
    type: String,
    required: true,
    maxlength: 2000
  },
  projectType: String,
  budget: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'MAD' }
  },
  timeline: String,
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Lead Management
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'in_progress', 'qualified', 'converted', 'rejected', 'closed'], 
    default: 'new',
    index: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  source: {
    type: String,
    enum: ['direct', 'search', 'referral', 'social', 'other'],
    default: 'direct'
  },
  
  // Tracking
  ipAddress: String,
  userAgent: String,
  referrer: String,
  utm: {
    source: String,
    medium: String,
    campaign: String,
    term: String,
    content: String
  },
  
  // Communication History
  notes: [{
    content: String,
    addedBy: String,
    addedAt: { type: Date, default: Date.now }
  }],
  
  // Response tracking
  responseTime: Date, // When freelancer first responded
  isResponded: { type: Boolean, default: false },
  
  // Verification (for form submissions)
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  verificationExpires: Date
}, {
  timestamps: true
});

// Indexes for better query performance
LeadSchema.index({ freelancerId: 1, status: 1 });
LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ urgency: 1, status: 1 });
LeadSchema.index({ email: 1 });

// Virtual for lead age in hours
LeadSchema.virtual('ageInHours').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60));
});

// Virtual for response time in hours
LeadSchema.virtual('responseTimeInHours').get(function() {
  if (!this.responseTime) return null;
  return Math.floor((this.responseTime - this.createdAt) / (1000 * 60 * 60));
});

// Method to add note
LeadSchema.methods.addNote = function(content, addedBy = 'system') {
  this.notes.push({
    content,
    addedBy,
    addedAt: new Date()
  });
  return this.save();
};

// Method to mark as responded
LeadSchema.methods.markAsResponded = function() {
  if (!this.isResponded) {
    this.isResponded = true;
    this.responseTime = new Date();
    if (this.status === 'new') {
      this.status = 'contacted';
    }
  }
  return this.save();
};

// Static method to get lead statistics
LeadSchema.statics.getStats = function(freelancerId, timeframe = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - timeframe);
  
  return this.aggregate([
    {
      $match: {
        freelancerId: mongoose.Types.ObjectId(freelancerId),
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        responded: { $sum: { $cond: ['$isResponded', 1, 0] } },
        converted: { $sum: { $cond: [{ $eq: ['$status', 'converted'] }, 1, 0] } },
        avgResponseTime: {
          $avg: {
            $cond: [
              '$responseTime',
              { $divide: [{ $subtract: ['$responseTime', '$createdAt'] }, 1000 * 60 * 60] },
              null
            ]
          }
        }
      }
    }
  ]);
};

// Include virtuals when converting to JSON
LeadSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Lead', LeadSchema); 