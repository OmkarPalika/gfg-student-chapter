// models/Blog.js
import { Schema, model } from 'mongoose';

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  imageUrl: { type: String },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema],
}, { timestamps: true });

// Middleware for updating `updatedAt` timestamp
BlogSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes
BlogSchema.index({ author: 1 });
BlogSchema.index({ tags: 1 });

export default model('Blog', BlogSchema);
