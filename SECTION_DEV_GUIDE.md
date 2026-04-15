# Section Development Guide

Use this when building **new sections separately** (e.g. with Claude) so they can be dropped into the main site with minimal changes. Keep sections self-contained: one HTML block, one CSS file, optional one JS file.

---

## Tech stack

- **HTML5** – semantic markup, no framework
- **CSS3** – no preprocessor; use native custom properties where helpful
- **Vanilla JavaScript** – no framework; optional for section-specific behavior (e.g. counters, typing)
- **Static site** – no build step; link CSS/JS in `index.html`

---

## Colors (design tokens)

Use these so new sections match the rest of the site.

| Token | Hex / Value | Copy-Paste | Use for |
|-------|-------------|------------|---------|
| **Teal (primary)** | `#006d8f` | `#006d8f` | Headings on light, CTAs, links, key UI |
| **Teal light** | `#0088cc` | `#0088cc` | Hover, gradients |
| **Sage (accent)** | `#afc8a0` | `#afc8a0` | Borders, accents, highlights, stat numbers |
| **Sage dark** | `#8fb87a` | `#8fb87a` | Darker accent |
| **Cream (background)** | `#fffcf7` | `#fffcf7` | Page background, cards on teal |
| **Dark text** | `#1a1a1a` | `#1a1a1a` | Body on cream |
| **On teal/dark** | `#fffcf7` | `#fffcf7` | Text on teal or dark backgrounds |

**Opacity variants on teal sections (text on #006d8f):**

| Use | Value | Copy-Paste |
|-----|-------|------------|
| Body text | `rgba(255, 252, 247, 0.88)` – `0.9` | `rgba(255, 252, 247, 0.9)` |
| Muted text | `rgba(255, 252, 247, 0.85)` or `0.7` | `rgba(255, 252, 247, 0.85)` |
| Subtle bg | `rgba(255, 252, 247, 0.1)` – `0.12` | `rgba(255, 252, 247, 0.1)` |
| Border | `rgba(255, 252, 247, 0.4)` | `rgba(255, 252, 247, 0.4)` |
| Sage border | `rgba(175, 200, 160, 0.3)` – `0.6` | `rgba(175, 200, 160, 0.4)` |

**Gradient circles (decorative):**

```css
/* Teal gradient */
linear-gradient(135deg, rgba(0, 109, 143, 0.15) 0%, rgba(0, 136, 204, 0.08) 100%)

/* Sage gradient */
linear-gradient(135deg, rgba(175, 200, 160, 0.15) 0%, rgba(143, 184, 122, 0.08) 100%)

/* Outline only */
border: 1px solid rgba(175, 200, 160, 0.3);
background: transparent;
```

---

## Typography

- **Fonts (already in use):**
  - **Roboto** (400, 700) – body, UI
  - **Inter** (400, 500, 600, 700) – alternate UI/headings
- **Headings:** Prefer `font-weight: 700`, `letter-spacing: -0.02em`, `line-height: 1.2`–`1.3`.
- **Body:** `line-height: 1.6`–`1.65`, `font-size: 1rem` (base), scale up to `1.125rem` for lead text.

---

## HTML section format

Every new section should follow this pattern so layout and nav stay consistent.

```html
<section class="NAME-section" id="NAME">
    <div class="NAME-inner">
        <!-- content: title, blocks, cards, etc. -->
    </div>
</section>
```

**Rules:**

1. **Class:** `{name}-section` (e.g. `problem-section`, `vision-section`). One section = one unique name.
2. **ID:** Same as nav anchor, e.g. `id="problem"` → navbar link `href="#problem"`.
3. **Inner wrapper:** `{name}-inner` with `max-width` in CSS so content doesn't stretch too wide (e.g. 960px–1200px).
4. **No inline styles.** Use classes only.
5. **Accessibility:** Use semantic elements (`h1`–`h3`, `p`, `ul`/`ol`), `alt` on images, `aria-label` on icon-only buttons.

**Example (minimal):**

```html
<section class="my-section" id="my">
    <div class="my-inner">
        <h2 class="my-title">Section Title</h2>
        <p class="my-text">Body copy.</p>
    </div>
</section>
```

---

## CSS rules

1. **Scope all section styles** by the section class so they don't leak:
   - Prefer `.NAME-section .NAME-inner { }`, `.NAME-section .my-title { }`, etc.
   - Avoid bare classes that could affect other sections (e.g. `.title` → use `.NAME-section .my-title`).
2. **No inline styles.** Only class-based CSS.
3. **Use the color tokens above** (hex and rgba) so the section matches the rest of the site.
4. **Avoid `!important`** unless overriding a global or responsive rule.
5. **Box model:** Prefer `box-sizing: border-box` (already set globally in `base.css`).
6. **Responsive:** Include overrides for `max-width: 768px` (mobile) and optionally `968px` (tablet). Put them at the bottom of the section CSS file or in a single `@media` block.
7. **Full-width sections:** If the section background should be full viewport width, use the same pattern as product/rebo hero: e.g. `width: 100vw; max-width: 100vw; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw);` on the section, and keep content in the inner wrapper with `max-width` and `margin: 0 auto`.

---

## File and import convention

**Per section:**

- **HTML:** One contiguous block (the `<section>…</section>`).
- **CSS:** One file, e.g. `css/NAME-section.css`. All selectors scoped under `.NAME-section` (or your section class).
- **JS (optional):** One file, e.g. `js/NAME-section.js`, only for that section's behavior.

**To import into the main site:**

1. **HTML:** Paste the section block into `index.html` where it should appear (e.g. after `</section>` of the previous section, before the next one).

2. **CSS:** Add in `<head>`:
   ```html
   <link rel="stylesheet" href="css/NAME-section.css">
   ```
   (Order: after `base.css`, `navbar.css`, before `responsive.css`.)

3. **JS (if any):** Add before `</body>`:
   ```html
   <script src="js/NAME-section.js"></script>
   ```
   (Order: with other section scripts.)

4. **Nav:** If the section should be in the nav, add a link, e.g.
   ```html
   <a class="nav-link" href="#NAME">Section Name</a>
   ```
   in both desktop and mobile nav.

---

## Responsive breakpoints

| Breakpoint | Target | Notes |
|------------|--------|-------|
| `@media (max-width: 968px)` | Tablet | 2-column grids, slightly reduced typography |
| `@media (max-width: 768px)` | Mobile | Single column, stacked layouts, reduced padding/font sizes |

Use the same breakpoints in your section CSS so behavior is consistent.

---

## Quick checklist for building a new section

- [ ] One `<section class="NAME-section" id="NAME">` and one `NAME-inner` wrapper
- [ ] All CSS scoped under `.NAME-section` (or `.NAME-inner`)
- [ ] Colors from the token table only
- [ ] No inline styles; no unnecessary `!important`
- [ ] `max-width` on inner wrapper (e.g. 960px or 1200px)
- [ ] At least `@media (max-width: 768px)` with spacing/typography adjustments
- [ ] `@media (max-width: 968px)` for tablet if needed
- [ ] Semantic HTML (headings, paragraphs, lists)
- [ ] Accessibility: `alt` on images, `aria-label` on icons
- [ ] Optional: `js/NAME-section.js` and script tag
- [ ] Optional: nav link `href="#NAME"` if section should be in menu

---

## Existing section IDs (for nav and anchors)

- `hero` – main hero
- `vision` – vision / carousel
- `product` – product + explainer timeline
- `problem` – problem / stroke reality
- Contact is a separate page: `contact.html`

New sections should get a short, unique `id` and matching nav link.

---

## How to use this guide

You can hand `SECTION_DEV_GUIDE.md` to Claude (or another tool) and say:

> "Build a new section using the tech stack, format, colors, and rules in SECTION_DEV_GUIDE.md."

Then drop the generated HTML/CSS/JS into the main site using the import steps in the guide.
