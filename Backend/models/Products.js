import mongoose from "mongoose";

const { Schema } = mongoose;

const generateSlug = (text) =>
  text.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
const colorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    hex: {
      type: String,
      required: true,
      validate: {
        validator: (v) => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(v),
        message: "Invalid hex color format",
      },
    },
  },
  { _id: false }, // mongoose ko auto id asign/set hudaina
);

// !main products ko schema

const productSchema = new Schema(
  {
    name: {
      type: String, required: true, trim: true,unique:true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    slug: { type: String, unique: true, lowercase: true },

    description: {
      type: String, trim: true,
      minlength: [5, "Description must be at least 5 characters"],
      maxlength: [1000, "Description cannot exceed 1000 characters"], 
    },

    material: {
      type: String, trim: true,
      maxlength: [200, "Material cannot exceed 200 characters"],
    },

    sizingInfo: {
      type: String, trim: true,
      maxlength: [300, "Sizing info cannot exceed 300 characters"],
    },

    price: {
      type: Number, required: true,
      min: [0, "Price cannot be negative"],
    },

    originalPrice: {
      type: Number, default: null,
      min: [0, "Original price cannot be negative"],
    },

    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },

    gender: {
      type: String,
      enum: ["women", "men", "unisex"],
      required: true,
      index: true,
    },

    tags: [{
      type: String, trim: true,
      maxlength: [30, "Tag cannot exceed 30 characters"],
    }],

    images: {
      type: [String],
      validate: {
        validator: (arr) => arr.length >= 4,
        message: "At least 4 image links are required",
      },
    },

    colors: [colorSchema],

    sizes: [{ type: String, trim: true }],

    // sizes that are currently out of stock e.g. ["S", "XL"]
    soldOut: [{ type: String, trim: true }],

    stock: {
      type: Number, required: true, default: 0,
      min: [0, "Stock cannot be negative"],
    },

    isNewArrival: { type: Boolean, default: false },

    isSale: { type: Boolean, default: false },

    // !foir admin control we need this status so that we can control products on user end
    // "draft"     → saved in admin, invisible to customers
    // "published" → live on storefront
    // "archived"  → delisted (product deleted from shop but kept for order history)
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true,
    },

    rating: {
      type: Number, default: 0,
      min: [0, "Rating cannot be below 0"],
      max: [5, "Rating cannot exceed 5"],
    },

    reviewCount: {
      type: Number, default: 0,
      min: [0, "Review count cannot be negative"],
    },
  },
  {
    timestamps: true,
  },
);

//  to later filter "STUFF"
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ category: 1, gender: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ name: "text", description: "text", tags: "text" }, {
  weights: {
    name: 3,
    description: 1,
    tags: 2,
  },
});


// On save
productSchema.pre("save", async function () {
  if (this.isModified("name") || !this.slug) {
    this.slug = generateSlug(this.name);  
  }
  
});


productSchema.pre("findOneAndUpdate", async function (ext) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = generateSlug(update.name); 
  }

});

export default mongoose.model("Product", productSchema);