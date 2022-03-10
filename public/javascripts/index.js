// function call when page is initialized
async function init() {
    await getRecentPosts();
}

function postSubmit() {
    createPost();
}

// Allows user to switch between pages on the navbar (Home & All Courses)
function showPage(newPage, oldPage) {
    let show = document.getElementById(newPage);
    let hide = document.getElementById(oldPage);

    if (!hide.classList.contains("hidden")) {
        hide.classList.add("hidden");
        show.classList.remove("hidden");
    }
}