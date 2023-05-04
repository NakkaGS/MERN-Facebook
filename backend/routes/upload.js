const express = require("express");

//Controller
const { uploadImages } = require("../controllers/upload");

//Middlewares
const imageUpload = require("../middlewares/imageUpload");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/uploadImages", authUser, imageUpload, uploadImages);

module.exports = router;


