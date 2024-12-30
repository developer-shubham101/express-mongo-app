const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  description: String,
  files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
  metaData: [
    {
      key: String,
      value: String
    }
  ]
});

module.exports = mongoose.model('Document', documentSchema);
