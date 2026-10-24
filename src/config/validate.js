/**
 * VALIDACIÓN DE CONFIGURACIÓN
 * Validador puro, sin dependencias, usado por `npm run validate` y en el arranque.
 */
import { PRESETS } from "./presets.js";
import { PALETTES, CUSTOM_COLOR_KEYS, isHexColor } from "./palettes.js";
import {
  ANCHOR_SECTIONS,
  SECTION_IDS,
  SECTION_VARIANTS,
  isSectionEnabled,
} from "./sections.js";

const CONTENT_SECTIONS = Object.freeze(["hero", "services", "company"]);
const TYPOGRAPHIES = Object.freeze(["libron"]);
const RADII = Object.freeze(["sm", "md", "xl", "2xl", "full"]);
const CONTAINERS = Object.freeze(["sm", "md", "lg", "xl", "7xl"]);

function err(path, message) {
  return `${path}: ${message}`;
}

function isString(value) {
  return typeof value === "string";
}

function validateBrand(site, errors) {
  if (!site.brand?.name) errors.push(err("site.brand.name", "requerido"));
  if (!site.brand?.shortName) errors.push(err("site.brand.shortName", "requerido"));
  if (site.brand?.description && !isString(site.brand.description)) {
    errors.push(err("site.brand.description", "debe ser string"));
  }
  if (site.seo?.themeColor && !isHexColor(site.seo.themeColor)) {
    errors.push(err("site.seo.themeColor", "debe ser hex #rrggbb"));
  }
  if (site.seo?.title && !isString(site.seo.title)) {
    errors.push(err("site.seo.title", "debe ser string"));
  }
  if (site.seo?.description && !isString(site.seo.description)) {
    errors.push(err("site.seo.description", "debe ser string"));
  }
}

function validateContact(contact, errors) {
  if (!contact) return;
  if (!contact.locality) errors.push(err("site.contact.locality", "requerido"));
  const textFields = ["locality", "phone", "phoneDisplay", "email", "whatsapp", "facebookUrl", "facebookHandle", "mapQuery"];
  for (const field of textFields) {
    if (contact[field] != null && !isString(contact[field])) {
      errors.push(err(`site.contact.${field}`, "debe ser string"));
    }
  }
  if (contact.facebookUrl && !/^https:\/\/www\.facebook\.com\//i.test(contact.facebookUrl)) {
    errors.push(err("site.contact.facebookUrl", "debe ser una URL de facebook.com"));
  }
  if (contact.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors.push(err("site.contact.email", "debe ser un correo válido"));
  }
  if (contact.whatsapp && !/^\d{8,15}$/.test(contact.whatsapp.replace(/\D/g, ""))) {
    errors.push(err("site.contact.whatsapp", "debe contener entre 8 y 15 dígitos"));
  }
  if (![contact.facebookUrl, contact.mapQuery, contact.phone, contact.email].some(Boolean)) {
    errors.push(err("site.contact", "requiere al menos un canal real de consulta"));
  }
}

function validateAction(action, path, config, errors) {
  if (!action || typeof action !== "object") {
    errors.push(err(path, "debe ser un objeto de acción"));
    return;
  }
  if (!action.label) errors.push(err(`${path}.label`, "requerido"));
  if (!action.href) {
    errors.push(err(`${path}.href`, "requerido: no se permiten CTA simulados"));
    return;
  }
  if (!action.href.startsWith("#")) return;
  const sectionId = ANCHOR_SECTIONS[action.href];
  if (!sectionId) {
    errors.push(err(`${path}.href`, `ancla desconocida: ${action.href}`));
  } else if (!isSectionEnabled(sectionId, config)) {
    errors.push(err(`${path}.href`, `la sección ${sectionId} está deshabilitada`));
  }
}

function validateTheme(theme, errors) {
  if (!PRESETS.includes(theme.preset)) {
    errors.push(err("theme.preset", `debe ser uno de: ${PRESETS.join(", ")}`));
  }
  if (!PALETTES.includes(theme.palette)) {
    errors.push(err("theme.palette", `debe ser uno de: ${PALETTES.join(", ")}`));
  }
  if (theme.palette === "custom") {
    if (!theme.colors) {
      errors.push(err("theme.colors", "requerido cuando palette es custom"));
    } else {
      for (const key of CUSTOM_COLOR_KEYS) {
        if (!isHexColor(theme.colors[key])) {
          errors.push(err(`theme.colors.${key}`, "debe ser hex #rrggbb"));
        }
      }
    }
  }
  if (theme.typography && !TYPOGRAPHIES.includes(theme.typography)) {
    errors.push(err("theme.typography", `debe ser: ${TYPOGRAPHIES.join(", ")}`));
  }
  if (theme.radius && !RADII.includes(theme.radius)) {
    errors.push(err("theme.radius", "valor no válido"));
  }
}

function validateNavigation(config, errors) {
  if (!config.navigation) return;
  if (!Array.isArray(config.navigation)) {
    errors.push(err("navigation", "debe ser array"));
    return;
  }
  config.navigation.forEach((item, index) => {
    if (!item.label) errors.push(err(`navigation[${index}].label`, "requerido"));
    if (!item.href) errors.push(err(`navigation[${index}].href`, "requerido"));
    if (item.section && !SECTION_IDS.includes(item.section)) {
      errors.push(err(`navigation[${index}].section`, `id desconocido: ${item.section}`));
    }
    if (item.section && ANCHOR_SECTIONS[item.href] && ANCHOR_SECTIONS[item.href] !== item.section) {
      errors.push(err(`navigation[${index}].section`, `no coincide con el ancla ${item.href}`));
    }
    if (item.href?.startsWith("#")) {
      const sectionId = ANCHOR_SECTIONS[item.href];
      if (!sectionId) {
        errors.push(err(`navigation[${index}].href`, `ancla desconocida: ${item.href}`));
      } else if (!isSectionEnabled(sectionId, config)) {
        errors.push(err(`navigation[${index}].href`, `la sección ${sectionId} está deshabilitada`));
      }
    }
  });
}

function validateSections(config, errors) {
  if (!Array.isArray(config.sections)) {
    errors.push(err("sections", "debe ser array"));
    return;
  }
  const ids = new Set();
  config.sections.forEach((section, index) => {
    if (!section.id) {
      errors.push(err(`sections[${index}].id`, "requerido"));
    } else if (!SECTION_IDS.includes(section.id)) {
      errors.push(err(`sections[${index}].id`, `id desconocido: ${section.id}. Válidos: ${SECTION_IDS.join(", ")}`));
    }
    if (ids.has(section.id)) errors.push(err(`sections[${index}].id`, `duplicado: ${section.id}`));
    ids.add(section.id);
    if (typeof section.enabled !== "boolean") errors.push(err(`sections[${index}].enabled`, "debe ser boolean"));
    if (section.order != null && typeof section.order !== "number") {
      errors.push(err(`sections[${index}].order`, "debe ser number"));
    }
    if (section.variant && SECTION_VARIANTS[section.id] && !SECTION_VARIANTS[section.id].includes(section.variant)) {
      errors.push(err(`sections[${index}].variant`, `para ${section.id} debe ser: ${SECTION_VARIANTS[section.id].join(", ")}`));
    }
    if (section.props != null && typeof section.props !== "object") {
      errors.push(err(`sections[${index}].props`, "debe ser objeto"));
    }
    if (section.enabled && CONTENT_SECTIONS.includes(section.id) && !section.props?.title) {
      errors.push(err(`sections[${index}].props.title`, "requerido para una sección visible"));
    }
    if (section.enabled && section.id === "header" && section.props?.action) {
      validateAction(section.props.action, `sections[${index}].props.action`, config, errors);
    }
    if (section.enabled && section.id === "hero" && section.props?.actions) {
      if (!Array.isArray(section.props.actions)) {
        errors.push(err(`sections[${index}].props.actions`, "debe ser array"));
      } else {
        section.props.actions.forEach((action, actionIndex) => {
          validateAction(action, `sections[${index}].props.actions[${actionIndex}]`, config, errors);
        });
      }
    }
  });
}

export function validateConfig(config) {
  const errors = [];

  if (!config || typeof config !== "object") {
    return ["config: debe ser un objeto"];
  }

  if (!config.site) errors.push(err("site", "requerido"));
  else {
    validateBrand(config.site, errors);
    if (!config.site.contact) errors.push(err("site.contact", "requerido"));
    else validateContact(config.site.contact, errors);
  }

  if (!config.theme) errors.push(err("theme", "requerido"));
  else validateTheme(config.theme, errors);

  if (config.layout) {
    if (config.layout.container && !CONTAINERS.includes(config.layout.container)) {
      errors.push(err("layout.container", "valor no válido"));
    }
    if (config.layout.sectionSpacing && !["compact", "default"].includes(config.layout.sectionSpacing)) {
      errors.push(err("layout.sectionSpacing", "valor no válido"));
    }
  }

  validateNavigation(config, errors);
  validateSections(config, errors);

  if (config.order) {
    if (typeof config.order.enabled !== "boolean") {
      errors.push(err("order.enabled", "debe ser boolean"));
    }
    if (config.order.enabled) {
      errors.push(err("order.enabled", "debe ser false: la compra de pasajes no está implementada"));
    }
    if (config.order.units && !Array.isArray(config.order.units)) {
      errors.push(err("order.units", "debe ser array"));
    }
  }

  return errors;
}

export function assertValidConfig(config) {
  const errors = validateConfig(config);
  if (errors.length) {
    throw new Error(`Configuración inválida:\n - ${errors.join("\n - ")}`);
  }
}
