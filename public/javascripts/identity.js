let myIdentity = undefined;

loadIdentity();
async function loadIdentity(){
    console.log("made it here");
    let identityInfo
    try{
        console.log("here");
        let response = await fetch(`/api/a/getIdentity`);
        identityInfo = await response.json();
        console.log(response);
    }catch(error){
        identityInfo =  {
            status: "error",
            error: "There was an error: " + error
        };
    }
    console.log(identityInfo);
    let identity_div = document.getElementById("identity_div");
    if(identityInfo.status == "error"){
        console.log("1");
        myIdentity = undefined;
        identity_div.innerHTML = `<div>
        <button onclick="loadIdentity()">retry</button>
        Error loading identity: <span id="identity_error_span"></span>
        </div>`;
    } else if(identityInfo.status == "loggedin"){
        console.log("2");
        myIdentity = identityInfo.userInfo.username;
        identity_div.innerHTML = `
        <a href="/userInfo.html?user=${encodeURIComponent(identityInfo.userInfo.username)}">${identityInfo.userInfo.name} (${identityInfo.userInfo.username})</a>
        <a href="signout" class="btn btn-danger" role="button">Log out</a>`;
    } else { //loggedout
        console.log("3");
        myIdentity = undefined;
        identity_div.innerHTML = `
        <a href="signin" class="btn btn-primary" role="button">Log in</a>`;
    }
}
