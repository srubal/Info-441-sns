import express from "express";
import actionsRouter from './UserActions.js';
import courseRouter from './Course.js';
import postRouter from './Post.js';

var router = express.Router();

// use subrouters for post, user actions, course
router.use('/a', actionsRouter);
router.use('/c', courseRouter);
router.use('/p', postRouter);

// TODO: Redirect to /all
// default index endpoint
router.get("/", function (req, res) {
    res.send("Index");
});

// TODO: Add search functionality
// retrieves recent posts for display on the home screen
// also handles endpoint for search
router.get("/all", (req, res) => {
    const query = req.query.search;
    res.send("Query: " + query);
});

export default router;