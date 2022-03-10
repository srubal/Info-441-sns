// function call when page is initialized
async function init() {
    await getRecentPosts();
    await getAllCourses();
}

function postSubmit() {
    createPost();
}

// Allows user to switch between pages on the navbar (Home & All Courses)
function showPage(newPage, oldPage, otherTabId, thisTabId) {
    let show = document.getElementById(newPage);
    let hide = document.getElementById(oldPage);
    let unselectedTab = document.getElementById(otherTabId);
    let selectedTab = document.getElementById(thisTabId);

    if (!hide.classList.contains("hidden")) {
        hide.classList.add("hidden");
        show.classList.remove("hidden");
        selectedTab.classList.add("selected");
        unselectedTab.classList.remove("selected");
    }
}