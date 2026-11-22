// Home page Rebo story (from homerebo.html).
// - "Anyone. Anytime. Anywhere." rises word by word, then gets its underline.
// - The Rebo section pins while you scroll: REBO fades up behind, the arm's
//   outline draws, its parts click into place, then the description appears.
// - A soft glow follows you down the section (teal → teal → clay) and finally
//   fills the "Every movement starts with a signal." call to action with clay.
(function () {
    var root = document.querySelector('.rs');
    if (!root) return;
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var $ = function (s, r) { return (r || root).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || root).querySelectorAll(s)); };
    var clamp = function (x, a, b) { a = a === undefined ? 0 : a; b = b === undefined ? 1 : b; return Math.min(b, Math.max(a, x)); };
    var ease = function (x) { return x * x * (3 - 2 * x); };

    var tpl = document.getElementById('armtpl');
    $$('[data-arm]').forEach(function (el) { el.appendChild(tpl.content.cloneNode(true)); });

    // split the Rebo statements into words (keeping the <em> phrases)
    $$('.say').forEach(function (p) {
        var i = 0;
        function wrap(node, em) {
            Array.prototype.slice.call(node.childNodes).forEach(function (n) {
                if (n.nodeType === 3) {
                    var frag = document.createDocumentFragment();
                    n.textContent.split(/(\s+)/).forEach(function (w) {
                        if (!w) return;
                        if (/^\s+$/.test(w)) { frag.appendChild(document.createTextNode(w)); return; }
                        var s = document.createElement('span');
                        s.className = 'wd'; s.style.setProperty('--i', i++); s.textContent = w;
                        frag.appendChild(s);
                    });
                    node.replaceChild(frag, n);
                } else if (n.nodeType === 1) {
                    wrap(n, n.tagName === 'EM');
                    if (n.tagName === 'EM') n.style.setProperty('--hd', (i * 45 + 350) + 'ms');
                }
            });
        }
        wrap(p);
    });

    // vision line and fade-up blocks
    var vEl = $('#vision');
    if (reduce || !('IntersectionObserver' in window)) {
        vEl.classList.add('go');
        $$('.rv').forEach(function (el) { el.classList.add('in'); });
    } else {
        // start the words only once the intro has finished and the line is in view
        var goVision = function () {
            if (document.documentElement.classList.contains('intro-playing')) { setTimeout(goVision, 200); return; }
            vEl.classList.add('go');
        };
        new IntersectionObserver(function (es, o) {
            es.forEach(function (e) { if (e.isIntersecting) { goVision(); o.disconnect(); } });
        }, { threshold: 1, rootMargin: '0px 0px -20% 0px' }).observe(vEl);
        var io = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
        }, { threshold: 0.2 });
        $$('.rv').forEach(function (el) { io.observe(el); });
    }

    var ctaEl = $('#cta');
    if (reduce || !('IntersectionObserver' in window)) ctaEl.classList.add('on');
    else new IntersectionObserver(function (es, o) {
        es.forEach(function (e) { if (e.isIntersecting) { ctaEl.classList.add('on'); o.disconnect(); } });
    }, { rootMargin: '0px 0px -35% 0px' }).observe(ctaEl);

    // pinned intro: REBO arrives as one word, the outline draws, parts click in
    var sec = $('#rebo'), story = $('#introStory'), desc = $('.desc', story), armEl = $('.rend svg', story);
    var bn = $('.backname', story);
    var base = $$('.arm-base path', armEl);
    base.forEach(function (p) { p.setAttribute('pathLength', '1'); p.style.strokeDasharray = 1; });
    var parts = [$('.g-sensor', armEl), $('.g-brace', armEl), $('.g-motor', armEl)];

    function intro() {
        var p = reduce ? 1 : clamp(-story.getBoundingClientRect().top / (story.offsetHeight - innerHeight));
        var k = ease(clamp((p - 0.02) / 0.3));
        bn.style.opacity = k.toFixed(3);
        bn.style.transform = 'translate(-50%, -74%) scale(' + (1.12 - 0.12 * k).toFixed(4) + ')';
        bn.style.filter = 'blur(' + ((1 - k) * 14).toFixed(1) + 'px)';
        var dr = ease(clamp((p - 0.12) / 0.35));
        base.forEach(function (pt) {
            pt.style.strokeDashoffset = (1 - dr).toFixed(3);
            pt.style.fillOpacity = clamp((dr - 0.6) / 0.4).toFixed(2);
        });
        var ks = [0.42, 0.5, 0.58].map(function (s) { return ease(clamp((p - s) / 0.14)); });
        parts[0].style.opacity = ks[0];
        parts[0].style.transform = 'translateY(' + ((1 - ks[0]) * 70).toFixed(1) + 'px)';
        parts[1].style.opacity = ks[1];
        parts[1].style.transform = 'translate(' + ((1 - ks[1]) * 90).toFixed(1) + 'px,' + ((1 - ks[1]) * -70).toFixed(1) + 'px)';
        parts[2].style.opacity = ks[2];
        parts[2].style.transform = 'scale(' + (0.2 + 0.8 * ks[2]).toFixed(3) + ')';
        var kd = ease(clamp((p - 0.72) / 0.14));
        desc.style.opacity = kd;
        desc.style.transform = 'translateY(' + ((1 - kd) * 12).toFixed(1) + 'px)';
        desc.style.letterSpacing = (0.02 + (1 - kd) * 0.16).toFixed(3) + 'em';
        return p;
    }

    // glow: teal behind the device → teal behind the team photo → clay behind the care photo → fills the CTA
    var orb = $('.orb', sec), cta = $('#cta');
    var ctaH = $('#cta h2');
    function glow(pIntro) {
        var anchors = $$('[data-anchor]', sec), mid = innerHeight * 0.5, box = sec.getBoundingClientRect();
        var cols = [[0, 109, 143, 0.22 + 0.12 * pIntro], [0, 109, 143, 0.3], [224, 122, 79, 0.45], [224, 122, 79, 1]];
        var pts = anchors.map(function (a) {
            var r = a.getBoundingClientRect();
            return [r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top, r.top + r.height / 2];
        });
        var i = 0;
        while (i < pts.length - 1 && pts[i + 1][2] < mid) i++;
        var a = pts[i], b = pts[Math.min(i + 1, pts.length - 1)];
        var t = a === b ? 0 : clamp((mid - a[2]) / (b[2] - a[2]));
        var e = reduce ? Math.round(t) : ease(t);
        var toCta = i === pts.length - 2 ? e : (i === pts.length - 1 ? 1 : 0);
        var s0 = 0.55 + 0.45 * pIntro, sc = (1 + 2.5 * toCta) * (i === 0 ? s0 + (1 - s0) * e : 1);
        orb.style.transform = 'translate(' + (a[0] + (b[0] - a[0]) * e).toFixed(1) + 'px,' + (a[1] + (b[1] - a[1]) * e).toFixed(1) + 'px) scale(' + sc.toFixed(3) + ')';
        var ca = cols[i], cb = cols[Math.min(i + 1, cols.length - 1)];
        var c = ca.map(function (v, k) { return v + (cb[k] - v) * e; });
        orb.style.setProperty('--oc', 'rgba(' + c.slice(0, 3).map(Math.round).join(',') + ',' + c[3].toFixed(2) + ')');
        // the heading grows slightly as you scroll through the call to action
        if (ctaH) {
            var hr = ctaH.getBoundingClientRect();
            var q = reduce ? 1 : ease(clamp((innerHeight - hr.top) / (innerHeight * 0.75)));
            ctaH.style.transform = 'scale(' + (0.9 + 0.12 * q).toFixed(4) + ')';
        }
        var cr = cta.getBoundingClientRect();
        cta.style.setProperty('--ca', reduce ? 1 : ease(clamp((innerHeight * 0.95 - cr.top) / (innerHeight * 0.6))).toFixed(3));
    }

    var tick = false;
    function update() { tick = false; glow(intro()); }
    addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
    update();
})();
