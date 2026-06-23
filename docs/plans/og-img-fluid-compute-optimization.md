# og-img Fluid Compute Optimization Plan

## Goal

Reduce Vercel Fluid Compute usage from 1h 12m/month (41.8% of free tier 4h limit) by 50%+ through HTTP caching, Node.js font loading, blur optimization, and function configuration.

**Target**: Reduce to <36m/month (≤18% of free tier).

---

## Current State Summary

| Metric | Value |
|---|---|
| Runtime | Edge |
| Font loading | HTTP fetch per request (~140KB round-trips) |
| Cache headers | None |
| Blur filter | Always-on, radius = min(w,h)/3.2 |
| `vercel.json` | Does not exist |
| Unused exports | `outfitRegular` (never imported by route) |

---

## Phase 1: HTTP Caching (Impact: HIGH, Complexity: LOW)

**Goal**: Eliminate ~80% of redundant renders by returning cached responses.

**Dependencies**: None — this is standalone.

### Tasks

#### 1.1 Add Cache-Control headers to the API route

**File**: `src/app/api/generate/route.tsx`

- Wrap the `ImageResponse` return with a cloned response that includes cache headers.
- Use `s-maxage=31536000` (1 year) for Vercel's edge cache, `max-age=0` for browsers, `immutable` to prevent revalidation.

**Implementation**:
```tsx
// After the ImageResponse is created
const response = new ImageResponse(/* ... */);
response.headers.set(
  'Cache-Control',
  'public, s-maxage=31536000, max-age=0, immutable'
);
return response;
```

**Success criteria**:
- [ ] `curl -I` on the deployed endpoint shows `Cache-Control: public, s-maxage=31536000, max-age=0, immutable`
- [ ] Second request to the same URL returns a cache hit (check `x-vercel-cache: HIT` header)
- [ ] Existing URLs still work identically

**Verification**: Deploy to a preview branch, hit the endpoint twice with identical params, confirm second response has `x-vercel-cache: HIT`.

### Rollback Point 1

Revert `src/app/api/generate/route.tsx` to the previous commit. No other files affected.

---

## Phase 2: Node.js Runtime + Font Loading (Impact: HIGH, Complexity: MEDIUM)

**Goal**: Eliminate ~140KB HTTP round-trips per request by loading fonts from the filesystem with in-memory caching.

**Dependencies**: None — can run in parallel with Phase 1, but should be deployed after for clean rollback.

### Tasks

#### 2.1 Create Node.js font loader

**New file**: `src/lib/utils/font/node-font-loader.ts`

- Use `fs.readFileSync` to load `.ttf` files from the `public/` directory at module scope (load once, reuse).
- Use `path.join(process.cwd(), 'public', ...)` to resolve paths.
- Cache the `ArrayBuffer` in a module-level variable so it's only read once per cold start.

**Implementation**:
```ts
import fs from 'node:fs';
import path from 'node:path';

const fontCache = new Map<string, ArrayBuffer>();

const loadFont = (fontPath: string): ArrayBuffer => {
  if (fontCache.has(fontPath)) {
    return fontCache.get(fontPath)!;
  }
  const filePath = path.join(process.cwd(), 'public', fontPath);
  const buffer = fs.readFileSync(filePath);
  const arrayBuffer = buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  );
  fontCache.set(fontPath, arrayBuffer);
  return arrayBuffer;
};

export const nodeFontLoader = (url: string) => {
  return Promise.resolve(loadFont(url));
};
```

**Note**: The `Promise.resolve` wrapper maintains the same async interface as the HTTP loader, so the rest of the code doesn't need to change.

#### 2.2 Update outfit.ts to use Node.js loader

**File**: `src/lib/utils/font/outfit.ts`

- Change import from `font-loader` to `node-font-loader`.
- Remove the unused `outfitRegular` export.

**Implementation**:
```ts
import { nodeFontLoader } from './node-font-loader';

const outfitFontLoader = (weight: string) =>
  nodeFontLoader(`/assets/fonts/Outfit-${weight}.ttf`);

export const outfitMedium = outfitFontLoader('Medium');
export const outfitBold = outfitFontLoader('Bold');
```

#### 2.3 Switch runtime to Node.js

**File**: `src/app/api/generate/route.tsx`

- Change `export const runtime = 'edge'` → `export const runtime = 'nodejs'`

#### 2.4 Create vercel.json

**New file**: `vercel.json`

```json
{
  "functions": {
    "src/app/api/generate/route.tsx": {
      "runtime": "nodejs22.x",
      "maxDuration": 10,
      "memory": 1024
    }
  }
}
```

**Success criteria**:
- [ ] `tsc --noEmit` passes (type-check clean)
- [ ] `pnpm build` succeeds
- [ ] API route responds with correct image output (manual test)
- [ ] Response headers do NOT include `x-edge-runtime` (confirms Node.js runtime)
- [ ] Font renders correctly (no tofu/missing glyphs)
- [ ] `outfitRegular` is no longer exported (grep confirms)

**Verification**: Deploy preview branch, hit endpoint with `?template=color`, visually confirm image renders. Check Vercel dashboard function logs show `nodejs` runtime.

### Rollback Point 2

1. Revert `src/lib/utils/font/node-font-loader.ts` (delete new file).
2. Revert `src/lib/utils/font/outfit.ts` to previous commit.
3. Revert `src/app/api/generate/route.tsx` (change runtime back to `edge`).
4. Delete `vercel.json`.

---

## Phase 3: Blur Filter Optimization (Impact: MEDIUM, Complexity: LOW)

**Goal**: Reduce render time for ColorTemplate by making blur optional and less aggressive.

**Dependencies**: None — standalone.

### Tasks

#### 3.1 Add `blur` query param to API route

**File**: `src/app/api/generate/route.tsx`

- Parse `blur` from `searchParams`. Default to `true` for backward compatibility.
- Pass `blur` through to `templateProps`.

**Implementation**:
```tsx
const blur = searchParams.get('blur') !== 'false'; // default true
const templateProps = { heading, text, template, center, width, height, blur };
```

#### 3.2 Update OgImageOption type

**File**: `src/lib/types/og-image-option.ts`

- Add `blur?: boolean` to `OgImageOption`.

#### 3.3 Update ColorTemplate to respect blur param

**File**: `src/lib/components/image-templates/color-template.tsx`

- Accept `blur` prop (default `true`).
- When `blur=false`, remove the blur filter entirely (just show the gradient without blur).
- When `blur=true`, reduce divisor from `/3.2` to `/8` (less aggressive blur = faster render).

**Implementation**:
```tsx
const ColorTemplate = ({
  heading,
  text,
  center,
  width,
  height,
  blur = true,
}: ColorTemplateProps) => {
  const aHeight = height ?? 0;
  const aWidth = width ?? 0;
  const blurSize = (aWidth < aHeight ? aWidth : aHeight) / 8;

  return (
    <div /* ... */>
      <div
        style={{
          /* ... */
          filter: blur
            ? `blur(${blurSize}px) saturate(125%)`
            : 'saturate(125%)',
          /* ... */
        }}
      />
      {/* ... */}
    </div>
  );
};
```

#### 3.4 Update template-wrapper to pass blur prop

**File**: `src/lib/components/image-templates/template-wrapper.tsx`

- Add `blur` to destructured props and pass it through to `ColorTemplate`.

**Success criteria**:
- [ ] `tsc --noEmit` passes
- [ ] `?blur=false` produces image without blur filter
- [ ] Default (no `blur` param) still renders with blur (backward compatible)
- [ ] `?template=color` with default blur renders visibly lighter/faster than before
- [ ] BaseTemplate is unaffected by blur param

**Verification**: Deploy preview, compare render times in Vercel dashboard for `?template=color` with and without `?blur=false`.

### Rollback Point 3

Revert all modified files to Phase 2 state. No new files to delete.

---

## Phase 4: Cleanup + Verification (Impact: LOW, Complexity: LOW)

**Goal**: Clean up dead code, verify everything works end-to-end, document usage.

**Dependencies**: Requires Phases 1-3 complete.

### Tasks

#### 4.1 Remove unused font files (optional)

**Directory**: `public/assets/fonts/`

- `outfitRegular` is no longer imported. `Outfit-Regular.ttf` is still on disk but harmless.
- Optionally remove `Outfit-Regular.ttf` and any other unused weight files (Light, ExtraLight, Thin, Black, ExtraBold, SemiBold, VariableFont_wght) to reduce deploy size.
- **Keep**: `Outfit-Medium.ttf`, `Outfit-Bold.ttf` (actively used).

**Risk**: Low. Removing from `public/` doesn't break anything if no code references them.

#### 4.2 Document cache invalidation strategy

**File**: `README.md` or inline comments in `route.tsx`

- Document that cached images are immutable by default.
- To invalidate: change the URL (add/update a `v` query param) or wait for cache expiry.
- Document the `?blur=false` param for users who want faster renders.

#### 4.3 Final verification checklist

- [ ] All 3 optimizations deployed and working
- [ ] Backward compatibility: all existing URLs produce identical output
- [ ] Vercel dashboard shows reduced function execution time after 24-48h
- [ ] No TypeScript errors
- [ ] No runtime errors in Vercel function logs
- [ ] `pnpm dlx ultracite check` passes

### Rollback Point 4

Full revert is just `git revert` of the entire changeset since each phase is independent.

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Node.js font loading fails in Vercel | Low | High | Fallback: keep HTTP loader as `font-loader-http.ts`, conditionally use based on `process.env.VERCEL` |
| Cache headers cause stale images | Low | Medium | Use `immutable` + query param versioning for explicit invalidation |
| Blur change breaks existing embeds | Very Low | Low | Default behavior preserved (`blur=true`), `?blur=false` is opt-in |
| `fs.readFileSync` path resolution differs in Vercel | Medium | Medium | Use `process.cwd()` which Vercel sets to project root; test on preview branch first |
| Node.js runtime slower than Edge for simple requests | Low | Medium | Font loading savings (~140KB round-trip) far outweigh runtime overhead; monitor in dashboard |

---

## Assumptions

1. The project deploys to Vercel (evidenced by Fluid Compute usage).
2. `NEXT_PUBLIC_BASE_URL` is set in the Vercel environment (font HTTP fetch depends on it).
3. The free tier limit is 4h/month of Fluid Compute.
4. Existing URLs are consumed by external services (social embeds, etc.) — backward compatibility is critical.
5. Font files in `public/assets/fonts/` are the same ones loaded at runtime.

---

## Success Metrics

| Metric | Before | Target | How to Measure |
|---|---|---|---|
| Fluid Compute usage | 1h 12m/month | <36m/month | Vercel dashboard > Usage > Fluid Compute |
| Cache hit rate | 0% | >70% | Vercel dashboard > Headers (`x-vercel-cache: HIT`) |
| Function execution time | Baseline | -30% | Vercel dashboard > Functions > Avg Duration |
| Deploy size | Baseline | -10% (optional font cleanup) | Vercel deploy logs |
