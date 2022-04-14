const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Post = require("../models/post");
var ObjectId = require('mongodb').ObjectId;


const { getPost } = require("../middleware/finders");

//getting all posts
router.get("/", auth, async (req, res, next) => {
    try {
        const post = await Post.find({ user_id: { $regex: req.user._id } });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Adds a new post
router.post("/:id", [auth, getPost], async (req, res, next) => {
    let { details, title, img } = req.body;
    let user_id = req.user._id;
    const posts = new Post({
        title,
        img,
        details,
        user_id,
    })
    try {
        posts.posts.push({
            post_id,
            title,
            img,
            details,
        });
        const updatedPost = await posts.save();
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(500).json(console.log(error));
    }
});
//Delete single post
router.delete('/single', auth, async (req, res, next) => {

    try {
        const id = req.body
        const post = await Post.findByIdAndDelete({ _id: ObjectId(id) });
        res.json({ message: "Deleted post" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = router;
