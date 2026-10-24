# Guía del proyecto — Transportes Libertadores

## Objetivo

SPA informativa de una página para Transportes Libertadores. Vue 3 + Vite + Tailwind 4, sin router ni CMS. Contenido data-driven y canales reales; nada de compra de pasajes, horarios o tarifas simuladas.

## Orden de lectura

1. `README.md`
2. `src/config/site.config.js`
3. `src/data/routes.json`, `services.json`, `agencies.json`
4. `src/config/sections.js` y `validate.js`
5. `src/styles/` y componentes solo si la interacción lo requiere

## Reglas

- Todo cambio editorial debe intentarse primero en `site.config.js` y `src/data/*.json`. No ocultes secciones editando componentes: usa `enabled`.
- Solo se publican servicios con `status: "verified"`; máximo tres. Las agencias nunca se renderizan en esta versión.
- No publiques teléfonos, correos, WhatsApp, horarios, tarifas ni direcciones sin confirmación directa. Los pendientes viven en datos/docs, no en mensajes al pasajero.
- No hay formulario de contacto ni confirmación de envío: los canales son enlaces externos reales.
- Paleta y tipografía solo con tokens CSS. No agregues hex en componentes Vue.
- Libron es la única familia tipográfica; iconos Material Symbols locales con `currentColor`.
- Diseño plano: sin sombras, degradados, relieves, glassmorphism ni animaciones ornamentales.
- Mantén la validación: `npm run validate` o `npm run check`.
- Accesibilidad: `aria-labelledby`, foco visible, nombres accesibles en botones de icono y menú móvil operable con teclado.

## Verificación

```sh
npm run check
```

Incluye validación de configuración y datos, ESLint, Vitest y build. Revisa también 320, 375, 768 y 1440 px en el navegador.

## Finalización

- Solo secciones `enabled: true` aparecen, en orden `order`.
- `data-preset="minimal"` y `data-palette="custom"` en `<html>`.
- Sin hex en componentes; sin fuentes externas; sin CTAs simulados.
- Lint, test y build verdes.
