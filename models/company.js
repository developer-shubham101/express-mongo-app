const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new mongoose.Schema({
  organization: String,
  position: String,
  from_date: Date,
  to_date: Date,
  role: String, // New field added 
  responsibilities: [String], // New field added
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  projects: [{ type: Schema.Types.ObjectId, ref: 'UserExperience' }]
});

module.exports = mongoose.model('Company', companySchema);
