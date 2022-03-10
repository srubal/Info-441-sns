import e from "express";
import express from "express";
import Hashes from "jshashes";
import {Post, Account} from "../../db.js";
import mongoose from "mongoose";
var router = express.Router();


// Get a user with an ID, or perform an action
router.get("/:accountId", async (req, res) => {
    if(req.session.isAuthenticated) {
        let currAccount = req.session.account.username;
        let reqAccount = req.params.accountId;
        var SHA256 = new Hashes.SHA256;
        let currAccHash = SHA256.hex(currAccount);
        let acct = await Account.findOne({emailHash: currAccHash});
        let reqAcct = await Account.findOne({_id: mongoose.Types.ObjectId(reqAccount)});
        if(reqAcct.emailHash == currAccHash || acct.permission == "admin") {
            let posts = await Post.find({uid:reqAccount})
            console.log(reqAcct._id + " " + reqAcct.role);
            let retObj = {
                        uid: reqAcct._id,
                        permission: reqAcct.permission,
                        role: reqAcct.role,
                        posts: posts
            }
            let allPosts = posts.map((post) => {
                return `
                <div class="default-post">
                    <h3 class="post-title">
                        ${post.title} <span class="post-course-code">${post.courseID.toUpperCase().replace(" ", "")}</span>
                    </h3>
                    <p class="post-content">${post.content}</p>
                    <em class="post-details">Posted by User${post.uid} at ${post.created_date}</em>
                    <hr />
                </div>
            `
            })
            res.type("HTML");            
            res.send("<HTML><p><b>User ID: </b>" + retObj.uid + "</p><b>Role: </b>" + retObj.role + "<p></p>" + allPosts + "<HTML/>");
        }else {
            res.send({status:"error", error:"permission denied"});
        }
    }
});

export default router;