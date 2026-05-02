# Velesari Holdings Website

Static GitHub Pages website for Velesari Holdings, a privately held client-side commercial access and diligence firm focused on commodity-linked sectors. The public positioning is global, professional, and approachable: commercial access, transparent engagement scope, documentation readiness, and risk-aware review for clients underserved by traditional large-scale commodity institutions.

Energy and Agriculture remain primary market areas. Secondary review may include metals, logistics, infrastructure, and operating partnerships when those areas affect commodity movement, availability, documentation, or operating access.

This repository is intentionally simple: static HTML, shared partials, CSS, JavaScript, JSON content, and committed image assets. Do not introduce frameworks, build tools, generated site output, analytics, cookies, or tracking scripts without an explicit owner decision.

## Deployment Model

- Hosted with GitHub Pages from the `main` branch.
- Custom domain is managed through `CNAME`.
- `index.html` routes visitors to `home.html`.
- All local paths should remain relative and GitHub Pages compatible.
- Production confirmation should happen after every merge by checking `https://velesari.trade` and the key page URLs.

## Static Architecture

- `index.html` redirects the root entry point to `home.html`.
- `home.html` is the homepage shell.
- `home.js` fetches `data/home.json` and renders homepage sections.
- `site.js` fetches and mounts `header.html` and `footer.html`.
- `styles.css` owns the visual system, layout, responsive behavior, focus states, and reduced-motion handling.
- `assets/` contains committed image assets used by the static pages.

## Page List

- `home.html`: orientation, commercial access positioning, service paths, and market focus.
- `about.html`: mission, market philosophy, audience, and responsible boundaries.
- `method.html`: Services page covering commercial access mandates, counterparty or service-provider discovery, commercial diligence, professional coordination, and implementation support.
- `domains.html`: Markets page, with Energy and Agriculture as primary sectors.
- `disclosures.html`: governance standards, legal boundaries, and risk controls.
- `contact.html`: categorized contact routing.
- `terms.html`: website terms.
- `privacy.html`: privacy notice.

## Shared Partials

- `header.html` contains the brand mark, primary navigation, skip link, and mobile navigation toggle.
- `footer.html` contains brand summary, page links, contact routing, and current year output.
- `site.js` must keep partial paths relative: `./header.html` and `./footer.html`.

## Homepage Content

Visible homepage section content belongs in `data/home.json`, with core headings and introductory copy mirrored in `home.html` so the page has a coherent shell before JSON rendering completes. Keep the expected mount IDs stable unless the rendering contract is intentionally changed.

## Asset Rules

- Use URL-safe, case-stable asset names.
- Keep image references relative, for example `./assets/example.png`.
- Do not rename image files without updating every reference and verifying case-sensitive paths.
- Do not add new images or modify binary assets without a specific approved scope.
- Every visible image should have useful alt text plus explicit `width` and `height`.

## Brand And Content Rules

- Public brand: Velesari Holdings.
- Do not show LLC in visible site copy.
- Do not display `tai@velesari.trade`.
- Do not use domain-as-branding such as `VELESARI.TRADE` in visible marketing copy.
- Use categorized contact channels only: General inquiries, Partnerships, and Legal & Compliance.
- Keep identity language restrained: privately held, client-side commercial access and diligence firm, transparent engagement scope, documentation readiness, and risk-aware review.
- Avoid unsupported claims about AUM, regulatory authorization, counterparties, regulated fund status, financial services, transaction services, trading volume, performance, transaction history, global offices, guaranteed access, or guaranteed execution.
- Do not imply the company is a regulated financial institution, exchange, logistics operator, warehouse operator, or public reporting company unless that status is separately documented and approved.
- Keep user-facing language accessible to private clients, smaller commercial participants, commercial buyers, operators, and businesses without sounding casual, promotional, or like financial advice.
- Do not reference non-public professional credentials or imply custody, transaction placement, external fundraising, regulated onboarding, or regulated client-service programs in public site copy or repository-facing documentation.

## Font And Analytics Rules

- Continue using Google Fonts unless the owner approves a later change.
- Keep the current family direction: `Cinzel` for display accents and `Inter` for readable interface/body copy.
- Preserve `preconnect` entries for Google Fonts.
- Do not add analytics, tracking scripts, cookies, pixels, or consent banners unless the owner explicitly chooses visitor tracking later.

## Validation Checklist

Run these checks before opening a pull request:

```bash
npm run qa:browser
git diff --check
node --check site.js
node --check home.js
node --check playwright.config.js
node --check tests/site.spec.js
node -e "JSON.parse(require('fs').readFileSync('data/home.json','utf8')); console.log('JSON OK')"
```

Also verify:

- Local `href` and `src` references resolve.
- Every content page has one `h1`.
- Images have alt text and dimensions.
- No unintended binary files changed.
- No prohibited public claims or contact details were introduced.
- `header.html`, `footer.html`, and `data/home.json` load under a local static server.
- Playwright and Axe browser QA pass across configured desktop and mobile projects.

## Post-Merge Live Verification

After merging to `main`, wait for the GitHub Pages deployment to complete, then verify:

- `https://velesari.trade`
- `/home.html`
- `/about.html`
- `/method.html`
- `/domains.html`
- `/disclosures.html`
- `/contact.html`
- `/terms.html`
- `/privacy.html`

Confirm:

- Pages return `200`.
- Root lands correctly.
- Header and footer load.
- Homepage JSON renders.
- Active image assets load.
- Markets and Governance content is current.
- No visible LLC, personal email, domain-as-branding, placeholder text, or unsupported claims are present.
- Browser QA shows no console errors, broken requests, horizontal overflow, sticky-header issues, or mobile-nav failures.

## Branch And PR Workflow

1. Start from updated `main`.
2. Create a focused feature branch.
3. Keep edits scoped to the approved phase.
4. Stage only intended files.
5. Commit with a clear message and body.
6. Push the branch and open a pull request into `main`.
7. Merge only after validation and owner/legal review items are satisfied.
8. Reconfirm production after GitHub Pages deploys.
