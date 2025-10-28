/*document.addEventListener("DOMContentLoaded", () => {
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const portfolioLink = document.querySelector(".nav-links .dropdown > a");
    const dropdownContent = document.querySelector(".nav-links .dropdown .dropdown-content");
    const menuIcon = document.querySelector(".mobile-menu-btn i");

    if (!mobileMenuBtn || !navLinks || !menuIcon) return; // stop if missing

    // Toggle mobile menu
    mobileMenuBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navLinks.classList.toggle("show");

        if (navLinks.classList.contains("show")) {
            menuIcon.classList.replace("fa-bars", "fa-times");
        } else {
            menuIcon.classList.replace("fa-times", "fa-bars");
            if (dropdownContent) dropdownContent.classList.remove("show");
        }
    });

    // Toggle dropdown on click for portfolio link
    if (portfolioLink && dropdownContent) {
        portfolioLink.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                dropdownContent.classList.toggle("show");
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
                navLinks.classList.remove("show");
                if (dropdownContent) dropdownContent.classList.remove("show");
                menuIcon.classList.replace("fa-times", "fa-bars");
            }
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a:not(.dropbtn)').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('show');
                if (dropdownContent) dropdownContent.classList.remove("show");
                menuIcon.classList.replace("fa-times", "fa-bars");
            }
        });
    });
});
*/