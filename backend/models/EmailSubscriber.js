
import mongoose from 'mongoose';

const emailSubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true,
      trim: true,
      match: [/^[\w.-]+@[\w.-]+\.\w{2,}$/, "Invalid email address"], },
  unsubscribed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('EmailSubscriber', emailSubscriberSchema);