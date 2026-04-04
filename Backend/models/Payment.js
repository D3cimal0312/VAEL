import mongoose from 'mongoose';
const {Schema} =mongoose;

const paymentSchema = new Schema(
    {
        orderId:{type:Schema.Types.ObjectId,ref:"Order",required:true}
        ,
        userId:{type:Schema.Types.ObjectId,ref:"User",required:true}
,
        paymentID:{type:String,required:true,unique:true},

        amount:{type:Number,required:true},

        status:{
                  type:    String,
      enum:    ["pending", "succeeded", "failed"],
      default: "pending",
        }

    },
     { timestamps: true }
)

export default mongoose.model("Payment", paymentSchema);