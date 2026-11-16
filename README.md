# The Residence

A client architectural presentation built from all 48 supplied renders and both supplied floor plans. Static Next.js, TypeScript, Tailwind and GSAP; no CMS, login, database or backend runtime.

## Run and verify

Use Node.js 24 LTS (24.15+).

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
npm run typecheck
npm run check:export
npm start
```

Development: http://localhost:3000. Production export: `out/`.

## Content and images

The source image inventory is `src/data/renders.json`; a matching manifest ships in `public/residence/manifest.json`. All 48 originals are individually represented, including both similar Balcony 3 variants. Each has a SHA-256 checksum and 640/1280/1920/2560px WebP copies. Original PNG files are not modified or uploaded.
To rebuild copies from the original directory:

```sh
node scripts/import-renders.mjs "C:/Users/Windows 11/Downloads/japan perspectives"
```

The importer checks for 48 PNGs and groups them by their original filenames. Page narrative is in `src/app/page.tsx`; collection configuration is in `src/data/project.ts`. Room numbers follow source filenames. Location, dimensions and verified material specifications are not inferred. English presentation includes supporting Japanese chapter and room labels.

Floor plans appear after the arrival sequence and before the room gallery. Ground Floor / 1階 and Second Floor / 2階 have uncropped previews, static bilingual room lists, and an enlarged viewer with 100–300% zoom, scrolling, fit reset and keyboard-accessible controls. A short fade respects reduced motion. Existing `#floorplans` links still target the room gallery; `#layout` targets the plans.
Rebuild plan assets using `node scripts/import-floorplans.mjs "C:/Users/Windows 11/Downloads/FLOOR PLANSS"`. The separate floor-plan manifest records checksums and floor associations from the supplied artwork. Original PNG copies load only when the enlarged viewer is open.

The explorer includes 23 space groups, category controls, angle thumbnails, previous/next, touch swipe, a complete collection, and a native modal lightbox. Full-resolution files load only while the lightbox is open. Original aspect ratios are preserved in the hero, arrival sequence, explorer and lightbox.

## Motion and verification limits

GSAP provides opening/reveal animations and one short desktop arrival crossfade sequence. Desktop pinning requires a fine pointer and a viewport at least 1200px wide and 720px tall. Touch, reduced-motion and data-saving environments keep ordinary readable content. Native anchor navigation includes a skip link around the sequence. All base content stays visible without animation JavaScript.

Automated checks cover all source records, image decoding/dimensions, category/angle changes, swipe, lightbox lifecycle and full-resolution loading. Native browser focus trapping, scroll pinning, responsive appearance and physical-device performance still need real-browser QA. The available browser tool reported its access host unavailable during this implementation; this limit must not be represented as a passed visual test.

## Vercel

Import the repository, select Next.js and Node 24, and use `npm run build`. The standard static-export configuration generates `out/`; no services or secrets are needed. For local production preview run `npm start`.
Optional environment values: `NEXT_PUBLIC_SITE_URL` for canonical/social URLs; `NEXT_PUBLIC_ALLOW_INDEXING=true` only when appropriate for the client presentation. Default is noindex. Rebuild after changing build-time values.
GitHub Actions runs lint, tests, build, typecheck and export validation. The scoped minimatch override patches the ESLint parser's transitive dependency.
