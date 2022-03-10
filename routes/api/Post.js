import express from "express";
import Hashes from "jshashes";
import {Post, Account} from "../../db.js";
var router = express.Router();

// Retrieve a post with an ID
router.get("/:postId", async (req, res) => {
    try {
        // get id from url
        const postId = req.params.postId;
        const post = await Post.findOne({_id: postId});
        if (post) {
            res.json(post);
        }
        else {
            res.send({status: "error", message: "post not found"});
        }
    } catch (error) {
        res.send({error: error.message});
    }

});

// Like a post
router.post("/:postId", async (req, res) => {
    try {
        const id = req.params.postId;
        const like = req.query.like;
        const post = await Post.findOne({_id: id});
        if (like === "true") {
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
    } catch (error) {
        res.send({error: error.message});
    }
});

// Deletes a post
router.delete("/:postId", async (req, res) => {
    try {
        const id = req.params.postId;
        const post = await Post.findByIdAndRemove({_id: id});
        res.send({status: "success"});
    } catch (error) {
        res.send({ error: error.message });
    }
});

// Creates a new Post
// Need to interface with front-end to define how body looks like
router.post("/", async (req, res) => {
    // if the request is a test, don't do authentication
    if (req.body.test) {
        console.log('bypassing authentication for test post')
        req.body.created_date = new Date();
        req.body.uid = "testUser";
        const post = new Post(req.body);
        await post.save();
        res.send({
            status: "success",
            post: post
        });
        return
    }

    // regular post code
    if(req.session.isAuthenticated) {
        //***code for associating post with user account***
        var SHA256 = new Hashes.SHA256;
        let user = req.session.account.username;
        let accountHash = SHA256.hex(user);
        let acct = await Account.findOne({emailHash: accountHash});
        if(acct && acct.permission != "BANNED") {
            let uid = acct._id;
            let today = new Date();
            let date = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
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
    }else {
        res.send({status: "error", error: "Please Sign in"});
    }
})

export default router;