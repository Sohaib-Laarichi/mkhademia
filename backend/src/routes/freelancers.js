const express = require('express');
const Freelancer = require('../models/Freelancer');
const router = express.Router();

// GET /api/freelancers - list all freelancers (basic, no filters yet)
router.get('/', async (req, res) => {
  try {
    const freelancers = await Freelancer.find({ visibility: 'public' });
    res.json(freelancers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/freelancers/:idOrSlug - get freelancer by id or slug
router.get('/:idOrSlug', async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const freelancer = await Freelancer.findOne({
      $or: [
        { _id: idOrSlug },
        { slug: idOrSlug },
      ],
    });
    if (!freelancer) return res.status(404).json({ error: 'Not found' });
    res.json(freelancer);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/freelancers - create new freelancer (no auth yet)
router.post('/', async (req, res) => {
  try {
    const freelancer = new Freelancer(req.body);
    await freelancer.save();
    res.status(201).json(freelancer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; 