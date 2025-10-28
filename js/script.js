// script.js - Complete JavaScript for Artists Portfolio

// ===== MOBILE MENU FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const headerNav = document.querySelector('.header-nav');
const navLinks = document.querySelectorAll('.nav-links a');

// Mobile Menu Toggle
if (hamburger && headerNav) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event from bubbling up
        headerNav.classList.toggle('active');
        
        // Change hamburger icon to X when menu is open
        const icon = hamburger.querySelector('i');
        if (headerNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking on a link
if (navLinks.length > 0 && headerNav) {
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (headerNav.classList.contains('active')) {
                headerNav.classList.remove('active');
                // Change icon back to hamburger
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (headerNav && headerNav.classList.contains('active') && 
        !headerNav.contains(e.target) && 
        !hamburger.contains(e.target)) {
        headerNav.classList.remove('active');
        // Change icon back to hamburger
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// ===== PORTFOLIO FILTERING =====
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== CONTACT FORM SUCCESS MESSAGE =====
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const closeButton = document.getElementById('closeMessage');
    
    if (contactForm && successMessage && closeButton) {
        // Close message functionality
        closeButton.addEventListener('click', function() {
            successMessage.style.display = 'none';
            contactForm.style.display = 'block';
        });
        
        contactForm.addEventListener('submit', function(e) {
            // Prevent the default form submission
            e.preventDefault();
            
            // Show success message
            successMessage.style.display = 'block';
            
            // Hide the form
            contactForm.style.display = 'none';
            
            // Create form data
            const formData = new FormData(contactForm);
            
            // Use FormSubmit's AJAX endpoint
            fetch('https://formsubmit.co/ajax/thisisartistsportfolio@gmail.com', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Form submitted successfully:', data);
                // Reset the form
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                // Show error message
                successMessage.innerHTML = `
                    <button class="close-btn" id="closeMessage">&times;</button>
                    <p><i class="fas fa-exclamation-circle"></i> Sorry, there was an error. Please try again.</p>
                `;
                successMessage.classList.add('error');
                
                // Re-add close button functionality
                document.getElementById('closeMessage').addEventListener('click', function() {
                    successMessage.style.display = 'none';
                    successMessage.classList.remove('error');
                    contactForm.style.display = 'block';
                });
            });
        });
    }
});

// ===== ENHANCED HIDE/SHOW HEADER ON SCROLL =====
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
}

// ===== SMOOTH SCROLLING WITH FIXED HEADER OFFSET =====
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

// Show header on mouse move near top (desktop only)
if (window.innerWidth > 768 && header) {
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
    if (header) {
        // Make sure header is visible at the top of the page
        if ((window.pageYOffset || document.documentElement.scrollTop) === 0) {
            header.style.transform = 'translateY(0)';
            isHeaderHidden = false;
        }
    }
});