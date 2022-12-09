const express = require("express");
const router = express.Router();


const {signUp, login, logout} = require("../controller/auth.controller");

router.post("/signup" , signUp );
router.get("/login" , login );
// router.get("/login" , logout );


module.exports = router;