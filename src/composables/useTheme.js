/**
 * useTheme — aplica preset, paleta custom, radios, tipografía y SEO.
 * La tipografía Libron se fija aquí y en el CSS; no se inyectan familias
 * externas que puedan anular la fuente local.
 */
import { watchEffect } from "vue";
import { resolvePaletteColors } from "@/config/palettes";

const RADIUS_MAP = {
  sm: { card: "0.25rem", button: "0.25rem", visual: "0.25rem" },
  md: { card: "1rem", button: "0.75rem", visual: "1rem" },
  xl: { card: "1.5rem", button: "0.75rem", visual: "1.5rem" },
  "2xl": { card: "1.75rem", button: "0.75rem", visual: "1.75rem" },
  full: { card: "1.5rem", button: "9999px", visual: "1.5rem" },
};

const TYPOGRAPHY_MAP = {
  libron: {
    sans: '"Libron", Georgia, "Times New Roman", serif',
    display: '"Libron", Georgia, "Times New Roman", serif',
  },
};

const COLOR_PROPERTIES = {
  ink: "--color-ink",
  muted: "--color-muted",
  surface: "--color-surface",
  surfaceAlt: "--color-surface-alt",
  brand: "--color-brand",
  brandDark: "--color-brand-dark",
  accent: "--color-accent",
};

export function useTheme(config) {
  function applyTheme() {
    if (typeof document === "undefined") return;
    const theme = config?.theme;
    if (!theme) return;

    const html = document.documentElement;
    html.setAttribute("data-preset", theme.preset);
    html.setAttribute("data-palette", theme.palette);

    if (theme.palette === "custom" && theme.colors) {
      const colors = resolvePaletteColors(theme);
      if (colors) {
        for (const [key, property] of Object.entries(COLOR_PROPERTIES)) {
          html.style.setProperty(property, colors[key]);
        }
        // El foco sigue el rojo de marca sobre fondos claros.
        html.style.setProperty("--color-focus", colors.brand);
      }
    } else {
      for (const property of Object.values(COLOR_PROPERTIES)) {
        html.style.removeProperty(property);
      }
      html.style.removeProperty("--color-focus");
    }

    if (theme.radius && RADIUS_MAP[theme.radius]) {
      const radius = RADIUS_MAP[theme.radius];
      html.style.setProperty("--radius-card", radius.card);
      html.style.setProperty("--radius-button", radius.button);
      html.style.setProperty("--radius-visual", radius.visual);
    } else {
      html.style.removeProperty("--radius-card");
      html.style.removeProperty("--radius-button");
      html.style.removeProperty("--radius-visual");
    }

    if (theme.typography && TYPOGRAPHY_MAP[theme.typography]) {
      const typography = TYPOGRAPHY_MAP[theme.typography];
      html.style.setProperty("--font-sans", typography.sans);
      html.style.setProperty("--font-display", typography.display);
    }

    if (config.site?.seo?.themeColor) {
      let meta = document.querySelector('meta[name="theme-color"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "theme-color";
        document.head.appendChild(meta);
      }
      meta.content = config.site.seo.themeColor;
    }

    if (config.site?.seo?.title) {
      document.title = config.site.seo.title;
    }

    if (config.site?.seo?.description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = config.site.seo.description;
    }
  }

  if (typeof watchEffect !== "undefined") {
    watchEffect(applyTheme);
  } else {
    applyTheme();
  }

  return { applyTheme };
}
