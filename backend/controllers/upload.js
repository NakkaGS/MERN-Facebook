const cloudinary = require("cloudinary")
const fs = require("fs")

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

exports.uploadImages = async (req, res) => {
  try {
    //res.json("welcome from image upload");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
