import express from "express";
var router = express.Router();

// Retrieve a course with an ID
router.get("/:courseId", async (req, res) => {
    const id = req.params.courseId;
    try {
        let course = await req.db.Course.findById(id)
        res.send(course)
    } catch (error) {
        res.send({ error: error.message })
    }
});

// Delete a course with an ID
router.delete("/:courseId", async (req, res) => {
    const id = req.params.courseId;
    try {
        await req.db.Course.deleteOne({_id: id})
        res.send({status: "success"})
    } catch (error) {
        res.send({status: "error"})
    }
});

// Create a course
router.post("/", async (req, res) => {
    const course = req.body;
    let courseId = course.courseId
    let title = course.title
    let content = course.content
    try {
        let newCourse = new req.db.Course({
            courseId: courseId,
            title: title,
            content: content
        })
        await newCourse.save()
        res.send({status: "success"})
    } catch (error) {
        res.send({status: "error"})
    }
});

export default router;