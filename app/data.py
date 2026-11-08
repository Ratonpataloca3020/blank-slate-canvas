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
        slug="gestion-publica",
        eyebrow="Decisiones con sustento",
        title="Gestión Pública",
        short_title="Gestión Pública",
        summary="Consultoría jurídica para fortalecer decisiones, procesos internos y cumplimiento dentro de organizaciones públicas.",
        description="Apoyamos la adopción de decisiones públicas con criterios de legalidad, trazabilidad y prevención de riesgos, conectando el análisis jurídico con la realidad operativa de cada institución.",
        matters=[
            "Informes y opiniones legales",
            "Revisión de procedimientos internos",
            "Gestión de riesgos públicos",
            "Responsabilidad funcional",
            "Mejora de documentos y directivas",
            "Asistencia técnica a equipos de gestión"
        ],
        approach=[
            "Comprensión del proceso institucional",
            "Identificación de brechas y responsabilidades",
            "Recomendaciones claras y aplicables"
        ],
        icon="public"
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
    Service(
        slug="defensa-corrupcion-funcionarios",
        eyebrow="Defensa especializada",
        title="Defensa en casos de corrupción de funcionarios",
        short_title="Defensa anticorrupción",
        summary="Defensa técnica en investigaciones y procesos vinculados con presuntos delitos contra la administración pública.",
        description="Abordamos cada caso con reserva, revisión rigurosa de los hechos y una estrategia de defensa que integra el expediente, la prueba y el contexto de la función pública.",
        matters=[
            "Evaluación inicial y teoría del caso",
            "Investigaciones preliminares y preparatorias",
            "Revisión de actos funcionales y expedientes",
            "Estrategia probatoria y documental",
            "Acompañamiento en diligencias",
            "Defensa durante el proceso"
        ],
        approach=[
            "Confidencialidad desde el primer contacto",
            "Reconstrucción documentada de los hechos",
            "Defensa técnica y comunicación permanente"
        ],
        icon="defense"
    ),
    Service(
        slug="splaft",
        eyebrow="Prevención LA/FT",
        title="SPLAFT — Prevención de lavado de activos y financiamiento del terrorismo",
        short_title="SPLAFT",
        summary="Diseño, implementación y fortalecimiento de sistemas de prevención de lavado de activos y financiamiento del terrorismo, con experiencia ante la UIF.",
        description="Acompañamos a sujetos obligados en la construcción de un SPLAFT funcional y verificable: desde el diagnóstico de riesgos y el manual de prevención hasta el reporte ante la UIF-Perú y la atención de requerimientos y supervisiones.",
        matters=[
            "Implementación del SPLAFT",
            "Manual y código de conducta LA/FT",
            "Designación y soporte al Oficial de Cumplimiento",
            "Debida diligencia del cliente y matriz de riesgos",
            "Registro de operaciones y ROS ante la UIF",
            "Atención de requerimientos y supervisiones"
        ],
        approach=[
            "Diagnóstico del nivel de riesgo y de las obligaciones aplicables",
            "Diseño de manual, controles y procedimientos operativos",
            "Capacitación, reportes y acompañamiento ante la UIF"
        ],
        icon="splaft"
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
    Professional(
        slug="maria-fernanda-silva-torres",
        name="María Fernanda Silva Torres",
        role="Abogada senior",
        registry="Colegiatura N.° 5842",
        image="/static/media/maria-silva-professional.png",
        focus=[
            "Derecho Laboral",
            "Derecho Civil",
            "Compliance"
        ],
        bio="Especialista en derecho laboral y civil con amplia experiencia en asesoría empresarial. Su enfoque integra prevención de riesgos, negociación y defensa estratégica en controversias complejas."
    ),
    Professional(
        slug="carlos-eduardo-mendoza-rios",
        name="Carlos Eduardo Mendoza Ríos",
        role="Abogado consultor",
        registry="Colegiatura N.° 6321",
        image="/static/media/carlos-mendoza-professional.png",
        focus=[
            "Derecho Tributario",
            "Derecho Administrativo",
            "Gestión Pública"
        ],
        bio="Especialista en derecho tributario y administrativo. Brinda asesoría integral en procedimientos fiscales, recursos administrativos y estrategias de cumplimiento tributario para empresas y personas."
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
