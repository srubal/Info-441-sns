import express from "express";
var router = express.Router();

// default user action endpoint
router.get("/", function (req, res) {
    res.send("User Action");
});

export default router;