const express = require("express");
const router = express.Router();


const {signUp, login, logout, resetPassword, getProfile} = require("../controller/auth.controller");

router.post("/signup" , signUp ); // working
router.get("/login" , login );  // working
// router.get("/login" , logout );
router.post("/resetpassword/:resetToken" , resetPassword );  // not working
router.get("/profile" , getProfile );    //not check

const {createCollection, updatecollection, deleteCollection, getAllCollection} = require("../controller/collection.controller")
router.post("/api/collection" , createCollection)
router.put("/api/collection/update/:id" , updatecollection)
router.delete("/api/collection/delete/:id" , deleteCollection)
router.get("/api/getallcollections" , getAllCollection)


module.exports = router;