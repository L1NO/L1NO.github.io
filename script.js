const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active'); // Toggles the 'active' class for the menu
    hamburger.classList.toggle('open'); // Toggles the 'open' class for the hamburger
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('open');
		navMenu.classList.toggle('active');
	});
});