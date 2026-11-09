# Noticias Dinámicas - Lexflex

## Feature Overview
Added a dynamic news section to Lexflex (`/noticias`) that displays legal news from Peru.

## Current Implementation

### What's Working
- ✅ `/noticias` route in Flask app (`app/main_flask.py`)
- ✅ News template with responsive grid layout (`app/templates/pages/noticias.html`)
- ✅ News navigation link in header (desktop + mobile menus)
- ✅ In-memory caching with 1-hour TTL to optimize performance
- ✅ 6 realistic legal news articles in Spanish
- ✅ Tested locally and works in production

### Current Data Source
**Demo Data:** Uses realistic legal news items covering common Peruvian law topics:
- Compliance anticorrupción
- Gestión Pública
- Derechos laborales
- Reforma tributaria
- Protección de datos
- Contrataciones públicas

## Future Enhancement

### API Integration Ready
The infrastructure is built to easily swap demo data with live El Peruano news:

1. **Option A - El Peruano RSS Feed** (if available)
   - Update `_fetch_with_requests()` to parse RSS
   - Replace demo data fallback

2. **Option B - El Peruano API** (if they publish one)
   - Implement HTTP client in scraper
   - Parse JSON response

3. **Option C - Google News API**
   - Use GNews API for Peru legal news
   - Filter by "derecho" keyword

### Files to Modify When API Becomes Available
- `app/news_scraper.py` - Update scraping functions
- Add API key to environment variables if needed
- Update requirements if new dependencies needed

## Testing

### Local Testing
```bash
python -m flask --app app.main_flask run
# Visit http://127.0.0.1:8080/noticias
```

### Production (PythonAnywhere)
```
https://www.lexflexperu.com/noticias
```

## Technical Details

### File Structure
```
app/
├── news_scraper.py          # News fetching + caching logic
├── main_flask.py            # /noticias route
└── templates/
    └── pages/
        └── noticias.html    # News grid template
```

### Cache Behavior
- **Duration:** 1 hour (3600 seconds)
- **Invalidation:** Automatic after TTL expires
- **Manual Clear:** Call `clear_cache()` if needed

### Performance
- News loaded on first request
- Cached for subsequent requests
- No blocking I/O (requests are sync but acceptable for 1hr cache)

## Deployment Notes

### For PythonAnywhere
1. Pull latest code: `git pull origin main`
2. Dependencies already in `requirements-flask.txt`
3. Restart web app from PythonAnywhere dashboard
4. Verify: `https://www.lexflexperu.com/noticias`

### Environment Variables
None required for demo data. When integrating real API:
- `ELPERUANO_API_KEY` (if needed)
- `GNEWS_API_KEY` (if using Google News)

## Maintenance

### Monitoring
Check logs for scraping errors:
```bash
# In PythonAnywhere error logs
grep "news_scraper" /var/log/lexflexperu.com-error_log
```

### Troubleshooting

**"Las noticias se están actualizando" message**
- Means both Selenium and requests scraping failed
- Falls back to demo data (current behavior)
- Check logs for specific errors

**To Force Refresh Cache**
```python
from app.news_scraper import clear_cache
clear_cache()
```

## Next Steps
1. Monitor which news source works best for Peru legal news
2. When El Peruano publishes API/RSS, integrate it
3. Consider adding news filtering by practice area
4. Add "load more" functionality if needed

