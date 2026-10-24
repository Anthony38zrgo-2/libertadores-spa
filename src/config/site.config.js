/**
 * CENTRO DE CONFIGURACIÓN — TRANSPORTES LIBERTADORES
 *
 * Identidad, navegación, orden de secciones y contenido editable viven aquí.
 * La versión pública es informativa: no vende pasajes, no simula disponibilidad
 * y solo publica turnos y canales confirmados por el cliente.
 *
 * Paleta custom (flat): grafito, blanco humo, gris plata, rojo y naranja.
 * Titulares en Libron; interfaz y cuerpo en sans-serif del sistema.
 */

export const siteConfig = {
  site: {
    brand: {
      name: "Transportes Libertadores",
      shortName: "TL",
      tagline: "Transporte interprovincial de pasajeros",
      description:
        "Transporte interprovincial de pasajeros. Ruta documentada Lima–Ayacucho y consultas por WhatsApp.",
    },
    seo: {
      title: "Transportes Libertadores | Transporte interprovincial Lima–Ayacucho",
      description:
        "Ruta documentada Lima–Ayacucho. Consulta los turnos informados, los días, la ciudad de salida y la disponibilidad por WhatsApp.",
      themeColor: "#25282C",
    },
    contact: {
      locality: "San Luis, Lima · Perú",
      localityNote:
        "San Luis, Lima es una referencia de distrito; la dirección exacta se confirma por WhatsApp.",
      whatsapp: "51959309809",
      whatsappDisplay: "+51 959 309 809",
      whatsappMessage:
        "Hola, quisiera consultar los turnos de 9:15 p. m. y 10:00 p. m. de Transportes Libertadores. ¿Me indican el punto de salida, los días y la disponibilidad?",
      facebookUrl: "https://www.facebook.com/TransportesLibertadores/",
      facebookHandle: "TransportesLibertadores",
      // La ubicación se publica como referencia; no se enlaza un mapa genérico.
      mapQuery: "",
      mapConfirmed: false,
      // Canales no confirmados: permanecen vacíos y no se publican.
      phone: "",
      phoneDisplay: "",
      email: "",
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
    typography: "libron-editorial",
    radius: "sm",
  },

  layout: {
    container: "7xl",
    sectionSpacing: "compact",
  },

  navigation: [
    { label: "Inicio", href: "#top", section: "hero" },
    { label: "Destinos", href: "#destinos", section: "destinations" },
    { label: "Servicios", href: "#servicios", section: "services" },
    { label: "Agencias", href: "#agencias", section: "agencies" },
    { label: "Nosotros", href: "#nosotros", section: "company" },
    { label: "Contacto", href: "#contacto", section: "contact" },
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
          type: "whatsapp",
          variant: "primary",
          icon: "whatsapp",
        },
      },
    },
    {
      id: "hero",
      enabled: true,
      order: 10,
      variant: "split",
      props: {
        title: "Viaja por tierra con el confort del aire",
        description:
          "Ruta documentada Lima–Ayacucho. Consulta los turnos informados y confirma por WhatsApp los días, la ciudad de salida y la disponibilidad.",
        scheduleLabel: "Turnos informados",
        scheduleNote:
          "Informados por el cliente. Los días, la ciudad de salida y el punto de embarque se confirman por WhatsApp.",
        actions: [
          {
            label: "Consultar por WhatsApp",
            type: "whatsapp",
            variant: "primary",
            icon: "whatsapp",
          },
          { label: "Ver destinos", href: "#destinos", variant: "secondary" },
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
      id: "destinations",
      enabled: true,
      order: 20,
      variant: "grid",
      props: {
        title: "Destinos",
        description:
          "Ruta Lima–Ayacucho, turnos informados y consulta directa por WhatsApp.",
        ctaLabel: "Consultar por WhatsApp",
        routeKicker: "Ruta documentada",
        routeNote:
          "La frecuencia, el sentido y la ciudad de salida se confirman por WhatsApp.",
        scheduleLabel: "Turnos informados",
        scheduleNote: "",
        emptySchedulesMessage: "No hay turnos informados para publicar.",
        emptyMessage: "La información de esta ruta está en revisión editorial.",
      },
    },
    {
      id: "services",
      enabled: true,
      order: 30,
      variant: "compact",
      props: {
        title: "Servicios",
        description: "Transporte interprovincial de pasajeros y condiciones de viaje.",
        note: "",
      },
    },
    {
      id: "agencies",
      enabled: true,
      order: 40,
      variant: "list",
      props: {
        title: "Agencias",
        description: "Ciudades, agencias, direcciones y teléfonos de atención.",
        ctaLabel: "Consultar por WhatsApp",
      },
    },
    {
      id: "company",
      enabled: true,
      order: 50,
      variant: "split",
      props: {
        title: "Nosotros",
        description:
          "Transportes Libertadores se dedica al transporte interprovincial de pasajeros. La atención se centraliza en San Luis, Lima.",
        visual: {
          type: "image",
          key: "equipo-agencia",
          aspect: "4 / 5",
          alt: "Equipo de atención de Transportes Libertadores en una agencia.",
        },
      },
    },
    {
      id: "faq",
      enabled: true,
      order: 60,
      variant: "list",
      props: {
        title: "Preguntas frecuentes",
        description: "Respuestas informativas sobre compra, horarios, equipaje y embarque.",
      },
    },
    {
      id: "contact",
      enabled: true,
      order: 70,
      variant: "split",
      props: {
        title: "Contacto",
        description:
          "Consultas por WhatsApp. La venta de pasajes no está disponible en línea.",
        note: "",
        localityNote: "Dirección exacta por confirmar.",
        cardLabel: "Consulta directa",
        cardNote: "Turnos, días y disponibilidad.",
        secondaryTitle: "Otros canales",
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
        note: "Sitio informativo. La venta de pasajes no está disponible en línea.",
      },
    },
  ],

  // La compra de pasajes requiere integraciones y no forma parte de esta versión.
  order: {
    enabled: false,
    units: [],
  },
};
