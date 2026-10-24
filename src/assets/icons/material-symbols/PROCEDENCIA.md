# Procedencia — Material Symbols Outlined

- **Set:** Google Material Symbols Outlined, `24px`.
- **Origen:** https://github.com/google/material-design-icons/tree/master/symbols/web
- **Referencia oficial:** https://developers.google.com/fonts/docs/material_symbols
- **Licencia:** Apache License 2.0. Texto completo en `LICENSE.txt`.
- **Archivos incorporados:** `directions_bus.svg`, `route.svg`, `location_on.svg`, `call.svg`, `mail.svg`, `arrow_forward.svg`, `menu.svg`, `close.svg`.

Se usan los SVG originales sin modificar; `src/icons/registry.js` los carga en crudo y `SvgIcon.vue` los renderiza inline para heredar `currentColor`. Los iconos decorativos llevan `aria-hidden`; los botones que solo tienen icono reciben un nombre accesible.

`call.svg` y `mail.svg` quedan reservados para cuando se confirmen teléfono o correo; no se renderizan mientras esos canales estén vacíos.
