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

export const createCollection = asyncHandler(async (req,res) => {

    // collect the data
    const {name} = req.body
    if(!name){
        throw new CustomError( "Collection name is required"  , 400)
    }

    // add this name to databse
    const collection = await Collection.create({
        name
    })

    // send this respomnce value to frontend
    res.status(200).json({
        success: true,
        message: "Collection created successfully",
        collection,
    })
})


/***********************************************************************************
 * @Update_Collection
 * @routr :- http://localhost:4000/api/collection/update
 * @description :- 
 * @parameter :- 
 * @returms :- 
 ***********************************************************************************/
export const updatecollection = asyncHandler(async (req,res) => {
    // existing value to be updates
    const {id: collectionId} = req.params
    //new value to get updated
    const {new_name}  = req.body

    if(!new_name){
        throw new CustomError( "new_name is required for updating the collection"  , 400)
    }

    let updatedCollection = await Collection.findByIdAndUpdate(    //findbyidandupdate is availabe in mongoose documentation
        collectionId,
        {
            name:new_name,
        },
        {
            new: true
        }
    )
})