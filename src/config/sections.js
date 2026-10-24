/**
 * REGISTRO DE SECCIONES, ANCLAS Y HELPERS
 * Estructura orientada al pasajero: portada, destinos, servicios, agencias,
 * nosotros, preguntas frecuentes y contacto.
 */

export const SECTION_IDS = Object.freeze([
  "header",
  "hero",
  "destinations",
  "services",
  "agencies",
  "company",
  "faq",
  "contact",
  "footer",
]);

export const SECTION_VARIANTS = Object.freeze({
  hero: ["split", "centered"],
  destinations: ["grid", "list"],
  services: ["compact"],
  agencies: ["list", "notice"],
  company: ["split", "split-reverse"],
  faq: ["list"],
  contact: ["split", "centered"],
});

export const ANCHOR_SECTIONS = Object.freeze({
  "#top": "hero",
  "#destinos": "destinations",
  "#servicios": "services",
  "#agencias": "agencies",
  "#nosotros": "company",
  "#preguntas": "faq",
  "#contacto": "contact",
});

export function isSectionEnabled(id, config) {
  const entry = config?.sections?.find((section) => section.id === id);
  return Boolean(entry?.enabled);
}

export function getUnknownSectionIds(config) {
  if (!config?.sections) return [];
  return config.sections
    .filter((section) => !SECTION_IDS.includes(section.id))
    .map((section) => section.id);
}

export function getOrderedSections(config) {
  if (!config?.sections) return [];
  return [...config.sections]
    .filter((section) => section.enabled)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getAnchorForSection(id) {
  return Object.keys(ANCHOR_SECTIONS).find((href) => ANCHOR_SECTIONS[href] === id) ?? "";
}

export function isConfiguredLinkAvailable(href, config) {
  if (!href) return false;
  if (!href.startsWith("#")) return true;
  const sectionId = ANCHOR_SECTIONS[href];
  return Boolean(sectionId) && isSectionEnabled(sectionId, config);
}

export function getFirstContentHref(config) {
  const first = ["hero", "destinations", "services", "agencies", "company", "faq", "contact"].find(
    (id) => isSectionEnabled(id, config),
  );
  return first ? getAnchorForSection(first) : "#top";
}

export function getNavigationItems(config) {
  if (!config?.navigation?.length) return [];
  return config.navigation.filter((item) => !item.section || isSectionEnabled(item.section, config));
}
