(function () {
    // The page is two fixed 1440px-wide frames (hero + partners, and
    // news + contact + footer) scaled to fit the window, with the Rebo story
    // flowing normally between them.
    var frames = [
        { vp: document.getElementById('viewport'), el: document.getElementById('top'), h: 1024 },
        { vp: document.getElementById('viewport-lower'), el: document.getElementById('lower'), h: 1589 }
    ];

    function fit() {
        var scale = Math.min(1, document.documentElement.clientWidth / 1440);
        // the hero fills exactly one screen height (above the fold)
        var heroH = Math.max(640, Math.round(window.innerHeight / scale));
        frames[0].h = heroH;
        if (frames[0].el) frames[0].el.style.setProperty('--hero-h', heroH + 'px');
        frames.forEach(function (f) {
            if (!f.vp || !f.el) return;
            f.el.style.transform = 'scale(' + scale + ')';
            f.vp.style.width = (1440 * scale) + 'px';
            f.vp.style.height = (f.h * scale) + 'px';
        });
    }

    fit();
    window.addEventListener('resize', fit);

    // Parallax hero: as you scroll away, the hero text drifts up more slowly than the page
    var heroEl = document.querySelector('.hero');
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var pTick = false;
    function parallax() {
        pTick = false;
        var scale = Math.min(1, document.documentElement.clientWidth / 1440);
        var y = window.scrollY / scale;
        if (y > frames[0].h * 1.2) return;
        heroEl.style.setProperty('--py', y.toFixed(1));
    }
    if (heroEl && !calm) {
        window.addEventListener('scroll', function () {
            if (!pTick) { pTick = true; requestAnimationFrame(parallax); }
        }, { passive: true });
    }

    // Gentle fade-up as each section scrolls into view
    if ('IntersectionObserver' in window) {
        document.documentElement.classList.add('reveal-ready');
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    }

    document.querySelectorAll('a[href="#"]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
        });
    });

    document.querySelectorAll('.subscribe-row').forEach(function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        });
    });

    var messageForm = document.getElementById('message-form');
    if (messageForm) {
        messageForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var first = document.getElementById('first-name').value.trim();
            var last = document.getElementById('last-name').value.trim();
            var email = document.getElementById('message-email').value.trim();
            var message = document.getElementById('message-body').value.trim();
            var name = (first + ' ' + last).trim();
            var subject = name ? 'Contact from ' + name : 'Contact from Second Chance site';
            var body = message + (email ? '\n\n---\nReply to: ' + email : '');
            window.location.href = 'mailto:info@secchance.com'
                + '?subject=' + encodeURIComponent(subject)
                + '&body=' + encodeURIComponent(body);
        });
    }
})();
