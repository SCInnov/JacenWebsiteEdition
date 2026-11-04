(function () {
    var viewport = document.getElementById('viewport');
    var home = document.getElementById('top');

    function fit() {
        var scale = Math.min(1, document.documentElement.clientWidth / 1440);
        home.style.transform = 'scale(' + scale + ')';
        viewport.style.width = (1440 * scale) + 'px';
        viewport.style.height = (4096 * scale) + 'px';
    }

    fit();
    window.addEventListener('resize', fit);

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
