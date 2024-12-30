const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  title: String, // New field added
  tags: [String], // New field added
  filename: String,
  originalname: String,
  description: String, // New field added
  mimetype: String,
  size: Number,
  path: String
});

module.exports = mongoose.model('File', fileSchema);
