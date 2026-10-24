/**
 * REGISTRO DE ICONOS — Material Symbols Outlined locales.
 * Los SVG originales viven en src/assets/icons/material-symbols/ con su
 * licencia Apache 2.0 y procedencia. Se cargan en crudo y se renderizan
 * inline para heredar currentColor.
 */
const modules = import.meta.glob("../assets/icons/material-symbols/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

function parseSvg(raw) {
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1] ?? "0 -960 960 960";
  const content = raw
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>[\s\S]*$/, "")
    .trim();
  return { viewBox, content };
}

export const ICONS = Object.freeze(
  Object.fromEntries(
    Object.entries(modules).map(([path, raw]) => {
      const name = path.split("/").at(-1).replace(/\.svg$/, "");
      return [name, parseSvg(raw)];
    }),
  ),
);

export function getIcon(name) {
  return ICONS[name] ?? null;
}

export function hasIcon(name) {
  return Boolean(ICONS[name]);
}
