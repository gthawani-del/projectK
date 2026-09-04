# Krida Legal — projectK

Responsive desktop + mobile website rebuild for Krida Legal.

## Current structure
- Homepage
- Firm
- Expertise overview
- Sports & Gaming
- Intellectual Property
- Corporate & Commercial
- Dispute Resolution
- People directory
- Lawyer profiles
- Insights
- Contact
- Privacy / Terms / Disclaimer
- robots.txt / sitemap.xml / Vercel config

## Contact form
The production contact form posts to `/api/contact` and uses Resend through a Vercel serverless function.

Required Vercel environment variables:
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` (optional; defaults to the Resend onboarding sender)

The endpoint fails safely if these are not configured.

## Pre-launch requirements
1. Replace all provisional lawyer/profile copy with firm-approved content.
2. Have Krida Legal approve Privacy, Terms and Disclaimer copy.
3. Verify all practice descriptions against current law and firm scope.
4. Configure the contact environment variables in Vercel.
5. Run production Lighthouse, W3C Nu HTML Checker, axe/WCAG 2.2 AA checks, keyboard testing and responsive-device testing.
6. Add final approved photographic assets if required.
7. Confirm legacy URL → new URL 301 redirects before switching the live domain.

## Deployment
Static frontend with Vercel serverless API route. No database is required for the current website scope.
