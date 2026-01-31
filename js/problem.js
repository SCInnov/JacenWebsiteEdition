// Problem Section Functionality
(function initLeadingTyping() {
    const typed = document.getElementById('leading-typed');
    const leadingCard = document.getElementById('leading-stat-card');
    const cursor = leadingCard ? leadingCard.querySelector('.typing-cursor') : null;
    if (typed && leadingCard) {
        const text = 'Leading';
        let i = 0;
        function typeLeading() {
            if (i < text.length) {
                typed.textContent += text[i];
                i++;
                setTimeout(typeLeading, 85);
            } else {
                if (cursor) cursor.style.display = 'none';
            }
        }
        const obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting && i === 0) typeLeading();
            });
        }, { threshold: 0.3 });
        obs.observe(leadingCard);
    }
})();

// Counter Animation
const counters = document.querySelectorAll('.stat-number[data-target]');
let hasAnimated = false;

function animateCounters() {
    if (hasAnimated) return;
    const statsSection = document.querySelector('.stats-container');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top >= window.innerHeight * 0.8) return;

    hasAnimated = true;
    counters.forEach((counter, index) => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        function updateCounter() {
            current += increment;
            if (current < target) {
                if (index === 0) {
                    counter.textContent = current.toFixed(1) + ' Million';
                } else {
                    counter.textContent = Math.floor(current) + ' in 3';
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (index === 0) {
                    counter.textContent = target.toFixed(1) + ' Million';
                } else {
                    counter.textContent = Math.floor(target) + ' in 3';
                }
            }
        }
        updateCounter();
    });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);
animateCounters();
