class CustomError extends Error{
    constructor(message , code ){  // message:- any kind of error message and code:- any type of status code
        super(message);
        this.code = code;
    }
}
module.exports = CustomError