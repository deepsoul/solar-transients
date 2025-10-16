# 🌟 SOLAR TRANSIENTS - Artist Portfolio

Ein modernes, responsives Artist-Portfolio für SOLAR TRANSIENTS, erstellt mit Vue 3, Vite und Tailwind CSS.

## 🚀 Features

- **Responsive Design** - Mobile-first mit Desktop-Optimierungen
- **Music Player** - HTML5 Audio mit Playlist-Funktionalität
- **Newsletter Integration** - Buttondown API für kostenlose Newsletter-Verwaltung
- **Contact Form** - PHP-Backend mit HTML-E-Mail-Versand
- **SEO-Ready** - Meta Tags, Open Graph, Twitter Cards
- **Accessibility** - Keyboard Navigation, ARIA Labels
- **Modern UI** - Solar Orange Design mit Partikel-Animationen

## 🛠️ Tech Stack

- **Frontend:** Vue 3 (Composition API) + Vite
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **Routing:** Vue Router
- **TypeScript:** Für bessere Entwicklererfahrung
- **Deployment:** Vercel

## 📦 Installation

```bash
# Dependencies installieren
npm install

# Entwicklungsserver starten
npm run dev

# Production Build
npm run build

# Build Preview
npm run preview
```

## ⚙️ Environment Variables

Erstelle eine `.env.local` Datei:

```env
# Newsletter Service (Buttondown)
VITE_BUTTONDOWN_API_KEY=dein_buttondown_api_key

# Contact Form
VITE_CONTACT_API_URL=https://cms.borishorn.de/solar-transients-contact.php

# Site Configuration
VITE_SITE_URL=https://solar-transients.vercel.app
VITE_SITE_NAME=SOLAR TRANSIENTS
```

## 📧 Newsletter Setup

### Buttondown Account erstellen:

1. Gehe zu [buttondown.email](https://buttondown.email)
2. Erstelle kostenlosen Account
3. Gehe zu Settings → API Keys
4. Kopiere deinen API Key
5. Füge ihn in `.env.local` ein

### Features:

- **Kostenlos:** Unbegrenzte Kontakte
- **Automatische Anmeldung** über Website
- **Fallback-System** über PHP-Script
- **Tags:** `website-signup` für Organisation

## 📞 Contact Form Setup

Das Contact Form nutzt ein PHP-Script auf `cms.borishorn.de`:

### PHP-Script Features:

- **CORS-Headers** für Cross-Domain-Requests
- **HTML-E-Mails** mit Solar Orange Design
- **Type-spezifische Weiterleitung:**
  - `general` → `hello@solar-transients.com`
  - `booking` → `booking@solar-transients.com`
  - `collaboration` → `hello@solar-transients.com`
- **Bestätigungs-E-Mails** an Sender
- **Robuste Fehlerbehandlung**

### Setup:

1. Lade `solar-transients-contact.php` hoch nach `https://cms.borishorn.de/solar-transients-contact.php`
2. Das Script ist bereits konfiguriert und einsatzbereit

## 🎵 Music Player

- **HTML5 Audio API** für MP3-Wiedergabe
- **Playlist-Funktionalität** mit Next/Previous
- **Progress Bar** mit Seek-Funktion
- **Volume Control**
- **Loading States** und Error Handling
- **Spotify/Apple Music Links** (mit "Coming Soon" für leere URLs)

## 🎨 Design System

### Colors:

- **Solar Orange:** `#ff6b35` (Primary)
- **Solar Dark:** `#0f0f23` (Background)
- **Solar Gray:** `#1a1a2e` (Secondary)
- **Solar Light:** `#ffffff` (Text)

### Typography:

- **Headings:** Space Grotesk
- **Body:** Inter

### Animations:

- **Glow Effects** für Buttons
- **Particle System** im Hero-Bereich
- **Hover Transitions** für Cards

## 📱 Pages

- **Home:** Hero mit Visual Loop + Latest Release + Newsletter CTA
- **Music:** Release Grid mit Filtering
- **About:** Bio + Press Kit Downloads + Social Links
- **Contact:** Contact Form + Alternative Contact Methods

## 🚀 Deployment

### Vercel:

1. Push zu GitHub Repository
2. Verbinde mit Vercel
3. Füge Environment Variables hinzu:
   - `VITE_BUTTONDOWN_API_KEY`
   - `VITE_CONTACT_API_URL`
4. Deploy!

### Environment Variables für Vercel:

```
VITE_BUTTONDOWN_API_KEY=deb6e2f1-912d-4f8d-a536-3d350206eb79
VITE_CONTACT_API_URL=https://cms.borishorn.de/solar-transients-contact.php
VITE_SITE_URL=https://solar-transients.vercel.app
VITE_SITE_NAME=SOLAR TRANSIENTS
```

## 📁 Project Structure

```
src/
├── components/          # Vue Components
│   ├── Header.vue      # Navigation
│   ├── Footer.vue      # Footer mit Newsletter
│   ├── Player.vue      # Music Player
│   ├── ReleaseCard.vue # Release Display
│   └── VisualLoop.vue  # Particle Animation
├── views/              # Page Components
│   ├── Home.vue        # Landing Page
│   ├── Music.vue       # Music Releases
│   ├── About.vue       # Artist Bio
│   └── Contact.vue     # Contact Form
├── stores/             # Pinia Stores
│   ├── player.ts       # Music Player State
│   └── music.ts        # Release Data
├── types/              # TypeScript Types
└── router/             # Vue Router Config
```

## 🎯 Next Steps

1. **Real Assets:** Echte Cover Images und Preview Audio hinzufügen
2. **Social Media:** Echte Social Media Links konfigurieren
3. **Analytics:** Google Analytics oder ähnliches hinzufügen
4. **Testing:** E2E Tests mit Playwright oder Cypress

## 📄 License

© 2024 SOLAR TRANSIENTS. All rights reserved.

---

**Entwickelt mit ❤️ für SOLAR TRANSIENTS**
