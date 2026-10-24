# Plan de creación — Transportes Libertadores

Fecha: 23 de octubre de 2026. Estado: primera versión implementada y verificada localmente; publicación pendiente de las confirmaciones de contenido.

> **Actualización 2026-10-23:** el alcance vigente es la SPA orientada al pasajero con WhatsApp confirmado, turnos informados, cinco agencias confirmadas, secciones de destinos, servicios, agencias, nosotros, preguntas frecuentes y contacto, portada con fotografía de fondo y botones aero-glass. Las referencias históricas a “tres bloques”, a la ausencia de WhatsApp o al diseño íntegramente plano quedan superadas por esta ampliación.

## Objetivo y alcance

Crear en `D:\web\libertadores-spa` una SPA institucional de transporte terrestre, tomando como base de referencia `D:\web\plantilla-catalogo-web-v2`, sin modificar la plantilla. Usar como denominación de trabajo «Transportes Libertadores», coherente con el dossier local; confirmar el nombre final antes de publicar.

Primera versión: presentación de la empresa, rutas, servicios, agencias y contacto. Navegación por anclas dentro de una página; no se necesita router inicialmente. La compra de pasajes, pagos, disponibilidad de asientos y seguimiento de encomiendas requieren integraciones y quedan fuera de esta versión. No mostrar buscadores que simulen disponibilidad real.

## Base técnica

- Reutilizar Vue 3, Vite, Tailwind 4, configuración central, renderizado de secciones, componentes UI y validación de la referencia.
- Copiar únicamente fuentes de la aplicación, configuración, scripts y pruebas pertinentes; excluir `.git`, `node_modules`, `dist`, credenciales y contenido de ejemplo del catálogo.
- Mantener marca, navegación, SEO y orden de secciones en `src/config/site.config.js`.
- Adaptar el catálogo a rutas mediante un modelo específico, sin precios o unidades de productos obligatorios. Crear `src/data/routes.json`, `services.json` y `agencies.json` con datos verificados y estado editorial.
- Registrar las nuevas secciones en `sections.js`, `SectionRenderer.vue`, esquema y validador. Mantener `enabled`, `order` y `variant` como controles de configuración.
- Conservar el dossier y los originales de `images/`; generar derivados WebP en `src/assets/` después de revisar visualmente contenido, resolución y recortes.

## Diseño y paleta

Diseño general flat design, adaptando el preset `minimal`: colores sólidos, sin degradados, sombras, relieves, efectos 3D ni glassmorphism. Jerarquía mediante tipografía, espacio, líneas y bloques planos; radios discretos y sin animaciones ornamentales. Menú y footer grafito; contenido mayormente claro; rojo para llamadas a la acción y naranja escaso para acentos.

| Color | HEX | Uso |
|---|---|---|
| Blanco humo | `#F6F7F7` | Fondo principal y texto sobre grafito |
| Gris plata | `#DADDE0` | Divisores y superficies secundarias |
| Grafito | `#25282C` | Texto, menú, footer y estados oscuros |
| Rojo Libertadores | `#D71920` | Botones principales, enlaces y elementos activos |
| Naranja dinámico | `#F26322` | Detalles gráficos puntuales |

Mapeo de la paleta `custom`: `ink` y `muted` = grafito; `surface` = blanco humo; `surfaceAlt` = gris plata; `brand` = rojo; `brandDark` = grafito; `accent` = naranja. Usar tokens CSS, sin colores hex dentro de componentes Vue. Los estados hover pueden pasar de rojo a grafito; el foco debe ser visible en fondos claros y oscuros.

Verificar contraste de cada combinación final: usar grafito sobre naranja y gris plata; evitar texto pequeño naranja sobre fondo claro. Los errores y selecciones deben incluir texto o iconos además del color.

## Tipografía local

Se descargó el paquete oficial web Libron v0.31, con Regular, Bold, Italic y Bold Italic en WOFF2, dentro de `public/fonts/libron/`. Conservar archivo de licencia y procedencia junto a las fuentes. Fuente: https://github.com/nicoverbruggen/libron/releases/tag/v0.31

- Crear `src/styles/fonts.css` con cuatro reglas `@font-face`: pesos reales 400/700, estilos normal/italic y `font-display: swap`.
- Aplicar Libron a cuerpo, encabezados, navegación, botones, formularios, modales y textos SVG; controles con `font: inherit`. Fallback `Georgia, serif`.
- Extender el modo tipográfico de configuración para Libron, actualizando esquema, validación y `useTheme.js`: este último actualmente inyecta familias de otras fuentes y podría anular el CSS global.
- Precargar únicamente Regular si beneficia el primer render; usar rutas compatibles con la base de Vite. No depender de servicios externos de fuentes.
- Verificar caracteres españoles, cursivas y negritas, y comprobar en navegador que la familia realmente cargada sea Libron.

## Iconografía de Google

Usar Google Material Symbols Outlined, con trazo y tamaño consistentes. Incorporar solo los SVG necesarios como activos locales: `directions_bus`, `route`, `location_on`, `call`, `mail`, `arrow_forward`, `menu` y `close`. Mantener licencia Apache 2.0 y procedencia. Los SVG heredan `currentColor`; Libron permanece como única familia para textos.

Los iconos decorativos llevan `aria-hidden`; los botones con solo icono necesitan un nombre accesible. No usar emojis como sustitutos. Referencia oficial: https://developers.google.com/fonts/docs/material_symbols

## Estructura concisa de la primera versión

Cabecera compacta con logo recortado, navegación Inicio / Servicios / Contacto y una acción principal. Menú móvil accesible.

1. **Portada:** una fotografía restaurada del bus, título breve, una frase y CTA «Consultar viaje».
2. **Rutas y servicios:** un único bloque compacto con la ruta comercial confirmada y un máximo de tres prestaciones verificadas. No crear una tarjeta por cada afirmación ni repetir CTAs. Lima–Ayacucho es candidata según el dossier; confirmar su operación antes de publicarla.
3. **Empresa y contacto:** presentación de dos o tres frases con una fotografía del equipo; dirección y canales confirmados en el mismo bloque. WhatsApp solo tras confirmar el canal. Resolver Arriola 2328/2330 antes de publicar.

Footer mínimo con marca y datos legales confirmados. No incluir secciones independientes de beneficios, historia extensa, agencias o galería en esta versión. Restaurar todas las imágenes disponibles, pero usar solo las necesarias para mantener la página breve.

## Restauración de imágenes y logotipo

Usar la habilidad `imagegen` y la herramienta integrada de edición para restaurar las tres fotografías existentes: exposición, balance, claridad y compresión. Preservar personas, rasgos, uniformes, vehículos, rotulación, entorno y créditos; revisar posibles alteraciones generativas antes de integrar. Mantener los JPG originales intactos.

Preparar `images/restored/bus-carretera.webp`, `bus-tripulacion.webp` y `equipo-agencia.webp`. Exportar los resultados a WebP sin ampliaciones adicionales innecesarias; registrar origen, prompt y dimensiones. La edición generativa mejora la presentación, pero no certifica fidelidad documental de detalles pequeños.

Usar la imagen de logo `654811501_1366717262149528_5323811414362001939_n.jpg`: recortar el exceso de lienzo blanco y conservar símbolo, TOUR, LIBERTADORES y eslogan, proporciones y colores. Generar `images/restored/logo-libertadores.webp` con margen de seguridad y fondo blanco, para conservar bordes limpios. No reemplazar sus letras por Libron ni rediseñar la marca. En cabecera usar una superficie clara plana para conservar su legibilidad; el resto del menú puede ser grafito.

## Contenido y comportamiento

El dossier `docs/transportes_libertadores_informacion_empresa.md` sirve como insumo editorial, no como confirmación de datos comerciales vigentes. Mantener los pendientes en documentación o datos editoriales, fuera de los mensajes al pasajero. No publicar tarifas históricas como precios actuales, teléfonos de terceros como canales oficiales ni horarios deducidos.

Desactivar el modal de pedidos de productos (`order.enabled: false`). El contacto será un enlace real de consulta; si se añade un formulario, definir primero su destino y entrega efectiva. No mostrar confirmaciones de envío sin transmisión real. No incorporar mapas de terceros automáticamente si basta un enlace de ubicación.

## Orden de implementación

1. Preparar la aplicación en el directorio destino, preservando archivos existentes; ajustar nombre del paquete y README.
2. Integrar tokens de paleta y fuentes locales; resolver la sobrescritura tipográfica del tema.
3. Restaurar las tres fotografías con imagegen, recortar el logotipo aportado y preparar todos los derivados WebP; revisar resultados frente a originales.
4. Configurar identidad, navegación y secciones; extender el modelo de rutas, servicios y agencias.
5. Implementar diseño adaptable y consultas contextuales con canales confirmados.
6. Validar contenido, accesibilidad, compilación y presentación; entregar para revisión local.
7. Publicar cuando se defina alojamiento, dominio y contenido definitivo. Ajustar la base de Vite al destino; no asumir GitHub Pages o Sites.

## Criterios de aceptación

- Todas las secciones siguen la configuración; navegación y enlaces funcionan y ningún CTA es simulado.
- Sin contenido cafetalero, precios ficticios, rutas no confirmadas ni placeholders visibles.
- Libron se sirve localmente en toda la interfaz y no quedan solicitudes a otras familias tipográficas.
- Paleta aplicada mediante tokens; foco visible, navegación por teclado y encabezados ordenados.
- Revisión visual a 320, 375, 768 y 1440 px: sin desbordamientos, recortes importantes o colisiones con el contacto flotante.
- Todas las imágenes publicadas en WebP, con dimensiones y texto alternativo; carga diferida fuera de portada. Logo recortado sin letras ni símbolo cortados. Originales conservados.
- Diseño plano sin sombras ni degradados; Google Material Symbols coherentes y accesibles.
- Contenido limitado a tres bloques principales y footer breve, sin repeticiones.
- Pruebas de interacción para menú móvil, filtros si se incluyen y construcción de enlaces de contacto.
- Ejecutar validación de configuración, `npm run check` y build del alojamiento elegido. Verificar en navegador recursos, consola y rutas de fuentes con esa base.

## Decisiones pendientes para publicación

Nombre comercial definitivo, razón social responsable, rutas operativas, agencias/direcciones, contactos oficiales, uso de las fotografías, textos comerciales y destino de alojamiento. Estos pendientes no impiden preparar la estructura local; sí determinan qué contenido y canales pueden activarse en la versión pública.

## Activos preparados

Restauraciones realizadas con la herramienta integrada image_gen; tres fotos y logo exportados y comprobados como WebP en `images/restored/`. El logo final usa fondo blanco. Prompts y procedencia: `docs/image-restoration-prompts.json`. Los JPG originales siguen intactos.

## Estado de implementación

La SPA evolucionó a un sitio orientado al pasajero con portada, destinos, servicios, agencias, nosotros, preguntas frecuentes y contacto. Se mantiene Vue 3, Vite y Tailwind 4, sin router ni CMS. Los titulares usan Libron Bold y la interfaz una sans-serif del sistema; los iconos Material Symbols son locales.

El cliente confirmó el WhatsApp +51 959 309 809 y los turnos 21:15 y 22:00 (`America/Lima`), que se muestran como 9:15 p. m. y 10:00 p. m. No se publican días, sentido, ciudad de salida, terminal, tarifas ni disponibilidad porque siguen pendientes. La compra de pasajes permanece desactivada.

Solo se publica el servicio verificado de transporte interprovincial de pasajeros. Las cinco agencias aportadas por el cliente se publican con ciudad/distrito, agencia, dirección y teléfono; los teléfonos no identificados se muestran como texto. La portada usa la fotografía del bus como fondo con texto blanco y los botones/CTA tienen acabado aero-glass; el acceso flotante a WhatsApp usa el glifo clásico en verde y blanco. La ubicación de contacto sigue siendo una referencia de distrito, sin mapa genérico. La política de privacidad, el Libro de Reclamaciones y la razón social/RUC quedan como bloqueadores de publicación.

Verificado con validación de configuración, ESLint, 39 pruebas, build de producción y revisión en navegador a 320, 375, 768, 1024 y 1440 px. Detalle de activos en `docs/PROCEDENCIA-ACTIVOS.md`.

Publicado en GitHub Pages desde la rama `gh-pages`, con base `/libertadores-spa/`: https://anthony38zrgo-2.github.io/libertadores-spa/.
