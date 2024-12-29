const cloudinary = require("cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new multer.memoryStorage();

// const imageUploadUtil = async (file) => {
//     // Upload an image
//     const uploadResult = await cloudinary.uploader
//         .upload(
//             file, {
//             resource_type: "auto"
//         }
//         )
//         .catch((error) => {
//             console.log(error);
//         });

//     return uploadResult;
// }

const uploadImages = async (images) => {
    try {
        // const myImages = images.map(file => file.path);
        let uploadedImages = [];

        for (let image of images) {
            const result = await cloudinary.uploader.upload(image);
            uploadedImages.push({
                url: result.url,
                publicId: result.public_id
            });
        }

        return uploadedImages
    } catch (error) {
        return error;
    }
}

const removeImages = async (req, res) => {
    try {
        const response = await cloudinary.uploader.destroy(req.params.publicId);

        if (response.result === "not found") {
            throw new Error("Delete failed")
        }
        return res.status(200).json({
            success: true,
            message: "Deleted"
        })
    } catch (error) {
        return error
    }
}

const upload = multer({ storage });

module.exports = { upload, uploadImages, removeImages }