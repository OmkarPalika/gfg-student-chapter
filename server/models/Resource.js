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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model('Resource', ResourceSchema);
