import { Schema, model } from 'mongoose';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  bio: { type: String },
  interests: [{ type: String }],
  avatar: { type: String },
  birthdate: { type: Date },
  location: { type: String },
}, { timestamps: true });

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await compare(candidatePassword, this.password);
};

export default model('User', UserSchema);
