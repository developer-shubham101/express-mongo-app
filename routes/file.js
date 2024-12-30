const express = require('express');
const router = express.Router();
const multer = require('multer');
const File = require('../models/file');
const path = require('path');
const fs = require('fs');

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Create (POST request to upload a file)
router.post('/', upload.single('file'), async (req, res) => {
  try {
    const newFile = new File({
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags ? req.body.tags.split(',') : [], // Split tags string into an array
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Files (GET request to retrieve all files)
router.get('/', async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single File (GET request to retrieve a single file by ID)
router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.set('Content-Type', file.mimetype);
    res.sendFile(path.join(__dirname, '../', file.path));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete (DELETE request to delete a file by ID)
router.delete('/:id', async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    // Remove the file from the filesystem
    fs.unlinkSync(file.path);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
