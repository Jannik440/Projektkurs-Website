const correctPassword = "admin123";

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
		localStorage.setItem("isLoggedIn", "false");
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
	localStorage.setItem("isLoggedIn", "false");
}


// Event Listener für Enter-Taste
document.getElementById("admin-password").addEventListener("keypress", function(event) {
	if (event.key === "Enter") {
		checkPassword();
		event.preventDefault(); 
	}
});


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

function clearForm() {
	// Setzt die Formularfelder zurück
	document.getElementById('version').value = '';
	document.getElementById('description').value = '';
	}

function submitPatchnote() {
	// Holt die Daten aus dem Formular
	const version = document.getElementById('version').value;
	const description = document.getElementById('description').value;
	if (version && description) {
		//Erstellen des Mailto-Links
		const email = 'msmprojektkursinfo@gmail.com';
		const subject = `Neue Patchnote Versionanfrage (${version})`;
		const body = `Version: ${version}\n\nBeschreibung:\n${description}`;
		const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		// Öffnet den Standard-Mailclient mit den Patchnote-Details
		window.location.href = mailtoLink;
	} else {
		alert('Bitte fülle alle Felder aus, bevor du die Patchnote absendest. Jannik braucht alle Infos um deinen Commit einzutragen.');
	}
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('load', async function() {
    const loadingScreen = document.getElementById("preloaded");
    const content = document.getElementById("postloaded");

    // Optional: Wait for a short period to simulate loading
    await sleep(1000); // Adjust this value as needed

    // Hide the loader and show the content
    loadingScreen.style.display = "none"; // Hide loader
    content.style.display = "block"; // Show content
});

function loadingScreen() {
	const loadingScreen = document.getElementById("preloaded");
	const content = document.getElementById("postloaded");
	
	await sleep(1000);
	
	loadingScreen.style.display = "none";
	content.style.display = "block";
	
}
