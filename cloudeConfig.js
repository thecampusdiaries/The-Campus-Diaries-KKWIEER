const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    timeout: 600000
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'kkw_tcd_images',
        allowedFormats: ['png', 'jpg', 'jpeg'],
    },
})

const storage_profile = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'kkw_profile_pictures',
        allowedFormats: ['png', 'jpg', 'jpeg']
    }
})

module.exports = {
    cloudinary,
    storage,
    storage_profile
}
