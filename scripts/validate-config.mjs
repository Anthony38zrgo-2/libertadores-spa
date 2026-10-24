import { readFileSync } from "node:fs";
import { siteConfig } from "../src/config/site.config.js";
import { validateConfig } from "../src/config/validate.js";

const dataUrl = (file) => new URL(`../src/data/${file}`, import.meta.url);
const readJson = (file) => JSON.parse(readFileSync(dataUrl(file), "utf8"));

const errors = validateConfig(siteConfig);
const routes = readJson("routes.json");
const services = readJson("services.json");
const agencies = readJson("agencies.json");
const schedules = readJson("schedules.json");
const faq = readJson("faq.json");

const SERVICE_STATES = new Set(["verified", "pending", "historical"]);
const AGENCY_STATES = new Set(["pending", "unverified", "confirmed"]);
const FAQ_STATES = new Set(["confirmed", "pending"]);

for (const route of routes) {
  if (!route.id) errors.push("routes: ruta sin id");
  if (!route.origin || !route.destination) errors.push(`routes.${route.id}: origen y destino requeridos`);
  if (route.editorial?.state !== "verified") errors.push(`routes.${route.id}: editorial.state debe ser verified`);
  if (!route.editorial?.source) errors.push(`routes.${route.id}: editorial.source requerido`);
  if (!Array.isArray(route.authorizations) || !route.authorizations.length) {
    errors.push(`routes.${route.id}: authorizations requerido`);
  }
  for (const authorization of route.authorizations ?? []) {
    if (!authorization.operatorRuc || !/^\d{11}$/.test(authorization.operatorRuc)) {
      errors.push(`routes.${route.id}: cada autorización requiere operatorRuc de 11 dígitos`);
    }
    if (!authorization.holder) {
      errors.push(`routes.${route.id}: cada autorización requiere holder`);
    }
  }
}

for (const service of services) {
  if (!service.id || !service.title) errors.push("services: id y title requeridos");
  if (!SERVICE_STATES.has(service.status)) errors.push(`services.${service.id}: status no válido`);
  if (!service.source) errors.push(`services.${service.id}: source requerido`);
  if (!service.verifiedAt) errors.push(`services.${service.id}: verifiedAt requerido`);
  if (service.status !== "verified" && service.visible === true) {
    errors.push(`services.${service.id}: un servicio no verificado no puede ser visible`);
  }
}

const visibleServices = services.filter(
  (service) => service.status === "verified" && service.visible !== false,
);
if (visibleServices.length !== 1) {
  errors.push("services: debe publicarse exactamente una prestación verificada y visible");
}

const confirmedAgencies = agencies.filter((agency) => agency.editorial?.state === "confirmed");
if (confirmedAgencies.length === 0) {
  errors.push("agencies: falta al menos una agencia confirmada para publicar");
}

for (const agency of agencies) {
  if (!agency.id || !agency.name) errors.push("agencies: id y name requeridos");
  if (!AGENCY_STATES.has(agency.editorial?.state)) {
    errors.push(`agencies.${agency.id}: editorial.state no válido`);
  }
  if (!agency.editorial?.source) errors.push(`agencies.${agency.id}: editorial.source requerido`);
  if (agency.editorial?.state === "confirmed" && !agency.addresses?.length) {
    errors.push(`agencies.${agency.id}: una agencia confirmada requiere dirección`);
  }
}

const confirmedSchedules = schedules.filter((schedule) => schedule.status === "confirmed");
if (confirmedSchedules.length !== 2) {
  errors.push("schedules: deben existir exactamente dos turnos informados");
}
const times = new Set(confirmedSchedules.map((schedule) => schedule.time));
for (const expected of ["21:15", "22:00"]) {
  if (!times.has(expected)) errors.push(`schedules: falta el turno ${expected}`);
}
for (const schedule of confirmedSchedules) {
  if (!schedule.displayTime) errors.push(`schedules.${schedule.id}: displayTime requerido`);
  if (schedule.timeZone !== "America/Lima") errors.push(`schedules.${schedule.id}: timeZone debe ser America/Lima`);
  if (schedule.source !== "cliente") errors.push(`schedules.${schedule.id}: source debe ser cliente`);
  if (!schedule.verifiedAt) errors.push(`schedules.${schedule.id}: verifiedAt requerido`);
  for (const field of ["departureCity", "operatingDays", "boardingPoint", "direction"]) {
    if (schedule[field] != null) {
      errors.push(`schedules.${schedule.id}: ${field} debe permanecer null hasta confirmación`);
    }
  }
}

for (const item of faq) {
  if (!item.id || !item.question || !item.answer) errors.push("faq: id, question y answer requeridos");
  if (!FAQ_STATES.has(item.status)) errors.push(`faq.${item.id}: status no válido`);
  if (!item.source) errors.push(`faq.${item.id}: source requerido`);
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
  `✓ Config válida · ${routes.length} ruta(s) · ${visibleServices.length} servicio(s) visible(s) · ${confirmedSchedules.length} turno(s) · ${confirmedAgencies.length} agencia(s) confirmada(s) · ${faq.length} FAQ`,
);
