function submitInfo() {
    let val = document.getElementById("info").innerHTML;
    fetch("/userInfo", {method: "POST", body: JSON.stringify(val), headers: {'Content-Type': 'application/json'}});
}

function showPage(newPage, oldPage) {
    let show = document.getElementById(newPage);
    let hide = document.getElementById(oldPage);

    if (!hide.classList.contains("hidden")) {
        hide.classList.add("hidden");
        show.classList.remove("hidden");
    }
}