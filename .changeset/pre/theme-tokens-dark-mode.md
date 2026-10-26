---
'@britecharts/core': minor
---

Theme the charts with CSS custom properties, and get dark mode from the page's `color-scheme`. Every colour around the data (text, axes, grid, tooltips, legend, loading states) is a `--bc-*` token with a light and a dark default, chosen with `light-dark()`. Set `color-scheme: light dark` on your page to follow the system, `dark` to force it, or set any token, such as `.britechart { --bc-text-muted: #555 }`. A page without a colour scheme stays light, so nothing changes until you opt in.

The tooltip's text, the donut's empty slice, the scatter plot's hollow circles, the line chart's custom lines and the sparkline's area gradient now take their colours from the tokens, set as styles. Exports resolve the tokens, so a dark export keeps its dark background.
