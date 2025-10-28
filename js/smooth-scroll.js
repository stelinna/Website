// ===== SMOOTH SCROLLING WITH FIXED HEADER OFFSET =====
export function initSmoothScroll() {
    const header = document.getElementById('header');
    const headerNav = document.querySelector('.header-nav');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-links a');
    let isHeaderHidden = false;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Only prevent default for same-page anchor links
            if (targetId !== '#' && targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                if (targetElement && header) {
                    // Calculate the fixed header height
                    const headerHeight = header.offsetHeight;
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight - 20, // Extra 20px padding
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (headerNav && headerNav.classList.contains('active')) {
                        headerNav.classList.remove('active');
                        // Change icon back to hamburger
                        const icon = hamburger.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                    
                    // Make sure header is visible when clicking navigation links
                    if (header) {
                        header.style.transform = 'translateY(0)';
                        isHeaderHidden = false;
                    }
                }
            }
        });
    });

    // Reset header when clicking menu items
    if (navLinks.length > 0 && header) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                header.style.transform = 'translateY(0)';
                isHeaderHidden = false;
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initSmoothScroll);