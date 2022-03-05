import e from "express";
import express from "express";
import Hashes from "jshashes";
import Post, {Account} from "../../db.js";
var router = express.Router();

//Creates account data by hashing their email, creating a unique anonymous identifier for them
router.post("/", async (req, res) => {
    if(req.session.isAuthenticated && req.session.account.username.includes("@uw.edu")) {
        try {
            var SHA256 = new Hashes.SHA256;
            let accHash = SHA256.hex(req.session.account.username);
            let acct = await Account.findOne({emailHash: accHash});
            //replace role with prompt for user
            let role = "student";
            if(!acct) {
                let newAccount = new Account({
                                            permission: "",
                                            role: role,
                                            emailHash: accHash
                                            });
                await newAccount.save();
            }
            res.type('json');
            res.send({status:'success'});
        }catch (err) {

        }
    }else {
        res.redirect('/');
    }
});

// TODO: Updates a user with an action
// options: BAN, PROMOTE, DEMOTE
router.put("/:accountId", async (req, res) => {
    const action = req.query.action;
    if(action == "BAN" || action == "PROMOTE" || action == "DEMOTE" && req.session.isAuthenticated) {
        let currAccount = req.session.account.username;
        let reqAccount = req.params.accountId;
        var SHA256 = new Hashes.SHA256;
        let currAccHash = SHA256.hex(currAccount);
        let acct = await Account.findOne({emailHash: currAccHash});
        if(acct.permission == "admin") {
            try {
                let reqAcct = await Account.findOne({_id: reqAccount});
                actions[action];
                let actions = {
                    BAN: () => {reqAcct.permission = "BANNED";},
                    PROMOTE: () => {reqAcct.permission = "admin";},
                    DEMOTE: () => {reqAcct.permission = "";}
                    }
                await reqAccount.save();
            }catch (err) {
                    res.send({status: "error", error: err});
            }
        }else {
            res.send("You do not have permission to do this")
        }
    }else {
        res.send({staus: "error", error: "invalid action"})
    }
});

// TODO: Get a user with an ID, or perform an action
router.get("/:accountId", async (req, res) => {
    let currAccount = req.session.account.username;
    let reqAccount = req.params.accountId;
    var SHA256 = new Hashes.SHA256;
    let currAccHash = SHA256.hex(currAccount);
    let acct = await Account.findOne({emailHash: currAccHash});
    let reqAcct = await Account.findOne({_id: reqAccount});
    if(reqAcct.emailHash == currAccHash || acct.permission == "admin") {
        let posts = await Post.findAll({uid: reqAccount._id})
        let retObj = {
                      uid: reqAccount._id,
                      permission: reqAcct.permission,
                      role: reqAccount.role,
                      posts: posts
        }
        res.type("JSON");
        res.send(JSON.stringify(retObj));
    }else {
        res.send({status:"error", error:"permission denied"});
    }
});

export default router;