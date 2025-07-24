const Joi = require('joi');

// Generic validation middleware
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
        value: detail.context?.value
      }));

      return res.status(400).json({
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: errors
      });
    }

    req[property] = value;
    next();
  };
};

// User registration validation
const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Please provide a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
      'any.required': 'Password is required'
    }),
  language: Joi.string()
    .valid('ar', 'fr', 'en')
    .default('fr')
});

// User login validation
const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .required()
});

// Freelancer profile validation
const freelancerProfileSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),
  title: Joi.string()
    .trim()
    .min(5)
    .max(200)
    .required(),
  category: Joi.string()
    .valid('development', 'design', 'video', 'photography', '3d', 'marketing', 'writing', 'other')
    .required(),
  subcategories: Joi.array()
    .items(Joi.string())
    .max(5),
  stacks: Joi.array()
    .items(Joi.string())
    .max(15),
  experience: Joi.string()
    .valid('junior', 'mid', 'senior', 'expert')
    .default('mid'),
  location: Joi.object({
    city: Joi.string().required(),
    region: Joi.string().required(),
    neighborhood: Joi.string(),
    coordinates: Joi.object({
      lat: Joi.number().min(-90).max(90),
      lng: Joi.number().min(-180).max(180)
    })
  }).required(),
  mode: Joi.string()
    .valid('remote', 'hybrid', 'onsite')
    .default('remote'),
  rate: Joi.object({
    type: Joi.string()
      .valid('hourly', 'daily', 'project', 'negotiable')
      .default('hourly'),
    hourlyRate: Joi.number().min(0).max(10000),
    dailyRate: Joi.number().min(0).max(50000),
    projectStartsAt: Joi.number().min(0),
    currency: Joi.string().default('MAD'),
    isPublic: Joi.boolean().default(true)
  }),
  availability: Joi.string()
    .valid('now', '1w', '1m', 'customDate', 'unavailable')
    .default('now'),
  availableFrom: Joi.date().when('availability', {
    is: 'customDate',
    then: Joi.required(),
    otherwise: Joi.optional()
  }),
  languages: Joi.array()
    .items(Joi.object({
      code: Joi.string().valid('ar', 'fr', 'en', 'es').required(),
      level: Joi.string().valid('basic', 'intermediate', 'fluent', 'native').required()
    }))
    .max(4),
  bio: Joi.string()
    .max(1000),
  services: Joi.array()
    .items(Joi.string())
    .max(10),
  industries: Joi.array()
    .items(Joi.string())
    .max(10),
  contacts: Joi.object({
    whatsapp: Joi.string().pattern(/^(\+212|0)[5-7][0-9]{8}$/),
    phone: Joi.string().pattern(/^(\+212|0)[5-7][0-9]{8}$/),
    email: Joi.string().email(),
    website: Joi.string().uri(),
    social: Joi.object({
      linkedin: Joi.string().uri(),
      github: Joi.string().uri(),
      behance: Joi.string().uri(),
      dribbble: Joi.string().uri(),
      instagram: Joi.string().uri(),
      twitter: Joi.string().uri()
    })
  }),
  seo: Joi.object({
    keywords: Joi.array().items(Joi.string()).max(20),
    metaDescription: Joi.string().max(160)
  })
});

// Portfolio item validation
const portfolioItemSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required(),
  description: Joi.string()
    .max(500),
  images: Joi.array()
    .items(Joi.string().uri())
    .max(10),
  technologies: Joi.array()
    .items(Joi.string())
    .max(15),
  projectUrl: Joi.string().uri(),
  githubUrl: Joi.string().uri(),
  category: Joi.string(),
  completedAt: Joi.date(),
  clientName: Joi.string().max(100),
  isPublic: Joi.boolean().default(true)
});

// Lead creation validation
const leadSchema = Joi.object({
  freelancerId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(),
  channel: Joi.string()
    .valid('whatsapp', 'phone', 'email', 'form')
    .required(),
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required(),
  email: Joi.string()
    .email()
    .when('channel', {
      is: Joi.valid('email', 'form'),
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
  phone: Joi.string()
    .pattern(/^(\+212|0)[5-7][0-9]{8}$/)
    .when('channel', {
      is: Joi.valid('phone', 'whatsapp'),
      then: Joi.required(),
      otherwise: Joi.optional()
    }),
  message: Joi.string()
    .trim()
    .min(10)
    .max(2000)
    .required(),
  projectType: Joi.string().max(100),
  budget: Joi.object({
    min: Joi.number().min(0),
    max: Joi.number().min(0),
    currency: Joi.string().default('MAD')
  }),
  timeline: Joi.string().max(100),
  urgency: Joi.string()
    .valid('low', 'medium', 'high', 'urgent')
    .default('medium'),
  source: Joi.string()
    .valid('direct', 'search', 'referral', 'social', 'other')
    .default('direct'),
  utm: Joi.object({
    source: Joi.string(),
    medium: Joi.string(),
    campaign: Joi.string(),
    term: Joi.string(),
    content: Joi.string()
  })
});

// Search query validation
const searchSchema = Joi.object({
  q: Joi.string().max(100),
  category: Joi.string()
    .valid('development', 'design', 'video', 'photography', '3d', 'marketing', 'writing', 'other'),
  stacks: Joi.alternatives()
    .try(
      Joi.string(),
      Joi.array().items(Joi.string())
    ),
  mode: Joi.string()
    .valid('remote', 'hybrid', 'onsite'),
  city: Joi.string(),
  region: Joi.string(),
  rate_min: Joi.number().min(0),
  rate_max: Joi.number().min(0),
  availability: Joi.string()
    .valid('now', '1w', '1m'),
  experience: Joi.string()
    .valid('junior', 'mid', 'senior', 'expert'),
  sort: Joi.string()
    .valid('best', 'newest', 'rating', 'price_low', 'price_high', 'views')
    .default('best'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(12)
});

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  freelancerProfileSchema,
  portfolioItemSchema,
  leadSchema,
  searchSchema
};