// Handles API calls related to Posts
const endpoint = '/api/p/';

// Retrieves recent posts to display on the home screen
// Returns: An array of Post objects
async function getRecentPosts() {
    try {
        const res = await fetch('/api/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const posts = await res.json();
        let postContainer = document.getElementById("recent-posts");

        let savedPosts = posts.map(post => {
            console.log(post);
            return `
                <div class="default-post">
                    <h3 class="post-title">
                        ${post.title} <span class="post-course-code">${post.courseID}</span>
                    </h3>
                    <p class="post-content">${post.content}</p>
                    <em class="post-details">Posted by User${post.uid} at ${post.created_date}</em>
                    <hr />
                </div>
            `
        }).join("\n");

        postContainer.innerHTML = savedPosts;

        return posts;
    } catch (error) {
        console.log("Error retrieving recent posts: " + error);
        return undefined;
    }
}

// Searches for a posts given a query
// Returns: An array of Post objects
async function searchPosts(query) {
    try {
        const res = await fetch('/api/all?search=' + query, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const posts = await res.json();
        return posts;
    } catch (error) {
        console.log("Error searching for posts: " + error);
        return undefined;
    }
}

// Retrieves a post given an ID
// Returns: a Post object
async function getPost(id) {
    try {
        const res = await fetch(endpoint + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const post = await res.json();
        return post;
    } catch (error) {
        console.log("Error retrieving post: " + error);
        return undefined;
    }
}

// Likes a post given an ID
async function likePost(id) {
    try {
        const res = await fetch(endpoint + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                like: true
            })
        });
    } catch (error) {
        console.log("Error liking post: " + error);
        return undefined;
    }
}

// Deletes a post given an ID
async function deletePost(id) {
    try {
        const res = await fetch(endpoint + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.log("Error deleting post: " + error);
        return undefined;
    }
}

// Creates a new Post
// The post object should contain the following properties:
// post: {
//     courseId: Number,
//     title: String,
//     content: String,
// }
async function createPost() {
    try {
        let courseID = document.getElementById("create-course").value;
        let postTitle = document.getElementById("create-title").value;
        let postContent = document.getElementById("create-post").value;
        const postData = {courseID: courseID.toUpperCase().replace(" ", ""), title: postTitle, content: postContent};
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        let response = await res.json();

        console.log(response);

        if (response.status == "success") {
            document.getElementById("create-course").value = "";
            document.getElementById("create-title").value = "";
            document.getElementById("create-post").value = "";

            await getRecentPosts();
        } else {
            alert(response.error);
        }
    } catch (error) {
        alert(error);
        console.log("Error creating post: " + error);
        return undefined;
    }
}