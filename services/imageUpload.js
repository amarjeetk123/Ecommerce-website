import s3 from "../config/s3.config";

// method for uploading the file into aws storage
export const s3FileUpload = async ({bucketName, key, body}) => { 
    return await s3.upload({
        Bucket: bucketName,
        Key: key,
        Body: body,   // body could be have image or pdf or anyother
        ContentType: ContentType  // this means jpg, mp4, zip, png etc
    })
    .promise()
}
// it will return a url and that url we will store in our database for video or images

// method for deleting the file from aws storage
// AWS will treat all of our file or pdf as an object
export const s3FileDelete= async ({bucketName, key}) => {
    return await s3.deleteObject({
        Bucket: bucketName,
        Key: key
    })
    .promise()
}

