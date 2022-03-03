import express from "express";
import Hashes from "jshashes";
import Post, {Account} from "../../db.js";
var router = express.Router();

// default user action endpoint
router.get("/", function (req, res) {
    res.send("User Action");
});

//Creates account data by hashing their email, creating a unique anonymous identifier for them
router.post("/initializeUser", async (req, res) => {
    if(req.session.isAuthenticated && req.session.account.username.includes("@uw.edu")) {
        try {
            var SHA256 = new Hashes.SHA256;
            let accHash = SHA256.hex(req.session.account.username);
            let acct = await Account.findOne({emailHash: accHash});
            //replace role with prompt for user
            let role = "student";
            //And if account is not on banned list
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
        //redirect to /
    }
}) 

router.get("/account", async (req, res) => {
        let currAccount = req.session.account.username;
        let reqAccount = req.query.account;
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
})
export default router;