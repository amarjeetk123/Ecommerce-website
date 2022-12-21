import  Collection  from "../models/collection.schema.js";
const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");

/***********************************************************************************
 * @Create_Collection
 * @routr :- http://localhost:4000/api/collection
 * @description :- 
 * @parameter :- collection name
 * @returms Collection object
 ***********************************************************************************/

export const createCoolection = asyncHandler(async (req,res) => {

    // collect the data
    const {name} = req.body
    if(!name){
        throw new CustomError( "Collection name is required"  , 400)
    }

    // add this name to databse
    const collection = Collection.create({
        name
    })

    // send this respomnce value to frontend
    res.status(200).json({
        success: true,
        message: "Collection created successfully",
        collection,
    })
})