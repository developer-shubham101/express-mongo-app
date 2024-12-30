const mongoose = require('mongoose');

export const UserExperienceSchema = new mongoose.Schema({
  organization: String,
  position: String,
  project_name: String,
  from_date: Date,
  to_date: Date,
  platform: String,
  technology: [String],
  responsibilities: [String]
});