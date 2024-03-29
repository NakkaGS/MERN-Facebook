const Post = require("../models/Post");

exports.createPost = async (req, res) => {
    try {
        //console.log(req.body)
        const post = await new Post(req.body).save();
        res.json(post)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        //console.log(req.body)
        const posts = await Post.find();
        res.json(posts)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};
