/**
 * REGISTRO DE ICONOS — Material Symbols Outlined + icono social local.
 * Los SVG viven con su licencia y procedencia en src/assets/icons/.
 * Se cargan en crudo y se renderizan inline con currentColor.
 */
const material = import.meta.glob("../assets/icons/material-symbols/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

const social = import.meta.glob("../assets/icons/social/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

const modules = { ...material, ...social };

function parseSvg(raw) {
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1] ?? "0 -960 960 960";
  const content = raw
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>[\s\S]*$/, "")
    .replace(/<title>[\s\S]*?<\/title>/g, "")
    .trim();
  return { viewBox, content, fill: true };
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
