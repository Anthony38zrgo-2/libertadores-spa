# Guía del proyecto — Transportes Libertadores

## Objetivo

SPA informativa orientada al pasajero para Transportes Libertadores. Vue 3 + Vite + Tailwind 4, sin router, backend ni CMS. Comunica la ruta documentada Lima–Ayacucho, los turnos informados por el cliente y la consulta por WhatsApp; no vende pasajes ni simula disponibilidad.

## Orden de lectura

1. `README.md`
2. `src/config/site.config.js`
3. `src/data/routes.json`, `schedules.json`, `services.json`, `agencies.json`, `faq.json`
4. `src/config/sections.js` y `validate.js`
5. `src/styles/` y componentes solo si la interacción lo requiere

## Reglas

- Todo cambio editorial debe intentarse primero en `site.config.js` y `src/data/*.json`. No ocultes secciones editando componentes: usa `enabled`.
- WhatsApp confirmado: `51959309809`. El CTA se construye con `buildWhatsAppUrl`; no dupliques enlaces `wa.me` en componentes.
- Turnos informados: 21:15 y 22:00 (`America/Lima`), visualización `9:15 p. m.` y `10:00 p. m.`. No inventes días, sentido, ciudad de salida, terminal, tarifa ni disponibilidad. Esos campos permanecen `null` hasta confirmación.
- Solo se publican servicios `status: "verified"` y `visible: true`. Agencias solo con `editorial.state: "confirmed"`; las pendientes no publican direcciones.
- No publiques mapas genéricos ni direcciones no confirmadas. La ubicación de contacto es una referencia de distrito.
- Titulares en **Libron Bold**; navegación, cuerpo, botones, números y datos en sans-serif del sistema. No agregues familias externas.
- Iconos: Material Symbols locales para interfaz y el glifo social clásico de WhatsApp (Simple Icons, CC0) para el canal. El botón flotante de WhatsApp es verde/blanco y usa ese glifo.
- Paleta y tipografía solo con tokens CSS. No agregues hex en componentes Vue.
- Diseño base plano. Excepciones solicitadas: hero con fotografía del bus de fondo, scrim grafito y texto blanco; botones/CTA con acabado aero-glass (translúcido, blur, brillo y sombra suave). No usar glassmorphism en el resto de paneles ni animaciones ornamentales. Mantener `prefers-reduced-motion`.
- Mantén la validación: `npm run validate` o `npm run check`.
- Accesibilidad: jerarquía de encabezados, `aria-labelledby`, foco visible, nombres accesibles, menú móvil operable con teclado/Escape y enlaces externos con `rel="noopener noreferrer"`.

## Verificación

```sh
npm run check
npm run deploy:gh-pages   # solo cuando se solicite publicar
```

`npm run check` incluye validación de configuración y datos, ESLint, Vitest y build. Revisa 320, 375, 768, 1024 y 1440 px en el navegador. La base de producción para GitHub Pages es `/libertadores-spa/` y vive en `.env.production`.

## Finalización

- Solo secciones `enabled: true` aparecen, en orden `order`.
- `data-preset="minimal"` y `data-palette="custom"` en `<html>`.
- Sin hex en componentes; sin fuentes externas; sin CTAs simulados ni venta de pasajes.
- Lint, test y build verdes.
