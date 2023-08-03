const express = require("express");

//Controller
const { createPost, getAllPosts } = require("../controllers/post");

//Middlewares
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createPost", authUser, createPost);
router.get("/getAllPosts", getAllPosts);

module.exports = router;
