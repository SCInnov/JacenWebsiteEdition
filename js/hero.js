// Hero Section Functionality
// Add tap spikes to canvas (canvas.js will use window.tapSpikes if available)
if (!window.tapSpikes) {
    window.tapSpikes = [];
}

function handleTap(e) {
    // Visual ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'tap-effect';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
    
    // Add tap spike for canvas animation
    if (window.tapSpikes) {
        window.tapSpikes.push({
            time: 0,
            intensity: 2.0,
            decay: 0.92
        });
    }
}

document.addEventListener('click', handleTap);
document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    handleTap({ clientX: touch.clientX, clientY: touch.clientY });
});
