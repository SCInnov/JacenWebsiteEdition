// Vision Section Functionality
(function initVision() {
    // Marquee carousel is CSS-only (continuous scroll animation)
    const typed = document.getElementById('vision-typed-tagline');
    const taglineEl = document.querySelector('.vision-tagline');
    if (typed && taglineEl) {
        const text = 'Reimagining Stroke Care';
        let i = 0;
        function typeTagline() {
            if (i < text.length) {
                typed.textContent += text[i];
                i++;
                setTimeout(typeTagline, 85);
            }
        }
        const obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting && i === 0) typeTagline();
            });
        }, { threshold: 0.3 });
        obs.observe(taglineEl);
    }
})();
