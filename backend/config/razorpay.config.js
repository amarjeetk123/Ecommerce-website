const Razorpay = require('razorpay');
const config = require("./index")

var instance = new Razorpay({
  key_id: config.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY_SECRET,
});