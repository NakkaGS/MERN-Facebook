const express = require("express");

//Controller
const {
    createPost,
} = require("../controllers/post");

//Middlewares
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);

module.exports = router;
