// ===== ENHANCED HIDE/SHOW HEADER ON SCROLL =====
export function initScrollHeader() {
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    let isHeaderHidden = false;

    if (header) {
        const headerHeight = header.offsetHeight;
        
        function handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Small threshold to prevent jittery behavior
            const scrollThreshold = 5;
            
            if (scrollTop > lastScrollTop + scrollThreshold && scrollTop > headerHeight && !isHeaderHidden) {
                // Scroll down - hide header
                header.style.transform = 'translateY(-100%)';
                isHeaderHidden = true;
            } else if (scrollTop < lastScrollTop - scrollThreshold && isHeaderHidden) {
                // Scroll up - show header
                header.style.transform = 'translateY(0)';
                isHeaderHidden = false;
            }
            
            // Sticky effect for background change
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
                // Always show header at the very top of the page
                if (isHeaderHidden) {
                    header.style.transform = 'translateY(0)';
                    isHeaderHidden = false;
                }
            }
            
            lastScrollTop = scrollTop;
        }

        // Use throttled scroll for better performance
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(function() {
                    scrollTimeout = null;
                    handleScroll();
                }, 100); // Adjust throttle time as needed
            }
        }, { passive: true });

        // Show header on mouse move near top (desktop only)
        if (window.innerWidth > 768) {
            let mouseTimeout;
            
            document.addEventListener('mousemove', function(e) {
                if (e.clientY < 100 && isHeaderHidden) {
                    header.style.transform = 'translateY(0)';
                    isHeaderHidden = false;
                    
                    // Auto-hide after 3 seconds
                    clearTimeout(mouseTimeout);
                    mouseTimeout = setTimeout(() => {
                        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                        const headerHeight = header.offsetHeight;
                        if (currentScroll > headerHeight) {
                            header.style.transform = 'translateY(-100%)';
                            isHeaderHidden = true;
                        }
                    }, 3000);
                }
            });
        }

        // Initialize header position on page load
        window.addEventListener('load', function() {
            // Make sure header is visible at the top of the page
            if ((window.pageYOffset || document.documentElement.scrollTop) === 0) {
                header.style.transform = 'translateY(0)';
                isHeaderHidden = false;
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollHeader);