# Requirements Document

## Introduction

Redesign the Contact page for Built By Veterans to match the premium "Built By Veterans" design language. The page transitions from a generic contact form into a consulting-engagement-style experience that encourages visitors to schedule a 45-minute discovery call. The redesign communicates confidence, professionalism, trust, simplicity, enterprise-level IT consulting, and veteran discipline throughout every section.

## Glossary

- **Discovery_Page**: The redesigned page that replaces the current Contact page, serving as the primary scheduling entry point for prospective clients.
- **Hero_Section**: The top-most visual section of the Discovery_Page containing headline, supporting copy, trust badges, and an animated network map.
- **Network_Map**: A premium animated visual of the U.S. showing support coverage, connected offices, and monitoring nodes with subtle red animated connection lines.
- **Trust_Badges**: A horizontal strip of four value-proposition badges (Veteran Led, U.S. Based, 24/7 Support, Strategic IT Partner) displayed in the Hero_Section.
- **Contact_Cards**: Premium styled cards displaying phone, email, and service area information with metallic icons and hover effects.
- **Calendly_Widget**: The embedded third-party scheduling widget from Calendly used to book a 45-minute discovery call.
- **Coverage_Section**: The "What We'll Cover" section with four informational cards describing discovery call topics.
- **Differentiator_Section**: The "Why Businesses Choose Built By Veterans" grid section.
- **Metrics_Section**: The section displaying four key performance statistics.
- **Testimonial_Section**: The customer quote and logo section.
- **Final_CTA**: The full-width call-to-action banner at the bottom of the Discovery_Page.
- **Navigation**: The site-wide header navigation component shared across all pages.
- **Footer**: The site-wide footer component shared across all pages.
- **Design_System**: The shared set of color tokens, typography, spacing, shadows, and component styles defined in the project CSS custom properties.

## Requirements

### Requirement 1: Navigation Update

**User Story:** As a site visitor, I want the navigation to guide me toward scheduling a discovery call, so that I understand the primary action the company wants me to take.

#### Acceptance Criteria

1. THE Navigation SHALL remove the "Contact" text link from the desktop and mobile navigation menus.
2. THE Navigation SHALL display links in this order: Services, Industries, About Us, Resources.
3. THE Navigation SHALL display a CTA button labeled "Schedule a Discovery Call" as the final navigation element on desktop, visually distinct from the text navigation links by rendering it as a bordered or filled button style rather than plain text.
4. THE Navigation mobile menu SHALL replace the "Contact" link with a "Schedule a Discovery Call" CTA link that navigates to the Discovery_Page.
5. WHEN a visitor clicks the "Schedule a Discovery Call" CTA button in the Navigation, THE Navigation SHALL navigate the visitor to the Discovery_Page.
6. THE Navigation SHALL define Discovery_Page as the page containing the embedded scheduling widget (contact.html).

### Requirement 2: Hero Section

**User Story:** As a prospective client, I want to see a compelling hero section that communicates premium IT consulting, so that I feel confident engaging with this company.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a large metallic-gradient heading with the text "LET'S BUILD A BETTER IT STRATEGY." on the left column, using the Design_System metallic gradient token applied via background-clip text.
2. THE Hero_Section SHALL display supporting copy below the heading: "Whether you're replacing your current IT provider, planning growth, or solving ongoing technology challenges, our discovery session is designed to provide clear recommendations—not a sales pitch."
3. THE Hero_Section SHALL display four Trust_Badges (Veteran Led, U.S. Based, 24/7 Support, Strategic IT Partner) below the supporting copy in a horizontal row on viewports wider than 900px.
4. THE Hero_Section SHALL display the Network_Map on the right column occupying approximately 50% of the section width on desktop viewports.
5. THE Network_Map SHALL render an animated U.S. map visualization as an SVG or canvas element showing support coverage with connected offices and monitoring nodes using subtle red (#B70E18) animated connection lines with opacity no greater than 0.6.
6. WHEN the viewport width is 900px or less, THE Hero_Section SHALL stack the left and right columns vertically with the heading column appearing first.
7. WHEN the viewport width is 900px or less, THE Trust_Badges SHALL display in a two-column grid layout.

### Requirement 3: Discovery Call Booking Section

**User Story:** As a prospective client, I want to easily find contact information and book a discovery call, so that I can engage with Built By Veterans on my preferred channel.

#### Acceptance Criteria

1. THE Discovery_Page SHALL display three Contact_Cards on the left side of the Discovery Call section containing phone, email, and service area information.
2. THE phone Contact_Card SHALL display the number "(210) 830-4747" as a clickable telephone link and the availability "Mon–Fri 7 AM–6 PM CT".
3. THE email Contact_Card SHALL display the address "info@builtbyveterans.ai" as a clickable mailto link and the note "Average response < 1 business hour".
4. THE service area Contact_Card SHALL display "Texas Based" and "Supporting Businesses Nationwide".
5. WHEN a visitor hovers over a Contact_Card, THE Contact_Card SHALL display a box-shadow glow using the Design_System brand color and a 1px border using the Design_System brand color, with transition duration matching the Design_System base transition token.
6. THE Contact_Cards SHALL display metallic outlined icons using the Design_System metallic color token with a stroke-width between 1.5px and 2px and no fill.
7. THE Discovery_Page SHALL display the Calendly_Widget on the right side of the Discovery Call section.
8. THE Calendly_Widget SHALL be wrapped in a container with background color matching the Design_System bg-panel token and a 1px border using the Design_System border token.
9. THE Calendly_Widget container SHALL display a header reading "Discovery Call | 45 Minutes | No Sales Pressure | Strategic Technology Review".
10. THE Calendly_Widget container SHALL display four branded check items above the widget: "Technology Assessment", "Current Challenges", "Growth Planning", and "Security Review".
11. WHEN the Calendly_Widget loads successfully, THE Calendly_Widget SHALL allow visitors to select an available time slot and confirm a booking without navigating away from the Discovery_Page.
12. WHEN the viewport width is 900px or less, THE Contact_Cards SHALL stack vertically.
13. WHEN the viewport width is 900px or less, THE Calendly_Widget container SHALL display at full width below the Contact_Cards.
14. IF the Calendly_Widget fails to load within 10 seconds, THEN THE Discovery_Page SHALL display a fallback message indicating the scheduling tool is unavailable and providing the phone number and email as alternative contact methods.
15. THE Calendly_Widget container SHALL render with a minimum height of 660px to ensure the scheduling interface is fully visible without internal scrolling on viewports wider than 900px.

### Requirement 4: What We'll Cover Section

**User Story:** As a prospective client, I want to understand what topics the discovery call covers, so that I can prepare and feel confident the call will be valuable.

#### Acceptance Criteria

1. THE Coverage_Section SHALL display a heading with the text "What We'll Cover".
2. THE Coverage_Section SHALL display exactly four topic cards, each showing a title and a short description. The four card titles SHALL be: "Current IT Environment", "Business Goals", "Security & Compliance", and "Questions & Recommendations".
3. WHEN a visitor hovers over a Coverage_Section card, THE card SHALL translate upward by 4px with a transition duration of 250ms.
4. WHILE the viewport width is 900px or less, THE Coverage_Section cards SHALL display in a two-column grid layout.
5. WHILE the viewport width is 480px or less, THE Coverage_Section cards SHALL stack in a single-column layout.

### Requirement 5: Why Meet With Us Section

**User Story:** As a prospective client, I want to understand what differentiates Built By Veterans from other IT companies, so that I can evaluate whether this company aligns with my values.

#### Acceptance Criteria

1. THE Differentiator_Section SHALL display the title "Why Businesses Choose Built By Veterans".
2. THE Differentiator_Section SHALL display six items in a grid layout with three columns on viewports wider than 900px and two columns on viewports 900px or narrower: "Veteran Leadership", "Mission Focused", "Vendor Neutral", "Fast Response", "Business First", and "Long-Term Partnership".
3. THE Differentiator_Section SHALL display a metallic outlined icon (stroke-width 1.65px, no fill, metallic color #B7BDC7) and one descriptive sentence of no more than 20 words for each grid item.
4. WHEN a visitor hovers over a Differentiator_Section grid item, THE item SHALL translate upward by 4px with a transition duration of 250ms.

### Requirement 6: Success Metrics Section

**User Story:** As a prospective client, I want to see measurable proof of service quality, so that I can trust Built By Veterans delivers on their promises.

#### Acceptance Criteria

1. THE Metrics_Section SHALL display the following four statistics in left-to-right order: "<7 Min Average Response Time", "99.98% Managed System Uptime", "97% Customer Satisfaction", and "4,000+ Tickets Resolved".
2. THE Metrics_Section SHALL display each statistic as a numeric value rendered at a larger font size than its accompanying descriptive label, establishing a clear visual hierarchy between value and label.
3. THE Metrics_Section SHALL associate each numeric value with its descriptive label programmatically so that assistive technologies can identify each statistic as a distinct, labeled data point.

### Requirement 7: Customer Testimonial

**User Story:** As a prospective client, I want to read a real customer endorsement, so that I can see social proof of the company's service quality.

#### Acceptance Criteria

1. THE Testimonial_Section SHALL display the quote "Built By Veterans became an extension of our business—not just another IT company." within a semantic blockquote element.
2. THE Testimonial_Section SHALL attribute the quote to "SmileCrew Orthodontics" displayed below the quote text.
3. THE Testimonial_Section SHALL display the SmileCrew Orthodontics company logo adjacent to the attribution text, with alt text identifying the company name.
4. IF the SmileCrew Orthodontics logo image fails to load, THEN THE Testimonial_Section SHALL still display the attribution text "SmileCrew Orthodontics" without a broken image indicator.

### Requirement 8: Final Call-to-Action Banner

**User Story:** As a visitor who has scrolled through the page, I want a final prompt to schedule a call, so that I have a clear next step regardless of where I am on the page.

#### Acceptance Criteria

1. THE Final_CTA SHALL be positioned as the last content section before the page footer, spanning the full width of the page with a dark graphite background (#050505) and a red glow accent rendered as a box-shadow or radial gradient with no more than 20% opacity.
2. THE Final_CTA SHALL display the heading text "Ready to experience IT done differently?" centered within the section.
3. THE Final_CTA SHALL display a "Schedule Your Discovery Call" button using the primary button style (deep red background with a red box-shadow glow at no more than 30% opacity), and on hover the button SHALL translate upward by 2–4px.
4. WHEN a visitor clicks the Final_CTA button, THE Discovery_Page SHALL navigate the visitor to the Calendly_Widget section using a smooth scroll if the widget exists on the current page, or a standard link navigation to the contact page scheduling anchor if it does not.
5. THE Final_CTA button SHALL be keyboard-focusable and activatable via the Enter key, with a visible focus indicator that meets a minimum 3:1 contrast ratio against the surrounding background.

### Requirement 9: Footer Update

**User Story:** As a site visitor, I want the footer to reflect the new call-to-action language, so that the entire page experience feels cohesive.

#### Acceptance Criteria

1. THE Footer SHALL display "Book a Discovery Call" as the link text in the Company column where "Contact Us" previously appeared.
2. WHEN a visitor clicks the "Book a Discovery Call" link in the Footer Company column, THE System SHALL navigate to the contact page (contact.html).
3. THE Footer "Book a Discovery Call" link text and destination SHALL be consistent across all site pages that include the footer.

### Requirement 10: Visual Design System Compliance

**User Story:** As a brand stakeholder, I want the redesigned page to use the established premium design system, so that the page matches the homepage and maintains visual consistency.

#### Acceptance Criteria

1. THE Discovery_Page SHALL use background color #050505 as the primary page background.
2. THE Discovery_Page SHALL use panel color #16181D for card and container backgrounds.
3. THE Discovery_Page SHALL use #B70E18 as the primary accent color and #D91F2F as the hover accent color.
4. THE Discovery_Page SHALL use #FFFFFF as the primary text color and #AEB4BE as the secondary text color.
5. THE Discovery_Page SHALL use outlined icons with metallic coloring (#B7BDC7), red accents (#B70E18), and a stroke weight of 1.65px across all sections.
6. WHEN a visitor hovers over a primary button, THE Discovery_Page SHALL display the button with a deep red (#B70E18) background, a box-shadow glow of 0 0 24px rgba(183,14,24,0.4), and a translateY(-2px) upward lift.
7. THE Discovery_Page secondary buttons SHALL use a background of rgba(255,255,255,0.04) with a 1px solid rgba(255,255,255,0.18) border.
8. WHEN a visitor hovers over a card element, THE card SHALL lift upward by translateY(-4px).
9. WHEN a visitor hovers over a button element, THE button SHALL display a box-shadow glow using the brand color rgba(183,14,24,0.4) with a 24px spread.
10. THE Network_Map SHALL animate with a pulse effect using a CSS animation duration of no less than 3 seconds per cycle, and the animation SHALL NOT trigger motion-sensitivity warnings (respects prefers-reduced-motion media query).

### Requirement 11: Responsive Design

**User Story:** As a mobile visitor, I want the page to adapt cleanly to smaller screens, so that I have a usable and visually appealing experience on any device.

#### Acceptance Criteria

1. WHEN the viewport width is 900px or less, THE Hero_Section SHALL stack columns vertically.
2. WHEN the viewport width is 900px or less, THE Trust_Badges SHALL render in a two-column grid.
3. WHEN the viewport width is 900px or less, THE Contact_Cards SHALL stack vertically.
4. WHEN the viewport width is 900px or less, THE Calendly_Widget container SHALL render at 100% width of its parent container.
5. WHEN the viewport width is 900px or less, THE Coverage_Section cards SHALL render as a two-column grid with vertical scrolling.
6. WHILE the viewport width is 900px or less, THE Discovery_Page SHALL maintain a minimum body text size of 14px, a minimum touch-target size of 44x44px for all interactive elements, and no horizontal scrollbar on the viewport.
7. WHEN the viewport width is 900px or less, THE Discovery_Page navigation links SHALL be hidden and replaced by a visible menu-toggle button.

### Requirement 12: SEO, Accessibility, and Production Standards

**User Story:** As a site owner, I want the redesigned page to maintain search engine visibility and meet accessibility standards, so that I do not lose organic traffic or exclude users with disabilities.

#### Acceptance Criteria

1. THE Discovery_Page SHALL preserve the existing title tag text, meta description text, and canonical URL value so that their content is identical to the values present on the current production page prior to redesign.
2. THE Discovery_Page SHALL include structured data (schema.org) markup for a LocalBusiness or ProfessionalService entity containing at minimum the name, address, telephone, and url properties, and the markup SHALL pass the Google Rich Results Test without errors.
3. THE Discovery_Page SHALL use semantic HTML elements (header, main, section, footer, nav) and SHALL contain exactly one h1 element with subsequent headings following a sequential hierarchy (no skipped levels).
4. THE Discovery_Page SHALL provide non-empty alt text of no more than 125 characters for all informational images, and decorative images and SVGs SHALL use aria-hidden="true" with an empty alt attribute where applicable.
5. THE Discovery_Page SHALL maintain a minimum color contrast ratio of 4.5:1 for body text (below 18pt regular or 14pt bold) and 3:1 for large text (18pt regular or 14pt bold and above) against their backgrounds, conforming to WCAG 2.1 Level AA.
6. THE Discovery_Page SHALL ensure all interactive elements are reachable and operable via keyboard Tab and Enter/Space keys, and each focused element SHALL display a visible focus indicator with at least a 2px solid outline that meets a 3:1 contrast ratio against the adjacent background.
7. THE Discovery_Page SHALL use reusable components from the shared Design_System (buttons, cards, typography, spacing tokens).
8. THE Calendly_Widget iframe SHALL include a title attribute that identifies the purpose of the embedded content (e.g., "Schedule a Discovery Call") and is no longer than 80 characters.
