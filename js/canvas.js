// Background Canvas Animation
const canvas = document.getElementById('signal-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let time = 0;
const bufferSize = 800;
const buffer = new Array(bufferSize).fill(0);

let scrollDirection = 0;
let scrollIntensity = 0;
let lastScrollY = window.scrollY;
let lastScrollTime = Date.now();
// Use shared tapSpikes from hero.js if available, otherwise create local array
let tapSpikes = window.tapSpikes || [];
if (!window.tapSpikes) {
    window.tapSpikes = tapSpikes;
}
let baseActivation = 0.2;

let scrollTimeout;
window.addEventListener('scroll', () => {
    const currentTime = Date.now();
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastScrollY;
    const deltaTime = currentTime - lastScrollTime;
    
    if (deltaY > 0) {
        scrollDirection = 1;
    } else if (deltaY < 0) {
        scrollDirection = -1;
    }
    
    scrollIntensity = Math.min(Math.abs(deltaY) / (deltaTime + 1) * 10, 1.5);
    
    lastScrollY = currentScrollY;
    lastScrollTime = currentTime;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        scrollDirection = 0;
        scrollIntensity = 0;
    }, 150);
});

function generateEMGSignal(t) {
    let signal = 0;
    
    const directionBias = scrollDirection * scrollIntensity * 0.4;
    
    let tapContribution = 0;
    tapSpikes = tapSpikes.filter(spike => {
        spike.time += 0.016;
        spike.intensity *= spike.decay;
        
        const spikeSignal = spike.intensity * Math.exp(-spike.time * 8) * Math.cos(t * 200 * Math.PI);
        tapContribution += spikeSignal;
        
        return spike.intensity > 0.01;
    });
    
    const activation = baseActivation + scrollIntensity;
    const burstFreq = 0.5 + scrollIntensity * 0.5;
    const burstPattern = Math.sin(t * burstFreq * Math.PI * 2);
    
    for (let i = 0; i < 10; i++) {
        const freq = 50 + i * 40;
        const amplitude = (1 / (i + 1)) * activation;
        signal += amplitude * Math.sin(t * freq * Math.PI * 2 + i);
    }
    
    signal += directionBias;
    signal += tapContribution;
    
    const noise = (Math.random() - 0.5) * (0.3 + scrollIntensity * 0.2);
    
    return (signal + noise) * 0.4;
}

function drawSignal() {
    const width = canvas.width;
    const height = canvas.height;
    const centerY = height / 3;
    const scale = height * 0.5;

    const heroSection = document.querySelector('.hero-section');
    const problemSection = document.querySelector('.problem-section');
    const productSection = document.querySelector('.product-section');
    const scrollY = window.scrollY;
    const landingThreshold = 120;
    const isLanding = scrollY < landingThreshold;

    // Calculate transition based on reaching product section
    const productSectionStart = productSection ? productSection.offsetTop : Infinity;
    const transitionStart = landingThreshold;
    const transitionEnd = productSectionStart - window.innerHeight;
    const transitionZone = Math.max(200, transitionEnd - transitionStart);

    let rawT;
    if (isLanding) {
        rawT = 0;
    } else if (scrollY >= transitionEnd) {
        rawT = 1; // Full teal when reaching product section
    } else {
        rawT = (scrollY - transitionStart) / transitionZone;
        rawT = Math.max(0, Math.min(1, rawT));
    }
    const t = rawT * rawT * (3 - 2 * rawT);

    // Check if we're in product section
    const productState = window.productSectionState;
    const isInProductSection = productState && productSection && 
        scrollY >= productSectionStart - window.innerHeight && 
        scrollY <= productSectionStart + productSection.offsetHeight;

    // Draw background - continue transition until product section, then full teal
    if (isInProductSection) {
        // Product section: teal background
        ctx.fillStyle = '#006d8f';
        ctx.fillRect(0, 0, width, height);
    } else {
        /* Beige base, teal blurs, bottom teal grows; gradual teal overlay eases into full teal. */
        ctx.fillStyle = '#fffcf7';
        ctx.fillRect(0, 0, width, height);

        const topBlurH = height * 0.2;
        const topOpacity = 1 - t;
        if (topOpacity > 0.005) {
            const topG = ctx.createLinearGradient(0, 0, 0, topBlurH);
            topG.addColorStop(0, `rgba(0, 109, 143, ${0.35 * topOpacity})`);
            topG.addColorStop(1, 'rgba(0, 109, 143, 0)');
            ctx.fillStyle = topG;
            ctx.fillRect(0, 0, width, topBlurH);
        }

        const bottomBlurH = height * 0.28;
        const gradTop = height * 0.72 * (1 - t);
        const gradHeight = height - gradTop;
        if (gradHeight > 0) {
            const softT = Math.pow(t, 0.75);
            const bottomG = ctx.createLinearGradient(0, gradTop, 0, height);
            bottomG.addColorStop(0, 'rgba(0, 109, 143, 0)');
            bottomG.addColorStop(0.5, `rgba(0, 109, 143, ${0.12 + 0.25 * softT})`);
            bottomG.addColorStop(1, `rgba(0, 109, 143, ${0.4 + 0.5 * softT})`);
            ctx.fillStyle = bottomG;
            ctx.fillRect(0, gradTop, width, gradHeight);
        }

        const overlayT = Math.pow(t, 0.85);
        if (overlayT > 0.01) {
            ctx.fillStyle = `rgba(0, 109, 143, ${overlayT})`;
            ctx.fillRect(0, 0, width, height);
        }
    }

    let signalOpacity = 0.3;
    let signalFadeProgress = 0;

    if (isInProductSection) {
        signalFadeProgress = productState.signalFadeProgress || 0;
        signalOpacity = 0.3 * (1 - signalFadeProgress);
    }

    const waveR = Math.round(100 * (1 - t) + 255 * t);
    const waveG = Math.round(100 * (1 - t) + 252 * t);
    const waveB = Math.round(100 * (1 - t) + 247 * t);
    const waveA = 0.12 * (1 - t) + 0.3 * t;
    const glowA = 0.08 * (1 - t) + 0.3 * t;
    
    // Draw EMG signals in product section with proper styling
    if (isInProductSection && productState) {
        // Use viewport center for EMG signals
        const emgCenterY = height / 2;
        const emgScale = height * 0.5;
        
        ctx.strokeStyle = `rgba(255, 252, 247, ${signalOpacity})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 3;
        ctx.shadowColor = `rgba(255, 252, 247, ${signalOpacity})`;
        
        ctx.beginPath();
        for (let i = 0; i < buffer.length; i++) {
            const x = (i / buffer.length) * width;
            
            // Keep signals wavy
            const y = emgCenterY - buffer[i] * emgScale;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
    
    // Draw regular background waves (only if not in product section)
    if (!isInProductSection || !productState) {
        ctx.strokeStyle = `rgba(${waveR}, ${waveG}, ${waveB}, ${waveA})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 3;
        ctx.shadowColor = `rgba(${waveR}, ${waveG}, ${waveB}, ${glowA})`;

        ctx.beginPath();
        for (let i = 0; i < buffer.length; i++) {
            const x = (i / buffer.length) * width;
            const y = centerY - buffer[i] * scale;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
}

function animate() {
    time += 16;
    const t = time / 1000;

    const sample = generateEMGSignal(t);
    buffer.shift();
    buffer.push(sample);

    drawSignal();
    requestAnimationFrame(animate);
}

animate();
