# DIY CSS

## EN

DIY CSS is a playground to build and test your own HTML/CSS template quickly.

### What it includes

- A broad HTML elements catalog in `index.html`
- A neutral base stylesheet in `style.css`
- Bunny Fonts live selection (UI + content font + weight)
- Light/dark mode toggle
- Live color controls (including accent color)
- Export current theme as a single CSS file (base + current theme variables)

### Run locally

Use any local server (recommended):

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173`.

### Notes

- Opening via `file://` can limit some browser features.
- For reliable export behavior, use a local server.

### Versioning

- This project now follows SemVer (`MAJOR.MINOR.PATCH`).
- Current version: `0.1.0`.

### Manual test checklist

- Keyboard navigation: tab through links/buttons/inputs and verify visible focus.
- Link states: check unvisited (dotted), hover (solid), and visited (highlighted) styles.
- Color safety: use palette controls and verify the low-contrast alert appears below 4.5:1.
- Embedded demos: toggle iframe, insert/clear template cards, and verify status messages.
- Responsive behavior: review at desktop + mobile widths.

### Optional quality commands

```bash
npx prettier --check "*.{html,css,md}"
npx prettier --write "*.{html,css,md}"
npx html-validate index.html
```

---

## FR

DIY CSS est un terrain de jeu pour construire et tester rapidement ton propre gabarit HTML/CSS.

### Ce que contient le projet

- Un catalogue large d'elements HTML dans `index.html`
- Une feuille de style de base neutre dans `style.css`
- Selection dynamique de polices Bunny Fonts (interface + contenu + poids)
- Un toggle mode clair/sombre
- Des controles de couleurs en direct (dont la couleur d'accent)
- Export du theme courant en un seul fichier CSS (base + variables de theme)

### Lancer en local

Utilise n'importe quel serveur local (recommande) :

```bash
python3 -m http.server 5173
```

Puis ouvre `http://localhost:5173`.

### Remarques

- L'ouverture en `file://` peut limiter certaines fonctions navigateur.
- Pour un export fiable, utilise un serveur local.

### Versioning

- Le projet suit desormais SemVer (`MAJOR.MINOR.PATCH`).
- Version actuelle : `0.1.0`.

### Checklist de test manuel

- Navigation clavier : parcourir liens/boutons/champs et verifier le focus visible.
- Etats de lien : verifier non visite (pointille), survol (ligne pleine) et visite (surlignage).
- Securite couleur : utiliser les controles palette et verifier l'alerte sous 4.5:1.
- Demos embarquees : basculer l'iframe, inserer/vider les cartes template, verifier les statuts.
- Responsive : verifier en largeur desktop et mobile.

### Commandes qualite (optionnelles)

```bash
npx prettier --check "*.{html,css,md}"
npx prettier --write "*.{html,css,md}"
npx html-validate index.html
```
