function OpenMenuBar() {
    var navBar = document.querySelector("nav")
    if (navBar.className === "navbar") {
      navBar.className += " responsive";
    } else {
      navBar.className = "navbar";
    }

    var menuIcon = document.querySelector(".menu-bars");
    if (menuIcon.className === "menu-bars") {
        menuIcon.className += " responsive";
    } else {
        menuIcon.className = "menu-bars";
    }

    var icons = document.querySelector(".icons");
    if (icons.className === "icons") {
        icons.className += " responsive";
    } else {
        icons.className = "icons";
    }
}

function OpenLoginForm() {
    var loginForm = document.getElementById("login-form");
    loginForm.style.display = "flex"
}

async function Login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // 1. time
    username = await sha256(username);
    password = await sha256(password);
    // 2. time
    username = await sha256(username);
    password = await sha256(password);
    
    if (username === "68597891389543d8004058d4069db8be0548a3851c169f0bc76343982d65b224" && password === "a71dedd0cf8a96fb72476448879a3f0e4f1e45c091537aeba76d2cad54f4356e") {
        LoginLogic()
    }
    else {
        var pCorrect = document.getElementById("is-correct")
        pCorrect.innerText = "Benutzername oder Passwort sind falsch!"
    }
}

function LoginLogic() {
    CloseLoginForm()
    var addPatchnoteSection = document.getElementById("add-new-patchnote");
    addPatchnoteSection.style.display = "block";
}


function CloseLoginForm() {
    var loginForm = document.getElementById("login-form");
    loginForm.style.display = "none";
}

function SendPatchnote() {
    var patchnoteVersion = document.getElementById("patchnote-version").value;
    var patchnoteDescription = document.getElementById("patchnote-description").value;

    window.open(`mailto:msmprojektkursinfo@gmail.com?subject=${ encodeURI(patchnoteVersion) }&body=${ encodeURI(patchnoteDescription) }`);
}

async function sha256(inputString) {
    const encoder = new TextEncoder();
    const data = encoder.encode(inputString);
    
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}


// sha256("Put whatever here").then(hash => sha256(hash).then(hash2 => console.log(hash2)));
