// models/Feedback.js
import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  targetType: { type: String, enum: ['event', 'resource'], required: true },
  target: { type: Schema.Types.ObjectId, refPath: 'targetType', required: true },
}, { timestamps: true });

// Middleware for updating `updatedAt` timestamp
FeedbackSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes
FeedbackSchema.index({ user: 1 });

export default model('Feedback', FeedbackSchema);
