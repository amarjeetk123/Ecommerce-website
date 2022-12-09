const User = require("../models/userschema");
const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");

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