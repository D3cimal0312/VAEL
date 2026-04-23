import mongoose, { Schema } from  'mongoose'
import bcrypt from "bcryptjs";


const addressSchema=new Schema({
    houseNum:    { type: String },
    localAddress:    { type: String },
  district:    { type: String },
  province:     { type: String },
  zipcode: { type: String,trim: true, match: [/^\d{5}$/, "Invalid zipcode"] },
  country:  { type: String },
  phone:    { type: String, trim: true, match: [/^\+?[\d\s\-]{7,15}$/, "Invalid phone number"] },
}, { _id: false });

const userSchema=new mongoose.Schema(
    {
        firstName:{type:String,required:true,
            trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot exceed 50 characters"],
        },
        lastName:{type:String,required:true,
          trim: true,
      minlength: [2, "last name must be at least 2 characters"],
      maxlength: [50, "last name cannot exceed 50 characters"],
        },
        email:{type:String,required:true,unique:true,
             lowercase: true, trim: true,
      match: [/^[\w.-]+@[\w.-]+\.\w{2,}$/, "Invalid email address"],
        },
        password:{type:String,required:true,select:false,
            
        },
        role:{type:String,enum:["customer","admin"],default:"customer"},
        
        address:{
        home:{type:addressSchema,default:null},
        work:{type:addressSchema,default:null},
        },
        // yo chai hamro sql ko similar xa like using foregin key yesma aaba fav ma chai product ko id store hunxa from products db and tei object id linxa which we can later get  by using .populate
    favourites:   [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    

    // !this is used so that admin can removed any unwanted users or not let anyone login
    isActive:{type:Boolean,required:true,default:true}

},
     { timestamps: true },

)

userSchema.index({ firstName: "text", lastName: "text", email: "text" });

// !hashing password before saving 
userSchema.pre("save", async function() {
    if(!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password, 12);

})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
export default mongoose.model("User", userSchema);