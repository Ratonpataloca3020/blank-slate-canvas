"""
News Scraper para El Peruano - Sección Derecho
Trae noticias dinámicamente de https://elperuano.pe/derecho
"""
import requests
from bs4 import BeautifulSoup
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

# Cache en memoria
_news_cache = {
    'articles': [],
    'last_updated': None,
    'cache_duration': 3600  # 1 hora en segundos
}


def _is_cache_valid():
    """Verificar si el cache es aún válido."""
    if not _news_cache['last_updated']:
        return False
    age = (datetime.now() - _news_cache['last_updated']).total_seconds()
    return age < _news_cache['cache_duration']


def fetch_news():
    """
    Traer noticias de El Peruano sección Derecho.
    Usa cache para evitar requests constantes.
    """
    # Si el cache es válido, devolver cached articles
    if _is_cache_valid() and _news_cache['articles']:
        logger.info("Devolviendo noticias del cache")
        return _news_cache['articles']
    
    try:
        logger.info("Scrapeando noticias de El Peruano...")
        
        url = "https://elperuano.pe/derecho"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        articles = []
        
        # Buscar elementos de noticias (esto puede variar según la estructura de El Peruano)
        # Intentamos diferentes selectores comunes
        news_items = soup.find_all('article') or soup.find_all('div', class_='news-item') or soup.find_all('div', class_='article')
        
        for item in news_items[:10]:  # Limitar a 10 noticias
            try:
                # Intentar extraer título
                title_elem = item.find('h2') or item.find('h3') or item.find('a')
                if not title_elem:
                    continue
                    
                title = title_elem.get_text(strip=True)
                
                # Intentar extraer link
                link_elem = item.find('a', href=True)
                link = link_elem['href'] if link_elem else "#"
                
                # Hacer URL absoluta si es relativa
                if link.startswith('/'):
                    link = "https://elperuano.pe" + link
                elif not link.startswith('http'):
                    link = "https://elperuano.pe/" + link
                
                # Intentar extraer descripción/resumen
                desc_elem = item.find('p') or item.find('div', class_='summary')
                description = desc_elem.get_text(strip=True)[:200] if desc_elem else ""
                
                # Intentar extraer fecha
                date_elem = item.find('time') or item.find('span', class_='date')
                date_str = date_elem.get_text(strip=True) if date_elem else "Fecha no disponible"
                
                if title:  # Solo agregar si hay título
                    articles.append({
                        'title': title,
                        'link': link,
                        'description': description,
                        'date': date_str,
                        'source': 'El Peruano'
                    })
            except Exception as e:
                logger.warning(f"Error extrayendo artículo: {e}")
                continue
        
        # Actualizar cache
        _news_cache['articles'] = articles
        _news_cache['last_updated'] = datetime.now()
        
        logger.info(f"Se obtuvieron {len(articles)} noticias")
        return articles
        
    except requests.RequestException as e:
        logger.error(f"Error descargando noticias de El Peruano: {e}")
        # Devolver articles del cache incluso si está expirado
        return _news_cache['articles']
    except Exception as e:
        logger.error(f"Error procesando noticias: {e}")
        return []


def get_cached_news():
    """Obtener noticias (usa cache si está disponible)."""
    return fetch_news()


def clear_cache():
    """Limpiar el cache manualmente."""
    _news_cache['articles'] = []
    _news_cache['last_updated'] = None
    logger.info("Cache de noticias limpiado")
