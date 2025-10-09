# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Stack: Next.js 15 (App Router) + TypeScript + styled-components + framer-motion
- Static export: next.config.ts sets output: 'export' with trailingSlash and unoptimized images
- Deployment pathing: In production (NODE_ENV=production), basePath and assetPrefix are '/DAV-portfolio' for GitHub Pages

Common commands (npm shown)
- Install deps
  - npm ci
- Run dev server
  - npm run dev
  - Serves at http://localhost:3000/
- Build (static export)
  - npm run build
  - Output goes to ./out
- Preview static build locally
  - npx serve out
  - Then open http://localhost:3000/DAV-portfolio/ (static export is rooted at /DAV-portfolio due to basePath)
- GitHub Pages build (forces production basePath)
  - npm run build:github
  - Note (PowerShell): the script uses POSIX-style env assignment. If running locally on Windows, use:
    - $env:NODE_ENV = 'production'; npm run build
- Start (Next server)
  - npm start
  - Note: With output: 'export', the site is static; prefer “Preview static build” above instead of next start
- Lint
  - All files: npm run lint -- .
  - Single file: npm run lint -- src/path/to/File.tsx
- Tests
  - No test runner is configured (no test scripts or configs present)

Architecture and structure (big picture)
- App Router (src/app)
  - src/app/layout.tsx is a Client Component that wraps the app with providers and theming
    - LanguageProvider (src/contexts/LanguageContext.tsx) for simple i18n (sk/en) with a t(key) translator
    - ThemeProvider (styled-components) with a custom theme (src/styles/theme.ts) and GlobalStyle (src/styles/GlobalStyle.ts)
    - StyledComponentsRegistry (src/lib/styled-components-registry.tsx) bridges SSR and styled-components using useServerInsertedHTML
  - src/app/page.tsx composes the landing sections: Header, Hero, About, Skills, Services, Projects, Contact, plus UI helpers (SectionDots, ScrollToTop, LanguageSwitch)
- UI components (src/components)
  - Organized by section (e.g., About/, Skills/, Services/, Projects/, Contact/) and shared primitives (shared/SectionHeading.tsx)
  - styled-components used for styling; framer-motion provides animations
- Internationalization (src/contexts/LanguageContext.tsx)
  - Inlined translation dictionaries for 'sk' and 'en'
  - useLanguage() exposes { language, setLanguage, t }
  - LanguageSwitch component toggles languages
- Styling and theming
  - Centralized design tokens in src/styles/theme.ts (colors, gradients, typography, spacing, breakpoints, z-index)
  - Global styles via src/styles/GlobalStyle.ts (resets, scroll behavior, scrollbar, selection, focus styles)
- Configuration
  - next.config.ts: output: 'export', trailingSlash: true, images.unoptimized: true; basePath/assetPrefix switch to '/DAV-portfolio' in production
  - tsconfig.json: paths alias '@/*' -> './src/*'; strict TS settings; Next plugin
  - eslint.config.mjs: flat config extending next/core-web-vitals and next/typescript; ignores .next, out, build, node_modules

Notes specific to this repo
- Package managers: package-lock.json and bun.lock are present. Commands above assume npm. If using Bun, replace with bun install / bun run <script>.
- Static export behavior: When NODE_ENV=production, routes and assets are expected under '/DAV-portfolio/'. Local preview should visit /DAV-portfolio/ on the served host to match production pathing.
