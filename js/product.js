// Product Section Functionality
(function initProduct() {
    let signalFadeProgress = 0;

    function updateProductSection() {
        const productSection = document.querySelector('.product-section');
        if (!productSection) return;

        const scrollY = window.scrollY;
        const sectionTop = productSection.offsetTop;

        // Fade out signals from scroll 0-200 (relative to product section start)
        const fadeStart = sectionTop - window.innerHeight;
        const fadeEnd = sectionTop - window.innerHeight + 200;
        if (scrollY >= fadeStart && scrollY <= fadeEnd) {
            signalFadeProgress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
        } else if (scrollY < fadeStart) {
            signalFadeProgress = 0;
        } else {
            signalFadeProgress = 1;
        }

        // Store state for canvas drawing
        window.productSectionState = {
            signalFadeProgress
        };
    }

    window.addEventListener('scroll', updateProductSection);
    window.addEventListener('resize', updateProductSection);
    updateProductSection();
})();


// Timeline Animation
(function initTimeline() {
    // Exclude stage1-step from observer - it's sticky and doesn't need animation
    const timelineSteps = document.querySelectorAll('.timeline-step.story-section:not(.stage1-step)');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200); // Stagger by 200ms per step
            }
        });
    }, observerOptions);

    timelineSteps.forEach(step => {
        observer.observe(step);
    });
})();

// Stage 1 Interactive EMG Canvas
(function initStage1Canvas() {
    const stage1Canvas = document.getElementById('stage1-canvas');
    if (!stage1Canvas) return;

    const ctx1 = stage1Canvas.getContext('2d');

    function resizeCanvas(canvas) {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        // Set canvas size accounting for device pixel ratio
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        // Scale context to match DPR
        ctx1.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    
    // Initial resize - wait for canvas to be in DOM
    function initCanvas() {
        if (stage1Canvas.offsetWidth > 0 && stage1Canvas.offsetHeight > 0) {
            resizeCanvas(stage1Canvas);
        } else {
            // Retry if not ready
            requestAnimationFrame(initCanvas);
        }
    }
    initCanvas();
    
    window.addEventListener('resize', () => {
        resizeCanvas(stage1Canvas);
    });

    // Signal state
    let time = 0;
    const buffer1 = new Array(600).fill(0);
    let scrollDir = 0;
    let scrollIntensity = 0;
    let tapSpikes = [];
    let lastScrollY = window.scrollY;
    let interactionCount = 0;

    // Interaction tracking
    const interactionPrompt = document.getElementById('interaction-prompt');
    const statusIndicator = document.getElementById('status-indicator');
    
    let scrollTimeout;
    let statusTimeout;
    
    window.addEventListener('scroll', () => {
        const deltaY = window.scrollY - lastScrollY;
        if (Math.abs(deltaY) > 3) {
            scrollDir = deltaY > 0 ? 1 : -1;
            scrollIntensity = Math.min(Math.abs(deltaY) / 10, 1.5);
            interactionCount++;
            
            // Update status indicator
            if (statusIndicator) {
                if (scrollDir === 1) {
                    statusIndicator.textContent = 'SCROLLING DOWN ↓';
                    statusIndicator.className = 'status-indicator scrolling-down';
                } else if (scrollDir === -1) {
                    statusIndicator.textContent = 'SCROLLING UP ↑';
                    statusIndicator.className = 'status-indicator scrolling-up';
                }
            }
            
            if (interactionCount > 5 && interactionPrompt) {
                interactionPrompt.classList.add('fade');
            }
        }
        lastScrollY = window.scrollY;
        
        clearTimeout(scrollTimeout);
        clearTimeout(statusTimeout);
        scrollTimeout = setTimeout(() => {
            scrollDir = 0;
            scrollIntensity = 0;
        }, 100);
        statusTimeout = setTimeout(() => {
            if (statusIndicator) {
                statusIndicator.textContent = 'NEUTRAL';
                statusIndicator.className = 'status-indicator';
            }
        }, 500);
    });

    document.addEventListener('click', (e) => {
        tapSpikes.push({ time: 0, intensity: 2.0, decay: 0.92 });
        interactionCount++;
        
        // Update status indicator
        if (statusIndicator) {
            statusIndicator.textContent = 'TAP DETECTED ⚡';
            statusIndicator.className = 'status-indicator tapping';
        }
        
        clearTimeout(statusTimeout);
        statusTimeout = setTimeout(() => {
            if (statusIndicator) {
                statusIndicator.textContent = 'NEUTRAL';
                statusIndicator.className = 'status-indicator';
            }
        }, 800);
        
        if (interactionCount > 5 && interactionPrompt) {
            interactionPrompt.classList.add('fade');
        }
    });

    // Generate EMG signal
    function generateSignal(t, intensity = 0.3) {
        let signal = 0;
        const directionBias = scrollDir * scrollIntensity * 0.5;
        
        let tapContribution = 0;
        tapSpikes = tapSpikes.filter(spike => {
            spike.time += 0.016;
            spike.intensity *= spike.decay;
            tapContribution += spike.intensity * Math.exp(-spike.time * 8) * Math.cos(t * 200 * Math.PI);
            return spike.intensity > 0.01;
        });
        
        const activation = intensity + scrollIntensity * 0.5;
        for (let i = 0; i < 10; i++) {
            const freq = 50 + i * 40;
            const amplitude = (1 / (i + 1)) * activation;
            signal += amplitude * Math.sin(t * freq * Math.PI * 2 + i);
        }
        
        signal += directionBias + tapContribution;
        const noise = (Math.random() - 0.5) * 0.4;
        return (signal + noise) * 0.4;
    }

    // Draw signal
    function drawSignal(ctx, buffer, canvas) {
        // Get CSS dimensions (not canvas.width/height which are scaled by DPR)
        const rect = canvas.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const centerY = height / 2;
        const scale = height * 0.5;
        
        // Clear canvas using actual canvas dimensions
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'rgba(255, 252, 247, 0.1)';
        ctx.fillRect(0, 0, width, height);

        // Center line (subtle teal)
        ctx.strokeStyle = 'rgba(0, 109, 143, 0.2)';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Signal (teal)
        ctx.strokeStyle = 'rgba(0, 109, 143, 0.9)';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 3;
        ctx.shadowColor = 'rgba(0, 109, 143, 0.4)';
        
        ctx.beginPath();
        for (let i = 0; i < buffer.length; i++) {
            const x = (i / buffer.length) * width;
            const y = centerY - buffer[i] * scale;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }

    // Animation loop
    let animationId = null;
    function animate() {
        time += 16;
        const t = time / 1000;

        // Update buffer
        buffer1.shift();
        buffer1.push(generateSignal(t, 0.3));

        // Draw - ensure canvas is visible and sized
        if (stage1Canvas.offsetWidth > 0 && stage1Canvas.offsetHeight > 0) {
            // Re-resize if needed (in case it wasn't initialized properly)
            if (stage1Canvas.width === 0 || stage1Canvas.height === 0) {
                resizeCanvas(stage1Canvas);
            }
            drawSignal(ctx1, buffer1, stage1Canvas);
        }

        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation - ensure canvas is ready
    function startAnimation() {
        // Ensure canvas is properly sized
        if (stage1Canvas.offsetWidth > 0 && stage1Canvas.offsetHeight > 0) {
            resizeCanvas(stage1Canvas);
            // Fill buffer with initial values
            for (let i = 0; i < buffer1.length; i++) {
                buffer1[i] = generateSignal(i * 0.01, 0.3);
            }
            animate();
        } else {
            // Retry after a short delay if canvas isn't ready
            setTimeout(startAnimation, 50);
        }
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startAnimation);
    } else {
        // Use a small delay to ensure canvas is in DOM
        setTimeout(startAnimation, 100);
    }
})();

// Restart Stage 4 GIF on tap (click) – cache-bust only, no clearing src (avoids flicker)
(function initGifTapRestart() {
    const gifImg = document.querySelector('.gif-container img.device-gif');
    const gifContainer = document.querySelector('.gif-container');
    if (!gifImg || !gifContainer) return;

    const baseSrc = (gifImg.getAttribute('src') || '').split('?')[0];
    if (!baseSrc) return;

    gifContainer.addEventListener('click', () => {
        gifImg.src = baseSrc + '?t=' + Date.now();
    });

    gifContainer.style.cursor = 'pointer';
    gifContainer.title = 'Tap to replay';
})();
