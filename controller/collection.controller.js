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
            new: true,
            runValidators: true,
        }
    )

    if(!updatecollection){
        throw new CustomError( "Collection not found!...."  , 400)
    }

    // send responce to front end
    res.status(200).json({
        success: true,
        message: "Collection updated successfully",
        updatecollection,
    })
})



/***********************************************************************************
 * @Delete_Collection
 * @routr :- http://localhost:4000/api/collection/delete
 * @description :- collection_id
 * @parameter :- 
 * @returms :- 
 ***********************************************************************************/
export const deleteCollection = asyncHandler(async (req,res) => {
    // existing value to be updates
    const {id: collectionId} = req.params
   

    if(!new_name){
        throw new CustomError( "new_name is required for updating the collection"  , 400)
    }

    let deleteCollection = await Collection.findByIdAndDelete( collectionId )

    if(!deleteCollection){
        throw new CustomError( "Collection not found!...."  , 400)
    }

    // freedup the memory
    deleteCollection.remove()  // here we can also use .delete() // this is a option thing // it  will actually delete the variable
    // send responce to front end
    res.status(200).json({
        success: true,
        message: "Collection Deleted successfully",
        
    })
})



/***********************************************************************************
 * @Get_All_Collection
 * @routr :- http://localhost:4000/api/getallcollections
 * @description :- User will get all the available collection
 * @parameter :- no parameter
 * @returms :- collection object
 ***********************************************************************************/

export const getAllCollection = asyncHandler(async (req,res) => {

    // get the list of all the availabe collection
    let collections = await Collection.find()

    if(!collections){
        throw new CustomError( "No collection found!...."  , 400)
    }

    // send responce to front end
    res.status(200).json({
        success: true,
        message: "Collection Deleted successfully",
        collections,
    })
})