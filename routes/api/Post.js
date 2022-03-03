import express from "express";
import Hashes from "jshashes";
import Post, {Account} from "../../db.js";
var router = express.Router();

// default post endpoint
router.get("/", function (req, res) {
    res.send("Post");
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
})

export default router;