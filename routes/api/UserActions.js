import e from "express";
import express from "express";
import Hashes from "jshashes";
import getRouter from "./getAccount.js";
import actRouter from "./accountAction.js";
import {Post, Account} from "../../db.js";
var router = express.Router();

router.use('/act', actRouter);
router.use('/get', getRouter);
//Creates account data by hashing their email, creating a unique anonymous identifier for them, or gets their uid
router.get("/", async (req, res) => {
    if(req.session.isAuthenticated && req.session.account.username.includes("@uw.edu")) {
        try {
            var SHA256 = new Hashes.SHA256;
            let accHash = SHA256.hex(req.session.account.username);
            let acct = await Account.findOne({emailHash: accHash});
            //replace role with prompt for user
            if(!acct) {
                let newAccount = new Account({
                                            permissions: "user",
                                            role: "student",
                                            emailHash: accHash
                                            });
                await newAccount.save();
            }else {
                req.session.account.anonUid = acct._id;
            }
            res.redirect('/');
        }catch (err) {
            res.send(err);
        }
    }else {
        res.redirect('/');
    }
});

//If this is their first time logging in this gets their uid from the DB if not it just returns it
router.get('/getIdentity', async (req, res) => {
    if(req.session.isAuthenticated && !req.session.account.anonUid) {
        var SHA256 = new Hashes.SHA256;
        let accHash = SHA256.hex(req.session.account.username);
        let acct = await Account.findOne({emailHash: accHash});
        req.session.account.anonUid = acct._id;
        res.type("json");
        res.send({status: "loggedin", userInfo: { name: req.session.account.anonUid}})
    }else if(req.session.isAuthenticated && req.session.account.anonUid){
        res.type("json");
        res.send({status: "loggedin", userInfo: { name: req.session.account.anonUid}})
    }else {
        res.type("json");
        res.send(JSON.stringify({status: "loggedout"}))
    }
})

// router.get('/getMe', async (req, res) => {
//     if(req.session.isAuthenticated) {
//         var SHA256 = new Hashes.SHA256;
//         let accHash = SHA256.hex(req.session.account.username);
//         let acct = await Account.findOne({emailHash: accHash});
//         res.redirect('/api/a/get/' + acct._id);
//     }else {
//         res.send(JSON.stringify({error: "you shouldn't be here"}));
//     }
// })

export default router;