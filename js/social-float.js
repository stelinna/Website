// social-float.js
export function initSocialFloat() {
    console.log('[social-float] initSocialFloat called');

    const floatingSocial = document.querySelector('.floating-social');
    const contactSection = document.getElementById('contact');

    if (!floatingSocial || !contactSection) {
        console.warn('[social-float] Missing element(s):', { floatingSocial, contactSection });
        return;
    }

    function checkScroll() {
        const contactRect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // debug (comment out if noisy)
        // console.log('[social-float] checkScroll', contactRect.top, contactRect.bottom, windowHeight);

        if (
            contactRect.top <= windowHeight * 0.7 &&
            contactRect.bottom >= windowHeight * 0.3
        ) {
            floatingSocial.classList.add('hidden');
        } else {
            floatingSocial.classList.remove('hidden');
        }
    }

    // Initial check
    checkScroll();

    // Watch scroll and resize
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
}
