import express from "express";
import Hashes from "jshashes";
import Post, {Account} from "../../db.js";
var router = express.Router();

// Retrieve a post with an ID
router.get("/:postId", async (req, res) => {
    // get id from url
    const postId = req.params.postId;
    const post = await Post.findOne({_id: postId});
    res.type('json');
    res.send(post);
});

// Like a post
router.post("/:postId", async (req, res) => {
    const id = req.params.postId;
    const like = req.query.like;
    const post = await Post.findOne({_id: id});
    if (like) {
        // todo: add like to post
        post.likes++;
        await post.save();
        res.send({
            status: "success",
        });
    }
    else {
        // todo: dislike post
        post.dislikes++;
        await post.save();
        res.send({
                status: "success",
        });
    }
});

// Deletes a post
router.delete("/:postId", async (req, res) => {
    const id = req.params.postId;
    const post = await Post.findOne({_id: id});
    await post.remove();
});

// Creates a new Post
// Need to interface with front-end to define how body looks like
router.post("/", async (req, res) => {
    if(req.session.isAuthenticated) {
        //***code for associating post with user account***
        var SHA256 = new Hashes.SHA256;
        let user = req.session.account.username;
        let accountHash = SHA256.hex(user);
        let acct = await Account.findOne({emailHash: accountHash});
        if(acct && acct.permission != "BANNED") {
            let uid = acct._id;
            let today = new Date();
            let date = today.getDay() + (today.getMonth() + 1) + today.getFullYear();
            const escapeHTML = str => str.replace(/[&<>'"]/g, 
                                        tag => ({
                                            '&': '&amp;',
                                            '<': '&lt;',
                                            '>': '&gt;',
                                            "'": '&#39;',
                                            '"': '&quot;'
                                            }[tag]));
            let postContent = escapeHTML(req.body.content);
            let postTitle = escapeHTML(req.body.title);
            let post = new Post({
                                courseID: req.body.courseID,
                                title: postTitle,
                                content: postContent,
                                likes: [],
                                dislikes: [],
                                created_date: date,
                                uid: uid
            })
            await post.save();
            res.send({status: "success"});
        }else {
            res.send({status: "error", error: "You have been banned"})
        }
    }
})

export default router;