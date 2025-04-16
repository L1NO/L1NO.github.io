// Theme switch toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});
// Smooth scrolling for navigation links
// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').split('.html')[0];
    const targetElement = document.querySelector(`#${targetId}`);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
    });
});

// Close menu when clicking a link (optional)
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
    navLinks.classList.remove('show');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme);
    themeToggle.textContent = savedTheme === 'dark-mode' ? '☀️' : '🌙';
}

// Save theme preference on toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : '';
    localStorage.setItem('theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark-mode' ? '☀️' : '🌙';
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
});