const mongoose = require("mongoose")


const productSchema = new mongoose.Schema(
    {
        
        name:{
            type: String,
            required: [true, "Please provide a productname"],
            trim: true,
            maxLength: [120, "Product name should not be more than 120 character"],
        },
        price:{
            type: Number,
            required: [true, "Please provide price of product"],
            maxLength: [5, "Product price should not be more than 5 digit"], // trim()  only work with string
        },
        description: {
            type: String,
            // here we will use live editor npm
        },
        photos: [
            {
                secure_url:{
                    type:String,
                    required: true,
                }
            }
        ],
        stocks: {
            type: Number,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        collectionId: {
            // if we want to store a refernce of anpother schema then the syntax is always same as below
            // here we are calling reference of collectionSchema.....
            type: mongoose.Schema.Types.ObjectId, // this type is always same and we have to remember it
            ref: "Collection",
        }

    },
    {
        timestamps: true
    }
)
export default productSchema("Product" , productSchema )