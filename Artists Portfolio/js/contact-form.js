// ===== CONTACT FORM SUCCESS MESSAGE =====
export function initContactForm() {
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initContactForm);