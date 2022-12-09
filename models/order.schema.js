const mongoose = require("mongoose")

import orderStatus from "../utils/orderStatus";
import paymentMode from "../utils/paymentMode";

const orderSchema = new mongoose.Schema(
   {
      products: {
         type: [
            {
               productId:{
                  type: mongoose.Schema.Types.ObjectId ,
                  ref: "Product",
                  required: true,
               },
               count: Number,
               price: Number,
            }
         ],
         required: true,

      },
      user: {
         type: mongoose.Schema.Types.ObjectId  ,
         ref: "User",
         required: true,
      },
      phoneNumber: {
         type: Number,
         required: true,
      },
      amount: {
         type: Number,
         required: true,
      },
      coupon: String,
      transactionId: String,
      address: {
         type: String,
         required: true,
      },
      status: {
         type: String,
         enum: Object.values(orderStatus),
         default: orderStatus.DELIVERED,
      },
      paymentMode: {
         type: String,
         enum: Object.values(paymentMode),
         default: paymentMode.COD,
      },
   } 
)

export default mongoose.model("Order" , orderSchema )