import express from "express";
import { Course, Post } from "../../db.js"
var router = express.Router();

// Retrieve all courses
router.get("/all", async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.send({status: "error", message: err.message});
    }
});

router.get('/getPosts', async (req, res) => {
    let course = req.query.course;
    try {
        let posts = await Post.find({courseID: course});
        res.type("JSON");
        res.send({posts: posts});
    }catch (err) {
        res.send({error: err});
    }
})

// Retrieve a course with an ID
router.get("/:courseId", async (req, res) => {
    const id = req.params.courseId;
    try {
        let course = await Course.findById(id)
        res.send(course)
    } catch (error) {
        res.send({ error: error.message })
    }
});

// Delete a course with an ID
router.delete("/:courseId", async (req, res) => {
    const id = req.params.courseId;
    try {
        await Course.deleteOne({_id: id})
        res.send({status: "success"})
    } catch (error) {
        res.send({status: "error"})
    }
});

// Create a course
router.post("/", async (req, res) => {
    const course = req.body.course;

    try {
        let courseEntered = await Course.find({name: course});
        // prevents duplicate courses
        if (courseEntered.length == 0) {
            let newCourse = new Course({name: course});
            await newCourse.save()

            courseEntered = newCourse;
        }
        res.send({status: "success", course: courseEntered})
    } catch (error) {
        res.send({status: "error"})
    }
});



export default router;