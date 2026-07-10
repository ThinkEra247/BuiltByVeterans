# Implementation Plan:

## Overview

Three main tasks to implement the contact page redesign: CSS additions, contact page rebuild, and global nav/footer updates across all site pages.

## Tasks

- [x] 1. Add discovery page CSS rules to stylesheet
  - Append all `.discovery-*` scoped CSS rules to the end of `assets/css/styles.css`
  - Include hero styles: `.discovery-hero`, `.discovery-hero-inner`, `.discovery-hero-left`, `.discovery-hero-right`, `.discovery-badges`
  - Include booking styles: `.discovery-booking`, `.discovery-card`, `.discovery-calendly`, `.discovery-calendly-header`, `.discovery-checklist`
  - Include coverage styles: `.discovery-cover`, `.discovery-cover-card`
  - Include differentiator styles: `.discovery-why`, `.discovery-why-item`
  - Include metrics styles: `.discovery-metrics`, `.discovery-metric`
  - Include testimonial styles: `.discovery-testimonial`
  - Include final CTA styles: `.discovery-final-cta`
  - Include network map SVG animation keyframes (`@keyframes pulse`, `@keyframes dash`)
  - Include `@media (prefers-reduced-motion: reduce)` rule to disable animations
  - Include responsive rules at `@media (max-width: 900px)` and `@media (max-width: 480px)` for all discovery sections
  - Verify all rules use existing CSS custom properties (design tokens) from `:root`
  - Requirements addressed: R2 (AC 1,3,4,5,6,7), R3 (AC 5,6,8,12,13,15), R4 (AC 3,4,5), R5 (AC 2,3,4), R6 (AC 2), R10 (AC 1-10), R11 (AC 1-6)

- [x] 2. Rebuild contact.html with new page structure
  - Rewrite `contact.html` with new section structure: hero, discovery booking, coverage, differentiators, metrics, testimonial, final CTA
  - Preserve existing `<head>` metadata (title, description)
  - Add `<script type="application/ld+json">` structured data for ProfessionalService
  - Use semantic HTML: `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, single `<h1>`
  - Hero section: metallic gradient heading, supporting copy, trust badges, inline SVG network map
  - Discovery booking section: three contact cards (phone as `tel:` link, email as `mailto:` link, service area) + Calendly widget in dark container with header and checklist
  - Calendly fallback: JS timeout that shows alternative contact info if widget doesn't load
  - Coverage section: "What We'll Cover" heading + four topic cards
  - Differentiator section: "Why Businesses Choose Built By Veterans" title + six-item grid with icons and descriptions
  - Metrics section: four statistics using `<dl>` for accessibility
  - Testimonial section: `<blockquote>` with quote, `<cite>` attribution, logo placeholder
  - Final CTA section: heading + button linking to `#discovery-booking` anchor
  - Footer: replace "Contact Us" with "Book a Discovery Call" in Company column
  - Navigation: remove "Contact" link from `.links` and `.mobile-nav`
  - Preserve Calendly external script tag at end of body
  - Add `id="discovery-booking"` to the booking section for smooth scroll target
  - All decorative SVGs use `aria-hidden="true"`, informational images have alt text
  - Calendly widget container includes `title="Schedule a Discovery Call"`
  - Requirements addressed: R1 (AC 1-6), R2 (AC 1-5), R3 (AC 1-4,7-11,14), R4 (AC 1,2), R5 (AC 1-3), R6 (AC 1,3), R7 (AC 1-4), R8 (AC 1-5), R9 (AC 1,2), R12 (AC 1-8)

- [x] 3. Update navigation and footer across all site pages
  - Remove `<a href="contact.html">Contact</a>` from `.links` nav in: `index.html`, `about.html`, `services.html`, `industries.html`, `resources.html`, `guides.html`, `insights.html`, `news.html`
  - Remove `<a href="/contact.html">Contact</a>` from `.mobile-nav` in same files
  - Remove "Contact" link from nav in `industries/*.html` (dental, healthcare, law, professional-services)
  - Remove "Contact" link from nav in `services/*.html` (cloud-solutions, managed-it, ransomware-protection, strategic-it)
  - Replace "Contact Us" footer link text with "Book a Discovery Call" in all above files (keep `href="contact.html"`)
  - Remove inline `style="color:var(--brand)"` from the footer link where present
  - Requirements addressed: R1 (AC 1-5), R9 (AC 1-3)

## Task Dependency Graph

```json
{
  "waves": [
    {"wave": 1, "tasks": [1, 3]},
    {"wave": 2, "tasks": [2]}
  ]
}
```

## Notes

- Task 1 must complete before Task 2 so that the new page has styles available.
- Task 3 is independent and can be done in parallel with Task 2.
- The Calendly external script URL must not be modified.
- Navigation change is global — every HTML file in the project needs the "Contact" link removed.
