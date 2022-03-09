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
            let posts = await Post.find({uid: reqAccount._id})
            console.log(reqAcct._id + " " + reqAcct.role);
            let retObj = {
                        uid: reqAcct._id,
                        permission: reqAcct.permission,
                        role: reqAcct.role,
                        posts: posts
            }
            res.type("JSON");
            res.send(retObj);
        }else {
            res.send({status:"error", error:"permission denied"});
        }
    }
});

export default router;