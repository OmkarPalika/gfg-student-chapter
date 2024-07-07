// models/Resource.js
import { Schema, model } from 'mongoose';

const ResourceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  attachments: [{ type: String }],
  views: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 },
}, { timestamps: true });

// Middleware for updating `updatedAt` timestamp
ResourceSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default model('Resource', ResourceSchema);
