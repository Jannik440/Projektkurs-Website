const correctPassword = "admin123";
let admin = false;

function togglePopup() {
	const modal = document.getElementById("modal");
	const overlay = document.getElementById("overlay");
	modal.style.display = modal.style.display === "none" || modal.style.display === "" ? "block" : "none";
	overlay.style.display = overlay.style.display === "none" || overlay.style.display === "" ? "block" : "none";
}

function checkPassword() {
	const input = document.getElementById("admin-password");
	if (input.value === correctPassword) {
		const modal = document.getElementById("modal");
		modal.style.transition = "300ms ease";
		modal.style.borderColor = "lime";
		
		sleep(300).then(() => {
			modal.style.borderColor = "#5cabab";
			
			sleep(300).then(() => {
				document.querySelectorAll('.admin-needed-to-show').forEach(el => {
					el.classList.remove('hidden');
				});
        
				document.querySelectorAll('.admin-needed-to-hide').forEach(el => {
					el.classList.add('hidden');
				});
				
				togglePopup();
				admin = true;
				setCookie("admin", admin, 7); // Admin-Cookie setzen
			});
		});
		
	} else	{
		const modal = document.getElementById("modal");
		modal.style.transition = "500ms ease";
		modal.style.borderColor = "red";
	}
	
	input.value = '';
	sleep(500).then(() => {
		const modal = document.getElementById("modal");
		modal.style.transition = "500ms ease";
		modal.style.borderColor = "#5cabab";
	});
}

function toggleAdminOff() {
	document.querySelectorAll('.admin-needed-to-show').forEach(el => {
		el.classList.add('hidden');
	});

	document.querySelectorAll('.admin-needed-to-hide').forEach(el => {
		el.classList.remove('hidden');
	});
	
	togglePopup(); 
	admin = false;
	setCookie("admin", admin, 7); // Admin-Cookie entfernen
}

// Cookie setzen
function setCookie(name, value, days) {
	const date = new Date();
	date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Ablaufdatum
	const expires = "expires=" + date.toUTCString();
	document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Cookie auslesen
function getCookie(name) {
	const cookies = document.cookie.split("; ");
	for (let cookie of cookies) {
		const [key, value] = cookie.split("=");
		if (key === name) {
			return value;
		}
	}
	return null;
}

function checkCookies() {
	// Überprüfen, ob das Admin-Cookie existiert und true ist
	const adminCookie = getCookie("admin");
	admin = adminCookie === "true"; // String "true" in Boolean umwandeln

	if (admin) {
		document.querySelectorAll('.admin-needed-to-show').forEach(el => {
			el.classList.remove('hidden');
		});
        
		document.querySelectorAll('.admin-needed-to-hide').forEach(el => {
			el.classList.add('hidden');
		});
	} else {
		toggleAdminOff();
	}
}

// Event Listener für Enter-Taste
document.getElementById("admin-password").addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		checkPassword();
		event.preventDefault(); 
	}
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.onload = function() {
	checkCookies();
};