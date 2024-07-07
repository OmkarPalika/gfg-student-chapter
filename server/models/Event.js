// models/Event.js
import { Schema, model } from 'mongoose';

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  registrationLink: { type: String },
  maxParticipants: { type: Number },
}, { timestamps: true });

// Middleware for updating `updatedAt` timestamp
EventSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Indexes
EventSchema.index({ date: 1 });

export default model('Event', EventSchema);
