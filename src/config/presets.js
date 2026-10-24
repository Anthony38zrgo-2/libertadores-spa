/**
 * PRESETS DE ESTILO — solo se conserva `minimal`, adaptado a un diseño plano:
 * colores sólidos, sin sombras, degradados ni relieves.
 */

export const PRESETS = Object.freeze(["minimal"]);

export const PRESET_META = Object.freeze({
  minimal: {
    label: "Minimal plano",
    description: "Limpio y profesional: tipografía, espacio y líneas; sin efectos.",
    typography: "libron",
  },
});

export function isValidPreset(value) {
  return PRESETS.includes(value);
}
