/* ============================================
   PROBLEM SECTION JS
   Animated counters with intersection observer
   ============================================ */

(function() {
    'use strict';

    // Configuration
    const ANIMATION_DURATION = 2000; // ms
    const EASING_FUNCTION = function(t) {
        // easeOutExpo for smooth deceleration
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    // Track animated elements
    const animatedElements = new Set();

    /**
     * Format number with suffix and optional decimals
     */
    function formatNumber(value, suffix, decimals) {
        let formatted;
        if (decimals && decimals > 0) {
            formatted = value.toFixed(decimals);
        } else {
            formatted = Math.floor(value).toLocaleString();
        }
        return formatted + (suffix || '');
    }

    /**
     * Animate a single counter element
     */
    function animateCounter(element) {
        if (animatedElements.has(element)) return;
        animatedElements.add(element);

        const target = parseFloat(element.dataset.count);
        const suffix = element.dataset.suffix || '';
        const decimals = parseInt(element.dataset.decimals, 10) || 0;

        if (isNaN(target)) return;

        const startTime = performance.now();
        const startValue = 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / ANIMATION_DURATION, 1);
            const easedProgress = EASING_FUNCTION(progress);
            const currentValue = startValue + (target - startValue) * easedProgress;

            element.textContent = formatNumber(currentValue, suffix, decimals);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Ensure final value is exact
                element.textContent = formatNumber(target, suffix, decimals);
            }
        }

        requestAnimationFrame(update);
    }

    /**
     * Initialize intersection observer for scroll-triggered animations
     */
    function initCounterObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3 // Trigger when 30% visible
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, options);

        // Find all counter elements in the problem section
        const counters = document.querySelectorAll('.problem-section [data-count]');
        counters.forEach(function(counter) {
            // Set initial state (optional: show 0 or keep original)
            observer.observe(counter);
        });
    }

    /**
     * Add subtle hover effects to cascade cards
     */
    function initCardEffects() {
        const cards = document.querySelectorAll('.problem-section .cascade-card');
        cards.forEach(function(card, index) {
            // Stagger fade-in on load
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(function() {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + index * 150);
        });
    }

    /**
     * Add fade-in animation to stat blocks
     */
    function initStatBlockAnimations() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const blocks = entry.target.querySelectorAll('.stat-block');
                    blocks.forEach(function(block, index) {
                        setTimeout(function() {
                            block.style.opacity = '1';
                            block.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        const statsGrid = document.querySelector('.problem-section .problem-stats-grid');
        if (statsGrid) {
            const blocks = statsGrid.querySelectorAll('.stat-block');
            blocks.forEach(function(block) {
                block.style.opacity = '0';
                block.style.transform = 'translateY(20px)';
                block.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            });
            observer.observe(statsGrid);
        }
    }

    /**
     * Animate spectrum bar on scroll
     */
    function initSpectrumAnimation() {
        const spectrumBar = document.querySelector('.problem-section .spectrum-bar');
        if (!spectrumBar) return;

        spectrumBar.style.width = '0';
        spectrumBar.style.transition = 'width 1.2s ease-out';

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        spectrumBar.style.width = '100%';
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(spectrumBar.parentElement);
    }

    /**
     * Initialize all problem section animations
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initCounterObserver();
                initCardEffects();
                initStatBlockAnimations();
                initSpectrumAnimation();
            });
        } else {
            initCounterObserver();
            initCardEffects();
            initStatBlockAnimations();
            initSpectrumAnimation();
        }
    }

    init();
})();
