
function displayLogin(){
    document.getElementById("login-Form").style.display="inline";
    document.getElementById("signup-Form").style.display="none";
    document.getElementById("login-col").style.borderTop="5px solid #252323";
    document.getElementById("signup-col").style.borderTop="none";
    document.getElementById("signup-col").style.backgroundColor="lightgrey";
    document.getElementById("login-col").style.backgroundColor="white";
}

function displaysignup(){
    document.getElementById("login-Form").style.display="none";
    document.getElementById("signup-Form").style.display="inline";
    document.getElementById("signup-col").style.borderTop="5px solid #252323";
    document.getElementById("login-col").style.borderTop="none";
    document.getElementById("login-col").style.backgroundColor="lightgrey";
    document.getElementById("signup-col").style.backgroundColor="white";
}

document.getElementById("login-link").addEventListener("click",displayLogin);
document.getElementById("signup-link").addEventListener("click",displaysignup);

export  function showProfile(name) {
    var firstName=name.split(/[ -.]+/);
    var nameText=document.getElementsByClassName("userProfile")[0];
    nameText.querySelector("span").innerHTML=firstName[0];
    document.getElementsByClassName("userProfile")[0].style.display='flex';
    document.getElementsByClassName("nav-item")[5].style.display='none';
    $("#login").modal('hide');  
}


export  function showLogin() {
    
    document.getElementsByClassName("userProfile")[0].style.display='none';
    document.getElementsByClassName("nav-item")[5].style.display='inline';
}
