import './mobile-menu.js';
import './portfolio.js';
import './contact-form.js';
import './scroll-header.js';
import './smooth-scroll.js';
/*import './dropdown.js';*/
import { initSocialFloat } from './social-float.js';
import { initCategoryFilter } from './category-filter.js';

document.addEventListener('DOMContentLoaded', () => {
    initSocialFloat();         // floating socials
    initCategoryFilter();
    console.log('Artists Portfolio initialized');
});
