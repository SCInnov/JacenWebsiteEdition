// Navigation Bar Functionality
(function initNav() {
    const logoWide = document.querySelector('.nav-logo img[data-logo="wide"]');
    const logoIcon = document.querySelector('.nav-logo img[data-logo="icon"]');
    const menuBtn = document.querySelector('.nav-menu-btn');
    const mobileLinks = document.getElementById('nav-mobile-links');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateLogo() {
        const useWide = window.scrollY > 50;
        if (logoWide && logoIcon) {
            logoWide.style.opacity = useWide ? '1' : '0';
            logoWide.style.pointerEvents = useWide ? 'auto' : 'none';
            logoIcon.style.opacity = useWide ? '0' : '1';
            logoIcon.style.pointerEvents = useWide ? 'none' : 'auto';
        }
    }

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

    window.addEventListener('scroll', updateLogo, { passive: true });
    updateLogo();

    if (menuBtn && mobileLinks) {
        menuBtn.addEventListener('click', () => mobileLinks.classList.toggle('open'));
    }

    navLinks.forEach((link) => link.addEventListener('click', scrollToSection));
})();
