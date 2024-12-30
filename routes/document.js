const express = require('express');
const router = express.Router();
const Document = require('../models/document');
const File = require('../models/file');

// Create (POST request to add a new document)
router.post('/', async (req, res) => {
  try {
    const newDocument = new Document(req.body);
    await newDocument.save();
    res.status(201).json(newDocument);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read All (GET request to get all documents)
router.get('/', async (req, res) => {
  try {
    const documents = await Document.find().populate('files');
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read Single (GET request to get a single document by ID)
router.get('/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id).populate('files');
    if (!document) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update (PUT request to update a document by ID)
router.put('/:id', async (req, res) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json(updatedDocument);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete (DELETE request to delete a document by ID)
router.delete('/:id', async (req, res) => {
  try {
    const deletedDocument = await Document.findByIdAndDelete(req.params.id);
    if (!deletedDocument) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
