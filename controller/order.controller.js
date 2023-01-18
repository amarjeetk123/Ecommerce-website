const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");
const Product = require("../models/product.schema");
const Coupon = require("../models/coupen.schema")
const Order = require("../models/order.schema");
const razorpay = require("../config/razorpay.config")


/**********************************************************
 * @GENEARATE_RAZORPAY_ID
 * @route https://localhost:5000/api/order/razorpay
 * @description Controller used for genrating razorpay Id
 * @description Creates a Razorpay Id which is used for placing order
 * @returns Order Object with "Razorpay order id generated successfully"
 *********************************************************/

export const generateRazorpayOrderId = asyncHandler( async (req, res)=>{
    //get product and coupon from frontend

    //verfiy product price from backend
    // make DB query to get all products and info

    let totalAmount;
    //total amount and final amount
    // coupon check - DB   // this is for discount purpose
    // disount =[ total amout - {total amount * (coupon/100)}]  // since coupon is in % like 30%, 20% etc discount
    // finalAmount = totalAmount - discount

    const options = {   // this option for ROZARPAY for other we have to read their documentation
        amount: Math.round(totalAmount * 100),   // here we multiply the total amount with 100 because the pricing in all payment gateway is done in the least minimum currency And the in india the least minimun currency is 1 rupay = 100 paisa
        currency: "INR",
        receipt: `receipt_${new Date().getTime()}` // we can customise this as our need or choice // we can use uuid or other thing also
    }

    const order = await razorpay.orders.create(options)

    //if order does not exist
    if(!order){
        throw new CustomError("Something went wrong in order processing", 500)
    }
    
    // success then, send it to front end
    res.status(200).json({
        success: true,
        order
    })
})