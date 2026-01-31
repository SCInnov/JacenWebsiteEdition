// Vision Section Functionality
(function initVision() {
    const track = document.querySelector('.vision-carousel-track');
    const prev = document.querySelector('.vision-carousel-arrow.prev');
    const next = document.querySelector('.vision-carousel-arrow.next');
    if (track && prev && next) {
        const total = 3;
        let idx = 0;
        function updateCarousel() {
            track.style.transform = 'translateX(-' + idx * 33.333 + '%)';
        }
        prev.addEventListener('click', function () {
            idx = (idx - 1 + total) % total;
            updateCarousel();
        });
        next.addEventListener('click', function () {
            idx = (idx + 1) % total;
            updateCarousel();
        });
        updateCarousel();
    }

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
