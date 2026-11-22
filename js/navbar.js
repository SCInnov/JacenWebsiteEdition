// Navigation Bar Functionality
(function initNav() {
    const menuBtn = document.querySelector('.nav-menu-btn');
    const mobileLinks = document.getElementById('nav-mobile-links');
    const navLinks = document.querySelectorAll('.nav-link');

    function scrollToSection(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            const id = href.slice(1);
            const el = document.getElementById(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth' });
                if (mobileLinks && mobileLinks.classList.contains('open')) {
                    mobileLinks.classList.remove('open');
                }
            }
        }
    }

    if (menuBtn && mobileLinks) {
        menuBtn.addEventListener('click', () => mobileLinks.classList.toggle('open'));
    }

    navLinks.forEach((link) => link.addEventListener('click', scrollToSection));
})();
