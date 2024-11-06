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
		localStorage.setItem("isLoggedIn", "true");
		
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
	localStorage.setItem("isLoggedIn", "false");	
	});

	document.querySelectorAll('.admin-needed-to-hide').forEach(el => {
		el.classList.remove('hidden');
	});
	
	togglePopup(); 
	admin = false;
	setCookie("admin", admin, 7); // Admin-Cookie entfernen
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


function checkLoginStatus() {
	const isLoggedIn = localStorage.getItem("isLoggedIn");

	if (isLoggedIn === "true") {
			// Benutzer ist angemeldet
		document.querySelectorAll('.admin-needed-to-show').forEach(el => {
		el.classList.remove('hidden');
		});
        
			document.querySelectorAll('.admin-needed-to-hide').forEach(el => {
			el.classList.add('hidden');
			});
	} else {
			// Benutzer ist nicht angemeldet
			document.querySelectorAll('.admin-needed-to-show').forEach(el => {
		el.classList.add('hidden');
		});
        
			document.querySelectorAll('.admin-needed-to-hide').forEach(el => {
			el.classList.remove('hidden');
			});
	}
}

window.onload = function() {
	checkLoginStatus();
}