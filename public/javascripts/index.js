function submitInfo() {
    let val = document.getElementById("info").innerHTML;
    fetch("/userInfo", {method: "POST", body: JSON.stringify(val), headers: {'Content-Type': 'application/json'}});
}