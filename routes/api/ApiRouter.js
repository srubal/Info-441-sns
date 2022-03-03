import express from "express";
import actionsRouter from './UserActions.js';
import courseRouter from './Course.js';
import postRouter from './Post.js';

var router = express.Router();

// use subrouters for post, user actions, course
router.use('/a', actionsRouter);
router.use('/c', courseRouter);
router.use('/p', postRouter);

// default index endpoint
router.get("/", function (req, res) {
    res.send("Index");
});

export default router;