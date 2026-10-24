# Transportes Libertadores — SPA informativa

Sitio de una página para la presentación de **Transportes Libertadores**: portada, ruta y servicios autorizados, empresa y canales de contacto. Construido con **Vue 3 + Vite + Tailwind CSS 4**, tipografía local **Libron** e iconos **Material Symbols Outlined** locales.

La versión pública es informativa. **No vende pasajes**, no muestra horarios ni tarifas sin confirmar y no simula disponibilidad.

## Inicio

```sh
npm install
npm run dev
```

## Comandos

```sh
npm run validate   # valida site.config.js y los datos editoriales
npm run lint       # ESLint
npm run test       # Vitest + jsdom
npm run build      # build de producción
npm run check      # validate + lint + test + build
npm run preview    # revisa el build
```

## Estructura

```
src/config/site.config.js     Marca, tema, navegación, secciones y textos
src/config/sections.js        IDs, anclas y helpers de navegación
src/config/validate.js        Validador puro de configuración
src/data/routes.json          Ruta Lima–Ayacucho y autorizaciones MTC
src/data/services.json        Prestaciones verificadas / pendientes / históricas
src/data/agencies.json        Agencias documentadas, no publicadas
src/data/images.js            Mapa de imágenes WebP publicadas
src/components/layout/        Cabecera con menú móvil y pie
src/components/sections/      Portada, ruta/servicios, empresa/contacto
src/components/ui/            MediaVisual, SectionHeader, SvgIcon, UiButton
src/composables/              useTheme, useContact
src/styles/                   Tokens, fuentes, preset minimal plano y componentes
src/assets/fonts/             Libron WOFF2 + licencia OFL
src/assets/icons/             Material Symbols + Apache 2.0
src/assets/images/            Derivados WebP recortados
```

## Edición de contenido

1. **Marca, SEO, tema, navegación y secciones:** `src/config/site.config.js`.
2. **Ruta y prestaciones:** `src/data/routes.json` y `src/data/services.json`. Solo se publican `status: "verified"` (máximo tres prestaciones).
3. **Agencias:** `src/data/agencies.json` es documentación editorial; no se renderiza. Mantener `editorial.state` en `pending` o `unverified` hasta confirmar atención y numeración.
4. **Imágenes:** reemplazar el WebP en `src/assets/images/` y actualizar dimensiones/alt en `src/data/images.js`. Los originales permanecen en `images/`.
5. **Contacto:** `site.contact` solo publica canales con URL real. Teléfono, correo y WhatsApp están vacíos a propósito hasta confirmarlos. El enlace de ubicación se genera como búsqueda de Google Maps.
6. **Orden de secciones:** `enabled`, `order` y `variant` en `sections[]`; no se ocultan secciones editando componentes.
7. **Compra de pasajes:** `order.enabled` debe permanecer en `false` en esta versión.

## Diseño

- Flat design: colores sólidos, sin degradados, sombras, relieves, glassmorphism ni animaciones ornamentales.
- Composición editorial: titulares Libron de gran escala, micro-etiquetas con tracking, reglas finas, radios de 4 px, panel de ruta en grafito y tarjeta de contacto blanca.
- Paleta custom: grafito `#25282C`, blanco humo `#F6F7F7`, gris plata `#DADDE0`, rojo `#D71920` y naranja `#F26322`.
- Tokens en `src/styles/theme.css`; los componentes no contienen hex. El foco usa rojo en fondos claros y naranja en cabecera/pie.
- Tipografía Libron en cuerpo, títulos, navegación, botones y formularios futuros. Fallback `Georgia, serif`.
- El logotipo se muestra sobre una placa blanca para conservar sus letras y su eslogan.

## Alojamiento

`VITE_BASE` define la base de Vite. Usa `/` en dominio propio o `/nombre-repositorio/` en un subdirectorio. Los activos, las fuentes y los iconos se resuelven con la base del build; no se asume GitHub Pages ni OpenAI Sites.

## Pendientes antes de publicar

- Nombre comercial y razón social definitivos; titularidad de la marca.
- Horarios, puntos de embarque, tarifas y canales oficiales (teléfono, correo, WhatsApp).
- Resolver Av. Nicolás Arriola 2328/2330 y la vigencia de las agencias.
- Confirmar la administración del perfil de Facebook enlazado.
- Derechos de uso de las fotografías y textos comerciales definitivos.
- Dominio y alojamiento.

Ver `docs/plan-spa-libertadores.md`, `docs/PROCEDENCIA-ACTIVOS.md` y las capturas de revisión en `docs/capturas/`.
