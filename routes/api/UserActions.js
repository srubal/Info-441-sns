import e from "express";
import express from "express";
import Hashes from "jshashes";
import getRouter from "./getAccount.js";
import actRouter from "./accountAction.js";
import Post, {Account} from "../../db.js";
var router = express.Router();

router.use('/act', actRouter);
router.use('/get', getRouter);
//Creates account data by hashing their email, creating a unique anonymous identifier for them
router.get("/", async (req, res) => {
    if(req.session.isAuthenticated && req.session.account.username.includes("@uw.edu")) {
        try {
            var SHA256 = new Hashes.SHA256;
            let accHash = SHA256.hex(req.session.account.username);
            let acct = await Account.findOne({emailHash: accHash});
            //replace role with prompt for user
            let role = "student";
            if(!acct) {
                let newAccount = new Account({
                                            permission: "user",
                                            role: role,
                                            emailHash: accHash
                                            });
                await newAccount.save();
            }
            res.redirect('/');
        }catch (err) {

        }
    }else {
        res.redirect('/');
    }
});
router.get('/getIdentity', (req, res) => {
    if(req.session.isAuthenticated) {
        res.type("json");
        res.send({status: "loggedin", userInfo: { name: req.session.account.name, username: req.session.account.username}})
    }else {
        res.type("json");
        res.send(JSON.stringify({status: "loggedout"}))
    }
})

export default router;