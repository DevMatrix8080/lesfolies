# Les Folies · versione React

Il sito originale (HTML/CSS/JS) convertito in **React 19 + Vite + React Router + Tailwind CSS 4**.
Aspetto e comportamento sono rimasti identici all'originale.

## Avvio
```bash
npm install
npm run dev      # sviluppo
npm run build    # produzione → dist/
```

## Immagini
Copia la tua cartella `images/` (con `images/logo/logo.png`, `favicon.png` e le foto dei trattamenti) in `public/images/`.

## Struttura
- `src/pages/` Home, Chi siamo, Servizi, Contatti (URL: `/`, `/chi-siamo`, `/servizi`, `/contatti`)
- `src/components/` componenti
  - **in Tailwind**: `Navbar` (con menu mobile), `Footer`, `Button`, `WhatsAppFloat`
  - con le classi del vecchio CSS: `FeatureCard`, `ServiceCard`, `ReviewsSlider`, `SectionHead`, `PageHero`, `AboutPhoto`, `Stars`…
- `src/hooks/useSiteAnimations.js` animazioni di `script.js` (reveal allo scroll, parallasse hero, tilt card)
- `src/data/` contatti, orari, menu e catalogo servizi
- `src/legacy.css` il vecchio `styles.css`, invariato tranne le regole dei 4 componenti passati a Tailwind
- `src/index.css` entry Tailwind (livelli: theme → legacy → utilities, senza preflight, così il reset originale non cambia)

Nota hosting: usa un router lato client, quindi il server deve restituire `index.html` per tutti i percorsi.
