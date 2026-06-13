# Villasaya QA Report - agent-browser

Target: http://127.0.0.1:3000/
Tool: agent-browser 0.26.0
Skill: .agents/skills/agent-browser + CLI dogfood workflow
Date: 2026-06-13

## Summary

Status: PASS after fixes.

Tested:
- Desktop home page
- Desktop villa catalog/search
- Favorite toggle persistence
- Carousel next action
- Mobile home page
- Mobile catalog
- Mobile filter drawer
- Mobile sort drawer
- Production build

## Issues found and fixed

### ISSUE-001 - React hydration mismatch on favorite buttons
Severity: P1 Major
Category: Console / SSR hydration

Evidence:
- Console showed React hydration mismatch after a villa was favorited and the page was reloaded/navigated.
- Cause: `useFavorites()` read `localStorage` inside the state initializer on first client render, while SSR rendered an empty favorite state.

Fix:
- Changed `src/hooks/use-favorites.ts` so first client render matches SSR (`[]`).
- Load persisted favorites after mount.
- Prevent writing to localStorage until hydrated.

Verification:
- Seeded `localStorage` with `["sea-villa-2"]`, reloaded `/villas`, checked console/errors.
- Result: no hydration errors; favorite state appears after hydration.

Screenshot:
- dogfood-output/screenshots/catalog-mobile-post-favorite-hydration-fix.png

### ISSUE-002 - Mobile catalog brand link had empty accessible name
Severity: P2 Minor
Category: Accessibility

Evidence:
- agent-browser snapshot showed header logo as `link` with no name on mobile catalog.
- Cause: visible text hidden on mobile and SVG icon has no accessible text.

Fix:
- Added `aria-label="Kembali ke beranda Apamurahbanget"` to the brand link in `src/routes/villas.index.tsx`.

Verification:
- Snapshot now shows `link "Kembali ke beranda Apamurahbanget"`.

### ISSUE-003 - Mobile filter/sort drawers exposed background content to accessibility tree
Severity: P2 Minor
Category: Accessibility / Modal semantics

Evidence:
- Initial filter drawer snapshot included many background villa cards and controls.

Fix:
- Added `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` to mobile filter/sort sheets.
- Added `aria-hidden` to main page/header/local bottom controls while sheet is open.

Verification:
- Filter drawer snapshot after patch is focused on drawer controls rather than the full card grid.
- Sort drawer opens and exposes sort actions.

Screenshots:
- dogfood-output/screenshots/filter-drawer-mobile-postpatch.png
- dogfood-output/screenshots/sort-drawer-mobile-real.png

## Positive findings

- Production build passes: client + SSR build OK.
- Desktop catalog search works: `Sea` returns 2 villas.
- Desktop layout has no horizontal overflow.
- Mobile home has no horizontal overflow.
- Mobile catalog has no horizontal overflow.
- Mobile bottom nav appears on mobile and is hidden on desktop.
- Favorite toggle works and persists.
- Carousel next action updates active photo dot.
- Mobile filter drawer opens and shows filter controls.
- Mobile sort drawer opens and sorting updates URL/order.

## Evidence files

- dogfood-output/screenshots/home-desktop.png
- dogfood-output/screenshots/catalog-search-sea-desktop.png
- dogfood-output/screenshots/favorite-click-result.png
- dogfood-output/screenshots/carousel-next-result.png
- dogfood-output/screenshots/home-mobile.png
- dogfood-output/screenshots/catalog-mobile.png
- dogfood-output/screenshots/filter-drawer-mobile.png
- dogfood-output/screenshots/filter-drawer-mobile-postpatch.png
- dogfood-output/screenshots/sort-drawer-mobile-real.png
- dogfood-output/screenshots/catalog-mobile-post-favorite-hydration-fix.png

## Final verdict

PASS. App is usable on desktop/mobile after the fixes. Remaining polish would be deeper focus-trap behavior for drawers, but no blocking issue remains in tested flows.
