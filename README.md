# The Courtyard House

A cinematic, responsive, single-building architectural presentation. **No visitor accounts, CMS, authentication, database or server APIs.** Built with Next.js App Router, strict TypeScript, Tailwind CSS and GSAP, exported to static HTML/CSS/JavaScript for Vercel.

The current name, studio identity, copy, drawings and AI-generated renders are fictional demonstration content. Drawings are schematic and not to scale. No client images are required to run it.

## Local development

Use Node.js 24 LTS (24.15 or later) and npm. The project selects the Node 24 runtime on Vercel.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment variables or account configuration are needed.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run check:export
npm start
```

`build` exports the site to `out/`. `start` serves that export on port 3000; it does not run a Next.js backend. The Next.js default image optimization server is intentionally disabled. Supplied WebP images are already optimized. Keep `output: 'export'` in `next.config.ts`.

## Deploy to Vercel

1. Push this folder to a Git repository and import it in your Vercel account, or run `npx vercel` from this folder and follow its prompts.
2. Select the **Next.js** framework preset. The build command is `npm run build`. Keep the preset's automatic output configuration; Next.js static export produces `out/`.
3. No runtime secrets or services are required. The site itself has no account/login screens. A Vercel account is used only to manage hosting.
4. Optionally set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin (for example `https://your-domain.com`) for canonical and social-image URLs. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` only after replacing demo content and approving the public release. Both values are read at build time; rebuild after changing them.
5. Deploy and check `/`, `/#floorplans`, `/#interiors` and a nonexistent route. Connect your domain in Vercel project settings when ready.

Git pushes create new deployments. No content update requires a visitor login. There is no draft/publish service. Preview deployments should leave indexing disabled. `noindex` controls indexing, not access: the demo is public.

## Replace content and assets

- Edit **`src/data/project.ts`** for the studio/project name, gallery, floors, rooms, descriptions, material direction and optional contact/media. Editorial text is also in that file; section headings and presentation copy live in `src/app/page.tsx`.
- Replace images in **`public/images/`** and update their descriptive alt text/captions. Existing files: `house.webp`, `living.webp`, `bedroom.webp`, `detail.webp`. Remove fictional/demo disclosures only after replacing all demo content.
- Update metadata in `src/app/layout.tsx`; update the favicon in `src/app/icon.svg` if branding changes.
- Contact uses `project.contactEmail`. Until supplied, the finale links to the presentation note instead of a fake email address.
- Keep stable floor and room IDs. Each room belongs to one floor; hotspots reference room IDs on that floor. Set x/y as percentages of the **full, uncropped drawing**, from its top-left corner. Plan width/height describe the original aspect ratio. Recheck every marker after replacing a drawing.
- The explorer resets to the destination floor's first room when switching floors. It has keyboard tabs, numbered markers, a synchronized room list, a selected room panel, bounded zoom/pan and reset. On touch devices, ordinary scrolling works at 100%; zooming enables drag-to-pan inside the plan.
- Missing room images use a details-first fallback. Missing video/model modules stay hidden; the Experience chapter remains an editorial poster with a working gallery link.

For raster image replacement, export WebP at approximately 1600px wide (or an appropriate mobile/desktop resolution), with an appropriate quality setting. Do not bundle CAD/BIM masters or large uncompressed image sources. The optional `npm run assets:optimize` script reads local PNGs from ignored `assets-source/` and writes optimized WebP files; committed images work without those sources.

## Optional media

Uncomment and customize `project.video` and/or `project.model` in the data file, then rebuild.

- Video: trusted HTTPS direct MP4 URL, local/HTTPS poster, optional English WebVTT captions URL and transcript. Add captions/transcript when speech is present. Hosting must allow delivery to the website. The video element is created only after clicking Play; closing the dialog stops/unmounts it.
- Model: trusted HTTPS GLB URL, poster and text description. Use a compressed web export (target under 10 MB), not a production BIM file. The host must permit cross-origin loading; for GLTF with external files, those files must be available at the correct relative URLs. Prefer a self-contained GLB. Test actual assets on mobile before release.
- The React Three Fiber/Drei/Three.js viewer is dynamically imported only after clicking Explore in 3D. It has bounded orbit controls, zoom, reset, progress, no auto-rotation, and a static fallback for load/render failures. Its description and image gallery are the non-3D alternative.

## Accessibility and motion

Semantic sections, skip link, visible focus, native modal dialogs, Escape dismissal/focus restoration, room-list alternatives, and gallery arrows are included. Active chapters use IntersectionObserver. Native scrolling is retained. Reduced motion skips GSAP and CSS animation. Data-saving connections skip GSAP effects. Only wide fine-pointer desktop viewports get the short exterior pin; all primary content is server-rendered and visible if JavaScript is disabled.

## Release checks

Run lint, typecheck, tests and build. Check at 360/390/768/1024/1440/1920px, keyboard-only navigation, both floor selections, markers/room list, zoom reset, lightbox arrow keys/Escape, missing optional media and reduced motion. Test Safari/Firefox and a physical phone as well as Chromium. When actual video/models are added, test success/error/loading/CORS behavior with those assets. Check Lighthouse and real-user performance after deployment; lab checks alone do not establish the brief's percentile targets.

The automated suite includes plan-data validation and React interaction tests in JSDOM. Native dialog behavior, responsive layout, touch panning, animation appearance and WebGL still need visual checks in real browsers. Browser QA during implementation was unavailable because the computer-use tool could not reliably determine the current browser URL.

The scoped `minimatch` override in `package.json` updates ESLint's TypeScript parser dependency to the patched 11.x series. Lint/typecheck are verified against this combination; reassess the override when upstream dependencies adopt the fix.

## Demo imagery

Generated with the built-in image-generation tool. Prompts and provenance are recorded in `ASSETS.md`. Final optimized assets live inside this repository; no external stock-image request is needed at runtime.
