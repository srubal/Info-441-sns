import express from "express";
import actionsRouter from './UserActions.js';
import courseRouter from './Course.js';
import postRouter from './Post.js';
import {Post} from "../../db.js";

var router = express.Router();

// use subrouters for post, user actions, course
router.use('/a', actionsRouter);
router.use('/c', courseRouter);
router.use('/p', postRouter);

// retrieves recent posts for display on the home screen
// also handles endpoint for search
router.get("/all", async (req, res) => {
    let cursor = Post.find().cursor();
    let top10Num = [];
    for(let post = await cursor.next(); post != null; post = await cursor.next()) {
        let date = post.created_date;
        if(top10Num.length != 0 && date >= top10Num[0].created_date) {
            top10Num.unshift(post);
        }else if(top10Num.length == 0) {
            top10Num[0] = post;
        }
        if(top10Num.length > 10) {
            top10Num.pop();
        }
    }
    res.type("JSON");
    res.send({Posts: top10Num});
});

export default router;