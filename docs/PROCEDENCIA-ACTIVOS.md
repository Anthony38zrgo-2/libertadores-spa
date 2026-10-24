# Procedencia de activos publicados

Fecha de revisión: 23 de octubre de 2026.

## Imágenes

Los originales JPG permanecen intactos en `images/`. Las restauraciones intermedias están en `images/restored/`. Solo se publican derivados WebP locales en `src/assets/images/`, con dimensiones y texto alternativo en `src/data/images.js`.

| Publicada | Origen | Dimensiones | Preparación | Alt |
|---|---|---|---|---|
| `bus-carretera.webp` | `images/restored/bus-carretera.webp` | 1200 × 900 | Redimensionado desde 1448 × 1086; WebP q75, método 6 | Bus interprovincial en una carretera de montaña del Perú. |
| `equipo-agencia.webp` | `images/restored/equipo-agencia.webp` | 1086 × 1358 | Recorte centrado 4:5 desde 1086 × 1448; WebP q82, método 6 | Equipo de atención de Transportes Libertadores en una agencia. |
| `logo-libertadores.webp` | `images/restored/logo-libertadores.webp` | 1200 × 264 | Recorte de lienzo blanco con 32 px de margen; WebP q92, método 6 | Transportes Libertadores |
| `public/og/libertadores.webp` | `src/assets/images/bus-carretera.webp` | 1200 × 630 | Recorte central para Open Graph; WebP q82, método 6 | Bus interprovincial en una carretera de montaña del Perú. |

- El recorte del logotipo parte del contenido no blanco (77, 184)–(2072, 572) sobre 2172 × 724, añade 32 px de margen y conserva símbolo, TOUR, LIBERTADORES, eslogan, proporciones y colores. No se rediseñaron letras.
- `images/restored/bus-tripulacion.webp` no se publica: la página usa una fotografía de portada y una del equipo.
- Los prompts y la herramienta de restauración constan en `docs/image-restoration-prompts.json`.
- No se aplicaron ampliaciones adicionales ni recortes que corten personas, bus, rotulación o créditos.
- La imagen Open Graph usa una ruta relativa estable; la URL absoluta se define al confirmar el dominio.

## Fuentes

Libron v0.31, WOFF2, con licencia OFL 1.1 en `src/assets/fonts/LICENSE.txt`. Procedencia: `src/assets/fonts/PROCEDENCIA.md`.

- **Libron Bold:** titulares editoriales (`--font-display`).
- **Sans-serif del sistema:** navegación, cuerpo, botones, números y datos (`--font-sans`). No se descargan familias adicionales.

## Iconos

Material Symbols Outlined, Apache 2.0, con licencia y procedencia en `src/assets/icons/material-symbols/`. El canal de WhatsApp usa el icono social clásico de Simple Icons (CC0 1.0) en `src/assets/icons/social/`, renderizado con `currentColor`; WhatsApp es una marca de Meta y se usa solo para identificar el canal.

## Capturas de revisión

Generadas desde el build de producción y revisadas en Chrome sin interfaz a 320, 375, 768, 1024 y 1440 px. No se publican con el sitio; son evidencia de la revisión local.

- `docs/capturas/antes-escritorio-1440.webp` y `docs/capturas/antes-movil-375.webp`: estado previo al rediseño orientado al pasajero.
- `docs/capturas/escritorio-1440.webp`
- `docs/capturas/escritorio-1024.webp`
- `docs/capturas/tablet-768.webp`
- `docs/capturas/movil-375.webp`
- `docs/capturas/movil-320.webp`
- `docs/capturas/menu-movil-375.webp`

## Datos editoriales

- `src/data/routes.json`: ruta Lima–Ayacucho y resoluciones MTC 0356-2025 y 1634-2026, cada una con su titular y RUC.
- `src/data/schedules.json`: turnos 21:15 y 22:00 (`America/Lima`) informados por el cliente el 2026-10-23. Días, sentido, ciudad de salida, punto de embarque y dirección permanecen nulos.
- `src/data/services.json`: una prestación verificada y visible; una pendiente y una histórica que no se renderizan.
- `src/data/agencies.json`: cinco agencias confirmadas por el cliente el 2026-10-23, con ciudad/distrito, dirección y teléfono. San Luis queda en Av. Nicolás Arriola 2330; Vitarte y Manco Cápac no tienen teléfono identificado.
- `src/data/faq.json`: seis respuestas informativas; las condiciones no confirmadas remiten a WhatsApp.
- WhatsApp confirmado: `51959309809` / `+51 959 309 809`, según dato directo del cliente.
- Fuente editorial: `docs/transportes_libertadores_informacion_empresa.md`.
