import { Schema, model } from 'mongoose';

const BlogSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [{ type: String }],
  imageUrl: { type: String },
}, { timestamps: true });


export default model('Blog', BlogSchema);