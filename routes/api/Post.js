import express from "express";
import {Post} from "../../db.js";

var router = express.Router();

// Retrieve a post with an ID
router.get("/:postId", (req, res) => {
    // get id from url
    const postId = req.params.postId;
    const post = await Post.findOne({_id: postId});
    res.type('json');
    res.send(post);
});

// Like a post
router.post("/:postId", (req, res) => {
    const id = req.params.postId;
    const like = req.query.like;
    const post = await Post.findOne({_id: id});
    if (like) {
        // todo: add like to post
        post.likes++;
        await post.save();
    }
    else {
        // todo: dislike post
        post.dislikes++;
        await post.save();
    }
});

// TODO: Creates a new Post
// Need to interface with front-end to define how body looks like
router.post("/", (req, res) => {
    const post = req.body;
});

// Deletes a post
router.delete("/:postId", (req, res) => {
    const id = req.params.postId;
    const post = await Post.findOne({_id: id});
    await post.remove();
});

export default router;