# Convert Mindora to JavaScript and add the supplied branding

## What will change
- Use the first uploaded image as Mindora’s visible logo in the shared site header.
- Replace the current placeholder portrait with the second uploaded photo of Hasna.
- Update every WhatsApp link to the UK number **+44 7733 597624**.
- Convert all handwritten React and app files from TypeScript/TSX to JavaScript/JSX, including routes, shared utilities, startup files, and Vite configuration.
- Remove unused TypeScript-only UI files rather than carrying unused code into the JavaScript project.

## Technical details
- Upload the two supplied images as optimized project assets and reference their asset URLs from the React code.
- Preserve TanStack Router’s generated `routeTree.gen.ts` and the small Vite declaration file because they are framework-generated/tooling files, not handwritten application code.
- Update configuration and imports so `.jsx`/`.js` files resolve cleanly.
- Add the required social metadata fields to every content page while touching the route files.
- Record JavaScript/JSX as the project’s source-language rule in `AGENTS.md`.

## Verification
- Confirm every page renders, the logo and Hasna photo load, and WhatsApp opens the correct UK number.
- Check desktop and mobile layouts for clipping or overlap.
- Confirm the preview build and browser console are clean.
