import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import App from "@/App.vue";
import { siteConfig } from "@/config/site.config";
import { validateConfig } from "@/config/validate";
import { PALETTES } from "@/config/palettes";
import { PRESETS } from "@/config/presets";
import {
  ANCHOR_SECTIONS,
  getNavigationItems,
  getOrderedSections,
  isConfiguredLinkAvailable,
  isSectionEnabled,
} from "@/config/sections";
import {
  buildMapSearchUrl,
  buildWhatsAppUrl,
  getContactChannels,
} from "@/composables/useContact";
import { ICONS } from "@/icons/registry";
import { findVerifiedRoute, getConfirmedSchedules, sortSchedules } from "@/data/routeHelpers";
import routes from "@/data/routes.json";
import services from "@/data/services.json";
import agencies from "@/data/agencies.json";
import schedules from "@/data/schedules.json";
import faq from "@/data/faq.json";

const wrappers = [];

function mountApp() {
  const wrapper = mount(App);
  wrappers.push(wrapper);
  return wrapper;
}

afterEach(() => {
  while (wrappers.length) wrappers.pop().unmount();
});

function readTree(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? readTree(path) : [path];
  });
}

describe("configuración", () => {
  it("valida sin errores", () => {
    expect(validateConfig(siteConfig)).toEqual([]);
  });

  it("usa paleta custom, preset minimal y tipografía editorial híbrida", () => {
    expect(PALETTES).toEqual(["custom"]);
    expect(PRESETS).toEqual(["minimal"]);
    expect(siteConfig.theme.palette).toBe("custom");
    expect(siteConfig.theme.preset).toBe("minimal");
    expect(siteConfig.theme.typography).toBe("libron-editorial");
  });

  it("conserva la paleta de la identidad", () => {
    expect(siteConfig.theme.colors).toEqual({
      ink: "#25282C",
      muted: "#25282C",
      surface: "#F6F7F7",
      surfaceAlt: "#DADDE0",
      brand: "#D71920",
      brandDark: "#25282C",
      accent: "#F26322",
    });
  });

  it("configura WhatsApp confirmado por el cliente", () => {
    expect(siteConfig.site.contact.whatsapp).toBe("51959309809");
    expect(siteConfig.site.contact.whatsappDisplay).toBe("+51 959 309 809");
    expect(siteConfig.site.contact.whatsappMessage).toContain("9:15 p. m.");
    expect(siteConfig.site.contact.whatsappMessage).toContain("10:00 p. m.");
  });

  it("ordena secciones y navega a destinos, servicios, agencias, nosotros y contacto", () => {
    const ordered = getOrderedSections(siteConfig);
    for (let i = 1; i < ordered.length; i++) {
      expect(ordered[i].order).toBeGreaterThanOrEqual(ordered[i - 1].order);
    }
    const navigation = getNavigationItems(siteConfig);
    expect(navigation.map((item) => item.href)).toEqual([
      "#top",
      "#destinos",
      "#servicios",
      "#agencias",
      "#nosotros",
      "#contacto",
    ]);
    for (const item of navigation) {
      expect(isConfiguredLinkAvailable(item.href, siteConfig)).toBe(true);
      expect(ANCHOR_SECTIONS[item.href]).toBe(item.section);
    }
  });

  it("desactiva la compra de pasajes", () => {
    expect(siteConfig.order.enabled).toBe(false);
  });

  it("detecta enlaces a secciones deshabilitadas", () => {
    const bad = structuredClone(siteConfig);
    bad.sections.find((section) => section.id === "destinations").enabled = false;
    const errors = validateConfig(bad);
    expect(errors.some((error) => error.includes("navigation[1].href"))).toBe(true);
    expect(errors.some((error) => error.includes("props.actions"))).toBe(true);
  });

  it("rechaza CTA de WhatsApp si no hay número configurado", () => {
    const bad = structuredClone(siteConfig);
    bad.site.contact.whatsapp = "";
    const errors = validateConfig(bad);
    expect(errors.some((error) => error.includes("props.action.type"))).toBe(true);
  });

  it("rechaza CTAs sin enlace real", () => {
    const bad = structuredClone(siteConfig);
    bad.sections.find((section) => section.id === "header").props.action = { label: "Consultar" };
    const errors = validateConfig(bad);
    expect(errors.some((error) => error.includes("sections[0].props.action.href"))).toBe(true);
  });

  it("exige al menos un canal de contacto real", () => {
    const bad = structuredClone(siteConfig);
    bad.site.contact.whatsapp = "";
    bad.site.contact.facebookUrl = "";
    const errors = validateConfig(bad);
    expect(errors).toContain("site.contact: requiere al menos un canal real de consulta");
  });
});

describe("WhatsApp y contacto", () => {
  it("construye la URL con número normalizado y mensaje codificado", () => {
    expect(buildWhatsAppUrl("+51 959 309 809", "Hola")).toBe(
      "https://wa.me/51959309809?text=Hola",
    );
    const url = buildWhatsAppUrl("51 959-309-809", "turnos 9:15 / 10:00 & disponibilidad");
    expect(url.startsWith("https://wa.me/51959309809?text=")).toBe(true);
    expect(new URL(url).searchParams.get("text")).toBe("turnos 9:15 / 10:00 & disponibilidad");
  });

  it("rechaza números vacíos o inválidos", () => {
    expect(buildWhatsAppUrl("")).toBe("");
    expect(buildWhatsAppUrl("abc")).toBe("");
    expect(buildWhatsAppUrl("123")).toBe("");
    expect(buildWhatsAppUrl(null, "Hola")).toBe("");
  });

  it("publica WhatsApp como primer canal, luego Facebook y sin mapa genérico", () => {
    const channels = getContactChannels(siteConfig);
    expect(channels.map((channel) => channel.id)).toEqual(["whatsapp", "facebook"]);
    expect(channels[0].detail).toBe("+51 959 309 809");
    expect(channels[0].href).toContain("https://wa.me/51959309809");
    expect(channels[0].icon).toBe("whatsapp");
    expect(channels.every((channel) => channel.href.startsWith("https://"))).toBe(true);
    expect(channels.some((channel) => channel.id === "location")).toBe(false);
  });

  it("oculta WhatsApp cuando el número no está configurado", () => {
    const config = structuredClone(siteConfig);
    config.site.contact.whatsapp = "";
    config.site.contact.facebookUrl = "";
    expect(getContactChannels(config)).toEqual([]);
  });

  it("no publica un mapa si la ubicación no está confirmada", () => {
    const config = structuredClone(siteConfig);
    config.site.contact.mapQuery = "San Luis, Lima";
    config.site.contact.mapConfirmed = false;
    expect(getContactChannels(config).some((channel) => channel.id === "location")).toBe(false);
    config.site.contact.mapConfirmed = true;
    expect(getContactChannels(config).some((channel) => channel.id === "location")).toBe(true);
    expect(buildMapSearchUrl("San Luis, Lima & Perú")).toContain("San%20Luis");
  });
});

describe("turnos y rutas", () => {
  it("almacena 21:15 y 22:00 y muestra 9:15 p. m. y 10:00 p. m.", () => {
    expect(schedules.map((schedule) => schedule.time)).toEqual(["21:15", "22:00"]);
    expect(schedules.map((schedule) => schedule.displayTime)).toEqual([
      "9:15 p. m.",
      "10:00 p. m.",
    ]);
    for (const schedule of schedules) {
      expect(schedule.timeZone).toBe("America/Lima");
      expect(schedule.source).toBe("cliente");
      expect(schedule.verifiedAt).toBe("2026-10-23");
      expect(schedule.departureCity).toBeNull();
      expect(schedule.operatingDays).toBeNull();
      expect(schedule.boardingPoint).toBeNull();
      expect(schedule.direction).toBeNull();
    }
  });

  it("filtra y ordena turnos confirmados por ruta", () => {
    expect(getConfirmedSchedules(schedules, "lima-ayacucho")).toHaveLength(2);
    expect(getConfirmedSchedules(schedules, "otra-ruta")).toHaveLength(0);
    expect(sortSchedules([...schedules].reverse()).map((item) => item.time)).toEqual([
      "21:15",
      "22:00",
    ]);
  });

  it("mantiene la ruta verificada y la atribución por RUC", () => {
    const route = findVerifiedRoute(routes);
    expect(route).not.toBeNull();
    expect(route.origin).toBe("Lima");
    expect(route.destination).toBe("Ayacucho");
    expect(route.authorizations).toHaveLength(2);
    const rucs = route.authorizations.map((authorization) => authorization.operatorRuc);
    expect(new Set(rucs).size).toBe(2);
    for (const ruc of rucs) expect(ruc).toMatch(/^\d{11}$/);
    expect(route.authorizations.every((authorization) => authorization.holder)).toBe(true);
  });

  it("no devuelve una ruta pendiente como verificada", () => {
    expect(findVerifiedRoute([{ id: "x", editorial: { state: "pending" } }])).toBeNull();
    expect(findVerifiedRoute([])).toBeNull();
  });

  it("muestra exactamente dos turnos en la tarjeta de destinos", () => {
    const wrapper = mountApp();
    const shiftTimes = wrapper.findAll(".shift-time").map((node) => node.text());
    expect(shiftTimes).toEqual(["9:15 p. m.", "10:00 p. m."]);
    const heroTimes = wrapper.findAll(".hero-schedule-time").map((node) => node.text());
    expect(heroTimes).toEqual(["9:15 p. m.", "10:00 p. m."]);
  });

  it("no inventa días, sentidos ni terminales", () => {
    const text = mountApp().text().toLowerCase();
    for (const forbidden of ["diario", "diariamente", "desde lima", "desde ayacucho", "ambos sentidos"]) {
      expect(text).not.toContain(forbidden);
    }
    for (const schedule of schedules) {
      expect(schedule.boardingPoint).toBeNull();
      expect(schedule.departureCity).toBeNull();
    }
  });
});

describe("datos editoriales y secciones", () => {
  it("publica un servicio visible y retira códigos técnicos de la interfaz", () => {
    const visible = services.filter(
      (service) => service.status === "verified" && service.visible !== false,
    );
    expect(visible).toHaveLength(1);
    expect(visible[0].title).toBe("Transporte interprovincial de pasajeros");
    const text = mountApp().text();
    expect(text).not.toContain("Equipajes y encomiendas");
    expect(text).not.toContain("Clases histórico-comerciales");
    expect(text).not.toContain("M3");
    expect(text).not.toContain("Clase III");
    expect(text).not.toContain("2025 y 2026");
  });

  it("publica las cinco agencias confirmadas con dirección y teléfono", () => {
    const text = mountApp().text();
    expect(agencies).toHaveLength(5);
    for (const agency of agencies) expect(agency.editorial.state).toBe("confirmed");
    for (const agency of agencies) expect(text).toContain(agency.name);
    for (const visible of ["2330", "998 142 020", "953 753 148", "953 753 576", "No identificado"]) {
      expect(text).toContain(visible);
    }
    expect(text).not.toContain("2328");
    expect((text.match(/No identificado/g) ?? [])).toHaveLength(2);
    expect(text).not.toContain("Agencias en confirmación");
  });

  it("mantiene respuestas informativas sin inventar políticas", () => {
    expect(faq).toHaveLength(6);
    const text = mountApp().text();
    for (const item of faq) expect(text).toContain(item.question);
    for (const forbidden of ["20 kg", "24 horas", "90 días", "mascota", "reembolso"]) {
      expect(text.toLowerCase()).not.toContain(forbidden);
    }
  });

  it("renderiza las secciones habilitadas y ningún modal de pedido", () => {
    const wrapper = mountApp();
    const html = wrapper.html();
    if (isSectionEnabled("header", siteConfig)) expect(html).toContain("site-header");
    if (isSectionEnabled("hero", siteConfig)) expect(html).toContain('id="top"');
    if (isSectionEnabled("destinations", siteConfig)) expect(html).toContain('id="destinos"');
    if (isSectionEnabled("services", siteConfig)) expect(html).toContain('id="servicios"');
    if (isSectionEnabled("agencies", siteConfig)) expect(html).toContain('id="agencias"');
    if (isSectionEnabled("company", siteConfig)) expect(html).toContain('id="nosotros"');
    if (isSectionEnabled("faq", siteConfig)) expect(html).toContain('id="preguntas"');
    if (isSectionEnabled("contact", siteConfig)) expect(html).toContain('id="contacto"');
    if (isSectionEnabled("footer", siteConfig)) expect(html).toContain("site-footer");
    expect(html).not.toContain("order-modal");
    expect(html).not.toContain("S/");
    expect(html).not.toContain("disponibilidad de asientos");
  });

  it("muestra la CTA de WhatsApp real en cabecera, portada, flotante y pie", () => {
    const wrapper = mountApp();
    const headerCta = wrapper.get(".header-cta");
    const heroCta = wrapper.get(".hero-copy .button-primary");
    for (const cta of [headerCta, heroCta]) {
      expect(cta.attributes("href")).toContain("https://wa.me/51959309809");
      expect(cta.attributes("target")).toBe("_blank");
      expect(cta.attributes("rel")).toContain("noopener");
      expect(cta.text()).toContain("Consultar");
    }
    const contactLink = wrapper.get(".contact-whatsapp");
    expect(contactLink.attributes("href")).toContain("https://wa.me/51959309809");
    const floating = wrapper.get(".floating-whatsapp");
    expect(floating.attributes("href")).toContain("https://wa.me/51959309809");
    expect(floating.attributes("aria-label")).toBe("Consultar por WhatsApp");
    const footerWhatsApp = wrapper.findAll(".footer-link").find((link) => link.text().includes("WhatsApp"));
    expect(footerWhatsApp.attributes("href")).toContain("https://wa.me/51959309809");
  });

  it("todos los enlaces externos llevan rel seguro", () => {
    const wrapper = mountApp();
    const external = wrapper.findAll('a[target="_blank"]');
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) expect(link.attributes("rel")).toContain("noopener noreferrer");
  });
});

describe("App y accesibilidad básica", () => {
  it("tiene un solo h1 y un ancla por sección", () => {
    const wrapper = mountApp();
    expect(wrapper.findAll("h1")).toHaveLength(1);
    for (const anchor of Object.keys(ANCHOR_SECTIONS)) {
      expect(wrapper.find(anchor).exists()).toBe(true);
    }
  });

  it("usa la foto del bus como fondo del hero y títulos de sección sin eyebrows", () => {
    const wrapper = mountApp();
    expect(wrapper.get(".hero-section").classes()).toContain("hero-has-image");
    expect(wrapper.get(".hero-background").attributes("src")).toContain("bus-carretera");
    expect(wrapper.find(".hero-scrim").exists()).toBe(true);
    expect(wrapper.find(".eyebrow").exists()).toBe(false);
    expect(wrapper.findAll("h2").map((heading) => heading.text())).toEqual([
      "Destinos",
      "Servicios",
      "Agencias",
      "Nosotros",
      "Preguntas frecuentes",
      "Contacto",
    ]);
  });

  it("abre y cierra el menú móvil con clic y Escape", async () => {
    const wrapper = mountApp();
    const toggle = wrapper.get(".menu-toggle");
    expect(toggle.attributes("aria-expanded")).toBe("false");
    expect(wrapper.find("#mobile-navigation").exists()).toBe(false);

    await toggle.trigger("click");
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(wrapper.find("#mobile-navigation").exists()).toBe(true);
    expect(wrapper.findAll(".mobile-nav-link")).toHaveLength(getNavigationItems(siteConfig).length);

    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await wrapper.vm.$nextTick();
    expect(wrapper.find("#mobile-navigation").exists()).toBe(false);
    expect(toggle.attributes("aria-expanded")).toBe("false");
  });

  it("cierra el menú al elegir un enlace o el CTA", async () => {
    const wrapper = mountApp();
    await wrapper.get(".menu-toggle").trigger("click");
    await wrapper.get(".mobile-nav-link").trigger("click");
    expect(wrapper.find("#mobile-navigation").exists()).toBe(false);

    await wrapper.get(".menu-toggle").trigger("click");
    await wrapper.get(".mobile-nav .button").trigger("click");
    expect(wrapper.find("#mobile-navigation").exists()).toBe(false);
  });

  it("aplica data-preset, data-palette y fuentes del tema", () => {
    mountApp();
    expect(document.documentElement.getAttribute("data-preset")).toBe(siteConfig.theme.preset);
    expect(document.documentElement.getAttribute("data-palette")).toBe(siteConfig.theme.palette);
    expect(document.documentElement.style.getPropertyValue("--font-display")).toContain("Libron");
    expect(document.documentElement.style.getPropertyValue("--font-sans")).toMatch(/system-ui|Segoe UI/);
  });

  it("no publica placeholders visibles", () => {
    const html = mountApp().html();
    expect(html).not.toMatch(/\[[^\]]{3,}\]/);
    expect(html).not.toContain("Lorem");
    expect(html).not.toContain("000000");
  });
});

describe("activos y SEO", () => {
  it("registra ocho iconos Material y el icono social de WhatsApp", () => {
    expect(Object.keys(ICONS).sort()).toEqual(
      [
        "arrow_forward",
        "call",
        "close",
        "directions_bus",
        "location_on",
        "mail",
        "menu",
        "route",
        "whatsapp",
      ].sort(),
    );
    for (const [name, icon] of Object.entries(ICONS)) {
      expect(icon.content).toContain("<path");
      expect(icon.fill).toBe(true);
      expect(icon.viewBox).toBe(name === "whatsapp" ? "0 0 24 24" : "0 -960 960 960");
    }
  });

  it("declara Libron para titulares y sans del sistema para la interfaz", () => {
    const fonts = readFileSync(join(process.cwd(), "src/styles/fonts.css"), "utf8");
    const theme = readFileSync(join(process.cwd(), "src/styles/theme.css"), "utf8");
    expect(fonts.match(/@font-face/g)).toHaveLength(4);
    expect(fonts).toContain('font-family: "Libron"');
    expect(fonts).not.toContain("fonts.googleapis.com");
    expect(theme).toContain('--font-display: "Libron"');
    expect(theme).toContain("--font-sans: ui-sans-serif");
  });

  it("aplica aero-glass a los botones y usa fondo fotográfico en el hero", () => {
    const css = readFileSync(join(process.cwd(), "src/styles/components.css"), "utf8");
    expect(css).toContain(".button {");
    expect(css).toContain("backdrop-filter: blur(16px)");
    expect(css).toContain(".contact-whatsapp");
    expect(css).toContain(".floating-whatsapp");
    expect(css).toContain(".hero-background");
  });

  it("no hardcodea hex en componentes Vue", () => {
    const files = readTree(join(process.cwd(), "src/components")).filter((file) => file.endsWith(".vue"));
    expect(files.length).toBeGreaterThan(8);
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      expect(source, file).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    }
  });

  it("incluye OG, twitter card y JSON-LD sin canonical ficticio", () => {
    const html = readFileSync(join(process.cwd(), "index.html"), "utf8");
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="twitter:card"');
    expect(html).toContain('"@type": "Organization"');
    expect(html).not.toContain('rel="canonical"');
    expect(html).not.toContain("/src/assets/fonts/Libron-Regular.woff2");
    expect(existsSync(join(process.cwd(), "public/og/libertadores.webp"))).toBe(true);
    expect(existsSync(join(process.cwd(), "public/robots.txt"))).toBe(true);
  });
});
