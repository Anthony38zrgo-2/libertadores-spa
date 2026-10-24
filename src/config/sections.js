/**
 * REGISTRO DE SECCIONES, ANCLAS Y HELPERS
 * La estructura pública se limita a portada, ruta/servicios y empresa/contacto.
 */

export const SECTION_IDS = Object.freeze(["header", "hero", "services", "company", "footer"]);

export const SECTION_VARIANTS = Object.freeze({
  hero: ["split", "centered"],
  services: ["compact"],
  company: ["split", "split-reverse"],
});

export const ANCHOR_SECTIONS = Object.freeze({
  "#top": "hero",
  "#servicios": "services",
  "#contacto": "company",
});

export function isSectionEnabled(id, config) {
  const entry = config?.sections?.find((section) => section.id === id);
  return Boolean(entry?.enabled);
}

export function getUnknownSectionIds(config) {
  if (!config?.sections) return [];
  return config.sections.filter((section) => !SECTION_IDS.includes(section.id)).map((section) => section.id);
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
  const first = ["hero", "services", "company"].find((id) => isSectionEnabled(id, config));
  return first ? getAnchorForSection(first) : "#top";
}

export function getNavigationItems(config) {
  if (!config?.navigation?.length) return [];
  return config.navigation.filter((item) => !item.section || isSectionEnabled(item.section, config));
}
