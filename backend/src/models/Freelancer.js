const mongoose = require('mongoose');
const slugify = require('slugify');

const PortfolioItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  images: [String],
  technologies: [String],
  projectUrl: String,
  githubUrl: String,
  category: String,
  completedAt: Date,
  clientName: String,
  isPublic: { type: Boolean, default: true }
});

const TestimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientTitle: String,
  clientCompany: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, required: true },
  projectTitle: String,
  isVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const FreelancerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  slug: { 
    type: String, 
    unique: true, 
    required: true,
    lowercase: true
  },
  name: { type: String, required: true, trim: true },
  avatar: String,
  title: { type: String, required: true, trim: true },
  
  
  // Professional Information
  category: { 
    type: String, 
    required: true,
    enum: ['development', 'design', 'video', 'photography', '3d', 'marketing', 'writing', 'other']
  },
  subcategories: [String],
  stacks: [String],
  experience: {
    type: String,
    enum: ['junior', 'mid', 'senior', 'expert'],
    default: 'mid'
  },
  
  // Location & Work Mode
  location: {
    city: { type: String, required: true },
    region: { type: String, required: true },
    neighborhood: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  mode: { 
    type: String, 
    enum: ['remote', 'hybrid', 'onsite'], 
    default: 'remote' 
  },
  
  // Pricing
  rate: {
    type: {
      type: String,
      enum: ['hourly', 'daily', 'project', 'negotiable'],
      default: 'hourly',
    },
    hourlyRate: Number,
    dailyRate: Number,
    projectStartsAt: Number,
    currency: { type: String, default: 'MAD' },
    isPublic: { type: Boolean, default: true },
  },
  
  // Availability
  availability: { 
    type: String, 
    enum: ['now', '1w', '1m', 'customDate', 'unavailable'], 
    default: 'now' 
  },
  availableFrom: Date,
  workingHours: {
    timezone: { type: String, default: 'Africa/Casablanca' },
    schedule: {
      monday: { start: String, end: String, available: Boolean },
      tuesday: { start: String, end: String, available: Boolean },
      wednesday: { start: String, end: String, available: Boolean },
      thursday: { start: String, end: String, available: Boolean },
      friday: { start: String, end: String, available: Boolean },
      saturday: { start: String, end: String, available: Boolean },
      sunday: { start: String, end: String, available: Boolean }
    }
  },
  
  // Personal Information
  languages: [{
    code: { type: String, enum: ['ar', 'fr', 'en', 'es'] },
    level: { type: String, enum: ['basic', 'intermediate', 'fluent', 'native'] }
  }],
  bio: { type: String, maxlength: 1000 },
  services: [String],
  industries: [String],
  
  // Portfolio & Work
  portfolio: [PortfolioItemSchema],
  testimonials: [TestimonialSchema],
  
  // Contact Information
  contacts: {
    whatsapp: String,
    phone: String,
    email: String,
    website: String,
    social: {
      linkedin: String,
      github: String,
      behance: String,
      dribbble: String,
      instagram: String,
      twitter: String
    }
  },
  
  // SEO & Marketing
  seo: {
    keywords: [String],
    ogImage: String,
    metaDescription: String
  },
  
  // Profile Status
  visibility: { 
    type: String, 
    enum: ['public', 'hidden', 'pending'], 
    default: 'pending' 
  },
  isVerified: { type: Boolean, default: false },
  isPremium: { type: Boolean, default: false },
  
  // Analytics
  stats: {
    profileViews: { type: Number, default: 0 },
    contactClicks: { type: Number, default: 0 },
    portfolioViews: { type: Number, default: 0 },
    searchAppearances: { type: Number, default: 0 }
  },
  
  // Profile Completeness
  completeness: {
    score: { type: Number, default: 0, min: 0, max: 100 },
    missingFields: [String]
  }
}, {
  timestamps: true
});

// Indexes for better search performance
FreelancerSchema.index({ category: 1, visibility: 1 });
FreelancerSchema.index({ 'location.city': 1, 'location.region': 1 });
FreelancerSchema.index({ stacks: 1 });
FreelancerSchema.index({ availability: 1 });
FreelancerSchema.index({ 'rate.hourlyRate': 1 });
FreelancerSchema.index({ createdAt: -1 });
FreelancerSchema.index({ 'stats.profileViews': -1 });

// Text search index
FreelancerSchema.index({
  name: 'text',
  title: 'text',
  bio: 'text',
  stacks: 'text',
  services: 'text',
  industries: 'text'
});

// Generate slug before saving
FreelancerSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isNew) {
    this.slug = slugify(this.name, { 
      lower: true, 
      strict: true,
      remove: /[*+~.()'"!:@]/g 
    });
  }
  
  // Calculate completeness score
  this.calculateCompleteness();
  
  next();
});

// Calculate profile completeness
FreelancerSchema.methods.calculateCompleteness = function() {
  const requiredFields = [
    'name', 'title', 'category', 'location.city', 'location.region',
    'bio', 'contacts.email', 'rate.type'
  ];
  
  const optionalFields = [
    'avatar', 'stacks', 'services', 'portfolio', 'contacts.whatsapp',
    'contacts.phone', 'contacts.website', 'testimonials'
  ];
  
  let score = 0;
  const missingFields = [];
  
  // Required fields (70% of score)
  requiredFields.forEach(field => {
    const value = field.split('.').reduce((obj, key) => obj?.[key], this);
    if (value && (Array.isArray(value) ? value.length > 0 : true)) {
      score += 70 / requiredFields.length;
    } else {
      missingFields.push(field);
    }
  });
  
  // Optional fields (30% of score)
  optionalFields.forEach(field => {
    const value = field.split('.').reduce((obj, key) => obj?.[key], this);
    if (value && (Array.isArray(value) ? value.length > 0 : true)) {
      score += 30 / optionalFields.length;
    }
  });
  
  this.completeness = {
    score: Math.round(score),
    missingFields
  };
};

// Virtual for average rating
FreelancerSchema.virtual('averageRating').get(function() {
  if (!this.testimonials || this.testimonials.length === 0) return 0;
  
  const sum = this.testimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0);
  return Math.round((sum / this.testimonials.length) * 10) / 10;
});

// Virtual for total testimonials
FreelancerSchema.virtual('totalTestimonials').get(function() {
  return this.testimonials ? this.testimonials.length : 0;
});

// Include virtuals when converting to JSON
FreelancerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Freelancer', FreelancerSchema); 