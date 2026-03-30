import mongoose from "mongoose";

const { schema } = mongoose;

const colorSchema = new schema(
  {
    name: { type: String, required: true, trim: true },
    hex: { type: String, required: true },
  },
  { _id: false }, // mongoose ko auto id asign/set hudaina
);

// !main products ko schema

const productSchema = new schema(
  {
    name: { type: String, required: true, trim: true },

    description: { type: String, trim: true },
    material: { type: String, trim: true },
    sizingInfo: { type: String, trim: true },

    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: null, min: 0 },

    category: { type: String, required: true, trim: true, index: true },

    gender: {
      type: String,
      enum: ["women", "men", "unisex"],
      required: true,
      index: true,
    },

    tags: [{ type: String, trim: true }],

    images: {
  type: [String],
  validate: {
    validator: (arr) => arr.length >= 4,
    message: 'At least 4 image links are required'
  }
},

    colors: [colorSchema],

    sizes: [{ type: String }],

    soldOut: [{ type: String }],

    stock: { type: Number, required: true, min: 0, default: 0 },

    isNew: { type: Boolean, default: false },

    isSale: { type: Boolean, deafult: false },

    // !foir admin control we need this status so that we can control products on user end
    // "draft"     → saved in admin, invisible to customers
    // "published" → live on storefront
    // "archived"  → delisted (product deleted from shop but kept for order history)

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: "true",
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
  },
  {
    timestamps: true,
  },
);

productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });

module.exports = mongoose.model("Product", productSchema);