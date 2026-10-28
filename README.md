# Publish Hub

Publish Hub is the standalone social publishing layer extracted from the publishing work that started inside WebSeer.

## V0.2 — Project Workspaces

Publish Hub is now organized around:

`Google User → Projects → Media → Publications → Social Accounts`

Each Project is an isolated publishing workspace with its own Library, Queue, Calendar, enabled channels, integrations and social connections.

Initial Leonardo workspace:

- WebSeer - Histogramas Animados
- LCR - Insta Pessoal
- Create New Project

Instituto Foton is intentionally prepared as a separate Google-account workspace and is not exposed to Leonardo's personal account.

## Included in V0.2

- React + TypeScript + Vite
- Public landing + Google Sign-In
- Clean post-login Project Selection screen
- Project-scoped sidebar/workspace
- Project creation flow with publishing-channel selection
- Project-scoped Media Library with detailed list view
- Per-destination Publication records
- Project-scoped Publishing Queue
- Project-scoped Publishing Calendar
- Project-scoped YouTube connections
- Instagram/TikTok placeholders without fake API connections
- WebSeer project integration foundation and duplicate-safe import demo
- WebSeer-derived scheduling engine preserved
- Versioned localStorage workspace (`publishhub.v0.2.workspace`)

## Product boundary

WebSeer remains responsible for analysis, generation and metadata creation. Publish Hub is responsible for organization, preparation, scheduling and publishing. The real WebSeer → Publish Hub API remains deferred; V0.2 provides the integration abstraction and import UX.

## Google / YouTube

Production deployment reads the public OAuth Client ID from the repository Actions variable:

`GOOGLE_CLIENT_ID`

The Pages workflow injects it as `VITE_GOOGLE_CLIENT_ID` during the Vite build. Do not commit Client Secrets, access tokens or refresh tokens.

An optional future Foton mapping can use:

`VITE_FOTON_GOOGLE_EMAIL`

until a backend-backed user/project mapping is introduced.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

`.github/workflows/deploy-pages.yml` builds and deploys `main` to GitHub Pages.

Published application:

https://leonardocamargorossato.github.io/PublishHub-SocialMedia/

## WebSeer reuse

The scheduling algorithm remains based on `WebSeer/src/publishing/scheduleEngine.ts`. Google/YouTube connection follows the same Google Identity Services architecture used by WebSeer. WebSeer itself is not modified by Publish Hub.
