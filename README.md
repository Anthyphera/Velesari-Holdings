# Velesari Holdings Website

Static GitHub Pages website for Velesari Holdings, a privately funded and privately held private trading house using proprietary/internal capital with primary focus on Energy and Agriculture. Secondary review may include metals, logistics, infrastructure, and operating partnerships when those areas affect commodity movement, execution quality, or operating access.

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

- `home.html`: orientation and top-level mandate.
- `about.html`: firm identity, ownership posture, and relationship model.
- `method.html`: decision discipline and review sequence.
- `domains.html`: market focus, with Energy and Agriculture as primary sectors.
- `disclosures.html`: governance standards and legal boundaries.
- `contact.html`: categorized contact routing.
- `terms.html`: website terms.
- `privacy.html`: privacy notice.

## Shared Partials

- `header.html` contains the brand mark, primary navigation, skip link, and mobile navigation toggle.
- `footer.html` contains brand summary, page links, contact routing, and current year output.
- `site.js` must keep partial paths relative: `./header.html` and `./footer.html`.

## Homepage Content

Visible homepage copy belongs in `data/home.json`. Keep `home.html` as a stable shell with the expected mount IDs. Do not reintroduce duplicated homepage content directly into `home.html` unless the rendering contract is intentionally changed.

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
- Keep identity language restrained: privately funded, privately held, private trading house, proprietary/internal capital.
- Avoid unsupported claims about AUM, licenses, counterparties, regulated fund status, advisory services, brokerage services, trading volume, performance, transaction history, global offices, or guaranteed execution.

## Font And Analytics Rules

- Continue using Google Fonts unless the owner approves a later change.
- Keep the current family direction: `Cinzel` for display accents and `Inter` for readable interface/body copy.
- Preserve `preconnect` entries for Google Fonts.
- Do not add analytics, tracking scripts, cookies, pixels, or consent banners unless the owner explicitly chooses visitor tracking later.

## Validation Checklist

Run these checks before opening a pull request:

```bash
git diff --check
node --check site.js
node --check home.js
node -e "JSON.parse(require('fs').readFileSync('data/home.json','utf8')); console.log('JSON OK')"
```

Also verify:

- Local `href` and `src` references resolve.
- Every content page has one `h1`.
- Images have alt text and dimensions.
- No unintended binary files changed.
- No prohibited public claims or contact details were introduced.
- `header.html`, `footer.html`, and `data/home.json` load under a local static server.

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
