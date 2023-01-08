const Product = require("../models/product.schema")
const formidable = require('formidable');
const fs = require('fs'); // this is node js file system module  // we don't need to install it because it is node built in module that means already in the module
const Mongoose = require("mongoose")  // this Mongoose is different from mongoose  // this is a object or a method

const asyncHandler = require("../services/asyncHandler");
const CustomError = require("../utils/customError");
const config = require("../config/index.js")

const {s3FileUpload,s3FileDelete} = require("../services/imageUpload")


/**********************************************************
 * @ADD_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for creating a new product
 * @description Only admin can create the coupon
 * @descriptio Uses AWS S3 Bucket for image upload
 * @returns Product Object
 *********************************************************/

export const addProduct = asyncHandler( async (req,res) => {
    const form = formidable({
        multiples: true,  // user can upload multiple file
        keepExtensions: true  // images can jpg,png or in other formate
    });

    form.parse(req, async function (err, fields, files){
        try {
            if (err) {
                throw new CustomError(err.message || "Something went wrong", 500)
            }
            let productId = new Mongoose.Types.ObjectId().toHexString();  // this is not necessary  // but because we want that every file name should be unique so that we are using this  // from this we are generating a random id
            //console.log(fields, files)

            // check for fields
            if (!fields.name || 
                !fields.price ||
                !fields.description ||
                !fields.collectionId
                ) {
                    throw new CustomError("Please fill all details", 500)
            }

            // we can use the beloy code for image handling in any of my project as it is
            // handling images
            let imgArrayResp = Promise.all(
                Object.keys(files).map(async (filekey, index) => {   //Object.keys(files) it will return a array because we nedd "files" in array format , actually "files" is already in form of array but for make sure we are doing this
                    const element = files[filekey]

                    const data = fs.readFileSync(element.filepath)

                    const upload = await s3FileUpload({
                        bucketName: config.S3_BUCKET_NAME,
                        key: `products/${productId}/photo_${index + 1}.png`,
                        body: data,
                        contentType: element.mimetype // mimetye is like .png , .jpeg etc
                    })
                    return {
                        secure_url: upload.Location
                    }
                })
            )

            let imgArray = await imgArrayResp;
            const product = await Product.create({
                _id: productId,
                photos: imgArray,
                ...fields,
            })

            if (!product) {
                throw new CustomError("Product was not created", 400)
                //remove image
            }
            res.status(200).json({
                success: true,
                product
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message || "Something went wrong"
            })
        }

    })
})



/**********************************************************
 * @GET_ALL_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for getting all products details
 * @description User and admin can get all the prducts
 * @returns Products Object
 *********************************************************/
export const getAllProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({})

    if (!products) {
        throw new CustomError("No product was found", 404)
    }
    res.status(200).json({
        success: true,
        products
    })
})