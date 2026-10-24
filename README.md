# Transportes Libertadores — SPA informativa

Sitio de una página orientado al pasajero: portada, destinos, servicios, agencias, nosotros, preguntas frecuentes y contacto. Construido con **Vue 3 + Vite + Tailwind CSS 4**, titulares **Libron Bold**, interfaz sans-serif del sistema e iconos **Material Symbols Outlined** locales.

La versión pública es informativa. **No vende pasajes**, no simula búsqueda ni disponibilidad y solo publica turnos y canales confirmados por el cliente. La consulta se realiza por **WhatsApp: +51 959 309 809**.

## Inicio

```sh
npm install
npm run dev
```

## Comandos

```sh
npm run validate    # valida site.config.js y los datos editoriales
npm run lint        # ESLint
npm run test        # Vitest + jsdom
npm run build       # build de producción
npm run check       # validate + lint + test + build
npm run preview     # revisa el build
npm run seo:sitemap # genera public/sitemap.xml si VITE_SITE_URL está definido
```

## Estructura

```
src/config/site.config.js     Marca, SEO, tema, navegación, secciones y textos
src/config/sections.js        IDs, anclas y helpers de navegación
src/config/validate.js        Validador puro de configuración
src/data/routes.json          Ruta Lima–Ayacucho y autorizaciones con RUC
src/data/schedules.json       Turnos 21:15 y 22:00, alcance pendiente explícito
src/data/services.json        Servicios verificados, pendientes e históricos
src/data/agencies.json        Agencias documentadas; solo se publican confirmadas
src/data/faq.json             Preguntas frecuentes y políticas pendientes
src/data/images.js            Mapa de imágenes WebP publicadas
src/components/layout/        Cabecera con menú móvil y pie
src/components/sections/      Portada, destinos, servicios, agencias, nosotros, FAQ y contacto
src/components/ui/            MediaVisual, SectionHeader, SvgIcon, UiButton
src/composables/              useTheme, useContact
src/styles/                   Tokens, fuentes, preset minimal plano y componentes
src/assets/fonts/             Libron WOFF2 + licencia OFL
src/assets/icons/             Material Symbols + Apache 2.0
src/assets/images/            Derivados WebP recortados
public/og/                    Imagen Open Graph estable
```

## Edición de contenido

1. **Marca, SEO, tema, navegación y secciones:** `src/config/site.config.js`.
2. **Ruta y turnos:** `src/data/routes.json` y `src/data/schedules.json`. Los turnos se muestran como `9:15 p. m.` y `10:00 p. m.`; `departureCity`, `operatingDays`, `boardingPoint` y `direction` deben permanecer `null` hasta confirmación.
3. **Servicios:** `src/data/services.json`. Solo se publican `status: "verified"` y `visible: true`.
4. **Agencias:** `src/data/agencies.json`. Solo se renderizan con `editorial.state: "confirmed"` y dirección confirmada; el resto permanece fuera de la página.
5. **FAQ:** `src/data/faq.json`. Las respuestas con `status: "pending"` solo remiten a consultar condiciones por WhatsApp; no afirmes políticas.
6. **WhatsApp:** `site.contact.whatsapp`, `whatsappDisplay` y `whatsappMessage`. No escribas URLs `wa.me` en componentes; usa `buildWhatsAppUrl`.
7. **Imágenes:** reemplazar el WebP en `src/assets/images/` y actualizar dimensiones/alt en `src/data/images.js`. Los originales permanecen en `images/`.
8. **Mapa:** solo se publica si `mapConfirmed: true` y `mapQuery` están definidos. La ubicación actual es una referencia de distrito.
9. **Compra de pasajes:** `order.enabled` debe permanecer en `false`.
10. **SEO:** el `og:image` usa una ruta relativa estable; el dominio y `canonical` se definen antes de publicar. El sitemap se genera solo con `VITE_SITE_URL`.

## Diseño

- Flat design: colores sólidos, sin degradados, sombras, relieves, glassmorphism ni animaciones ornamentales.
- Titulares en Libron Bold; interfaz y cuerpo en sans-serif del sistema. El logotipo se muestra sobre una placa blanca.
- Paleta custom: grafito `#25282C`, blanco humo `#F6F7F7`, gris plata `#DADDE0`, rojo `#D71920` y naranja `#F26322`.
- Tokens en `src/styles/theme.css`; los componentes no contienen hex. El foco usa rojo en fondos claros y naranja en cabecera/pie.
- Composición editorial con reglas finas, tarjetas de turnos, panel de contacto grafito y radios de 4 px.

## Alojamiento

`VITE_BASE` define la base de Vite. Usa `/` en dominio propio o `/nombre-repositorio/` en un subdirectorio. Los activos, las fuentes y los iconos se resuelven con la base del build; no se asume GitHub Pages ni OpenAI Sites.

## Pendientes antes de publicar

- Días de operación, sentido, ciudad de salida, punto de embarque y tarifas de los turnos.
- Razón social y RUC responsables; no mezclar autorizaciones de titulares distintos.
- Agencias abiertas, direcciones y horarios confirmados.
- Administración del perfil de Facebook enlazado.
- Política de privacidad y Libro de Reclamaciones funcionales.
- Derechos de uso de las fotografías y textos comerciales definitivos.
- Dominio, `canonical`, URL absoluta de Open Graph y sitemap.

Ver `docs/plan-spa-libertadores.md`, `docs/PROCEDENCIA-ACTIVOS.md` y las capturas de revisión en `docs/capturas/`.
