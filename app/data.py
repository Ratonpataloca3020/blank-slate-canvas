from dataclasses import dataclass
from typing import Literal
from urllib.parse import quote


IconType = Literal[
    "administrative", "contracts", "civil", "public", 
    "compliance", "defense", "splaft"
]


@dataclass
class Contact:
    whatsapp: str = "51955068382"
    whatsapp_display: str = "+51 955 068 382"
    secondary_phone: str = "+51 920 567 730"
    email: str = "diegocpoma@gmail.com"
    address: str = "Jr. Parra del Riego N.° 338, 3.er piso"
    district: str = "El Tambo, Huancayo, Perú"


@dataclass
class Service:
    slug: str
    eyebrow: str
    title: str
    short_title: str
    summary: str
    description: str
    matters: list[str]
    approach: list[str]
    icon: IconType


@dataclass
class Professional:
    slug: str
    name: str
    role: str
    registry: str
    image: str
    focus: list[str]
    bio: str


@dataclass
class Course:
    category: str
    title: str
    description: str


@dataclass
class Article:
    category: str
    date: str
    title: str
    excerpt: str


# Datos de contacto
contact = Contact()


# Servicios
services: list[Service] = [
    Service(
        slug="derecho-administrativo",
        eyebrow="Relación con el Estado",
        title="Derecho Administrativo",
        short_title="Derecho Administrativo",
        summary="Asesoría frente a entidades públicas, procedimientos administrativos y decisiones que requieren una respuesta técnica y oportuna.",
        description="Acompañamos a personas, empresas y entidades en la prevención y resolución de controversias administrativas, con una estrategia construida desde el expediente, la normativa aplicable y el objetivo concreto del cliente.",
        matters=[
            "Procedimientos administrativos",
            "Recursos de reconsideración y apelación",
            "Procedimientos administrativos sancionadores",
            "Nulidad y revisión de actos administrativos",
            "Defensa ante entidades públicas",
            "Opiniones e informes legales"
        ],
        approach=[
            "Diagnóstico del expediente y los plazos",
            "Definición de una estrategia documentada",
            "Representación y seguimiento del procedimiento"
        ],
        icon="administrative"
    ),
    Service(
        slug="contrataciones-del-estado",
        eyebrow="Asesoría pública y empresarial",
        title="Contrataciones con el Estado",
        short_title="Contrataciones del Estado",
        summary="Prevención y solución de contingencias durante la preparación, selección, ejecución y cierre de contratos públicos.",
        description="Brindamos soporte legal durante todo el ciclo de contratación pública, identificando riesgos, ordenando la documentación y diseñando respuestas sostenibles ante observaciones o controversias.",
        matters=[
            "Revisión de bases y expedientes de contratación",
            "Consultas, observaciones y recursos",
            "Ejecución contractual y penalidades",
            "Ampliaciones de plazo y adicionales",
            "Resolución contractual y controversias",
            "Estrategia preventiva para proveedores"
        ],
        approach=[
            "Lectura contractual y mapa de riesgos",
            "Sustento normativo y probatorio",
            "Acompañamiento en cada hito del contrato"
        ],
        icon="contracts"
    ),
    Service(
        slug="derecho-civil",
        eyebrow="Protección patrimonial",
        title="Derecho Civil",
        short_title="Derecho Civil",
        summary="Soluciones para obligaciones, contratos, responsabilidad civil, propiedad, sucesiones y controversias patrimoniales.",
        description="Analizamos cada conflicto civil desde su impacto jurídico y económico para proponer una ruta clara: negociación, prevención contractual o defensa en la vía correspondiente.",
        matters=[
            "Contratos y obligaciones",
            "Responsabilidad civil",
            "Propiedad, posesión y saneamiento",
            "Incumplimiento y cobro de deudas",
            "Sucesiones y asuntos patrimoniales",
            "Negociación y solución de controversias"
        ],
        approach=[
            "Revisión de títulos, contratos y evidencia",
            "Evaluación de riesgos y alternativas",
            "Negociación o defensa con objetivos medibles"
        ],
        icon="civil"
    ),
    Service(
        slug="compliance",
        eyebrow="Prevención y cultura de integridad",
        title="Compliance y Cumplimiento",
        short_title="Compliance",
        summary="Diseño y fortalecimiento de mecanismos de cumplimiento, integridad y prevención de riesgos legales.",
        description="Convertimos las obligaciones de cumplimiento en procesos comprensibles y aplicables, adecuados al tamaño, actividad y nivel de exposición de cada organización.",
        matters=[
            "Diagnóstico de riesgos legales",
            "Políticas y códigos de conducta",
            "Controles y matrices de cumplimiento",
            "Canales y protocolos internos",
            "Capacitación de equipos",
            "Prevención de conflictos de interés"
        ],
        approach=[
            "Diagnóstico proporcional a la organización",
            "Diseño de herramientas concretas",
            "Implementación, capacitación y mejora continua"
        ],
        icon="compliance"
    ),
]


# Profesionales
professionals: list[Professional] = [
    Professional(
        slug="diego-gonzalo-cordova-poma",
        name="Diego Gonzalo Córdova Poma",
        role="Abogado asociado",
        registry="Colegiatura N.° 7268",
        image="/static/media/diego-cordova-professional.png",
        focus=["Derecho Federal", "Derecho Administrativo", "Contrataciones del Estado"],
        bio="Especialista en el análisis estratégico de asuntos vinculados con la administración pública y la contratación estatal. Su práctica combina precisión normativa, evaluación de riesgos y acompañamiento cercano al cliente."
    ),
    Professional(
        slug="luis-alberto-cordova-morales",
        name="Luis Alberto Córdova Morales",
        role="Abogado asociado",
        registry="Consultoría y defensa especializada",
        image="/static/media/luis-cordova-professional.png",
        focus=[
            "Derecho Civil",
            "Gestión Pública",
            "Contrataciones del Estado",
            "Compliance",
            "Defensa en casos de corrupción de funcionarios"
        ],
        bio="Especialista en derecho civil, gestión pública y cumplimiento. Brinda asesoría y defensa en asuntos complejos, con especial atención a la integridad, la evidencia y la protección de los intereses del cliente."
    ),
]


# Cursos
courses: list[Course] = [
    Course(
        category="Compliance",
        title="Diseño e implementación de programas de cumplimiento",
        description="Una ruta aplicada para reconocer riesgos, construir controles y consolidar una cultura de integridad."
    ),
    Course(
        category="Contratación pública",
        title="Contrataciones del Estado: normativa y procedimientos",
        description="Lectura práctica de las etapas, documentos y decisiones críticas de la contratación pública."
    ),
    Course(
        category="Gestión pública",
        title="Procedimiento administrativo y potestad sancionadora",
        description="Fundamentos y criterios para actuar con seguridad frente a procedimientos administrativos sancionadores."
    ),
]


# Artículos
articles: list[Article] = [
    Article(
        category="Derecho administrativo",
        date="Lectura de 6 min",
        title="Qué revisar antes de responder una notificación administrativa",
        excerpt="Plazos, autoridad competente, antecedentes y documentación: cuatro puntos que pueden cambiar por completo la estrategia."
    ),
    Article(
        category="Contrataciones del Estado",
        date="Lectura de 7 min",
        title="Riesgos frecuentes durante la ejecución de un contrato público",
        excerpt="Cómo ordenar comunicaciones, sustento técnico y evidencia para prevenir controversias evitables."
    ),
    Article(
        category="Compliance",
        date="Lectura de 5 min",
        title="Un programa de cumplimiento debe funcionar, no solo existir",
        excerpt="Políticas, responsables y controles simples para convertir el documento en una práctica cotidiana."
    ),
]


def whatsapp_link(message: str) -> str:
    """Genera un enlace de WhatsApp con un mensaje predefinido."""
    return f"https://wa.me/{contact.whatsapp}?text={quote(message)}"


def get_service_by_slug(slug: str) -> Service | None:
    """Obtiene un servicio por su slug."""
    return next((s for s in services if s.slug == slug), None)
