// Mobile Menu Functionality
export function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const headerNav = document.getElementById('header-nav');
    const navLinks = document.querySelector('.nav-links');
    const dropdown = document.querySelector('.dropdown');
    const portfolioLink = document.querySelector('.dropdown > a, .dropdown > .dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Handle portfolio link clicks - PREVENT navigation on article pages (desktop)
    if (portfolioLink) {
        portfolioLink.addEventListener('click', function(e) {
            // On mobile: toggle dropdown
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                if (dropdownContent) {
                    // Toggle display for mobile
                    if (dropdownContent.style.display === 'block') {
                        dropdownContent.style.display = 'none';
                    } else {
                        dropdownContent.style.display = 'block';
                    }
                }
            } 
            // On desktop: check if we're on an article page
            else {
                // Check if we're NOT on index.html (i.e., on an article page)
                const isIndexPage = window.location.pathname.endsWith('index.html') || 
                                   window.location.pathname.endsWith('/') ||
                                   window.location.pathname === '/';
                
                // If NOT on index page (article page), prevent navigation
                // The CSS :hover will handle showing the dropdown
                if (!isIndexPage) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                // If on index.html, allow normal click behavior (scroll to #portfolio)
            }
        });
    }

    // ===== MOBILE MENU TOGGLE =====
    if (hamburger && (navLinks || headerNav)) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            const menuToToggle = navLinks || headerNav;
            menuToToggle.classList.toggle('active');
            
            // Change hamburger icon
            const icon = hamburger.querySelector('i');
            if (menuToToggle.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // Close dropdown when closing menu
                if (dropdownContent) {
                    dropdownContent.style.display = 'none';
                }
            }
        });
    }

    // Close mobile menu when clicking on a link
    const allNavLinks = document.querySelectorAll('.nav-links a:not(.dropbtn), .dropdown-content a');
    if (allNavLinks.length > 0) {
        allNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                const menuToClose = navLinks || headerNav;
                if (menuToClose && menuToClose.classList.contains('active')) {
                    menuToClose.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Close dropdown when selecting a link
                    if (dropdownContent) {
                        dropdownContent.style.display = 'none';
                    }
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const menuToClose = navLinks || headerNav;
        if (menuToClose && menuToClose.classList.contains('active') && 
            !menuToClose.contains(e.target) && 
            hamburger && !hamburger.contains(e.target)) {
            menuToClose.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Close dropdown when clicking outside
            if (dropdownContent) {
                dropdownContent.style.display = 'none';
            }
        }
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMobileMenu);