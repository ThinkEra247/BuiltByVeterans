# Technical Design Document

## Overview

Redesign the `contact.html` page into a premium discovery-call experience that matches the existing homepage visual language. This is a single-page HTML/CSS rebuild using the project's established design tokens, existing stylesheet patterns, and inline SVG icon approach.

No new JavaScript frameworks, build tools, or dependencies are introduced. The redesign modifies one HTML file (`contact.html`), appends new CSS rules to the existing stylesheet (`assets/css/styles.css`), and updates navigation/footer text across all site pages.

## Architecture

The redesign modifies one HTML file (`contact.html`) and appends new CSS rules to the existing stylesheet (`assets/css/styles.css`). Navigation and footer updates are applied globally across all site HTML files. No new JavaScript frameworks, build tools, or dependencies are introduced.

```
contact.html (full rewrite)
├── <header> — Navigation (remove "Contact" link)
├── <main>
│   ├── Hero Section (two-column: copy + network map SVG)
│   ├── Discovery Call Section (two-column: contact cards + Calendly)
│   ├── What We'll Cover Section (four-column card grid)
│   ├── Why Meet With Us Section (six-item grid)
│   ├── Success Metrics Section (four-stat row)
│   ├── Customer Testimonial Section (blockquote)
│   └── Final CTA Section (full-width banner)
├── <footer> — Updated link text
└── Calendly external script (preserved)

assets/css/styles.css (append new rules)
└── .discovery-* scoped class rules
```

## Components and Interfaces

### File Change Map

| File | Action | Scope |
|------|--------|-------|
| `contact.html` | Full rewrite | Entire file content |
| `assets/css/styles.css` | Append | Add `.discovery-*` scoped rules at end of file |
| `index.html` | Minor edit | Remove "Contact" from nav, update footer link text |
| `about.html` | Minor edit | Remove "Contact" from nav, update footer link text |
| `services.html` | Minor edit | Remove "Contact" from nav, update footer link text |
| `industries.html` | Minor edit | Remove "Contact" from nav, update footer link text |
| `resources.html` | Minor edit | Remove "Contact" from nav, update footer link text |
| `guides.html` | Minor edit | Remove "Contact" from nav, update footer link text |
| `insights.html` | Minor edit | Remove "Contact" from nav, update footer link text |
| `news.html` | Minor edit | Remove "Contact" from nav, update footer link text |
| `industries/*.html` | Minor edit | Remove "Contact" from nav, update footer link text |
| `services/*.html` | Minor edit | Remove "Contact" from nav, update footer link text |

### Section Components

#### Navigation (shared across all pages)

Remove the `<a href="contact.html">Contact</a>` link from `.links` nav and `.mobile-nav`. The CTA button already links to `contact.html` — no change needed there.

#### Hero Section — `.discovery-hero`

```html
<section class="discovery-hero">
  <div class="container discovery-hero-inner">
    <div class="discovery-hero-left">
      <h1>LET'S BUILD A BETTER IT STRATEGY.</h1>
      <p>Supporting copy...</p>
      <div class="discovery-badges">
        <span>Veteran Led</span>
        <span>U.S. Based</span>
        <span>24/7 Support</span>
        <span>Strategic IT Partner</span>
      </div>
    </div>
    <div class="discovery-hero-right">
      <!-- Inline SVG U.S. network map with CSS animation -->
    </div>
  </div>
</section>
```

Layout: CSS Grid `grid-template-columns: 1fr 1fr` on desktop, single column on ≤900px.

The network map is a pure SVG with animated dots/lines using CSS `@keyframes`. No JavaScript animation library needed. Uses `prefers-reduced-motion` media query to disable animations.

#### Discovery Call Section — `.discovery-booking`

Two-column grid layout:
- **Left column**: Three `.discovery-card` elements (phone, email, service area)
- **Right column**: `.discovery-calendly` wrapper with header, checklist, and Calendly embed

Each card follows the existing `.card` pattern but uses `.discovery-card` class for scoped styles. Calendly widget preserves existing `data-url` and external script tag.

#### What We'll Cover — `.discovery-cover`

Four-column CSS Grid on desktop, two-column on ≤900px, single-column on ≤480px. Cards follow existing `.card` pattern with `.discovery-cover-card` scoped class.

#### Why Meet With Us — `.discovery-why`

Six-item grid: `grid-template-columns: repeat(3, 1fr)` on desktop, `repeat(2, 1fr)` on ≤900px. Follows existing `.why-card` pattern with `.discovery-why-item` class.

#### Success Metrics — `.discovery-metrics`

Four-item flex/grid row using `<dl>` elements for semantic association of values and labels.

#### Customer Testimonial — `.discovery-testimonial`

Uses `<blockquote>` with `<cite>` and an adjacent logo image. Graceful degradation if logo unavailable.

#### Final CTA — `.discovery-final-cta`

Full-width section with centered text and button. Button links to `#discovery-booking` anchor for smooth scroll. Red glow via `box-shadow` and `radial-gradient` pseudo-element.

### CSS Strategy

All new rules scoped under `.discovery-*` class names. Reuses existing design tokens:
- Colors: `var(--bg-primary)`, `var(--bg-panel)`, `var(--brand)`, `var(--brand-hover)`, `var(--text-primary)`, `var(--text-muted)`, `var(--metallic)`, `var(--border)`
- Spacing: `var(--space-xs)` through `var(--space-xl)`
- Shadows: `var(--shadow-card)`, `var(--shadow-btn)`
- Transitions: `var(--transition-base)`, `var(--transition-fast)`
- Radii: `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-lg)`

## Data Models

### Schema.org Structured Data

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Built By Veterans",
  "telephone": "+1-210-830-4747",
  "email": "info@builtbyveterans.ai",
  "url": "https://builtbyveterans.ai",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "TX",
    "addressCountry": "US"
  },
  "areaServed": "US",
  "description": "Veteran-led managed IT services, cybersecurity, and cloud solutions."
}
```

### Network Map SVG Data Points

Static coordinates for animated nodes (approximate U.S. city positions):
- San Antonio (primary office)
- Dallas, Houston, Austin (TX coverage)
- Additional nodes for nationwide coverage visualization

## Error Handling

### Calendly Widget Fallback

```javascript
setTimeout(() => {
  const widget = document.querySelector('.calendly-inline-widget iframe');
  if (!widget) {
    document.querySelector('.discovery-calendly-fallback').style.display = 'block';
  }
}, 10000);
```

If Calendly fails to load within 10 seconds, a fallback block displays phone and email as alternative contact methods.

### Image Fallback (Testimonial Logo)

If no SmileCrew logo file exists, the attribution renders as text-only. The `<img>` tag uses `onerror` to hide itself if the image fails to load.

## Correctness Properties

### Property 1: Calendly Integrity
The Calendly `data-url` and external widget script must remain unchanged to preserve booking functionality.
**Validates: Requirements 3.11**

### Property 2: SEO Preservation
The page `<title>` and `<meta name="description">` must match existing values exactly.
**Validates: Requirements 12.1**

### Property 3: Heading Hierarchy
Only one `<h1>` element per page, with heading levels not skipping (h1 → h2 → h3).
**Validates: Requirements 12.3**

### Property 4: Keyboard Accessibility
All interactive elements (links, buttons) must be reachable via keyboard Tab and have visible focus indicators.
**Validates: Requirements 12.6**

### Property 5: Color Contrast
Body text on dark backgrounds ≥ 4.5:1 contrast ratio, large text ≥ 3:1.
**Validates: Requirements 12.5**

### Property 6: Motion Safety
Network map animation respects `prefers-reduced-motion: reduce`.
**Validates: Requirements 10.10**

## Testing Strategy

1. **Visual check**: Open `contact.html` in browser, verify all sections render with correct colors, spacing, and typography matching the homepage.
2. **Responsive check**: Resize to ≤900px and ≤480px; verify stacking, grid changes, and no horizontal overflow.
3. **Calendly functional check**: Confirm widget loads and time slots are selectable.
4. **Keyboard navigation**: Tab through all interactive elements; confirm visible focus rings.
5. **Navigation consistency**: Spot-check 3–4 other pages to confirm "Contact" is removed from nav and footer says "Book a Discovery Call".
6. **Reduced motion**: Enable `prefers-reduced-motion` in dev tools; confirm animations stop.
7. **Schema validation**: Copy structured data JSON-LD into Google Rich Results Test tool.
