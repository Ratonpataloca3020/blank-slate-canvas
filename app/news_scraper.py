"""
News Scraper para Noticias Jurídicas de Perú
Fuentes: LP Derecho (lpderecho.pe) + fallback a demo data
HTML parsing con BeautifulSoup (sin JavaScript requerido)
"""
import logging
from datetime import datetime
from bs4 import BeautifulSoup
import re

logger = logging.getLogger(__name__)

# Cache en memoria
_news_cache = {
    'articles': [],
    'last_updated': None,
    'cache_duration': 3600  # 1 hora en segundos
}

# Import requests (required for scraping)
try:
    import requests
    REQUESTS_AVAILABLE = True
except ImportError:
    REQUESTS_AVAILABLE = False
    logger.warning("requests no disponible")

# Demo news data - Fallback si el scraping falla
DEMO_NEWS = [
    {
        'title': 'Dictan prisión preventiva a abogado sindicado de realizar tocamientos indebidos',
        'link': 'https://lpderecho.pe/dictan-prision-preventiva/',
        'description': 'El Poder Judicial dictó siete meses de prisión preventiva contra abogado investigado por delito de tocamientos indebidos.',
        'date': 'Hoy',
        'source': 'LP Derecho'
    },
    {
        'title': 'DL 1743 modifica la regulación de la legítima defensa',
        'link': 'https://lpderecho.pe/dl-1743-legitima-defensa/',
        'description': 'Se presume que quien ejerce la legítima defensa ha actuado de modo racional frente a la agresión ilegítima.',
        'date': 'Hoy',
        'source': 'LP Derecho'
    },
    {
        'title': 'Condenan a mujer que se hizo pasar por posesionaria de terreno',
        'link': 'https://lpderecho.pe/condenan-mujer-terreno/',
        'description': 'Condenada mujer que engañó a compradora tras pago de S/9000 mostrando documento falso de posesión.',
        'date': 'Hoy',
        'source': 'LP Derecho'
    },
    {
        'title': 'Reglamento TUO de la Ley de Jornada de Trabajo actualizado 2026',
        'link': 'https://lpderecho.pe/reglamento-jornada/',
        'description': 'Reglamento del TUO de la Ley de Jornada de Trabajo, Horario y Trabajo en Sobretiempo actualizado.',
        'date': 'Hoy',
        'source': 'LP Derecho'
    },
    {
        'title': 'La unión de hecho en el derecho civil [ACTUALIZADO 2026]',
        'link': 'https://lpderecho.pe/union-hecho-civil/',
        'description': 'Análisis actualizado sobre la regulación de la unión de hecho en el Código Civil Peruano.',
        'date': 'Hoy',
        'source': 'LP Derecho'
    },
    {
        'title': 'Juez protege a gestante cuyo exenamorado la presionaba para abortar',
        'link': 'https://lpderecho.pe/proteccion-gestante/',
        'description': 'Juez de Familia de Arequipa dictó medidas de protección a favor de gestante presionada para interrumpir embarazo.',
        'date': 'Ayer',
        'source': 'LP Derecho'
    }
]


def _is_cache_valid():
    """Verificar si el cache es aún válido."""
    if not _news_cache['last_updated']:
        return False
    age = (datetime.now() - _news_cache['last_updated']).total_seconds()
    return age < _news_cache['cache_duration']


def _fetch_from_lpderecho():
    """
    Traer noticias de LP Derecho (lpderecho.pe)
    Fuente: https://lpderecho.pe/
    Esta es la principal fuente de noticias jurídicas de Perú
    
    NOTA: Solo funciona si BeautifulSoup está disponible
    """
    if not BS4_AVAILABLE or not REQUESTS_AVAILABLE:
        return []
    
    try:
        logger.info("Scrapeando noticias de LP Derecho...")
        
        # URL para obtener noticias
        url = "https://lpderecho.pe/?s=&post_type=post&category=noticias"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.encoding = 'utf-8'
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        articles = []
        
        # LP Derecho usa estructura HTML estándar para posts
        # Buscar elementos de tipo post/article
        post_items = soup.find_all('article')
        
        if not post_items:
            # Fallback: buscar divs con clase 'post'
            post_items = soup.find_all(['div'], class_=re.compile(r'post|article|item', re.I))
        
        for item in post_items[:15]:
            try:
                # Extraer título
                title_elem = item.find(['h2', 'h3', 'h1', 'a'], class_=re.compile(r'title|heading', re.I))
                if not title_elem:
                    # Intentar con enlace de post
                    title_elem = item.find('a', string=True)
                
                if not title_elem:
                    continue
                
                title = title_elem.get_text(strip=True)
                if not title or len(title) < 10:
                    continue
                
                # Extraer enlace
                link_elem = item.find('a', href=True)
                link = link_elem['href'] if link_elem else ""
                
                if not link or not link.startswith('http'):
                    if link:
                        link = "https://lpderecho.pe" + (link if link.startswith('/') else '/' + link)
                    else:
                        continue
                
                # Extraer descripción/resumen
                description = ""
                desc_elem = item.find('p')
                if desc_elem:
                    description = desc_elem.get_text(strip=True)[:200]
                
                # Extraer fecha
                date_str = "Hoy"
                date_elem = item.find(['time', 'span'], class_=re.compile(r'date|meta|published', re.I))
                if date_elem:
                    date_text = date_elem.get_text(strip=True)
                    # Procesar fecha
                    if 'noviembre' in date_text.lower() or 'november' in date_text.lower():
                        date_str = 'Hoy'
                    elif 'octubre' in date_text.lower() or 'october' in date_text.lower():
                        date_str = 'Hace días'
                    else:
                        date_str = date_text[:30]
                
                # Extraer categoría si está disponible
                category = ""
                cat_elem = item.find(['span', 'a'], class_=re.compile(r'category|cat', re.I))
                if cat_elem:
                    category = cat_elem.get_text(strip=True)
                
                if title and link and len(title) > 10:
                    articles.append({
                        'title': title[:150],
                        'link': link,
                        'description': description,
                        'date': date_str,
                        'source': 'LP Derecho',
                        'category': category
                    })
                
                if len(articles) >= 10:
                    break
                    
            except Exception as e:
                logger.warning(f"Error extrayendo artículo de LP: {e}")
                continue
        
        if articles:
            logger.info(f"Se obtuvieron {len(articles)} artículos de LP Derecho")
        return articles
        
    except Exception as e:
        logger.error(f"Error scrapeando LP Derecho: {e}")
        return []


def fetch_news():
    """
    Traer noticias de Perú del ámbito legal.
    Intenta primero con LP Derecho, luego fallback a demo data.
    
    Fuentes:
    1. LP Derecho (lpderecho.pe) - Noticias jurídicas especializadas ⭐
    2. Demo data - Fallback si scraping falla
    
    Futuras opciones:
    - Poder Judicial RSS feed
    - Google News API
    - ANDINA news agency
    """
    if _is_cache_valid() and _news_cache['articles']:
        logger.info("Devolviendo noticias del cache")
        return _news_cache['articles']
    
    articles = []
    
    # Intentar con LP Derecho solo si BeautifulSoup está disponible
    if BS4_AVAILABLE and REQUESTS_AVAILABLE:
        articles = _fetch_from_lpderecho()
    else:
        logger.warning("BeautifulSoup o requests no disponible - usando demo data")
    
    # Fallback a demo data si LP Derecho no funciona
    if not articles:
        logger.info("Usando demo news data (LP Derecho no disponible)")
        articles = DEMO_NEWS.copy()
    
    # Actualizar cache
    _news_cache['articles'] = articles
    _news_cache['last_updated'] = datetime.now()
    
    logger.info(f"Se obtuvieron {len(articles)} noticias")
    return articles


def get_cached_news():
    """Obtener noticias (usa cache si está disponible)."""
    return fetch_news()


def clear_cache():
    """Limpiar el cache manualmente."""
    _news_cache['articles'] = []
    _news_cache['last_updated'] = None
    logger.info("Cache de noticias limpiado")
