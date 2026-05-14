import mongoose, { Schema } from 'mongoose'
import { colorSchema } from './Products.js'

const cartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  color:     colorSchema,
  size:      { type: String },
  quantity:  { type: Number, required: true, min: 1, default: 1 },
}, { timestamps: true });

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items:  [cartItemSchema],
}, { timestamps: true });

cartSchema.index(
  { userId: 1 },
  { unique: true } 
);

export default mongoose.model("Cart", cartSchema);