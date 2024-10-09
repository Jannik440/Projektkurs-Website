const correctPassword = "admin123";

function togglePopup() {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("overlay");
    modal.style.display = modal.style.display === "none" || modal.style.display === "" ? "block" : "none";
    overlay.style.display = overlay.style.display === "none" || overlay.style.display === "" ? "block" : "none";
}

function checkPassword() {
    const input = document.getElementById("admin-password").value;
    if (input === correctPassword) {
        document.querySelectorAll('.admin-needed-to-show').forEach(el => {
            el.classList.remove('hidden');
        });
        
        document.querySelectorAll('.admin-needed-to-hide').forEach(el => {
            el.classList.add('hidden');
        });

        togglePopup();
    } else {
        alert("Falsches Passwort!"); 
    }
}

function toggleAdminOff() {
    document.querySelectorAll('.admin-needed-to-show').forEach(el => {
        el.classList.add('hidden');
    });

    document.querySelectorAll('.admin-needed-to-hide').forEach(el => {
        el.classList.remove('hidden');
    });
    
    alert("Admin-Modus wurde deaktiviert.");
	 togglePopup(); 
}

function checkElementClasses(element) {
    const classes = element.classList; 
    return classes.contains('admin-needed-to-show') || classes.contains('admin-needed-to-hide');
}

// Event Listener für Enter-Taste
document.getElementById("admin-password").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        checkPassword();
    }
});