// Problem Section - Counter Animation
const counters = document.querySelectorAll('.stat-number[data-target]');
let hasAnimated = false;

function animateCounters() {
    if (hasAnimated) return;
    const statsSection = document.querySelector('.stats-container');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top >= window.innerHeight * 0.8) return;

    hasAnimated = true;
    counters.forEach(function (counter) {
        const target = parseFloat(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const format = counter.getAttribute('data-format') || '';
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        function updateCounter() {
            current += increment;
            if (current < target) {
                if (format === 'in3') {
                    counter.textContent = Math.floor(current) + ' in 3';
                } else if (suffix === 'M') {
                    counter.textContent = current.toFixed(1) + 'M';
                } else {
                    counter.textContent = Math.floor(current) + suffix;
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (format === 'in3') {
                    counter.textContent = Math.floor(target) + ' in 3';
                } else if (suffix === 'M') {
                    counter.textContent = target.toFixed(1) + 'M';
                } else {
                    counter.textContent = Math.floor(target) + suffix;
                }
            }
        }
        updateCounter();
    });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);
animateCounters();
