# Procedencia — fuentes Libron

- **Familia:** Libron (Regular, Italic, Bold, Bold Italic), WOFF2.
- **Versión:** paquete web v0.31.
- **Origen:** https://github.com/nicoverbruggen/libron/releases/tag/v0.31
- **Archivos usados:** `Libron-Regular.woff2`, `Libron-Italic.woff2`, `Libron-Bold.woff2`, `Libron-BoldItalic.woff2`.
- **Licencia:** SIL Open Font License 1.1, con nombre reservado «Libron». Texto completo en `LICENSE.txt`, junto a las fuentes.
- **Paquete original:** `docs/fonts/Libron_Web-v0.31.zip`.
- **Uso:** `@font-face` en `src/styles/fonts.css`, pesos reales 400/700, estilos normal/italic, `font-display: swap`. No se modifican los archivos ni se solicita ninguna familia externa.

Los archivos se movieron de `public/fonts/` a `src/assets/fonts/` para que Vite resuelva las rutas con la base del build y no publique el ZIP en `dist/`.
