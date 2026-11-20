(function () {
    var viewport = document.getElementById('viewport');
    var home = document.getElementById('top');

    function fit() {
        var scale = Math.min(1, document.documentElement.clientWidth / 1440);
        home.style.transform = 'scale(' + scale + ')';
        viewport.style.width = (1440 * scale) + 'px';
        viewport.style.height = (5000 * scale) + 'px';
    }

    fit();
    window.addEventListener('resize', fit);

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
