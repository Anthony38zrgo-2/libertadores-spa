/**
 * PALETAS — esta versión usa una paleta custom derivada de la identidad
 * Libertadores. Los siete tokens se declaran en site.config.js y useTheme
 * los inyecta como variables CSS. No hay paletas curadas adicionales para
 * evitar estilos de ejemplo fuera de la identidad del cliente.
 */

export const PALETTES = Object.freeze(["custom"]);

export const CUSTOM_COLOR_KEYS = Object.freeze([
  "ink",
  "muted",
  "surface",
  "surfaceAlt",
  "brand",
  "brandDark",
  "accent",
]);

export function isValidPalette(value) {
  return PALETTES.includes(value);
}

export function isHexColor(value) {
  return typeof value === "string" && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value.trim());
}

export function resolvePaletteColors(theme) {
  if (!theme || theme.palette !== "custom" || !theme.colors) return null;
  const missing = CUSTOM_COLOR_KEYS.filter((key) => !isHexColor(theme.colors[key]));
  if (missing.length) return null;
  return Object.fromEntries(CUSTOM_COLOR_KEYS.map((key) => [key, theme.colors[key]]));
}
