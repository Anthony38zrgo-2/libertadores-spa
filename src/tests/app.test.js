import { describe, it, expect, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { readFileSync, readdirSync, statSync } from "node:fs";
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
import { buildMapSearchUrl, getContactChannels } from "@/composables/useContact";
import { ICONS } from "@/icons/registry";
import routes from "@/data/routes.json";
import services from "@/data/services.json";
import agencies from "@/data/agencies.json";

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

  it("usa una paleta custom y el preset minimal", () => {
    expect(PALETTES).toEqual(["custom"]);
    expect(PRESETS).toEqual(["minimal"]);
    expect(siteConfig.theme.palette).toBe("custom");
    expect(siteConfig.theme.preset).toBe("minimal");
    expect(siteConfig.theme.typography).toBe("libron");
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

  it("ordena secciones y solo navega a secciones activas", () => {
    const ordered = getOrderedSections(siteConfig);
    for (let i = 1; i < ordered.length; i++) {
      expect(ordered[i].order).toBeGreaterThanOrEqual(ordered[i - 1].order);
    }
    const navigation = getNavigationItems(siteConfig);
    expect(navigation.map((item) => item.href)).toEqual(["#top", "#servicios", "#contacto"]);
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
    bad.sections.find((section) => section.id === "services").enabled = false;
    const errors = validateConfig(bad);
    expect(errors.some((error) => error.includes("navigation[1].href"))).toBe(true);
    expect(errors.some((error) => error.includes("props.actions"))).toBe(true);
  });

  it("rechaza CTAs sin enlace real", () => {
    const bad = structuredClone(siteConfig);
    bad.sections.find((section) => section.id === "header").props.action = { label: "Consultar" };
    const errors = validateConfig(bad);
    expect(errors.some((error) => error.includes("sections[0].props.action.href"))).toBe(true);
  });

  it("exige al menos un canal de contacto real", () => {
    const bad = structuredClone(siteConfig);
    bad.site.contact.facebookUrl = "";
    bad.site.contact.mapQuery = "";
    const errors = validateConfig(bad);
    expect(errors).toContain("site.contact: requiere al menos un canal real de consulta");
  });
});

describe("datos editoriales", () => {
  it("publica solo la ruta verificada y sus autorizaciones", () => {
    expect(routes).toHaveLength(1);
    expect(routes[0].editorial.state).toBe("verified");
    expect(routes[0].authorizations).toHaveLength(2);
  });

  it("publica exactamente tres prestaciones verificadas", () => {
    const verified = services.filter((service) => service.status === "verified");
    expect(verified).toHaveLength(3);
  });

  it("mantiene agencias y servicios pendientes fuera de la página", () => {
    const html = mountApp().html();
    expect(html).not.toContain("Equipajes y encomiendas");
    expect(html).not.toContain("Clases histórico-comerciales");
    for (const agency of agencies) {
      expect(["pending", "unverified"]).toContain(agency.editorial.state);
    }
    expect(html).not.toContain("2328");
    expect(html).not.toContain("2330");
  });
});

describe("contacto", () => {
  it("construye un enlace de ubicación codificado", () => {
    expect(buildMapSearchUrl("San Luis, Lima & Perú")).toBe(
      "https://www.google.com/maps/search/?api=1&query=San%20Luis%2C%20Lima%20%26%20Per%C3%BA",
    );
  });

  it("expone solo canales reales y omite WhatsApp sin confirmar", () => {
    const channels = getContactChannels(siteConfig);
    expect(channels.map((channel) => channel.id)).toEqual(["facebook", "location"]);
    expect(channels.every((channel) => channel.href.startsWith("https://"))).toBe(true);
    expect(channels.some((channel) => channel.id === "whatsapp")).toBe(false);
  });
});

describe("App", () => {
  it("renderiza las secciones habilitadas y ningún modal de pedido", () => {
    const wrapper = mountApp();
    const html = wrapper.html();
    if (isSectionEnabled("header", siteConfig)) expect(html).toContain("site-header");
    if (isSectionEnabled("hero", siteConfig)) expect(html).toContain('id="top"');
    if (isSectionEnabled("services", siteConfig)) expect(html).toContain('id="servicios"');
    if (isSectionEnabled("company", siteConfig)) expect(html).toContain('id="contacto"');
    if (isSectionEnabled("footer", siteConfig)) expect(html).toContain("site-footer");
    expect(html).not.toContain("order-modal");
    expect(html).not.toContain("wa.me");
    expect(html).not.toContain("S/");
  });

  it("aplica data-preset y data-palette", () => {
    mountApp();
    expect(document.documentElement.getAttribute("data-preset")).toBe(siteConfig.theme.preset);
    expect(document.documentElement.getAttribute("data-palette")).toBe(siteConfig.theme.palette);
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

  it("no publica placeholders visibles", () => {
    const html = mountApp().html();
    expect(html).not.toMatch(/\[[^\]]{3,}\]/);
    expect(html).not.toContain("Lorem");
    expect(html).not.toContain("000000");
  });
});

describe("activos", () => {
  it("registra los ocho iconos Material necesarios", () => {
    expect(Object.keys(ICONS).sort()).toEqual(
      ["arrow_forward", "call", "close", "directions_bus", "location_on", "mail", "menu", "route"].sort(),
    );
    for (const icon of Object.values(ICONS)) {
      expect(icon.content).toContain("<path");
      expect(icon.viewBox).toBe("0 -960 960 960");
    }
  });

  it("declara cuatro estilos Libron locales y ninguna fuente externa", () => {
    const css = readFileSync(join(process.cwd(), "src/styles/fonts.css"), "utf8");
    expect(css.match(/@font-face/g)).toHaveLength(4);
    expect(css).toContain('font-family: "Libron"');
    expect(css).toContain("Libron-BoldItalic.woff2");
    expect(css).not.toContain("fonts.googleapis.com");
  });

  it("no hardcodea hex en componentes Vue", () => {
    const files = readTree(join(process.cwd(), "src/components")).filter((file) => file.endsWith(".vue"));
    expect(files.length).toBeGreaterThan(5);
    for (const file of files) {
      const source = readFileSync(file, "utf8");
      expect(source, file).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    }
  });
});
