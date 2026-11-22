# Paraguay Mission Spanish Dictionary

A mobile-first Progressive Web App for church mission teams traveling to Paraguay.

## Features
- Fully offline English/Korean search with synonyms, keyword and partial matching, typo tolerance, relevance ranking, and related suggestions
- 11 categories and subcategories, including VBS, travel, food, health, ministry, and Guaraní
- 450+ practical Spanish phrases with Korean translations, pronunciation, and search synonyms
- A curated beginner Guaraní section with English and Korean meanings and Korean pronunciation
- Favorites and recent searches stored locally on the device
- Full-screen Spanish phrase display for showing phrases to local speakers
- Guaraní phrases with English/Korean meanings, Spanish phrases with Korean meanings, and Korean pronunciation guidance
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
- Phrase search uses English and Korean metadata only; it does not search Spanish or Guaraní phrase text.
- Guaraní starter expressions were checked against [Omniglot's Guaraní phrase list](https://www.omniglot.com/language/phrases/guarani.htm), [Hello Paraguay's beginner glossary](https://www.helloparaguay.com/paraguay/introduction-to-the-guarani-language/), the [Guaraní-English Glosbe dictionary](https://glosbe.com/gn/en), and the [WorldAlphabets Guaraní text corpus](https://github.com/AACTools/WorldAlphabets/blob/dfec80e9d5641b2ad080f0780a72fc108333d164/data/corpora/gn.txt) for the age question.
- No audio or external services are used.
