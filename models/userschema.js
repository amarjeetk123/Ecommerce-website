import mongoose from "mongoose";   // or   const mongoose = require("mongoose")
import AuthRoles from "../utils/authRoles"

import bcrypt from "bcryptjs"   // bcrypt is name or variable
import JWT from "jsonwebtoken"  // JWT is name or variable
import cryppto from "crypto" // we don't need to install crypto because its a default nodejs package

const userSchema = mongoose.Schema(

    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [50, "Name must be less than 50 character"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minLength: [6, "Password must be more than 6 character"],
            select: false,  //  when we make a query to the databse then this field will not come... but the problem is how we match the password and authenticate the user
        },
        role: {
            type: String,
            // enum :  ["ADMIN" , "MODERATOR" , "USER"] ,                     // enum is nothin but a big object or array then we cam store   but here we not used array ..... becasue this would be a bad approach
            enum: Object.values(AuthRoles),
            default: AuthRoles.USER,
        },
        forgotPasswprdToken: String,
        forgotPasswprdExpiry: Date,
    },

    { 
        timestamps : true 
    }
);

// in this project we are going to use mongoose Hooks

export default mongoose.model("User" , userSchema )