// Toggle navigation menu visibility
function toggleNavMenu() {
    const navMenu = document.querySelector('.sous-menu');
    const overlay = document.getElementById('overlay');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('sous-menu-open');
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

function scrollToTop() {
    if (window.scrollY > 500) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}   

// Search functionality
function setupSearch(inputId, containerId) {
    const searchInput = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    const items = container.querySelectorAll('.media-item');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let visibleCount = 0;

        items.forEach(item => {
            const name = item.getAttribute('data-name').toLowerCase();
            if (name.includes(searchTerm)) {
                item.classList.remove('hidden');
                visibleCount++;
            } else {
                item.classList.add('hidden');
            }
        });

        // Show/hide no results message
        let noResults = container.querySelector('.no-results');
        if (visibleCount === 0 && searchTerm !== '') {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = 'Aucun résultat trouvé';
                container.appendChild(noResults);
            }
        } else {
            if (noResults) {
                noResults.remove();
            }
        }
    });
}

setupSearch('searchImages', 'imagesContainer');
setupSearch('searchVideos', 'videosContainer');
setupSearch('searchMusic', 'musicContainer');

// Prevent body scroll when menu is open
const observer = new MutationObserver(() => {
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
});
observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });

// Media item click effect
document.querySelectorAll('.media-item').forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 200);
    });
});