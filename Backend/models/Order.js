import mongoose from "mongoose";

const   OrderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed","shipped","delivered"],
      default: "pending",
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
 size:      { type: String },
        colorName: { type: String },
        quantity: { type: Number, default: 1 ,min: [1, "Quantity must be at least 1"]},
      },
    ],

    // !PAXI ADMIN BATA NEW DATA UPLOAD CHANGE HUDA CUSTIMER LAI DIFFERENT PAYMENT AMOUNT PAY GARNE JHAN JHAT NA HOS VANERA
    pricing: {
      subtotal: { type: Number, required: true },
      shippingCost: { type: Number, default: 0 },
      discountAmount: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
      shippingAddress: {
      houseNum:     { type: String },
      localAddress: { type: String },
      district:     { type: String },
      province:     { type: String },
      zipcode:      { type: String },
      country:      { type: String },
      phone:        { type: String },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", OrderSchema);
