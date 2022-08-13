
const cloudinary = require("cloudinary").v2;

console.log(cloudinary.config().cloud_name);

const uploadVideoToCloudinary = async (req,res,next)=>{
        videoURL = req.body.imgURL;
        console.log("videoURL: "+videoURL);
        newURL = "uploadedImages/"+videoURL;
        console.log("newURL: "+newURL);
        cloudinary.uploader.upload(newURL,{
        resource_type: "video",
            // raw
        })
        .then((result)=>{
            console.log("success",JSON.stringify(result,null,2));
            // res = JSON.stringify(result,null,2);
            console.log(result.url);
            req.body.imgURL = result.url;
            next();
        })
        .catch((error)=>{
            console.log("error",JSON.stringify(error,null,2));
            res = JSON.stringify(error,null,2);
        })

    // try{

        
    //         req.body.imgURL = URL;
    //         // res.send({"ookk":"true"}); 
    //         next();
    // }catch{
    //     res.status(400).send(error.message);
    // }


}


module.exports = {
    uploadVideoToCloudinary
}
