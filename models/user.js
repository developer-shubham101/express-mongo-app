const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  profileType: { type: String, required: true, unique: true },
  name: String,
  contact: {
    phone: String,
    email: String,
    location: String,
    linkedin: String,
    github: String
  },
  aboutMe: String,
  keySkills: [
    {
      category: String,
      skills: [String]
    }
  ],
  education: [
    {
      degree: String,
      institution: String,
      year: Number
    },
    {
      qualification: String,
      board: String,
      year: Number,
      stream: String
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
