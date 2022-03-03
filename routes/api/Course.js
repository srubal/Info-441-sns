import express from "express";
var router = express.Router();

// TODO: Retrieve a course with an ID
router.get("/:courseId", (req, res) => {
    const id = req.params.courseId;
    res.send("Course ID: " + id);
});

// TODO: Delete a course with an ID
router.delete("/:courseId", (req, res) => {
    const id = req.params.courseId;
    res.send("Delete course: " + id);
});

// TODO: Create a course
router.post("/", (req, res) => {
    const course = req.body;
});

export default router;