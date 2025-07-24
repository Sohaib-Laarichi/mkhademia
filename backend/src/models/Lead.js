const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Freelancer', required: true },
  channel: { type: String, enum: ['whatsapp', 'form'], required: true },
  name: String,
  email: String,
  message: String,
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', LeadSchema); 