# Requirements Document

## Introduction

This document specifies the requirements for a complete visual redesign of the Built By Veterans website. The goal is to transform the current UI into a premium enterprise technology brand aesthetic (comparable to Apple, Mercedes AMG, Lockheed Martin, Linear.app) while preserving all existing functionality, page structure, URLs, SEO metadata, accessibility, content hierarchy, and responsive behavior. The redesign replaces the current blue-centric color palette with a dark/graphite/deep-red design language and introduces a reusable design system of shared tokens and components.

## Glossary

- **Design_System**: A collection of reusable CSS custom properties (tokens) and component classes that define colors, typography, spacing, shadows, borders, and interactive states for the entire site
- **Dashboard_Component**: The interactive HTML/CSS operations dashboard rendered in the homepage hero section, built with real markup (not an image)
- **Hero_Section**: The full-width introductory section at the top of the homepage containing the headline, CTAs, trust indicators, and the Dashboard_Component
- **Trust_Indicators**: The statistics strip below the hero headline displaying Veteran Owned, US Based, 24/7 Monitoring, and Mission Focused badges
- **Navigation_Bar**: The persistent site-wide header containing logo, navigation links, and CTA button
- **Service_Card**: A styled card component used to present individual IT services
- **Industry_Icon_Row**: A compact horizontal row of industry icons replacing the current large industry cards on the homepage
- **Trust_Logo_Bar**: A horizontal row of partner/vendor logos displayed with reduced opacity
- **Primary_CTA**: The main call-to-action button styled with deep red background, white text, rounded corners, and hover effects
- **Secondary_CTA**: The secondary action button styled with dark graphite background and white outline
- **Metallic_Gradient**: A text gradient effect using silver/white tones applied to hero headlines for a premium appearance
- **Glass_Effect**: A translucent layered appearance using semi-transparent backgrounds and subtle borders to create depth

## Requirements

### Requirement 1: Design System Foundation

**User Story:** As a developer, I want a centralized design system of reusable tokens and components, so that I can maintain visual consistency across all pages and make future updates efficiently.

#### Acceptance Criteria

1. THE Design_System SHALL define CSS custom properties for all color tokens: Primary Background (#050505), Secondary Background (#101114), Panels (#16181D), Borders (#2C3138), Primary Brand (#B70E18), Hover (#D91F2F), Metallic (#B7BDC7), White (#FFFFFF), Success (#22C55E)
2. THE Design_System SHALL define reusable typography tokens for font families, sizes, weights, line heights, and letter spacing that produce large, bold, high-contrast text
3. THE Design_System SHALL define spacing tokens for consistent padding, margins, gaps, and border-radius values across all components
4. THE Design_System SHALL define shadow tokens for subtle depth effects used on cards, buttons, and panels
5. THE Design_System SHALL define transition tokens for animation timing (fade, lift, glow, scale only)
6. THE Design_System SHALL replace all existing blue color values (#2f6cff, #78a6ff, #3b82f6) with the new palette equivalents throughout the stylesheet

### Requirement 2: Navigation Bar Redesign

**User Story:** As a visitor, I want a clean, premium navigation bar, so that I can access all site sections without distraction and always find the primary action.

#### Acceptance Criteria

1. THE Navigation_Bar SHALL display links for Services, Industries, About Us, and Resources in that order
2. THE Navigation_Bar SHALL display a Primary_CTA labeled "Schedule a Discovery Call" positioned on the right side
3. THE Navigation_Bar SHALL NOT display a link labeled "Contact" in the navigation links
4. WHEN the page first loads with the hero visible, THE Navigation_Bar SHALL render with a transparent background overlaying the hero section
5. WHEN the user scrolls past the hero section, THE Navigation_Bar SHALL become sticky at the top of the viewport with a solid dark background
6. THE Navigation_Bar SHALL preserve the existing mobile hamburger menu behavior for viewports below 900px

### Requirement 3: Hero Section Redesign

**User Story:** As a visitor, I want to see a visually striking hero section that communicates premium quality and trustworthiness, so that I immediately understand the brand's enterprise-level positioning.

#### Acceptance Criteria

1. THE Hero_Section SHALL maintain the existing two-column layout with headline content on the left and Dashboard_Component on the right
2. THE Hero_Section SHALL display a background using dark tones (#050505, #101114) with a subtle radial red glow and a very faint military-inspired texture (no camouflage patterns)
3. THE Hero_Section SHALL render the main headline text with the Metallic_Gradient effect (silver-to-white gradient on text, not flat white)
4. THE Hero_Section SHALL display the headline in large, bold typography with high contrast against the dark background
5. THE Hero_Section SHALL contain a Primary_CTA and a Secondary_CTA below the descriptive text
6. THE Hero_Section SHALL display Trust_Indicators (Veteran Owned, U.S. Based, 24/7/365 Monitoring, Mission Focused) with red-colored icons and white text

### Requirement 4: Dashboard Component

**User Story:** As a visitor, I want to see a realistic operations dashboard in the hero, so that I can immediately visualize the monitoring and management capabilities of the service.

#### Acceptance Criteria

1. THE Dashboard_Component SHALL be constructed entirely from HTML and CSS elements (not a static image)
2. THE Dashboard_Component SHALL include a left navigation rail, an overview header, statistic cards, a service status list, health indicators, and sparkline charts
3. THE Dashboard_Component SHALL use the color palette of black, graphite, silver, red, and green exclusively (no blue elements)
4. THE Dashboard_Component SHALL display rounded corners, spacing between elements, and a Glass_Effect on the outer container
5. THE Dashboard_Component SHALL render health status indicators using the Success color (#22C55E) for healthy states
6. THE Dashboard_Component SHALL maintain readable text at all rendered sizes

### Requirement 5: Button Styling

**User Story:** As a visitor, I want clearly differentiated action buttons that feel premium and responsive, so that I can identify and interact with calls to action confidently.

#### Acceptance Criteria

1. THE Primary_CTA SHALL display a deep red background (#B70E18), white text, rounded corners, and a subtle shadow
2. WHEN a user hovers over the Primary_CTA, THE Primary_CTA SHALL display a red glow effect and a vertical lift (translateY)
3. THE Secondary_CTA SHALL display a dark graphite background with a white outline border and white text
4. WHEN a user hovers over the Secondary_CTA, THE Secondary_CTA SHALL display a subtle lift effect

### Requirement 6: Service Cards Redesign

**User Story:** As a visitor, I want the services section to feel premium and spacious, so that I can easily scan offerings and identify the service I need.

#### Acceptance Criteria

1. THE Service_Card SHALL display increased padding, generous spacing between elements, and a large border-radius
2. THE Service_Card SHALL use soft shadows and subtle background gradients for depth
3. THE Service_Card SHALL display icons in silver/gray or red outlined style (no blue icons)
4. WHEN a user hovers over a Service_Card, THE Service_Card SHALL display a vertical lift, a subtle red border glow, and the icon SHALL transition to red
5. THE Service_Card SHALL preserve all existing text content and link destinations

### Requirement 7: Industries Section Conversion

**User Story:** As a visitor, I want a compact industries overview, so that I can quickly see which sectors are served without excessive scrolling.

#### Acceptance Criteria

1. THE Industry_Icon_Row SHALL replace the current large image-background industry cards on the homepage
2. THE Industry_Icon_Row SHALL display industry icons in a single horizontal row with labels beneath each icon
3. THE Industry_Icon_Row SHALL use silver/gray icons that transition to red on hover
4. THE Industry_Icon_Row SHALL preserve all existing industry names and link destinations
5. THE Industry_Icon_Row SHALL stack vertically on mobile viewports (below 900px)

### Requirement 8: Trust Logo Bar

**User Story:** As a visitor, I want to see recognized partner logos, so that I can trust that the company works with established technology vendors.

#### Acceptance Criteria

1. THE Trust_Logo_Bar SHALL display partner/vendor logos on a dark background (#050505 or #101114)
2. THE Trust_Logo_Bar SHALL render logos in white or grayscale at reduced opacity (approximately 50-60%)
3. WHEN a user hovers over a logo in the Trust_Logo_Bar, THE Trust_Logo_Bar SHALL transition that logo to 100% opacity
4. THE Trust_Logo_Bar SHALL preserve all existing vendor logos and their order

### Requirement 9: Animation Constraints

**User Story:** As a visitor, I want subtle, professional animations, so that the site feels polished without being distracting or flashy.

#### Acceptance Criteria

1. THE Design_System SHALL limit all animations to fade, lift (translateY), glow (box-shadow), and scale effects only
2. THE Design_System SHALL NOT include spinning, bouncing, parallax scrolling, or flashy transition effects
3. WHEN elements enter the viewport, THE Design_System SHALL apply a subtle fade-in with optional upward lift
4. THE Design_System SHALL define all animation durations between 150ms and 400ms

### Requirement 10: Performance Requirements

**User Story:** As a visitor, I want the site to load quickly on all devices, so that I have a smooth browsing experience without waiting.

#### Acceptance Criteria

1. THE Design_System SHALL NOT introduce heavy video files or unoptimized images
2. WHEN images are below the viewport fold, THE Design_System SHALL apply lazy loading via the loading="lazy" attribute
3. THE site SHALL achieve a Lighthouse Performance score above 90 on desktop
4. THE site SHALL use optimized, compressed images for all visual assets

### Requirement 11: Accessibility Compliance

**User Story:** As a visitor using assistive technology, I want the redesigned site to remain fully accessible, so that I can navigate and understand all content regardless of ability.

#### Acceptance Criteria

1. THE site SHALL maintain WCAG 2.1 AA compliance for all color contrast ratios (minimum 4.5:1 for normal text, 3:1 for large text)
2. THE site SHALL provide visible keyboard focus states on all interactive elements using the Primary Brand or Metallic color
3. THE site SHALL preserve all existing ARIA labels, semantic HTML structure, and heading hierarchy
4. THE site SHALL maintain full keyboard navigation support for all interactive components including the Navigation_Bar and mobile menu

### Requirement 12: Responsive Design Preservation

**User Story:** As a visitor on any device, I want the premium design to adapt properly to my screen size, so that the experience remains functional and visually appealing.

#### Acceptance Criteria

1. THE site SHALL display a desktop layout for viewports above 900px with multi-column grids
2. THE site SHALL display a single-column stacked layout for viewports at or below 900px
3. THE site SHALL preserve the existing 900px responsive breakpoint behavior
4. THE site SHALL maintain the premium dark aesthetic and proper spacing at all viewport sizes
5. THE site SHALL NOT introduce horizontal scrolling at any supported viewport width

### Requirement 13: Content and SEO Preservation

**User Story:** As a business owner, I want all existing SEO, metadata, and content hierarchy to remain intact after the redesign, so that search engine rankings and discoverability are not affected.

#### Acceptance Criteria

1. THE site SHALL preserve all existing page URLs without modification
2. THE site SHALL preserve all existing meta titles, meta descriptions, and structured data (schema markup)
3. THE site SHALL preserve all existing heading hierarchy (h1, h2, h3 structure) across all pages
4. THE site SHALL preserve all existing link destinations and anchor IDs
5. THE site SHALL preserve the existing sitemap.xml and rss.xml without modification

### Requirement 14: Global Dark Theme Application

**User Story:** As a visitor, I want a consistent dark premium aesthetic across all pages, so that the brand feels cohesive and intentional regardless of which page I visit.

#### Acceptance Criteria

1. THE site SHALL apply the Primary Background (#050505) as the default body background on all pages
2. THE site SHALL use white (#FFFFFF) as the primary text color and Metallic (#B7BDC7) as the secondary/muted text color
3. THE site SHALL use the Panels color (#16181D) for card and section backgrounds
4. THE site SHALL use the Borders color (#2C3138) for all border and divider elements
5. WHILE displaying any section that previously used a light/white background, THE site SHALL replace that background with Secondary Background (#101114) or Panels (#16181D)
