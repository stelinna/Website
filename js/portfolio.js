// ===== PORTFOLIO FILTERING =====
export function initPortfolioFilter() {
    // Support both filter buttons and dropdown links
    const filterButtons = document.querySelectorAll('.filter-btn');
    const dropdownLinks = document.querySelectorAll('.dropdown-content a[data-filter]');
    const portfolioBtn = document.querySelector('.dropbtn'); // Main Portfolio button
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Function to filter portfolio items with smooth transitions
    function filterItems(filterValue) {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        
        // Add filtering class for loading effect (optional)
        if (portfolioGrid) {
            portfolioGrid.classList.add('filtering');
        }
        const itemsToShow = [];
        const itemsToHide = [];
        
        // Categorize items to show/hide
        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || itemCategory === filterValue) {
                itemsToShow.push(item);
            } else {
                itemsToHide.push(item);
            }
        });
        
        // First, fade out items that need to be hidden
        itemsToHide.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9) translateY(20px)';
        });
        
        // After fade-out completes, hide them and show new items
        setTimeout(() => {
            // Hide the faded out items
            itemsToHide.forEach(item => {
                item.style.display = 'none';
            });
            
            // Show items that should be visible (but keep them invisible initially)
            itemsToShow.forEach(item => {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.9) translateY(20px)';
            });
            
            // Small delay before fade-in for smoother transition
            setTimeout(() => {
                itemsToShow.forEach((item, index) => {
                    // Stagger the animation for a cascading effect
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, index * 100); // 100ms delay between each item
                });
                
                // Remove filtering class after animations complete
                setTimeout(() => {
                    if (portfolioGrid) {
                        portfolioGrid.classList.remove('filtering');
                    }
                }, itemsToShow.length * 100 + 200);
                
            }, 100);
            
        }, 350); // Wait for fade-out to complete
    }

    // Function to update active states
    function updateActiveStates(activeElement, isDropdown = false) {
        // Remove active from all filter buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Remove active from all dropdown links
        dropdownLinks.forEach(link => link.classList.remove('active'));
        
        // Add active to the clicked element
        if (activeElement) {
            activeElement.classList.add('active');
        }
    }

    // Handle existing filter buttons (if any)
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                updateActiveStates(button);
                
                // Get filter value and filter items
                const filterValue = button.getAttribute('data-filter');
                filterItems(filterValue);
            });
        });
    }

    // Handle dropdown filter links
    if (dropdownLinks.length > 0 && portfolioItems.length > 0) {
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                updateActiveStates(link, true);
                
                // Get filter value and filter items
                const filterValue = link.getAttribute('data-filter');
                filterItems(filterValue);
                
                // Scroll to portfolio section smoothly
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) {
                    portfolioSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Handle main Portfolio button (show all)
    if (portfolioBtn && portfolioItems.length > 0) {
        portfolioBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            updateActiveStates(null); // Remove active from all
            filterItems('all'); // Show all items
            
            // Scroll to portfolio section
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Initialize - show all items by default
    if (portfolioItems.length > 0) {
        filterItems('all');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPortfolioFilter);