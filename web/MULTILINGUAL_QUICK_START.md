# Multilingual SEO - Quick Start

## ✅ What's Been Implemented

Your portfolio now has **production-ready multilingual SEO** with:

1. **Separate URLs for each language**
   - English: `/en/`
   - Slovak: `/sk/`

2. **Localized SEO metadata**
   - Unique titles, descriptions, and keywords per language
   - Automatic hreflang tags
   - Open Graph and Twitter Card support

3. **Static generation**
   - All pages pre-rendered at build time
   - Works with `output: 'export'`
   - Deploy to any static host

4. **Language detection**
   - Auto-detects user's browser language (client-side)
   - URL-based language switching
   - Fully compatible with static export

## 🚀 Usage

### Build the site
```bash
npm run build
```

This generates:
- `/out/en/index.html`
- `/out/sk/index.html`

### Deploy
Upload the `out/` directory to your static host (GitHub Pages, Netlify, Vercel, etc.).

### Access
- Visit `https://yoursite.com/en/` for English
- Visit `https://yoursite.com/sk/` for Slovak
- Visit `https://yoursite.com/` → auto-redirects based on browser language

## 📝 Adding Content for New Languages

### Update translations in `public/locales/[lang].json`

**For UI content:**
```json
{
  "header.home": "Home",
  "hero.title": "My Title"
}
```

**For SEO (most important!):**
```json
{
  "seo.title": "Your SEO Title - Keywords Here",
  "seo.description": "Your meta description with target keywords",
  "seo.keywords": "keyword1, keyword2, keyword3"
}
```

## 🔍 SEO Checklist

- ✅ Each language has unique URL (`/en/`, `/sk/`)
- ✅ Localized title tags (not just translated)
- ✅ Localized meta descriptions with keywords
- ✅ hreflang tags automatically generated
- ✅ Canonical URLs set correctly
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Structured data (JSON-LD)
- ✅ Static generation for performance

## 📊 Verify SEO

### Check metadata
```bash
# View English page source
curl https://yoursite.com/en/ | grep -i "title\|description\|hreflang"

# View Slovak page source
curl https://yoursite.com/sk/ | grep -i "title\|description\|hreflang"
```

### Google Search Console
1. Add both URLs:
   - `https://yoursite.com/en/`
   - `https://yoursite.com/sk/`
2. Submit sitemaps for each language
3. Monitor indexing for both versions

### Test with SEO tools
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/)
- [Ahrefs Site Audit](https://ahrefs.com/site-audit)

## 🌍 How Search Engines See Your Site

**Google.com (English users):**
```html
<title>DAV Development - Modern Web Development & Digital Solutions</title>
<link rel="canonical" href="https://davdev.eu/en" />
```

**Google.sk (Slovak users):**
```html
<title>DAV Development - Moderný Vývoj Webov a Digitálne Riešenia</title>
<link rel="canonical" href="https://davdev.eu/sk" />
```

Both versions are linked via hreflang:
```html
<link rel="alternate" hreflang="en" href="https://davdev.eu/en" />
<link rel="alternate" hreflang="sk" href="https://davdev.eu/sk" />
```

## 🎯 Next Steps

1. **Keyword Research**: Research target keywords for each language/market
2. **Update Translations**: Optimize `seo.title`, `seo.description`, `seo.keywords` in each `locales/*.json` file
3. **Create Sitemap**: Generate and submit XML sitemaps for each language
4. **Monitor Performance**: Use Google Search Console to track rankings
5. **Add More Languages**: Follow the guide in `MULTILINGUAL_SEO.md`

## 📚 Full Documentation

See `MULTILINGUAL_SEO.md` for complete details on:
- How the implementation works
- Adding new languages
- Customizing SEO metadata
- Troubleshooting

## ⚡ Key Files

- `src/lib/i18n.ts` - Language configuration
- `src/app/[lang]/layout.tsx` - SEO metadata generation
- `public/locales/*.json` - Translations & SEO content
- `src/app/page.tsx` - Language detection (client-side)

---

**Built with Next.js 15 App Router + Static Export**  
Following Google's multilingual SEO best practices
