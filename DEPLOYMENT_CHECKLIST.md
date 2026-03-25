# Pre-Deployment Checklist

## Code Quality

- [ ] `npm run lint` passes with no errors
- [ ] `npm run build` succeeds (0 TypeScript errors)
- [ ] All dependencies are up to date (`npm list`)
- [ ] No console warnings in development terminal
- [ ] No commented-out code left in components

## Functionality Testing

- [ ] Dashboard loads without errors
- [ ] All 4 filters (Expense Type, Entity, Region, Month) work
  - [ ] Expense Type changes chart revenue significantly
  - [ ] Entity changes chart data visibly
  - [ ] Region changes division share pie chart
  - [ ] Month changes time range or displays correct subset
- [ ] Charts render properly with responsive sizing
- [ ] Company comparison feature works
- [ ] Knowledge graph loads and renders

## Theme & Accessibility

- [ ] Dark mode toggle works on all pages
- [ ] Text is readable in both light and dark modes
- [ ] All interactive elements have proper focus states (keyboard nav)
- [ ] Images have alt text
- [ ] SVG logo has title and role attributes
- [ ] Lighthouse accessibility score ≥ 95

## Performance & SEO

- [ ] Page load time < 3 seconds
- [ ] Lighthouse Performance score ≥ 90
- [ ] Lighthouse SEO score ≥ 90
- [ ] OpenGraph meta tags are correct
- [ ] Twitter Card meta tags are present
- [ ] Robots.txt allows indexing (check metadata)

## Responsive Design

- [ ] Mobile layout (320px width) is usable
- [ ] Tablet layout (768px width) displays properly
- [ ] Desktop layout (1440px width) looks optimal
- [ ] Charts are responsive on all screen sizes
- [ ] Dropdowns/inputs are touch-friendly on mobile

## Browser Compatibility

- [ ] Chrome/Chromium latest version ✓
- [ ] Firefox latest version ✓
- [ ] Safari latest version ✓
- [ ] Edge latest version ✓
- [ ] Mobile Safari (iOS 12+) ✓

## Environment & Deployment

- [ ] `.env.example` is created and up-to-date
- [ ] All environment variables documented
- [ ] No secrets in code (API keys, tokens)
- [ ] Docker build succeeds: `docker build -t ledgeriq .`
- [ ] Docker image runs: `docker run -p 3000:3000 ledgeriq`

## Error Handling

- [ ] Error boundary works on dashboard
- [ ] Loading skeleton displays during data fetch
- [ ] Graceful fallback when filters requested
- [ ] 404 page exists (\_not-found.tsx)

## Documentation

- [ ] README.md is complete and accurate
- [ ] API integration instructions are documented
- [ ] Troubleshooting section covers common issues
- [ ] Project structure is documented
- [ ] Deployment instructions are clear

## Analytics Preparation

- [ ] Analytics service is configured (or ready to add)
- [ ] Error tracking is ready (e.g., Sentry)
- [ ] Performance monitoring is set up
- [ ] User behavior tracking is planned

## Post-Deploy Monitoring

- [ ] Set up error alerts
- [ ] Set up performance monitoring
- [ ] Configure uptime monitoring
- [ ] Plan for log aggregation
- [ ] Have rollback plan ready

## Final Sign-Off

- [ ] All checklist items marked complete
- [ ] Code reviewed (if team project)
- [ ] Team has been notified
- [ ] Deployment is scheduled
- [ ] Backup/rollback procedure confirmed

---

**Date Checked:** ******\_\_\_******  
**Checked By:** ******\_\_\_******  
**Ready to Deploy:** [ ] Yes [ ] No
