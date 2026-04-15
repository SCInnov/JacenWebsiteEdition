# Navbar Module

Reusable navigation bar with glassmorphism styling, scroll-based section highlight, and optional logo. Use it in this project or copy the `navbar` folder into another website.

## Usage in this project

```tsx
import { useRef } from "react";
import { NavigationBar } from "@/components/navbar";

const Page = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <NavigationBar containerRef={scrollRef} />
      <main ref={scrollRef} className="fixed-scroll-container">
        <section id="product">...</section>
        <section id="technology">...</section>
        <section id="about">...</section>
        <section id="contact">...</section>
      </main>
    </div>
  );
};
```

## Using in another website

1. **Copy the folder**  
   Copy `src/components/navbar/` into your project (e.g. `src/components/navbar/`).

2. **Dependencies**  
   The navbar uses:
   - `react`
   - `framer-motion`
   - `tailwindcss` (with CSS variables: `--foreground`, `--muted-foreground`, `--primary`, `--background`)
   - A **Button** component: `variant="ghost"`, `size="sm"`. You can use `@/components/ui/button` (shadcn) or replace with a plain `<button>` and adjust classes.

3. **Imports**  
   Update `NavigationBar.tsx` and `NavbarLogo.tsx` if your aliases differ:
   - `@/components/ui/button` → your button component path
   - `@/lib/utils` only if you use `cn()` elsewhere; the navbar doesn’t use it directly.

4. **Assets**  
   `NavbarLogo` defaults to `Second Chance Icon.svg` and `Second Chance Logo Wide.svg` in your `public` (or asset) root. Override via props or pass a custom `logo` node.

## Props

### `NavigationBar`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `containerRef` | `RefObject<HTMLDivElement \| null>` | — | Ref to the scroll container (e.g. `main`). Omit for window scroll. |
| `items` | `NavItem[]` | `defaultNavItems` | Nav links: `{ id: string; label: string }`. Section `id`s must match. |
| `logo` | `ReactNode` | `<NavbarLogo />` | Custom logo. Omit to use default Second Chance logo. |
| `scrollContainerSelector` | `string` | `".fixed-scroll-container"` | CSS selector for scroll container used by the logo (scroll-to-icon). |
| `className` | `string` | — | Extra class on the outer `<nav>`. |

### `NavbarLogo`

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "xxl"` | `"md"` | Logo size. |
| `logoSrcIcon` | `string` | `"Second Chance Icon.svg"` | Image when scrolled. |
| `logoSrcWide` | `string` | `"Second Chance Logo Wide.svg"` | Image when at top. |
| `alt` | `string` | `"Logo"` | `alt` for the image. |
| `scrollContainerSelector` | `string` | `".fixed-scroll-container"` | Scroll container for switch threshold. Use `""` to disable. |

## Custom nav items

```tsx
import { NavigationBar, type NavItem } from "@/components/navbar";

const items: NavItem[] = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

<NavigationBar items={items} />
```

Ensure your page has sections with matching `id` attributes (e.g. `<section id="home">`).

## Window scroll (no container)

Omit `containerRef` to use window scroll instead of a scroll container:

```tsx
<NavigationBar />
```

Your sections can live directly in the document; the navbar will track the active section via `window` scroll.
