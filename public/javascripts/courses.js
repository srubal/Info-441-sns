// Handles API calls related to courses
const coursesEndpoint = '/api/c/';

// Returns all courses
async function getAllCourses() {
    try {
        const res = await fetch(coursesEndpoint + 'all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const courses = await res.json();
        console.log(JSON.stringify(courses))
        let container = document.getElementById("courses-container");
        const coursesHTML = courses.map(c => {
            return `
                <div id=${c._id} class="default-course" onclick="getPosts('${c._id}')">
                    ${c.name}
                </div>
            `
        }).join("\n");
        container.innerHTML = coursesHTML;

        return courses;
    }
    catch (error) {
        console.log("Error retrieving courses: " + error);
        return undefined;
    }
}

// Returns a course given its ID
async function getCourse(id) {
    try {
        const res = await fetch(coursesEndpoint + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const course = await res.json();
        return course;
    } catch (error) {
        console.log("Error retrieving course: " + error);
        return undefined;
    }
}

// Deletes a course given its ID
async function deleteCourse(id) {
    try {
        const res = await fetch(coursesEndpoint + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log("Error deleting course: " + error);
        return undefined;
    }
}

// Creates a course given a Course object
async function createCourse(course) {
    try {
        const res = await fetch(coursesEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({course: course})
        });
        const newCourse = await res.json();
        return newCourse;
    } catch (error) {
        console.log("Error creating course: " + error);
        return undefined;
    }
}

// Retrieves posts from a given Course
async function getPosts(courseId) {
    try {
        const courseCode = await getCourse(courseId);
        const res = await fetch(coursesEndpoint + '/getPosts?course=' + courseCode.name, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const posts = await res.json();

        let coursePosts = posts.posts.map(post => {
            return `
            <div class="default-post">
                <h3 class="post-title">
                    ${post.title}
                </h3>
                <p class="post-content">${post.content}</p>
                <em class="post-details">Posted by User${post.uid} at ${post.created_date}</em>
                <hr />
            </div>
            `
        }).join("\n");

        document.getElementById("course-posts-container").innerHTML = `
            <h2>All Posts for ${courseCode.name}</h2>
            ${coursePosts}
        `;

        return posts;
    } catch (error) {
        console.log("Error retrieving posts for this course: " + error);
        return undefined;
    }
}

// tests the above functions
async function test() {
    // create a course
    const course = {
        name: "Test Course",
        professor: "Test Professor",
        description: "Test Description",
        uid: "TEST 000"
    };
    const newCourse = await createCourse(course);
    console.log("new course: " + newCourse);

    // get all courses
    const courses = await getAllCourses();
    console.log("all courses: " + courses);

    // get one course
    const gotCourse = await getCourse(newCourse._id);
    console.log("get new course: " + gotCourse);

    // delete a course
    await deleteCourse(newCourse._id);
    console.log("deleted course");
}
// test();