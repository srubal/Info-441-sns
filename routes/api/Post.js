import express from "express";
var router = express.Router();

// TODO: Retrieve a post with an ID
router.get("/:postId", (req, res) => {
    // get id from url
    const id = req.params.postId;
    res.send("Get post: " + id);
});

// TODO: Like a post
router.post("/:postId", (req, res) => {
    const id = req.params.postId;
    const like = req.query.like;
    if (like) {
        // todo: add like to post
    }
});

// TODO: Creates a new Post
router.post("/", (req, res) => {
    const post = req.body;
});

// TODO: Deletes a post
router.delete("/:postId", (req, res) => {
    const id = req.params.postId;
    res.send("Delete post: " + id);
});

export default router;