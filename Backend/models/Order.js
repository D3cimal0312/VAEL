import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "delivered"],
      default: "pending",
    },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        size: String,
        colorName: String,
        quantity: { type: Number, default: 1 },
      },
    ],

    // !PAXI ADMIN BATA NEW DATA UPLOAD CHANGE HUDA CUSTIMER LAI DIFFERENT PAYMENT AMOUNT PAY GARNE JHAN JHAT NA HOS VANERA
    pricing: {
      subtotal: { type: Number, required: true },
      shippingCost: { type: Number, default: 0 },
      discountAmount: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
