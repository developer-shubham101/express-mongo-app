const express = require('express');
const router = express.Router();
const UserExperience = require('../models/userExperience');

// Create (POST request to add a new user experience)
router.post('/', async (req, res) => {
  try {
    const newUserExperience = new UserExperience(req.body);
    await newUserExperience.save();
    res.status(201).json(newUserExperience);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All (GET request to get all user experiences)
router.get('/', async (req, res) => {
  try {
    const userExperiences = await UserExperience.find().populate('organization');
    res.status(200).json(userExperiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read Single (GET request to get a single user experience by ID)
router.get('/:id', async (req, res) => {
  try {
    const userExperience = await UserExperience.findById(req.params.id).populate('organization');
    if (!userExperience) {
      return res.status(404).json({ error: 'User experience not found' });
    }
    res.status(200).json(userExperience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update (PUT request to update a user experience by ID)
router.put('/:id', async (req, res) => {
  try {
    const updatedUserExperience = await UserExperience.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('organization');
    if (!updatedUserExperience) {
      return res.status(404).json({ error: 'User experience not found' });
    }
    res.status(200).json(updatedUserExperience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete (DELETE request to delete a user experience by ID)
router.delete('/:id', async (req, res) => {
  try {
    const deletedUserExperience = await UserExperience.findByIdAndDelete(req.params.id);
    if (!deletedUserExperience) {
      return res.status(404).json({ error: 'User experience not found' });
    }
    res.status(200).json({ message: 'User experience deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
