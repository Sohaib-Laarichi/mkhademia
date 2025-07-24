const mongoose = require('mongoose');

const FreelancerSchema = new mongoose.Schema({
  slug: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  avatar: String,
  title: String,
  category: { type: String, required: true },
  subcategories: [String],
  stacks: [String],
  location: {
    city: String,
    region: String,
  },
  mode: { type: String, enum: ['remote', 'hybrid', 'onsite'], default: 'remote' },
  rate: {
    type: {
      type: String,
      enum: ['hourly', 'day', 'project'],
      default: 'hourly',
    },
    amountMAD: Number,
    isPublic: { type: Boolean, default: true },
  },
  availability: { type: String, enum: ['now', '1w', '1m', 'customDate'], default: 'now' },
  languages: [String],
  bio: String,
  services: [String],
  industries: [String],
  portfolio: [Object],
  contacts: {
    whatsapp: String,
    phone: String,
    email: String,
    website: String,
    social: [String],
  },
  seo: {
    keywords: [String],
    ogImage: String,
  },
  visibility: { type: String, enum: ['public', 'hidden'], default: 'public' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Freelancer', FreelancerSchema); 