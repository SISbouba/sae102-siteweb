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

// Setup event listeners for buttons
window.addEventListener('DOMContentLoaded', () => {
    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }

    const navMenuBtn = document.getElementById('navMenuBtn');
    if (navMenuBtn) {
        navMenuBtn.addEventListener('click', toggleNavMenu);
    }

    const topButtonLink = document.getElementById('topButton');
    if (topButtonLink) {
        topButtonLink.addEventListener('click', scrollToTop);
    }

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

function scrollToTop(event) {
    if (event) event.preventDefault();
    if (window.scrollY > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}   

// Search functionality for images by alt attribute
function setupImageSearch(inputId, containerId) {
    const searchInput = document.getElementById(inputId);
    if (!searchInput) return; // Exit if search input doesn't exist
    
    const container = document.getElementById(containerId);
    if (!container) return; // Exit if container doesn't exist
    
    const imageItems = container.querySelectorAll('[class*="item"] img, .zone-item img, .liste-images img, .liste-images-zone img');
    
    if (imageItems.length === 0) return; // Exit if no images found

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let visibleCount = 0;

        imageItems.forEach(img => {
            const parentItem = img.closest('[class*="item"], li');
            const altText = img.getAttribute('alt') ? img.getAttribute('alt').toLowerCase() : '';
            
            if (altText.includes(searchTerm) || searchTerm === '') {
                if (parentItem) {
                    parentItem.style.display = '';
                } else {
                    img.style.display = '';
                }
                visibleCount++;
            } else {
                if (parentItem) {
                    parentItem.style.display = 'none';
                } else {
                    img.style.display = 'none';
                }
            }
        });

        // Show/hide no results message
        let noResults = container.querySelector('.no-results');
        if (visibleCount === 0 && searchTerm !== '') {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = 'Aucun résultat trouvé';
                noResults.style.cssText = 'text-align: center; padding: 20px; color: var(--color-text);';
                container.appendChild(noResults);
            }
        } else {
            if (noResults) {
                noResults.remove();
            }
        }
    });
}

// Initialize search on all pages
document.addEventListener('DOMContentLoaded', () => {
    setupImageSearch('search-input', 'image-zones-grid');
    setupImageSearch('searchImages', 'imagesContainer');
    setupImageSearch('searchVideos', 'videosContainer');
    setupImageSearch('searchMusic', 'musicContainer');
});

// Prevent body scroll when menu is open
const sidebar = document.querySelector('.sous-menu');
if (sidebar) {
    const observer = new MutationObserver(() => {
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });
    observer.observe(sidebar, { attributes: true, attributeFilter: ['class'] });
}


// Media item click effect
document.querySelectorAll('.media-item').forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 200);
    });
});