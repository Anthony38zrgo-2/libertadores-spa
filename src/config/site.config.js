/**
 * CENTRO DE CONFIGURACIÓN — TRANSPORTES LIBERTADORES
 *
 * Identidad, navegación, orden de secciones y contenido editable viven aquí.
 * La versión pública es informativa: no vende pasajes, no muestra horarios ni
 * tarifas sin confirmar y no simula disponibilidad.
 *
 * Paleta custom (flat): grafito, blanco humo, gris plata, rojo y naranja.
 * Tipografía local Libron; iconos Material Symbols locales.
 */

export const siteConfig = {
  site: {
    brand: {
      name: "Transportes Libertadores",
      shortName: "TL",
      tagline: "Transporte interprovincial de pasajeros",
      description:
        "Transporte terrestre interprovincial de pasajeros con atención en San Luis, Lima. Ruta autorizada: Lima–Ayacucho.",
    },
    seo: {
      title: "Transportes Libertadores | Ruta autorizada Lima–Ayacucho",
      description:
        "Servicio de transporte terrestre interprovincial de pasajeros en la ruta autorizada Lima–Ayacucho. Consulta horarios, puntos de embarque y disponibilidad antes de viajar.",
      themeColor: "#25282C",
    },
    contact: {
      locality: "San Luis, Lima · Perú",
      mapQuery: "Transportes Libertadores, San Luis, Lima, Perú",
      facebookUrl: "https://www.facebook.com/TransportesLibertadores/",
      facebookHandle: "TransportesLibertadores",
      // Canales sin confirmación directa: permanecen vacíos y no se publican.
      phone: "",
      phoneDisplay: "",
      email: "",
      whatsapp: "",
    },
  },

  theme: {
    preset: "minimal",
    palette: "custom",
    colors: {
      ink: "#25282C",
      muted: "#25282C",
      surface: "#F6F7F7",
      surfaceAlt: "#DADDE0",
      brand: "#D71920",
      brandDark: "#25282C",
      accent: "#F26322",
    },
    typography: "libron",
    radius: "sm",
  },

  layout: {
    container: "7xl",
    sectionSpacing: "compact",
  },

  navigation: [
    { label: "Inicio", href: "#top", section: "hero" },
    { label: "Servicios", href: "#servicios", section: "services" },
    { label: "Contacto", href: "#contacto", section: "company" },
  ],

  sections: [
    {
      id: "header",
      enabled: true,
      order: 0,
      variant: "default",
      props: {
        action: {
          label: "Consultar viaje",
          href: "#contacto",
          variant: "primary",
          icon: "arrow_forward",
        },
      },
    },
    {
      id: "hero",
      enabled: true,
      order: 10,
      variant: "split",
      props: {
        eyebrow: "Transporte interprovincial · Perú",
        title: "Lima y Ayacucho, conectadas por tierra.",
        description:
          "Servicio de transporte interprovincial de pasajeros con ruta autorizada Lima–Ayacucho. Consulta horarios, puntos de embarque y disponibilidad antes de tu viaje.",
        actions: [
          {
            label: "Consultar viaje",
            href: "#contacto",
            variant: "primary",
            icon: "arrow_forward",
          },
          { label: "Ver ruta", href: "#servicios", variant: "secondary" },
        ],
        visual: {
          type: "image",
          key: "bus-carretera",
          aspect: "4 / 3",
          alt: "Bus interprovincial en una carretera de montaña del Perú.",
        },
      },
    },
    {
      id: "services",
      enabled: true,
      order: 20,
      variant: "compact",
      props: {
        eyebrow: "Ruta y servicios",
        title: "Una ruta autorizada, un servicio claro.",
        description:
          "La ruta Lima–Ayacucho figura en autorizaciones del Ministerio de Transportes y Comunicaciones de 2025 y 2026. Confirma horarios, puntos de embarque y disponibilidad antes de viajar.",
      },
    },
    {
      id: "company",
      enabled: true,
      order: 30,
      variant: "split",
      props: {
        eyebrow: "Empresa y contacto",
        title: "Una empresa peruana de transporte terrestre.",
        description:
          "Transportes Libertadores se dedica al transporte interprovincial de pasajeros. La ruta Lima–Ayacucho figura en autorizaciones del Ministerio de Transportes y Comunicaciones emitidas en 2025 y 2026. La atención se centraliza en San Luis, Lima.",
        contactTitle: "Atención y contacto",
        contactNote: "La atención y los horarios se confirman por los canales publicados.",
        visual: {
          type: "image",
          key: "equipo-agencia",
          aspect: "4 / 5",
          alt: "Equipo de atención de Transportes Libertadores en una agencia.",
        },
      },
    },
    {
      id: "footer",
      enabled: true,
      order: 90,
      variant: "default",
      props: {
        legal: "Todos los derechos reservados.",
        location: "San Luis, Lima · Perú",
      },
    },
  ],

  // La compra de pasajes requiere integraciones y no forma parte de esta versión.
  order: {
    enabled: false,
    units: [],
  },
};
