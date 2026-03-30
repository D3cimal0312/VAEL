import mongoose, { Schema } from  'mongoose'

const addressSchema=new Schema({
    houseNum:    { type: String },
    localAddress:    { type: String },
  district:    { type: String },
  province:     { type: String },
  zipcode: { type: String },
  country:  { type: String },
  phone:    { type: String },
}, { _id: false });

const userSchema=new mongoose.Schema(
    {
        firstName:{type:String,required:true},
        lastName:{type:String,required:true},
        email:{type:stringify,required:true,unique:true},
        passwordHash:{type:String,required:true,select:false},
        role:{type:String,enum:["customer","admin"],default:"customer"},
        
        address:{
        home:{type:addressSchema,default:null},
        work:{type:addressSchema,default:null},

        // yo chai hamro sql ko similar xa like using foregin key yesma aaba fav ma chai product ko id store hunxa from products db and tei object id linxa which we can later get  by using .populate
    favourites:   [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    },
    
}
)

module.exports = mongoose.model("User", userSchema);