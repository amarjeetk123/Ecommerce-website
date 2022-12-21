const User = require("../models/userschema");
const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");
const mailHelper = require("../helper/mailHelper");
const crypto = require("crypto");

const cookieOption = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    //could be in a separate file in utils
}


/***********************************************************************************
 * @SIGNUP
 * @routr :- http://localhost:4000/api/auth/signup
 * @description :- User signup controller for creating new user
 * @parameter :- name, email , password
 * @returms User Object
 ***********************************************************************************/
exports.signUp = asyncHandler(async (req, res) => {   // we can remove asynch from here because we already passed aynch in asycncHandler but it is good practice to pass async here

    // collect all inforamtion from frontend
    const { name, email, password } = req.body

    // check all the field are fill or not
    if (!name || !email || !password) {
        throw new CustomError("Please fill all the fields", 400)
    }

    // checkif user already exist or not
    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new CustomError("User already exist", 400)
    }

    const user = await User.create({ name, email, password });  // name should name:name and so on but our js is so smart after es6 it know name:name = name

    const token = user.getJwtToken()  // important point we have to use user not User

    user.password = undefined;  // although we don't need it but for just a precatuon

    res.cookie("token", token, cookieOption)
    res.status(200).json({
        success: true,
        token,
        user,
    })

})

/***********************************************************************************
 * @Login
 * @routr :- http://localhost:4000/api/auth/login
 * @description :- User login controller for login existing user
 * @parameter :- email , password
 * @returms User Object
 ***********************************************************************************/

exports.login = asyncHandler(async (req, res) => {

    // collect all inforamtion from frontend
    const { email, password } = req.body

    // check all the field are fill or not
    if (!email || !password) {
        throw new CustomError("Please fill all the fields", 400)
    }
    // checkif user exist or not
    const user = await User.findOne({ email }).select("+password")             // here we are using select becasue in userschem we set select: false in password so that password is not comes from databse..
    // select("+password -name") it will select password and will not select name
    if (!user) {
        throw new CustomError("Invalid Crendential", 400)   // or we can say wrong email
    }

    // compare the password
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new CustomError("Invalid Crendential-pp", 400)  // or we can say wrong password
    }

    // create a token
    const token = user.getJwtToken()

    user.password = undefined

    res.cookie("token", token, cookieOption)
    res.status(200).json({
        success: true,
        token,
        user,
    })

})


/***********************************************************************************
 * @Logout
 * @route :- http://localhost:4000/api/auth/logout
 * @description :- User logout by clearing user cookies
 * @parameter :- email , password
 * @returms success message
 ***********************************************************************************/

exports.logout = asyncHandler(async (_req, res) => {    // instead of _req we can use req but it is good practice to use _req here...  _req here _ means it is not getting used

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })                         // or we can use  // res.clearCookie()  this code will also clear user cookies
    res.status(200).json({
        success: true,
        message: "user logout succesfully"
    })
})


/***********************************************************************************
 * @Forgot_Password
 * @route :- http://localhost:4000/api/auth/password/forgot
 * @description :- User will submit email and we will generate a token
 * @parameter :- email 
 * @returms :- email send
 ***********************************************************************************/

exports.forgotPassword = asyncHandler( async (req,res) =>{
    // grab the email
    const {email} = req.body

    // check email for null or ""

    // search the user in databse
    const user = await User.findOne({email})
    if(!user){
        throw new CustomError("User not found" , 404 )
    }

    // generate a reset token
      const resetToken = user.generateForgotPasswodtoken()

      // save this token in databse
     await  user.save({ validateBeforeSave: false })  //we are not validation anything we only created a token and want to save it in databse but if we are using .save() for the data then its means all the validation is done so that we are passing false

     // create a url and we send the token in this url
     const resetUrl =    // we have to send this url to the user
     ` ${req.protocol}://${req.get("host")}/api/auth/password/reset/${resetToken} `

     const text = `Your password reset url is
     \n\n  ${resetUrl} \n\n
     `

     try {
        await mailHelper({
            email: user.email,
            subject: "Password reset mail for website",
            text: text,
        })

        res.status(200).json({
            success: true,
            message: ` Email send to ${user.email} `
        })
        
     } catch (error) {
        //roll back- clear fields and save
        user.forgotPasswprdToken = undefined
        user.forgotPasswprdExpiry = undefined

         await user.save({ validateBeforeSave : false })


        throw new CustomError( error.message || "Email sending process is failed" )
        
     }


} )



/***********************************************************************************
 * @ResetPassword
 * @route :- http://localhost:4000/api/auth/password/reset/:resetToken
 * @description :- User will be able to reset passord based on url token
 * @parameter :- token from url , password ,confirm password  // token from url means since we already send a token indise a url in forget_password controller and also send to database and the same token we will recevied inside this controller
 * @returms :- User onject
 ***********************************************************************************/

exports.resetPassword = asyncHandler ( async (req,res) =>{
        const {token: resetToken } = req.params
        const { password, confirmPassword } = req.body

        // actuall our token is encrypted (inside generateForgotPasswodtoken in userschema) so we have to decrypt them and then we can compare

        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

        // now we have a token that we can match or we can find the user with this token 

        const user =  await User.findOne({
            forgotPasswprdToken: resetPasswordToken,
            forgotPasswprdExpiry: {$gt: Date.now()}  // date should be grater than now .... gt-gretaer than

        }) // if both the field will be true then only it will return true otherwise it will return false....

        if(!user){
            throw new CustomError("password token is invalid or expired" , 400 )
        }

        if(password !== confirmPassword){
            throw new CustomError("password and confirmPassword is not matched" , 400 )
        }

        //set password is new password
        user.password = password;

        // we have to undefind the token because our job is done
     user.forgotPasswprdToken = undefined;
     user.forgotPasswprdExpiry = undefined;

     await user.save()   // here we are not encrypting the password before stiring it to databse because it is handled inside schema //userSchema.pre()

     // now we want to create a token and send to databse and this is an optional case...
     const token = user.getJwtToken();
     user.password = undefined;
     res.cookie("token" , token , cookieOption )
     res.status(200).json({
        success: true,
        token,
        user,
     })

} )


