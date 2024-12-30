const mongoose = require('mongoose');
const { userExperienceSchema } = require('./userExperience');

const projectSchema = new mongoose.Schema({
  userExperience: [userExperienceSchema]
});

module.exports = mongoose.model('Project', projectSchema);
module.exports.projectSchema = projectSchema;
