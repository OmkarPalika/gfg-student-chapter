import { Schema, model } from 'mongoose';
import pkg from 'bcryptjs';
const { hash, compare } = pkg;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['member', 'admin'], default: 'member' },
  bio: { type: String },
  interests: [{ type: String }],
  avatar: { type: String },
  birthdate: { type: Date },
  location: { type: String },
  approvalStatus: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
}, { timestamps: true });

UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await hash(this.password, 12);
    next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error('Password comparison failed');
  }
};

export default model('User', UserSchema);
