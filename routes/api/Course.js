import express from "express";
var router = express.Router();

// TODO: Retrieve a course with an ID
router.get("/:courseId", (req, res) => {
    const id = req.params.courseId;
    let course = await req.db.User.findById(id)
    res.json(course)
});

// TODO: Delete a course with an ID
router.delete("/:courseId", (req, res) => {
    const id = req.params.courseId;
    await req.db.Course.deleteOne({_id: id})
    res.json({status: "success"})
    // res.send("Delete course: " + id);
});

// TODO: Create a course
router.post("/", (req, res) => {
    const course = req.body;
    let courseId = course.courseId
    let title = course.title
    let content = course.content

    let newCourse = new req.db.Course({
        courseId: courseId,
        title: title,
        content: content
      })

      await newCourse.save()
  res.json({status: "success"})
});

export default router;