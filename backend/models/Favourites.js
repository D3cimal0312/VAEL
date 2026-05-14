import mongoose,{Schema} from "mongoose";


const favItems=new Schema({
    product:{
        type:Schema.Types.ObjectId,
        ref:"Product",
        required:true,
    },
    addedAt:{type:Date,default:Date.now},
    
},{
    _id:false
})

const favSchema=new Schema({

    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    items:[favItems]
},{timestamps:true})


favSchema.index({ user: 1 }, { unique: true });

export default mongoose.model("Fav",favSchema)