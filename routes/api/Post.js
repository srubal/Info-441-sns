import express from "express";
import Hashes from "jshashes";
import Post, {Account} from "../../db.js";
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

router.post("/newPost", async (req, res) => {
    //***code for associating post with user account***
    var SHA256 = new Hashes.SHA256;
    let user = req.session.account.username;
    let accountHash = SHA256.hex(user);
    let acct = await Account.findOne({emailHash: accountHash});
    let uid = acct._id;
    let today = new Date();
    let date = today.getDay() + (today.getMonth() + 1) + today.getFullYear();
    let post = new Post({
                        courseID: req.body.courseID,
                        title: req.body.title,
                        content: req.body.content,
                        likes: [],
                        dislikes: [],
                        date: date
    })
    await post.save();
    res.send({status: "success"});
})

export default router;