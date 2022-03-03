import express from "express";
var router = express.Router();

// default course endpoint
router.get("/", function (req, res) {
    res.send("Course");
});

export default router;