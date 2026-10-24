# Procedencia de activos publicados

Fecha de revisión: 23 de octubre de 2026.

## Imágenes

Los originales JPG permanecen intactos en `images/`. Las restauraciones intermedias están en `images/restored/`. Solo se publican derivados WebP locales en `src/assets/images/`, con dimensiones y texto alternativo en `src/data/images.js`.

| Publicada | Origen | Dimensiones | Preparación | Alt |
|---|---|---|---|---|
| `bus-carretera.webp` | `images/restored/bus-carretera.webp` | 1200 × 900 | Redimensionado desde 1448 × 1086; WebP q75, método 6 | Bus interprovincial en una carretera de montaña del Perú. |
| `equipo-agencia.webp` | `images/restored/equipo-agencia.webp` | 1086 × 1358 | Recorte centrado 4:5 desde 1086 × 1448; WebP q82, método 6 | Equipo de atención de Transportes Libertadores en una agencia. |
| `logo-libertadores.webp` | `images/restored/logo-libertadores.webp` | 1200 × 264 | Recorte de lienzo blanco con 32 px de margen; WebP q92, método 6 | Transportes Libertadores |

- El recorte del logotipo parte del contenido no blanco (77, 184)–(2072, 572) sobre 2172 × 724, añade 32 px de margen y conserva símbolo, TOUR, LIBERTADORES, eslogan, proporciones y colores. No se rediseñaron letras.
- `images/restored/bus-tripulacion.webp` no se publica: la página se limita a una fotografía de portada y una del equipo para mantenerla breve.
- Los prompts y la herramienta de restauración constan en `docs/image-restoration-prompts.json`.
- No se aplicaron ampliaciones adicionales ni recortes que corten personas, bus, rotulación o créditos.

## Fuentes

Libron v0.31, WOFF2, con licencia OFL 1.1 en `src/assets/fonts/LICENSE.txt`. Procedencia: `src/assets/fonts/PROCEDENCIA.md`.

## Iconos

Material Symbols Outlined, Apache 2.0, con licencia y procedencia en `src/assets/icons/material-symbols/`.

## Capturas de revisión

Generadas desde el build de producción y revisadas en Chrome sin interfaz a 320, 375, 480, 640, 768, 900, 1024 y 1440 px. No se publican con el sitio; son evidencia de la revisión local.

- `docs/capturas/escritorio-1440.webp`
- `docs/capturas/tablet-768.webp`
- `docs/capturas/movil-375.webp`
- `docs/capturas/movil-320.webp`
- `docs/capturas/menu-movil-375.webp`

## Datos editoriales

- `src/data/routes.json`: ruta Lima–Ayacucho y referencias de las resoluciones MTC 0356-2025 y 1634-2026.
- `src/data/services.json`: tres prestaciones verificadas; una pendiente y una histórica que no se renderizan.
- `src/data/agencies.json`: cinco agencias documentadas, ninguna publicada; incluye la discrepancia Arriola 2328/2330.
- Fuente editorial: `docs/transportes_libertadores_informacion_empresa.md`.
