const mongoose = require("mongoose")

const couponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: [true, "Please provide a coupon name"],
        },
        discount: {
            type: Number,
            default: 0,
        },
        avtive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps:true }
)

export default mongoose.model("Coupon" , couponSchema  )