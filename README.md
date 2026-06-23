# 🖼️ og-img

Edge service to generate embeddable dynamic **[🖼️ OpenGraph image](https://ogp.me/)**.
Powered by [next/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation).

## Caching & Optimization

Generated images are cached at the edge with immutable headers (`s-maxage=31536000`).

**Cache invalidation**: Append or update a `v` query param to force a new render:
```
/api/generate?heading=Hello&v=2
```

**Query params**:
| Param | Default | Description |
|-------|---------|-------------|
| `heading` | — | Main heading text (max 100 chars) |
| `text` | — | Subtext (max 200 chars) |
| `template` | base | Template name (`color` for gradient background) |
| `center` | `false` | Center-align content |
| `width` / `height` | `1200` / `630` | Image dimensions |

**Runtime**: Node.js 22.x (fonts loaded from filesystem, not HTTP).
**Fonts**: Only `Outfit-Medium` and `Outfit-Bold` are bundled.

---

2021 - Agustinus Nathaniel
