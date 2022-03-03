import express from "express";
import Hashes from "jshashes";
import {Account} from "../../db.js";
var router = express.Router();

//Creates account data by hashing their email, creating a unique anonymous identifier for them
router.post("/", async (req, res) => {
    if(req.session.isAuthenticated && req.session.account.username.includes("@uw.edu")) {
        var SHA256 = new Hashes.SHA256;
        let accHash = SHA256.hex(req.session.account.username);
        let acct = await Account.findOne({emailHash: accHash});
        //replace role with prompt for user
        let role = "student";
        //And if account is not on banned list
        if(!acct) {
            let newAccount = new Account({
                                        permission: "",
                                        posts: [],
                                        role: role,
                                        emailHash: accHash
                                        });
            await newAccount.save();
        }
        res.type('json');
        res.send({status:'success'});
    }else {
        //redirect to /
    }
});

// TODO: Updates a user with an action
router.put("/:accountId", async (req, res) => {
    const action = req.params.action;
});

// TODO: Get a user with an ID, or perform an action
router.get("/:accountId", async (req, res) => {
    let currAccount = req.session.account.username;
    let reqAccount = req.query.account;
});

export default router;