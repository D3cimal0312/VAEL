
import mongoose from 'mongoose';
const { Schema } = mongoose;

const categorySchema = new Schema({
  name:        { type: String, required: true, unique: true ,
     minlength: [2, "Name must be at least 2 characters"],
  maxlength: [20, "Name cannot exceed 20 characters"],
  },
  slug:        { type: String, required: true, unique: true }, 
  description: { type: String ,
       minlength: [5, "Name must be at least 5 characters"],
  maxlength: [100, "Name cannot exceed 100 characters"],
  },
  isActive:{type:Boolean,default:true,}

}, { timestamps: true });


categorySchema.index({name:-1});
categorySchema.pre("validate", async function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

});

export default mongoose.model("Category", categorySchema);