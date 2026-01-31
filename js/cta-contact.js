(function() {
    var wrap = document.getElementById('cta-contact-wrap');
    var btn = document.getElementById('cta-contact-btn');

    if (!wrap || !btn) return;

    function toggle(e) {
        /* Don't expand if clicking the link - let it navigate */
        if (e && e.target && e.target.classList.contains('cta-contact-state')) return;
        var expanded = !btn.classList.contains('is-expanded');
        btn.classList.toggle('is-expanded', expanded);
        btn.setAttribute('aria-expanded', String(expanded));
    }

    function close() {
        btn.classList.remove('is-expanded');
        btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', function(e) {
        /* If expanded and link was clicked, let it navigate */
        if (e.target.classList.contains('cta-contact-state') || e.target.closest('.cta-contact-state')) return;
        e.preventDefault();
        e.stopPropagation();
        toggle(e);
    });

    btn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
        }
    });

    document.addEventListener('click', function(e) {
        if (!wrap.contains(e.target)) close();
    });
})();
