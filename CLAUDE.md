# תרחיב - Blog Project

## Workflow

- Always push to GitHub and deploy to Firebase at the end of every work session.

## Content Guidelines

- Default locale is Hebrew (`he`). All new content should be created in Hebrew first.

## Cover Image Style Guide

Post cover images are SVG illustrations (`public/images/posts/<slug>/hero.svg`) at 1200x600. They must follow this futuristic style:

- **Background**: Deep dark navy/near-black (`#030712`, `#0a0f1f`, `#0c0a18`) with subtle diagonal gradients
- **Color palette**: Cyan (`#06b6d4`, `#22d3ee`) and purple (`#a855f7`, `#c084fc`) as the two accent colors. No warm tones.
- **Ambient glow**: Large radial gradients (cyan and purple) at ~10-20% opacity to create soft light pools
- **Grid/pattern layer**: Subtle background pattern (grid lines, circuit traces, or ruled lines) at very low opacity (0.06-0.1)
- **Neon effects**: Key elements use an SVG `<filter>` with `feGaussianBlur` + `feMerge` for glow. Interactive/important elements get `filter="url(#neon)"`
- **Subject matter**: Abstract/geometric representation of the topic (not realistic). Examples: wireframe globe for diaspora, circuit board for tech, floating letters for language
- **Depth**: Use multiple opacity levels (0.05-0.5) to create foreground/background layering
- **Particles**: Scatter small circles (r=1-2) in cyan and purple at low opacity as ambient detail
- **No text** in the image (except subtle monospace labels like coordinates or dates at very low opacity)
- **Glass/translucency**: Elements should feel semi-transparent, using `stop-opacity` and `opacity` attributes generously
