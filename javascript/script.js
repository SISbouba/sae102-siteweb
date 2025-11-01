// Toggle navigation menu visibility
function toggleNavMenu() {
    const navMenu = document.querySelector('.sous-menu-desktop');
    navMenu.classList.toggle('active');
}

// Toggle dark/light theme
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');

    // Optionally, save user preference
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Apply saved theme preference on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// === Bouton "Retour en haut" ===
window.addEventListener('scroll', () => {
    const topButton = document.getElementById('topButton');
    if (window.scrollY > 300) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
});

// Scroll fluide déjà géré via CSS (scroll-behavior: smooth)

