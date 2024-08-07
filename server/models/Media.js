// models/Media.js
import { Schema, model } from 'mongoose';

const MediaSchema = new Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  url: { type: String, required: true },
  uploader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  uploadDate: { type: Date, default: Date.now },
}, { timestamps: true });

// Middleware for updating `updatedAt` timestamp
MediaSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default model('Media', MediaSchema);
