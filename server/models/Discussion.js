// models/Discussion.js
import { Schema, model } from 'mongoose';

const ReplySchema = new Schema({
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const DiscussionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  replies: [ReplySchema],
}, { timestamps: true });

// Middleware for updating `updatedAt` timestamp
DiscussionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes
DiscussionSchema.index({ author: 1 });
DiscussionSchema.index({ tags: 1 });

export default model('Discussion', DiscussionSchema);
