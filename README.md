# Lexflex · Estudio Jurídico

Sitio web institucional multiruta desarrollado para Lexflex. Incluye identidad visual, perfiles profesionales, seis áreas de práctica, Lexflex Formación, análisis jurídico, contacto directo por WhatsApp y SEO técnico.

## Rutas

- / — Inicio
- /nosotros — Identidad y forma de trabajo
- /servicios — Catálogo de áreas jurídicas
- /servicios/[slug] — Página individual para cada especialidad
- /equipo — Perfiles de ambos abogados
- /cursos — Lexflex Formación
- /blog — Análisis jurídico
- /contacto — Datos, ubicación y formulario hacia WhatsApp

## Ejecutar

    npm ci
    npm run dev

## Compilar

    npm run build

## Contenido editable

Los datos principales se encuentran en app/data.ts. Las fotografías, logo y recursos están físicamente incluidos en public/media/; no dependen de enlaces temporales.

Para publicar con un dominio propio, definir NEXT_PUBLIC_SITE_URL=https://dominio-final.com.

## Verificación antes de publicar

Revisar DATOS-PENDIENTES.md. Contiene dos diferencias detectadas entre el audio transcrito y el preview anterior que deben confirmarse con el cliente.
