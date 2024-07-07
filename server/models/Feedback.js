import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  targetType: { type: String, enum: ['event', 'resource'], required: true },
  target: { type: Schema.Types.ObjectId, refPath: 'targetType', required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model('Feedback', FeedbackSchema);
