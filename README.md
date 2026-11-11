# Paraguay Mission Spanish Dictionary

A mobile-first Progressive Web App for church mission teams traveling to Paraguay.

## Features
- Instant Korean/Spanish search with partial matches
- 200+ practical phrases organized by category
- Spanish, Korean translation, and pronunciation guidance
- Browser speech playback with Spanish voice selection
- Local favorites using `localStorage`
- Offline-ready PWA support with `vite-plugin-pwa`
- GitHub Pages deployment workflow

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## GitHub Pages setup

1. Open your repository on GitHub.
2. Go to Settings > Pages.
3. Set the source to GitHub Actions.
4. Push to the `main` branch to trigger deployment automatically.
5. After deployment finishes, the app will be available at:
   `https://<username>.github.io/paraguay-mission-spanish-dictionary/`

## Notes
- The app is designed for iPhone Safari and Android browsers.
- The app works offline after the first successful load.
- Favorites are stored locally on the device.
