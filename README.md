# Publish Hub

Publish Hub is the standalone social publishing layer extracted from the publishing work that started inside WebSeer.

## V0

- React + TypeScript + Vite
- Content sources: WebSeer, Personal Portfolio, Instituto Foton, Generic Content
- Universal Media Library
- Media preparation editor
- Publishing Queue
- WebSeer-derived scheduling engine
- Week publication calendar
- Google OAuth / YouTube channel connection adapter
- Instagram-oriented preparation workflow
- TikTok future placeholder
- Browser localStorage persistence for V0

## Product boundary

WebSeer remains responsible for analysis, generation and metadata creation. Publish Hub is responsible for organization, preparation, scheduling and publishing. A WebSeer → Publish Hub API is intentionally deferred to a later version.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Google / YouTube

Copy `.env.example` to `.env` and configure the public Google OAuth Web Client ID:

```env
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

Do not commit client secrets, tokens or private credentials.

## GitHub Pages

The workflow `.github/workflows/deploy-pages.yml` builds and deploys the `main` branch to GitHub Pages. If a repository Actions secret named `VITE_GOOGLE_CLIENT_ID` exists, it is injected into the production build.

## WebSeer reuse

The V0 scheduling algorithm was generalized from `WebSeer/src/publishing/scheduleEngine.ts`. Google/YouTube connection follows the same Google Identity Services direction used in WebSeer authentication. WebSeer itself is not modified by this project.
