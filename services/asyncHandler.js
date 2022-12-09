

// simple arrow function:-   const asyncHandler = () =>{}
// higher order functiom:-  const asyncHandler = (fn) => () =>{} 

// here we are taking function (fn) as an input thus the below function is a higher order function
const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)  // this is something like a clouser
    } catch (error) {
        console.log(error)
        res.status(error.code || 401).json({
            success: false,
            message:  error.message ,
        })

    }
}

module.exports = asyncHandler