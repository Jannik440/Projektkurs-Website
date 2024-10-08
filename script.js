const openPopupButtons = document.querySelectorAll('[data-popup-target]')
const closePopupButtons = document.querySelectorAll('[data-close-button]')
const inputFromUser = document.getElementById('input-field')
const overlay = document.getElementById('overlay')

openPopupButtons.forEach(button => {
	button.addEventListener('click', () => {
		const popup = document.querySelector(button.dataset.popupTarget)
		openPopup(popup)
	})
})

closePopupButtons.forEach(button => {
	button.addEventListener('click', () => {
		const popup = button.closest('.popup')
		closePopup(popup)
	})
})

function openPopup(popup) {
	if(popup == null) return
	popup.classList.add('active')
	overlay.classList.add('active')
}

function closePopup(popup) {
	if(popup == null) return
	popup.classList.remove('active')
	overlay.classList.remove('active')
}

overlay.addEventListener('click', () => {
	const popup = document.querySelectorAll('.popup.active')
	popup.forEach(popup => {
		closePopup(popup)
	})
})

inputFromUser.addEventListener('keydown', function (event){
	if(event.keyCode === 13) {
		const password = inputFromUser.value 
		if(password === 'admin123') {
			/* wenn passwort richig ist/
		}
	}
})
