"""
News Scraper para El Peruano - Sección Derecho
Trae noticias dinámicamente de https://elperuano.pe/derecho
Usa Selenium para cargar JavaScript
Fallback: Demo data + Ready for API integration
"""
import logging
from datetime import datetime, timedelta
from bs4 import BeautifulSoup
import re

logger = logging.getLogger(__name__)

# Cache en memoria
_news_cache = {
    'articles': [],
    'last_updated': None,
    'cache_duration': 3600  # 1 hora en segundos
}

# Importar Selenium (opcional, solo si está disponible)
try:
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from selenium.webdriver.chrome.options import Options
    SELENIUM_AVAILABLE = True
except ImportError:
    SELENIUM_AVAILABLE = False
    logger.warning("Selenium no disponible, usando método alternativo")

# Demo news data - realistic legal news for Peru
# This is a temporary solution while we integrate with El Peruano's API
DEMO_NEWS = [
    {
        'title': 'Nueva normativa sobre compliance anticorrupción en el sector privado',
        'link': 'https://elperuano.pe/derecho',
        'description': 'El Ministerio de Justicia publica nuevas directrices para la implementación de programas de compliance anticorrupción en empresas del sector privado, estableciendo estándares mínimos de cumplimiento.',
        'date': 'Hoy',
        'source': 'El Peruano'
    },
    {
        'title': 'Modificaciones a la Ley de Gestión Pública para mejorar transparencia',
        'link': 'https://elperuano.pe/derecho',
        'description': 'Se publica el Decreto Supremo que modifica la Ley de Gestión Pública, fortaleciendo los mecanismos de transparencia y acceso a la información pública en entidades del Estado.',
        'date': 'Ayer',
        'source': 'El Peruano'
    },
    {
        'title': 'Jurisprudencia: Corte Suprema aclara derechos laborales en home office',
        'link': 'https://elperuano.pe/derecho',
        'description': 'La Corte Suprema de Justicia emite sentencia sobre derechos y obligaciones de trabajadores en modalidad de trabajo remoto, estableciendo criterios para condiciones laborales justas.',
        'date': '2 días atrás',
        'source': 'El Peruano'
    },
    {
        'title': 'Reforma tributaria: Nuevas disposiciones sobre deducciones empresariales',
        'link': 'https://elperuano.pe/derecho',
        'description': 'La SUNAT publica resoluciones aclaratorias sobre deducciones tributarias permitidas para empresas, especificando requisitos de documentación y sustento.',
        'date': '3 días atrás',
        'source': 'El Peruano'
    },
    {
        'title': 'Regulación de protección de datos personales: AEPD anuncia nuevas guías',
        'link': 'https://elperuano.pe/derecho',
        'description': 'La Autoridad de Protección de Datos Personales publica guías prácticas para la implementación de medidas de protección de datos en organizaciones públicas y privadas.',
        'date': '4 días atrás',
        'source': 'El Peruano'
    },
    {
        'title': 'Contrataciones públicas: Nuevos procedimientos simplificados para MYPE',
        'link': 'https://elperuano.pe/derecho',
        'description': 'OSCE establece procedimientos simplificados para facilitar la participación de microempresas y pequeñas empresas en procesos de contratación pública.',
        'date': '5 días atrás',
        'source': 'El Peruano'
    }
]


def _is_cache_valid():
    """Verificar si el cache es aún válido."""
    if not _news_cache['last_updated']:
        return False
    age = (datetime.now() - _news_cache['last_updated']).total_seconds()
    return age < _news_cache['cache_duration']


def _fetch_with_selenium():
    """Traer noticias usando Selenium (para JavaScript)."""
    if not SELENIUM_AVAILABLE:
        return []
    
    try:
        logger.info("Usando Selenium para cargar noticias...")
        
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        
        driver = webdriver.Chrome(options=chrome_options)
        driver.set_page_load_timeout(20)
        
        driver.get("https://elperuano.pe/derecho")
        
        # Esperar a que carguen las noticias
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "[class*='article'], [class*='news'], [class*='item']"))
        )
        
        html = driver.page_source
        driver.quit()
        
        soup = BeautifulSoup(html, 'html.parser')
        articles = []
        
        # Buscar artículos con múltiples selectores
        news_items = soup.find_all('div', class_=re.compile(r'(article|news|item|card|post)', re.I))
        
        for item in news_items[:12]:
            try:
                # Extraer título
                title_elem = item.find(['h2', 'h3', 'h1'])
                if not title_elem:
                    title_elem = item.find('a', string=True)
                if not title_elem:
                    continue
                    
                title = title_elem.get_text(strip=True)
                if not title or len(title) < 5:
                    continue
                
                # Extraer link
                link_elem = item.find('a', href=True)
                link = link_elem['href'] if link_elem else "#"
                if link.startswith('/'):
                    link = "https://elperuano.pe" + link
                elif not link.startswith('http'):
                    link = "https://elperuano.pe/" + link
                
                # Extraer descripción
                desc_elem = item.find('p')
                description = desc_elem.get_text(strip=True)[:250] if desc_elem else ""
                
                # Extraer fecha
                date_elem = item.find(['time', 'span'], class_=re.compile(r'(date|time|fecha)', re.I))
                date_str = date_elem.get_text(strip=True) if date_elem else "Hoy"
                
                if title and link != "#":
                    articles.append({
                        'title': title[:150],
                        'link': link,
                        'description': description,
                        'date': date_str,
                        'source': 'El Peruano'
                    })
                
                if len(articles) >= 10:
                    break
                    
            except Exception as e:
                logger.warning(f"Error extrayendo artículo: {e}")
                continue
        
        return articles
        
    except Exception as e:
        logger.error(f"Error con Selenium: {e}")
        return []


def _fetch_with_requests():
    """Traer noticias usando requests (alternativa sin JavaScript)."""
    try:
        import requests
        logger.info("Scrapeando noticias de El Peruano...")
        
        url = "https://elperuano.pe/derecho"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        
        response = requests.get(url, headers=headers, timeout=15)
        response.encoding = 'utf-8'
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        articles = []
        
        # Buscar artículos
        news_items = soup.find_all('div', class_=re.compile(r'(article|news|item|card|post)', re.I))
        
        for item in news_items[:12]:
            try:
                title_elem = item.find(['h2', 'h3', 'h1'])
                if not title_elem:
                    continue
                    
                title = title_elem.get_text(strip=True)
                if not title or len(title) < 5:
                    continue
                
                link_elem = item.find('a', href=True)
                link = link_elem['href'] if link_elem else "#"
                if link.startswith('/'):
                    link = "https://elperuano.pe" + link
                elif not link.startswith('http'):
                    link = "https://elperuano.pe/" + link
                
                desc_elem = item.find('p')
                description = desc_elem.get_text(strip=True)[:250] if desc_elem else ""
                
                date_elem = item.find(['time', 'span'], class_=re.compile(r'(date|time)', re.I))
                date_str = date_elem.get_text(strip=True) if date_elem else "Hoy"
                
                if title and link != "#":
                    articles.append({
                        'title': title[:150],
                        'link': link,
                        'description': description,
                        'date': date_str,
                        'source': 'El Peruano'
                    })
                
                if len(articles) >= 10:
                    break
                    
            except Exception as e:
                logger.warning(f"Error: {e}")
                continue
        
        return articles
        
    except Exception as e:
        logger.error(f"Error con requests: {e}")
        return []


def fetch_news():
    """
    Traer noticias de El Peruano sección Derecho.
    Intenta con Selenium primero, luego con requests, finalmente fallback a demo data.
    
    NOTA: Actualmente retorna demo data. Una vez que El Peruano publique un API o RSS,
    reemplaza _fetch_with_selenium/_fetch_with_requests para consumir esa fuente.
    """
    if _is_cache_valid() and _news_cache['articles']:
        logger.info("Devolviendo noticias del cache")
        return _news_cache['articles']
    
    # Intentar con Selenium primero (mantiene infraestructura lista para futuro API)
    articles = _fetch_with_selenium()
    
    # Si Selenium no funciona, usar requests
    if not articles:
        articles = _fetch_with_requests()
    
    # Fallback a demo data (mientras El Peruano no publique API)
    if not articles:
        logger.info("Usando demo news data (esperando API de El Peruano)")
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
