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
		
	} else	 {
		modal.style.transition = "500ms ease";
		modal.style.borderColor = "red";
	}
	
	input.value = '';
	sleep(500).then(() => {
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
}

function checkElementClasses(element) {
	const classes = element.classList; 
	return classes.contains('admin-needed-to-show') || classes.contains('admin-needed-to-hide');
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
            // Erstellen des Mailto-Links
        const email = 'msmprojektkursinfo@gmail.com';  // Hier deine E-Mail-Adresse einfügen
        const subject = `Neue Patchnote Versionanfrage (${version})`;
        const body = `Version: ${version}\n\nBeschreibung:\n${description}`;
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Öffnet den Standard-Mailclient mit den Patchnote-Details
        window.location.href = mailtoLink;
    } else {
          alert('Bitte fülle alle Felder aus, bevor du die Patchnote absendest.');
    }
}



boolean admin = false;

// Cookie setzen
function setCookie(admin) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Ablaufdatum
  const expires = "expires=" + date.toUTCString();
  document.cookie = "admin = " + admin + ";" + expires + ";path=/";
}

// Beispiel:
function checkCookies() {
	if(admin)
	{
			document.querySelectorAll('.admin-needed-to-show').forEach(el => {
					el.classList.remove('hidden');
				});
        
				document.querySelectorAll('.admin-needed-to-hide').forEach(el => {
					el.classList.add('hidden');
				});
		}
		else 
		{
				toggleAdminOff();
			}
}