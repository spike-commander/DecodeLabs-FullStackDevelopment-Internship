# Build the Future — Landing Page

A single-page, fully responsive landing page built with raw **HTML5**, **CSS3**, and **native JavaScript** — no frameworks, no external CSS/JS libraries.

## Tech Stack

- **HTML5** — Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`)
- **CSS3** — CSS Grid (page macro-layout) + Flexbox (nav, cards, buttons)
- **JavaScript** — Vanilla ES5+ with no dependencies
- **Fonts** — Inter (headlines), Roboto (body) via Google Fonts

## Design

| Token | Value |
|---|---|
| Primary | `#A5856F` (Mocha Mousse) |
| Secondary | `#A0D4E0` (Ethereal Blue) |
| Background | `#F2F0EA` (Moonlit Grey) |
| Typography | `clamp()` fluid scaling |
| Breakpoints | Mobile-first → 768px (tablet) → 1024px (desktop) |

## Sections

1. **Header / Nav** — Sticky top bar with logo, 3 nav links, CTA button, and responsive hamburger menu
2. **Hero** — "Build the Future" headline, subtext, two action buttons, abstract graphic
3. **Content Grid** — 4 expandable feature cards (image placeholder, title, description, 24px icon, expandable detail)
4. **Sidebar** — Quick Links panel + Contact box; repositions responsively
5. **Footer** — Copyright, Privacy Policy / Terms / Accessibility links

## Interactivity

- **Mobile drawer** — Hamburger toggle with animated icon, close on Escape / outside click
- **Active nav** — Click and scroll-based (IntersectionObserver) highlighting
- **Card expand** — Click or Enter/Space to expand/collapse detail content
- **Watch Demo modal** — Overlay with Play and Schedule buttons
- **Toast notifications** — Contextual feedback for all links, buttons, and actions
- **Reduced motion** — Respects `prefers-reduced-motion`

## File Structure

```
Task1/
├── index.html          # Single self-contained landing page (~30 KB)
├── README.md           # This file
└── Assets/             # Project assets
```

## Usage

Open `index.html` in any modern browser. No build step or server required.
