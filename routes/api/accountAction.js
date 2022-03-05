import e from "express";
import express from "express";
import Hashes from "jshashes";
import Post, {Account} from "../../db.js";
import mongoose from "mongoose";
var router = express.Router();

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
                let reqAcct = await Account.findOne({_id: mongoose.Types.ObjectId(reqAccount)});
                actions[action];
                let actions = {
                    BAN: () => {reqAcct.permission = "BANNED";},
                    PROMOTE: () => {reqAcct.permission = "admin";},
                    DEMOTE: () => {reqAcct.permission = "user";}
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

export default router;