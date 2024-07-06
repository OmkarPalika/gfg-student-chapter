const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Media', MediaSchema);