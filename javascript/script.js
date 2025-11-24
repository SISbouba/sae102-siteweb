// Toggle navigation menu visibility
function toggleNavMenu() {
    const navMenu = document.querySelector('.sous-menu-mobile');
    const overlay = document.getElementById('overlay');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Toggle dark/light theme
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');

    // Optionally, save user preference
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function toggleTraduction() {
    const currentUrl = window.location.href;
    if (currentUrl.includes('/pages/accueil.html')) {
        window.location.href = currentUrl.replace('/pages/accueil.html', '/pages/accueil_english.html');
    } else if (currentUrl.includes('/pages/accueil_english.html')) {
        window.location.href = currentUrl.replace('/pages/accueil_english.html', '/pages/accueil.html');
    }
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

// Empêcher le scroll du body quand le menu est ouvert
const body = document.body;
const observer = new MutationObserver(() => {
    if (sidebar.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
});
observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
