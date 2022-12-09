const mongoose = require("mongoose")   
const AuthRoles = require("../utils/authRoles")   


const bcrypt = require("bcryptjs")   // bcrypt is name or variable
const JWT = require("jsonwebtoken")   // JWT is name or variable
const crypto = require("crypto")   // we don't need to install crypto because its a default nodejs package 
// by using crypto we van generate a long string

const config  = require ("../config/index")

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
        timestamps: true
    }
);

//  mongoose hooks:-in this project we are going to use mongoose Hooks

// challenge1 encrypt the password  Note:- we can also encrypr the password inside user user controller but in this project since we are going to use mongoose hooks so we done all the stuf like password encryption , user details validation etc inside this folder

userSchema.pre("save", async function (next) {        // `pre` is a mongoose hokes , "save" is method that we used in userController for sacing the user insidedatabse and here we mostly used function instead of using arrow function and next is a middleware

    //if (!this.modified("password")) return next(); //done by hitesh sir-- actually this is prodcing a error:--  this.modified is not a function
      if(!this.password) return next();
      
    this.password = await bcrypt.hash(this.password, 10)
    next()

})

// mongoose schema methos:- // by usin this we can actually create a method of anything like comapre password etc....... just like bcryptjs has a methos .comapre for compairing the password
// this is something like we are creating a prototype
// here we are using normal function instead of arrow function because we want to take access of password by (this.password) 
// add more featyre directly to our schema....
userSchema.methods = {
    // compare password
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)

    },

    // create JWT token
    getJwtToken: function () {
        return JWT.sign(
            {               // in this object write all the payload
                _id: this._id,
                role: this.role,
            },
            config.JWT_SECRET,    // our secret
            {
                expiresIn: config.JWT_EXPIRY
            }
        )
    },

    //generate forgotPasswodtoken : - for this we used crypto
    generateForgotPasswodtoken: function () {
        const forgotToken = crypto.randomBytes(20).toString('hex')
        //step1 save to db
        this.forgotPasswprdToken = crypto.createHash("sha256").update(forgotToken).digest("hex") // we are encrypting the token and then save to databse

        this.forgotPasswprdExpiry = Date.now() + 20 * 60 * 1000  // 
        //step2 return this to user

        return forgotToken ;

    },
}

module.exports = mongoose.model("User", userSchema)