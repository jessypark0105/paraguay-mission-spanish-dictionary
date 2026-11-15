# Paraguay Mission Spanish Dictionary

A mobile-first Progressive Web App for church mission teams traveling to Paraguay.

## Features
- Instant English/Korean search with ranked partial and typo-tolerant matches
- 10 categories and subcategories, including VBS, travel, food, health, and ministry
- 450+ practical phrases with Korean translations, pronunciation, and search synonyms
- Favorites and recent searches stored locally on the device
- Full-screen Spanish phrase display for showing phrases to local speakers
- Spanish, Korean translation, and pronunciation guidance
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
- Favorites and recent searches are stored locally on the device.
- Phrase search uses English and Korean metadata only; it does not search Spanish text.
- No audio or external services are used.
