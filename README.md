# Small-Business Client Site Template

[![Live Site](https://img.shields.io/badge/Live_Site-Melbourne%20Plastering%20%E2%86%92-blue?style=for-the-badge)](https://sylvgira.github.io/melbourne-plastering/)


Astro starter for small client sites hosted on Cloudflare Pages and edited with Decap CMS. The template is intentionally neutral: start by changing content and CSS variables, then add brand-specific polish only where the client brief requires it.

## Stack

- Astro static site generation
- TypeScript
- Plain CSS custom properties
- Decap CMS at `/admin/`
- Cloudflare Pages static hosting from `dist`

## Quick Start

```sh
npm install
npm run dev
```

Useful scripts:

- `npm run dev`: local Astro dev server
- `npm run build`: type/content check and static build
- `npm run preview`: preview the built site

## Cloudflare Pages

Use these project settings:

- Framework preset: Astro
- Build command: `npm run build`
- Build output directory: `dist`
- Node version: use the current active LTS for new projects

This starter is static by default. Do not add `@astrojs/cloudflare` unless the client project needs SSR, server routes, or Pages Functions.

## Decap CMS

The CMS route is `src/pages/admin.astro`; config lives at `public/admin/config.yml` so Decap can load `/admin/config.yml`.

For local CMS editing:

```sh
npx decap-server
npm run dev
```

Then open `http://localhost:4321/admin/`.

For production, update `public/admin/config.yml`:

```yml
backend:
  name: github
  repo: owner/repository
  branch: main
```

Set up GitHub OAuth for Decap using your preferred provider. This starter documents the expected configuration but does not ship a custom Cloudflare OAuth function.

Media uploads are stored in `public/uploads` and published from `/uploads`.

Decap preview templates live in `public/admin/previews.js` with styles in `public/admin/preview.css`. They make the editor preview pane readable, but exact page review should happen on the Astro page itself after saving. See `CLIENT_EDITING.md` for the full local and production editing flow.

## Brand Swap Workflow

1. Update `src/content/settings/site.json`.
2. Edit brand primitives in `src/styles/tokens.css`.
3. Adjust semantic aliases in `src/styles/theme.css` only when component behavior should change globally.
4. Replace placeholder content in `src/content`.
5. Replace `public/uploads/placeholder.svg` with real client media.

## Third-Party Embeds

Use the `embeds` collection for flexible client-managed widgets such as Elfsight Instagram feeds, Google review widgets, maps, booking forms, or similar third-party sections.

Each embed entry can be managed in Decap CMS and includes a title, optional intro text, provider label, enabled toggle, display order, and raw embed code. The home page renders enabled entries through `src/components/EmbedSection.astro`.

Embed code is trusted admin-only content. It may include third-party scripts, so only give this CMS field to site admins who are allowed to add external provider code. Keep the entry disabled until the real client embed has been pasted and checked.

## Project Structure

- `src/components`: reusable site sections and UI primitives
- `src/content`: Decap-editable content collections
- `src/layouts`: document shell and site chrome
- `src/pages`: route files
- `src/styles`: design tokens and global styling
- `public/admin`: Decap CMS entry and config
- `public/uploads`: CMS media folder

## Block Variants

Run the preview server and open `/blocks/` to see the available component variants. This page is noindexed and intended for agents/builders, not primary navigation.

Client-safe homepage variant controls live in `src/content/pages/home.json` and Decap’s Pages collection. The template intentionally exposes layout choices such as hero style, media position, service layout, gallery layout, testimonial layout, and CTA layout while keeping brand tokens centralized in CSS.

## Launch Checklist

- Update site URL in `astro.config.mjs` and `src/content/settings/site.json`.
- Replace placeholder copy, contact details, and privacy content.
- Update Decap backend repo details.
- Confirm forms are wired to a real endpoint or remove the form.
- Run `npm run build`.
- Check every route on mobile and desktop.
