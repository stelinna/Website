// category-filter.js
export function initCategoryFilter() {
    // Initialize category badge filters only
    initCategoryBadges();
}

// Function to handle category badge filtering
function initCategoryBadges() {
    const categoryBadges = document.querySelectorAll('.article-category');
    
    // Make each category badge clickable
    categoryBadges.forEach(badge => {
        badge.style.cursor = 'pointer';
        badge.style.transition = 'transform 0.2s ease, background-color 0.2s ease';
        
        // Add hover effect
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.backgroundColor = 'rgba(165, 42, 42, 0.9)'; // Darker brown on hover
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = 'rgba(146, 142, 142, 0.7)'; // Back to original
        });
        
        // Add click event
        badge.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the parent link from being clicked
            e.stopPropagation(); // Stop event bubbling
            
            const category = this.textContent.toLowerCase();
            filterPortfolioItems(category);
            updateActiveFilterButton(category);
            
            // Scroll to portfolio section
            document.getElementById('portfolio').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

// Function to filter portfolio items
function filterPortfolioItems(category) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            // Animate items back in
            setTimeout(() => {
                item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Function to update active filter button (works with your existing dropdown)
function updateActiveFilterButton(category) {
    const filterButtons = document.querySelectorAll('.filter-btn, .dropdown-content a[data-filter]');
    
    filterButtons.forEach(button => {
        button.classList.remove('active');
        
        const buttonFilter = button.getAttribute('data-filter');
        if (buttonFilter === category) {
            button.classList.add('active');
        }
    });
}

// Optional: Export function to show all items
export function showAllItems() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.style.display = 'block';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    });
}