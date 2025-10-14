# SOLAR TRANSIENTS - Artist Portfolio

A sleek, responsive artist portfolio for SOLAR TRANSIENTS built with Vue 3, Vite, and Tailwind CSS. Features Spotify integration, audiovisual hero section, and modern design aesthetics.

## 🚀 Features

- **Modern Tech Stack**: Vue 3 with Composition API, Vite, TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Music Integration**: Spotify player, preview audio, release management
- **Visual Effects**: Canvas-based particle system in hero section
- **SEO Optimized**: Dynamic meta tags, Open Graph support
- **Accessibility**: Keyboard navigation, ARIA labels, screen reader support
- **State Management**: Pinia for global state
- **Deployment Ready**: Configured for Vercel deployment

## 🎨 Design System

- **Colors**: Solar orange (#FF6B35), dark theme with gradient accents
- **Typography**: Inter (body), Space Grotesk (headings)
- **Animations**: Smooth transitions, hover effects, particle system
- **Layout**: Grid-based responsive design

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Header.vue      # Navigation header
│   ├── Footer.vue      # Site footer with social links
│   ├── Player.vue      # Music player component
│   ├── ReleaseCard.vue # Music release card
│   └── VisualLoop.vue  # Hero particle system
├── views/              # Page components
│   ├── Home.vue        # Landing page with hero
│   ├── Music.vue       # Music releases grid
│   ├── About.vue       # Artist bio and press kit
│   └── Contact.vue     # Contact form
├── stores/             # Pinia state management
│   ├── player.ts       # Music player state
│   └── music.ts        # Music releases data
├── types/              # TypeScript type definitions
└── assets/             # Static assets
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/solar-transients.git
cd solar-transients
```

2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp env.example .env.local
```

4. Update environment variables with your API keys:

```bash
# Edit .env.local with your actual values
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
VITE_EMAIL_SERVICE_URL=your_email_service_url
# ... etc
```

5. Start development server:

```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

## 🎵 Music Integration

### Spotify Setup

1. Create a Spotify app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Add your client ID to environment variables
3. Configure redirect URI for OAuth flow
4. Update release data in `src/stores/music.ts`

### Adding New Releases

Update the releases array in `src/stores/music.ts`:

```typescript
{
  id: 'unique-id',
  title: 'Release Title',
  date: '2024-01-15',
  coverUrl: '/images/cover.jpg',
  spotifyUrl: 'https://open.spotify.com/album/...',
  appleUrl: 'https://music.apple.com/album/...',
  previewUrl: '/audio/preview.mp3',
  description: 'Release description...',
  tags: ['ambient', 'electronic'],
  type: 'EP' // 'Single', 'EP', or 'Album'
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vue.js framework
4. Add environment variables in Vercel dashboard
5. Deploy!

### Manual Deployment

1. Build the project:

```bash
npm run build
```

2. The `dist` folder contains the production build
3. Deploy the contents to your hosting provider

### Environment Variables for Production

Set these in your deployment platform:

- `VITE_SPOTIFY_CLIENT_ID` - Spotify API client ID
- `VITE_EMAIL_SERVICE_URL` - Email service endpoint
- `VITE_EMAIL_SERVICE_API_KEY` - Email service API key
- `VITE_NEWSLETTER_SERVICE_URL` - Newsletter service endpoint
- `VITE_NEWSLETTER_SERVICE_API_KEY` - Newsletter service API key
- `VITE_SITE_URL` - Your production site URL

## 🎨 Customization

### Colors

Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  'solar-orange': '#FF6B35',
  'solar-dark': '#1A1A1A',
  // ... add your colors
}
```

### Typography

Change fonts in `tailwind.config.js` and update the Google Fonts link in `index.html`.

### Content

- Update artist bio in `src/views/About.vue`
- Modify release data in `src/stores/music.ts`
- Customize social links in `src/components/Footer.vue`

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- High contrast color scheme
- Focus indicators

## 🔧 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, contact:

- Email: hello@solar-transients.com
- Website: https://solar-transients.vercel.app

---

Built with ❤️ for SOLAR TRANSIENTS
