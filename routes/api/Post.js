import express from "express";
var router = express.Router();

// default post endpoint
router.get("/", function (req, res) {
    res.send("Post");
});

export default router;