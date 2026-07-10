# Implementation Plan: Website Redesign V2

## Overview

Transform the Built By Veterans website from a blue-centric color palette to a premium dark/graphite/deep-red enterprise aesthetic. The implementation is CSS-first with minimal targeted HTML changes and a small JavaScript addition for scroll-based navigation and viewport animations. All content, SEO metadata, URLs, and functionality are preserved.

## Tasks

- [x] 1. Design System Foundation — CSS Custom Properties and Global Resets
  - [x] 1.1 Replace all existing CSS custom properties in `:root` with the new design token system
    - Open `assets/css/styles.css` and replace/add all `:root` custom properties with the full token set from the design document
    - Tokens include: color tokens (--bg-primary, --bg-secondary, --bg-panel, --border, --brand, --brand-hover, --metallic, --white, --success, --text-primary, --text-muted), typography tokens (--font-family, --font-size-hero through --font-size-eyebrow, --font-weight-bold, --font-weight-medium, --line-height-tight, --line-height-normal, --letter-spacing-tight), spacing tokens (--space-xs through --space-xl, --radius-sm through --radius-lg), shadow tokens (--shadow-card, --shadow-btn, --shadow-panel), and transition tokens (--transition-fast, --transition-base, --transition-slow)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 1.2 Remove all old blue color values from the stylesheet
    - Search and replace all instances of #2f6cff, #78a6ff, #3b82f6, rgba(47,108,255,...) variants, and any other blue-palette values throughout `assets/css/styles.css`
    - Replace with appropriate new palette equivalents: brand red for accent/active states, metallic for neutral highlights, success green where green was used
    - _Requirements: 1.6_

  - [x] 1.3 Apply global dark theme base styles
    - Set `body` background to `var(--bg-primary)` (#050505)
    - Set primary text color to `var(--text-primary)` (#FFFFFF) and secondary/muted text to `var(--text-muted)` (#B7BDC7)
    - Replace any section using light/white backgrounds with `var(--bg-secondary)` or `var(--bg-panel)`
    - Set card/panel backgrounds to `var(--bg-panel)` (#16181D)
    - Set all borders/dividers to `var(--border)` (#2C3138)
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

  - [x] 1.4 Add animation utility classes and keyframe definitions
    - Add `.fade-in` class: `opacity: 0; transform: translateY(16px); transition: opacity var(--transition-slow), transform var(--transition-slow);`
    - Add `.fade-in.visible` class: `opacity: 1; transform: translateY(0);`
    - Ensure all animation durations stay within 150ms–400ms range
    - Only use fade, lift (translateY), glow (box-shadow), and scale effects
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 1.5 Add progressive enhancement fallbacks
    - Add `@supports` query for `backdrop-filter`: provide solid `var(--bg-panel)` fallback background when unsupported
    - Add `@supports` query for `-webkit-background-clip: text`: fallback to `color: var(--white)` when gradient text is unsupported
    - Add `<noscript>` style or CSS-only fallback for fade-in elements to default to `opacity: 1` when JS is disabled
    - _Requirements: 11.1, 11.3_

- [x] 2. Navigation Bar Redesign
  - [x] 2.1 Update Navigation_Bar CSS for transparent-to-solid scroll behavior
    - Style the default nav state with transparent background: `background: transparent; border-bottom: 1px solid rgba(255,255,255,0.08);`
    - Style the `.nav-scrolled` class with: `background: var(--bg-primary); backdrop-filter: blur(18px); border-bottom: 1px solid var(--border);`
    - Add `position: sticky; top: 0; z-index: 1000;` for scroll behavior
    - Style the nav CTA button as Primary_CTA (red background, white text)
    - Ensure `transition: var(--transition-base)` on background and border properties
    - _Requirements: 2.1, 2.2, 2.4, 2.5_

  - [x] 2.2 Add `data-nav-transparent` attribute to navigation headers across all HTML pages
    - Add the `data-nav-transparent` attribute to the `<header>` element on every page that has a hero section
    - Ensure no "Contact" link appears in the main navigation links (only in the CTA)
    - Verify navigation link order: Services, Industries, About Us, Resources
    - _Requirements: 2.1, 2.3, 2.4_

  - [x] 2.3 Add keyboard focus states for all interactive navigation elements
    - Apply visible focus outline using `var(--brand)` or `var(--metallic)` color on all nav links, CTA buttons, and mobile menu triggers
    - Use `outline: 2px solid var(--brand); outline-offset: 2px;` or equivalent visible indicator
    - Ensure mobile hamburger menu retains existing behavior at viewports below 900px
    - _Requirements: 2.6, 11.2, 11.4_

- [x] 3. Checkpoint - Verify foundation and navigation
  - Ensure all CSS tokens are applied, no blue values remain, navigation scrolls correctly, and dark theme is consistent. Ask the user if questions arise.

- [x] 4. Hero Section Redesign
  - [x] 4.1 Update Hero_Section background and layout styles
    - Apply background: `radial-gradient(circle at 70% 20%, rgba(183,14,24,0.12), transparent 40%), linear-gradient(135deg, #050505, #101114)`
    - Add faint grid texture overlay using repeating `linear-gradient` at very low opacity (~0.02)
    - Maintain existing two-column layout (headline left, dashboard right)
    - _Requirements: 3.1, 3.2_

  - [x] 4.2 Implement Metallic_Gradient effect on hero headline
    - Apply to the main H1: `background: linear-gradient(135deg, #B7BDC7, #FFFFFF, #B7BDC7); -webkit-background-clip: text; background-clip: text; color: transparent;`
    - Style headline with large, bold typography: `font-size: var(--font-size-hero); font-weight: var(--font-weight-bold); line-height: var(--line-height-tight); letter-spacing: var(--letter-spacing-tight);`
    - _Requirements: 3.3, 3.4_

  - [x] 4.3 Style Hero CTAs and Trust_Indicators
    - Style Primary_CTA: `background: var(--brand); color: #fff; border-radius: var(--radius-sm); box-shadow: var(--shadow-btn);`
    - Style Secondary_CTA: `background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.18); color: #fff;`
    - Style Trust_Indicators with red-colored icons and white text
    - _Requirements: 3.5, 3.6, 5.1, 5.2, 5.3, 5.4_

- [x] 5. Dashboard Component Restyling
  - [x] 5.1 Update Dashboard_Component color palette from blue to brand colors
    - Replace all `#3b82f6`, `var(--blue)` sparkline colors with `var(--brand)` or `var(--metallic)`
    - Replace `rgba(47,108,255,...)` glow effects with `rgba(183,14,24,...)` red tones
    - Replace `#79a4ff` active nav indicator with `var(--brand)`
    - Keep green status indicators as `var(--success)` (#22C55E)
    - _Requirements: 4.1, 4.2, 4.3, 4.5_

  - [x] 5.2 Apply Glass_Effect to Dashboard_Component container
    - Set outer container: `background: rgba(22,24,29,0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); border-radius: var(--radius-lg);`
    - Ensure rounded corners and proper spacing between internal elements
    - Ensure text remains readable at all rendered sizes
    - _Requirements: 4.4, 4.6_

- [x] 6. Button Components
  - [x] 6.1 Implement Primary_CTA and Secondary_CTA button styles globally
    - Primary_CTA: `background: var(--brand); border: 1px solid var(--brand); color: #fff; border-radius: var(--radius-sm); box-shadow: var(--shadow-btn);`
    - Primary_CTA hover: `box-shadow: 0 0 24px rgba(183,14,24,0.4); transform: translateY(-2px);`
    - Secondary_CTA: `background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.18); color: #fff;`
    - Secondary_CTA hover: `transform: translateY(-2px); border-color: rgba(255,255,255,0.35);`
    - Add visible keyboard focus states using brand red or metallic outline
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 11.2_

- [x] 7. Service Cards Redesign
  - [x] 7.1 Update Service_Card component styles
    - Apply background: `var(--bg-panel)` with subtle gradient overlay
    - Apply border: `1px solid var(--border)`; border-radius: `var(--radius-lg)`
    - Increase padding and spacing between card elements
    - Style icons in silver/gray (`var(--metallic)`) default color
    - Add hover state: `transform: translateY(-4px); border-color: rgba(183,14,24,0.4); box-shadow: 0 0 20px rgba(183,14,24,0.15);`
    - Icon hover transition: change color to `var(--brand)` on card hover
    - Preserve all existing text content and link destinations
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 8. Industries Section Conversion
  - [x] 8.1 Replace homepage industry cards with Industry_Icon_Row HTML markup
    - Replace the existing `.industry-grid` large image-background cards on `index.html` with the new `.industry-icon-row` markup
    - Use the provided icon SVGs (icon-dental.svg, icon-healthcare.svg, icon-law.svg, icon-professional.svg)
    - Each item: `<a>` wrapping `<img>` + `<span>` with industry label
    - Preserve all existing industry names and link destinations
    - _Requirements: 7.1, 7.2, 7.4_

  - [x] 8.2 Style Industry_Icon_Row component
    - Layout: flexbox row, centered, gap 48px
    - Icons: `width: 48px`, default `filter: grayscale(1) brightness(2); opacity: 0.7;`
    - Hover: icons transition to red color / full color
    - Responsive: stack vertically at viewports ≤ 900px
    - _Requirements: 7.3, 7.5_

- [x] 9. Checkpoint - Verify hero, dashboard, buttons, service cards, and industries
  - Ensure hero gradient renders correctly, dashboard has no blue, buttons show correct hover states, service cards animate on hover, and industry icons display properly. Ask the user if questions arise.

- [x] 10. Trust Logo Bar
  - [x] 10.1 Update Trust_Logo_Bar styles
    - Set container background: `var(--bg-primary)` or `var(--bg-secondary)`
    - Apply logo default state: `filter: grayscale(1) brightness(2); opacity: 0.55;`
    - Apply logo hover state: `opacity: 1; filter: grayscale(0);` with `transition: var(--transition-base)`
    - Preserve all existing vendor logos and their order
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [x] 11. JavaScript Enhancements
  - [x] 11.1 Add Intersection Observer for navigation scroll behavior
    - In `assets/js/main.js`, create an Intersection Observer that watches the `.hero` section
    - When hero leaves viewport, add `.nav-scrolled` class to the `<header>` element
    - When hero re-enters viewport, remove `.nav-scrolled` class
    - Ensure navigation defaults to solid dark background when JS is disabled
    - _Requirements: 2.4, 2.5_

  - [x] 11.2 Add Intersection Observer for viewport fade-in animations
    - Create a second observer that watches all elements with `.fade-in` class
    - When elements enter the viewport, add `.visible` class to trigger the CSS transition
    - Use `threshold: 0.1` or similar for triggering slightly before full visibility
    - _Requirements: 9.3_

- [x] 12. Performance and Lazy Loading
  - [x] 12.1 Add `loading="lazy"` to all below-fold images across all HTML pages
    - Audit all HTML pages (index.html, about.html, services.html, contact.html, guides.html, insights.html, news.html, resources.html, industries.html, and all subpages)
    - Add `loading="lazy"` to every `<img>` element that is positioned below the initial viewport fold
    - Do NOT add lazy loading to hero images or above-fold content
    - _Requirements: 10.1, 10.2, 10.4_

- [x] 13. Responsive Design Verification and Fixes
  - [x] 13.1 Verify and fix responsive behavior at 900px breakpoint
    - Ensure desktop layout (multi-column grids) above 900px
    - Ensure single-column stacked layout at or below 900px
    - Verify Industry_Icon_Row stacks vertically at ≤ 900px
    - Verify Navigation_Bar mobile hamburger menu works below 900px
    - Ensure dark premium aesthetic and proper spacing at all viewport sizes
    - Ensure no horizontal scrolling at any viewport between 320px and 1920px
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 14. Accessibility and Focus States
  - [x] 14.1 Audit and apply keyboard focus states to all interactive elements
    - Apply visible focus outline (`outline: 2px solid var(--brand); outline-offset: 2px;` or metallic variant) to all links, buttons, and form inputs across all pages
    - Verify all ARIA labels and semantic HTML structure are preserved
    - Verify heading hierarchy (h1–h6 sequence) is unchanged across all pages
    - Verify all existing link destinations and anchor IDs are preserved
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [x] 15. Content and SEO Preservation Verification
  - [x] 15.1 Verify SEO and content preservation across all pages
    - Confirm all page URLs remain unchanged
    - Confirm all meta titles, meta descriptions are unchanged
    - Confirm heading hierarchy is intact on every page
    - Confirm sitemap.xml and rss.xml are not modified
    - Confirm all link `href` values and `id` attributes match pre-redesign
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [x] 16. Checkpoint - Full integration verification
  - Ensure all pages render with consistent dark theme, no residual blue values, all animations work correctly, navigation scroll behavior functions, responsive layout adapts properly, and no horizontal overflow exists. Ask the user if questions arise.

- [ ]* 17. Automated Verification Tests
  - [ ]* 17.1 Write verification script for Property 1: No residual blue colors
    - **Property 1: No residual blue colors**
    - Create a script that parses `assets/css/styles.css` and verifies no instances of #2f6cff, #78a6ff, #3b82f6, or rgba(47,108,255,...) variants remain
    - **Validates: Requirements 1.6, 4.3, 6.3**

  - [ ]* 17.2 Write verification script for Property 4: WCAG AA contrast compliance
    - **Property 4: WCAG AA contrast compliance**
    - Create a script that calculates contrast ratios for all defined color pairs (white on bg-primary, metallic on bg-primary, white on brand) and verifies they meet WCAG 2.1 AA minimums (4.5:1 for normal text, 3:1 for large text)
    - **Validates: Requirements 11.1**

  - [ ]* 17.3 Write verification script for Property 2: Animation type and duration constraints
    - **Property 2: Animation type and duration constraints**
    - Create a script that parses the stylesheet and verifies (a) only opacity, transform(translateY), transform(scale), and box-shadow properties are animated, and (b) all duration values are between 150ms and 400ms
    - **Validates: Requirements 9.1, 9.2, 9.4**

  - [ ]* 17.4 Write verification script for Property 3: Below-fold images use lazy loading
    - **Property 3: Below-fold images use lazy loading**
    - Create a script that checks all HTML files and verifies every `<img>` element not in a hero section has `loading="lazy"` attribute
    - **Validates: Requirements 10.2**

- [x] 18. Final Checkpoint - Complete redesign verification
  - Ensure all tests pass, all pages are visually consistent with the premium dark/graphite/deep-red aesthetic, no regressions exist, and the user is satisfied. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at logical breaks
- The design uses CSS/HTML/JavaScript directly — no build step or framework is needed
- All changes preserve existing SEO metadata, URLs, and content hierarchy
- The Industry_Icon_Row (Task 8) is the only significant HTML structural change; all other changes are CSS/JS
- Progressive enhancement ensures the site works without JavaScript and in browsers lacking `backdrop-filter` support

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["1.4", "1.5", "2.1"] },
    { "id": 3, "tasks": ["2.2", "2.3", "4.1", "6.1"] },
    { "id": 4, "tasks": ["4.2", "4.3", "5.1", "7.1", "8.1", "10.1"] },
    { "id": 5, "tasks": ["5.2", "8.2", "11.1", "11.2"] },
    { "id": 6, "tasks": ["12.1", "13.1", "14.1"] },
    { "id": 7, "tasks": ["15.1"] },
    { "id": 8, "tasks": ["17.1", "17.2", "17.3", "17.4"] }
  ]
}
```
