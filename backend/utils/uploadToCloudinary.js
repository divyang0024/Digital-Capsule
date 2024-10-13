import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:  process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async function(localFilePath){
    try{
        if(!localFilePath){
            return null
        }
        else{
            const response = await cloudinary.uploader.upload(
                'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
                    resource_type:"auto",
                })
                console.log("File uploaded successfully", response.url)
                return response;
        }
    }
    catch(error){
        fs.unlink(localFilePath) //delete file from localserver if not uploaded on cloudinary
        console.log(error);
        return null;
    }
}