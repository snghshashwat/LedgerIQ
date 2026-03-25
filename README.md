# LedgerIQ - Financial Intelligence Dashboard

AI-powered financial insights dashboard with interactive visualizations, dark mode support, and advanced filtering.

## Features

- 📊 **Interactive Financial Charts** - Revenue, margins, and division share analysis with Recharts
- 🎨 **Dark Mode Support** - WCAG AAA compliant color palette with seamless theme switching
- 🔍 **Advanced Filtering** - Filter by expense type, corporate entity, region, and time period
- 📈 **Company Comparison** - Side-by-side metric comparison with visual indicators
- 🧠 **Knowledge Graph** - Interactive node visualization showing financial relationships
- 🎬 **GSAP Animations** - Smooth, performant micro-interactions and transitions

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router, Turbopack)
- **UI**: React 19.2.4 with TypeScript
- **Styling**: Tailwind CSS 4 with CSS custom properties for theming
- **Charts**: Recharts 3.8.0
- **Animations**: GSAP 3.14.2
- **Fonts**: IBM Plex Sans & Mono (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/ledgeriq.git
cd ledgeriq

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Structure

```
src/
├── app/                      # Next.js app routes
│   ├── layout.tsx            # Root layout with theme provider
│   ├── globals.css           # Global styles & theme variables
│   ├── page.tsx              # Landing page with animations
│   ├── dashboard/            # Dashboard route
│   ├── company/              # Company detail pages
│   ├── chat/                 # Chat interface
│   └── insights/             # Insights page
├── components/
│   ├── dashboard/            # Dashboard components
│   │   └── dashboard-client.tsx  # Main interactive dashboard
│   ├── charts/               # Chart components
│   ├── layout/               # Layout components (navbar, footer)
│   ├── logo/                 # Branding
│   └── knowledge-graph/      # Graph visualization
├── hooks/                    # Custom React hooks
│   └── use-theme.tsx         # Theme management hook
├── data/                     # Mock data
│   └── mock-financials.ts    # Sample financial data
└── styles/                   # Additional stylesheets
```

## Key Features Guide

### Dark Mode

- Automatic theme detection based on system preferences
- Manual toggle via navbar button
- WCAG AAA contrast ratios for accessibility
- CSS variables for easy customization

### Filter System

The dashboard includes 4 interactive filters on the Financial Reporting scene:

- **Expense Type**: Cost of Revenue, Operating Expense, CAPEX, Depreciation
- **Corporate Entity**: Entity 1-4 with different data profiles
- **Region**: North America, Europe, Asia-Pacific
- **Month**: Select month to view quarterly trends

Each filter combination loads distinct pre-computed datasets with significant visual variation (50-100% differences).

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Tested on screens from 320px to 2560px
- Responsive charts with ResponsiveContainer
- Touch-friendly filter controls

## API Integration

Currently using mock data from `src/data/mock-financials.ts`. To connect to a real API:

1. Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. Replace mock data imports with API calls in dashboard-client.tsx
3. Implement error boundaries for failed requests
4. Add loading skeletons while fetching data

Example:

```typescript
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/financials`)
    .then((res) => res.json())
    .then(setData)
    .catch(handleError)
    .finally(() => setLoading(false));
}, []);
```

## Performance Optimization

- **Build**: ~9s compilation with Turbopack
- **Route**: 7 total routes (6 static, 1 dynamic)
- **Bundle**: Optimized with tree-shaking and code splitting
- **Fonts**: Preload critical fonts (IBM Plex Sans)
- **Images**: AVIF/WebP format support with fallbacks

### Lighthouse Targets

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

## Accessibility

- WCAG AAA color contrast ratios (light & dark modes)
- Semantic HTML structure
- ARIA labels on interactive elements (dropdowns, buttons)
- Keyboard navigation support
- Alt text on images and logos

## Deployment

### Vercel (Recommended)

```bash
# Connect GitHub repo to Vercel
# Set environment variables in Vercel dashboard
# Push to main branch - auto-deploys
```

### Docker

```bash
docker build -t ledgeriq .
docker run -p 3000:3000 ledgeriq
```

### Environment Variables

See `.env.example` for required configuration:

- `NEXT_PUBLIC_API_URL` - Backend API endpoint
- `NEXT_PUBLIC_ENABLE_ANALYTICS` - Analytics tracking toggle
- `NODE_ENV` - Production/development mode

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 10+

## Testing

```bash
# Manual testing checklist:
# - All 4 filters update charts visibly
# - Dark mode toggle works on all pages
# - Navbar links navigate correctly
# - Charts render without console errors
# - Mobile view is usable (< 480px)
# - Load time < 3 seconds
```

### Automated Testing (TODO)

- Unit tests with Jest/Vitest
- E2E tests with Playwright/Cypress
- Performance testing with Lighthouse CI

## Troubleshooting

### Dev server won't start

```bash
# Kill existing process and restart
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Build fails with TypeScript errors

```bash
# Clear cache and rebuild
rm -rf .next .turbo node_modules/.cache
npm run build
```

### Charts not rendering

- Check browser console for ResizeObserver errors
- Ensure chart container has non-zero width/height
- Verify CSS for responsive containers

## Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make changes and test locally
3. Run linting: `npm run lint`
4. Commit: `git commit -m 'Add amazing feature'`
5. Push and create Pull Request

## Roadmap

- [ ] Backend API integration
- [ ] User authentication (OAuth/SSO)
- [ ] Data export (PDF, CSV)
- [ ] Custom report builder
- [ ] Real-time data streaming (WebSocket)
- [ ] Advanced analytics with ML predictions
- [ ] Mobile app (React Native)
- [ ] Multi-language support (i18n)

## License

MIT License - see LICENSE file for details

## Support

- 📧 Email: support@ledgeriq.com
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

---

**Last Updated**: March 2026  
**Maintained By**: LedgerIQ Team
