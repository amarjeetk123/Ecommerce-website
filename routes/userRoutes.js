const express = require("express");
const router = express.Router();


const {signUp, login, logout, resetPassword, getProfile} = require("../controller/auth.controller");

router.post("/signup" , signUp ); // working
router.get("/login" , login );  // working
// router.get("/login" , logout );
router.post("/resetpassword/:resetToken" , resetPassword );  // not working
router.get("/profile" , getProfile );    //not check


module.exports = router;