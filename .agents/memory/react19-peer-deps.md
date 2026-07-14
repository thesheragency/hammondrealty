---
name: React 19 peer-dependency installs
description: Why npm installs fail here and how packages must be chosen for React 19
---

- npm installs fail with ERESOLVE because `react-day-picker@8` pins React ≤18 while the project runs React 19. The project `.npmrc` sets `legacy-peer-deps=true` — keep it, or installs break.
- Animation library must be `framer-motion` v12+ (v11 peers React 18 only and crashes SSR with `Cannot read properties of null (reading 'useInsertionEffect')` plus broken motion.* prop types under React 19).
- **How to apply:** when adding any React-adjacent package, verify its peer range includes React 19 before installing.
