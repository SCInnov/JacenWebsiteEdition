// Intro sequence: the logo SVG draws itself in (wipe animation defined in its
// own <style>), then we zoom through it into the site underneath.
(function () {
    var overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    // In studio mode the authoring tool (intro-studio.js) drives the timeline
    // manually, so skip the automatic playback entirely.
    if (new URLSearchParams(window.location.search).has('studio')) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        overlay.style.display = 'none';
        return;
    }

    // Matches the logo's own wipe timeline: last layer starts at 2.7s and
    // takes 0.8s, so the wipe is fully drawn at 3.5s.
    var wipeFinish = 3500;
    // Brief pause once formed, then drop the backdrop so the site shows
    // through the logo's negative space, then hold a beat before zooming.
    var revealDelay = 150;
    var zoomDelay = 450;

    setTimeout(function () {
        overlay.classList.add('intro-reveal');
    }, wipeFinish + revealDelay);

    setTimeout(function () {
        overlay.classList.add('intro-zoom');
    }, wipeFinish + revealDelay + zoomDelay);

    overlay.addEventListener('transitionend', function handleEnd(e) {
        if (e.propertyName === 'transform') {
            overlay.style.display = 'none';
            overlay.removeEventListener('transitionend', handleEnd);
        }
    });
})();
