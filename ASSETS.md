# Supplied architectural renders

The active presentation uses the client's 48 PNG renders from the supplied japan perspectives folder. No AI-generated architecture is used in the active website.
Every source filename and SHA-256 checksum is recorded in src/data/renders.json and public/residence/manifest.json. Both BALCONY 3.png and BALCONY 3(1).png are preserved as independent views.
Sources remain unchanged in the original folder. Website copies are encoded as WebP at 640, 1280, 1920 and 2560 pixels wide, retaining original aspect ratio and colors. See scripts/import-renders.mjs for reproducibility.
Original room labels are normalized only for presentation (for example, Walking Closet becomes Walk-in closet and Dirty Kitchen becomes Secondary kitchen). No measurements or material certifications are asserted.

## Supplied floor plans

The two 2560 × 1920 PNGs from `FLOOR PLANSS` are presented separately from the 48 perspectives. `src/data/floorplans.json` and `public/floorplans/manifest.json` record the source filenames, SHA-256 checksums, dimensions, and room links. Their embedded labels and artwork are preserved, including source spelling.
Website previews use 640/1280/1920px WebP at quality 90. Unchanged original PNG copies load in the enlarged viewer only when opened. Regenerate with `node scripts/import-floorplans.mjs "C:/Users/Windows 11/Downloads/FLOOR PLANSS"`.
Floor associations come from these supplied plans: the primary suite and Bedroom 1 are on the ground floor; Bedrooms 2–4, bar, hallway, upper bathroom and balcony are on the second floor. The staircase is linked from both. Room links lead to the existing render groups; no room boundaries or dimensions are inferred.
