const cloudinary = require("cloudinary");
const multer = require("multer");

cloudinary.config({
    cloud_name: 'dr9uologc',
    api_key: '842885653868541',
    api_secret: 'SQsA_xcN2M-lhSOg5lI8ngtO8xE'
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    // Upload an image
    const uploadResult = await cloudinary.uploader
        .upload(
            file, {
            resource_type: "auto"
        }
        )
        .catch((error) => {
            console.log(error);
        });

    return uploadResult;
}

const upload = multer({storage});

module.exports = {upload, imageUploadUtil}