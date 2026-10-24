/**
 * PRESETS DE ESTILO — solo se conserva `minimal`, adaptado a un diseño plano:
 * colores sólidos, sin sombras, degradados ni relieves.
 */

export const PRESETS = Object.freeze(["minimal"]);

export const PRESET_META = Object.freeze({
  minimal: {
    label: "Minimal plano",
    description: "Limpio y profesional: titulares editoriales, interfaz sans y líneas finas.",
    typography: "libron-editorial",
  },
});

export function isValidPreset(value) {
  return PRESETS.includes(value);
}
