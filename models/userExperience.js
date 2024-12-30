const mongoose = require('mongoose');

const userExperienceSchema = new mongoose.Schema({
  organization: String,
  position: String,
  project_name: String,
  from_date: Date,
  to_date: Date,
  platform: String,
  about_project: String,
  technology: [String], 
  responsibilities: String,
});

module.exports = mongoose.model('UserExperience', userExperienceSchema);
module.exports.userExperienceSchema = userExperienceSchema;
