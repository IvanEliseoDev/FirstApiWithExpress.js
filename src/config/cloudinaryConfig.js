import { v2 } from "cloudinary";
import { config } from "../../config.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

v2.config({
    cloud_name: config.cloudinary.user,
    api_key: config.cloudinary.api,
    api_secret: config.cloudinary.secret
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "PolloPollon",
        allowewd_formats: ["jpg", "png", "jpeg", "pdf"]
    }
})

export  const upload = multer({storage})