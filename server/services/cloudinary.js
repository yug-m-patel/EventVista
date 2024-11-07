const { v2 } = require('cloudinary');
const fs = require('fs');

v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadFile = async (localFilePath) => {
    try {
        if(!localFilePath){
            return null;
        }

        // upload file on cloudinary
        const res = await v2.uploader.upload(localFilePath, {
            resource_type: 'auto'   //auto means itself detact which file is coming
        })
        console.log(res, "response");



        // file has uploaded successfully
        // console.log("File uploaded on cloudinary", res.url);
        fs.unlinkSync(localFilePath)      //as soon as file upload on cloudinary then it should get remove from here public folder
        return res.secure_url;
    } catch (error) {

        // if file server par aavi gayi, but upload nai thy then aapne remove karva mate we have used below unlink line
        fs.unlinkSync(localFilePath)        //remove the locally saved temporary file as upload got failed
        return null;
    }
}

// export { uploadFile }
module.exports = { uploadFile }