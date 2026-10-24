import { readFileSync } from "node:fs";
import { siteConfig } from "../src/config/site.config.js";
import { validateConfig } from "../src/config/validate.js";

const dataUrl = (file) => new URL(`../src/data/${file}`, import.meta.url);
const readJson = (file) => JSON.parse(readFileSync(dataUrl(file), "utf8"));

const errors = validateConfig(siteConfig);
const routes = readJson("routes.json");
const services = readJson("services.json");
const agencies = readJson("agencies.json");

const SERVICE_STATES = new Set(["verified", "pending", "historical"]);
const AGENCY_STATES = new Set(["pending", "unverified"]);

for (const route of routes) {
  if (!route.id) errors.push(`routes: ruta sin id`);
  if (!route.origin || !route.destination) errors.push(`routes.${route.id}: origen y destino requeridos`);
  if (route.editorial?.state !== "verified") errors.push(`routes.${route.id}: editorial.state debe ser verified`);
  if (!route.editorial?.source) errors.push(`routes.${route.id}: editorial.source requerido`);
  if (!Array.isArray(route.authorizations) || !route.authorizations.length) {
    errors.push(`routes.${route.id}: authorizations requerido`);
  }
}

for (const service of services) {
  if (!service.id || !service.title) errors.push("services: id y title requeridos");
  if (!SERVICE_STATES.has(service.status)) errors.push(`services.${service.id}: status no válido`);
  if (!service.source) errors.push(`services.${service.id}: source requerido`);
}

const verifiedServices = services.filter((service) => service.status === "verified");
if (verifiedServices.length > 3) {
  errors.push("services: la página solo admite tres prestaciones verificadas");
}
if (verifiedServices.length === 0) {
  errors.push("services: falta al menos una prestación verificada");
}

for (const agency of agencies) {
  if (!agency.id || !agency.name) errors.push("agencies: id y name requeridos");
  if (!AGENCY_STATES.has(agency.editorial?.state)) {
    errors.push(`agencies.${agency.id}: editorial.state debe ser pending o unverified`);
  }
  if (!agency.editorial?.source) errors.push(`agencies.${agency.id}: editorial.source requerido`);
}

if (siteConfig.order?.enabled !== false) {
  errors.push("order.enabled: debe ser false en esta versión");
}

const uniqueErrors = [...new Set(errors)];
if (uniqueErrors.length) {
  console.error("Validación fallida:");
  uniqueErrors.forEach((error) => console.error(" - " + error));
  process.exit(1);
}

console.log(
  `✓ Config válida · ${routes.length} ruta(s) · ${verifiedServices.length} servicio(s) verificado(s) · ${agencies.length} agencia(s) no publicadas`,
);
