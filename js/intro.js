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

    // Hide the hero's text while the intro plays; the hero background is
    // revealed through the logo first, and the text fades in afterwards.
    var root = document.documentElement;
    root.classList.add('intro-playing');

    // Matches the logo's blooming reveal: the outermost trace starts at 0.9s
    // and takes 1.5s, so the mark is fully drawn at 2.4s.
    var wipeFinish = 2400;
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

    // Start the headline while the zoom is finishing (the zoom takes 1.1s), so
    // it overlaps slightly with the background coming into view.
    setTimeout(function () {
        root.classList.remove('intro-playing');
    }, wipeFinish + revealDelay + zoomDelay + 750);

    overlay.addEventListener('transitionend', function handleEnd(e) {
        if (e.propertyName === 'transform') {
            overlay.style.display = 'none';
            overlay.removeEventListener('transitionend', handleEnd);
        }
    });
})();
