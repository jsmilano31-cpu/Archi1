# Supplied architectural renders

The active presentation uses the client's 48 PNG renders from the supplied japan perspectives folder. No AI-generated architecture is used in the active website.
Every source filename and SHA-256 checksum is recorded in src/data/renders.json and public/residence/manifest.json. Both BALCONY 3.png and BALCONY 3(1).png are preserved as independent views.
Sources remain unchanged in the original folder. Website copies are encoded as WebP at 640, 1280, 1920 and 2560 pixels wide, retaining original aspect ratio and colors. See scripts/import-renders.mjs for reproducibility.
Original room labels are normalized only for presentation (for example, Walking Closet becomes Walk-in closet and Dirty Kitchen becomes Secondary kitchen). No measurements, room-floor associations or material certifications are asserted.
