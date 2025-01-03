const express = require('express');
const Technology = require('../models/technologies'); // Ensure you have a Technology model
const userExperience = require('../models/userExperience');

const router = express.Router();

// Get Technologies
router.get('/', async (req, res) => {
  try {
    const technologies = await Technology.find();
    res.json(technologies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get technologies' });
  }
});

// // Get Technologies
// router.get('/m', async (req, res) => {
//   try {
//     const userExperiences = await userExperience.find();
//     let tmpTechnologies = [];
//     userExperiences.forEach((userExperience) => {
//       userExperience.technology?.forEach((technology) => {
//         if (!tmpTechnologies.includes(technology)) {
//           tmpTechnologies.push(technology);
//         }
//       });
//      });
//     console.log({ tmpTechnologies });
     

//     await Promise.all(tmpTechnologies.map(async (technology) => {
//       const newTechnology = new Technology({ name: technology });
//       await newTechnology.save();
//     }));

//     const technologies = await Technology.find();
//     res.json(technologies);
//   } catch (error) {
//     console.error(error);
    
//     res.status(500).json({ error: 'Failed to get technologies' });
//   }
// });

// Add Technology
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    const newTechnology = new Technology({ name });
    await newTechnology.save();
    res.json(newTechnology);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add technology' });
  }
});

// Update Technology
router.put('/:id', async (req, res) => {
  try {
    const technologyId = req.params.id;
    const { name } = req.body;

    const updatedTechnology = await Technology.findByIdAndUpdate(
      technologyId,
      { name },
      { new: true }
    );
    if (!updatedTechnology) {
      return res.status(404).json({ error: 'Technology not found' });
    }

    res.json(updatedTechnology);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update technology' });
  }
});

// Delete Technology
router.delete('/:id', async (req, res) => {
  try {
    const technologyId = req.params.id;

    const deletedTechnology = await Technology.findByIdAndDelete(technologyId);
    if (!deletedTechnology) {
      return res.status(404).json({ error: 'Technology not found' });
    }

    res.json({ message: 'Technology deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete technology' });
  }
});

module.exports = router;
