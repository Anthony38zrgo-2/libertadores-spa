/**
 * useContact — construye canales reales de consulta.
 * No inventa canales ni publica mapas genéricos: el mapa solo se expone cuando
 * la ubicación fue confirmada. WhatsApp es el primer canal.
 */

export function buildWhatsAppUrl(number, message = "") {
  const digits = String(number ?? "").replace(/\D/g, "");
  if (!/^\d{8,15}$/.test(digits)) return "";
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function buildMapSearchUrl(query) {
  const value = String(query || "").trim();
  if (!value) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
}

export function getContactChannels(config) {
  const contact = config?.site?.contact;
  if (!contact) return [];

  const channels = [];

  if (contact.whatsapp) {
    const href = buildWhatsAppUrl(contact.whatsapp, contact.whatsappMessage);
    if (href) {
      channels.push({
        id: "whatsapp",
        label: "WhatsApp",
        detail: contact.whatsappDisplay || contact.whatsapp,
        href,
        icon: "whatsapp",
        external: true,
      });
    }
  }

  if (contact.facebookUrl) {
    channels.push({
      id: "facebook",
      label: "Facebook",
      detail: contact.facebookHandle ? `@${contact.facebookHandle.replace(/^@/, "")}` : "Página de la empresa",
      href: contact.facebookUrl,
      icon: "arrow_forward",
      external: true,
    });
  }

  if (contact.mapConfirmed && contact.mapQuery) {
    const mapUrl = buildMapSearchUrl(contact.mapQuery);
    if (mapUrl) {
      channels.push({
        id: "location",
        label: "Ubicación",
        detail: contact.locality || "Ver en el mapa",
        href: mapUrl,
        icon: "location_on",
        external: true,
      });
    }
  }

  if (contact.phone) {
    const digits = contact.phone.replace(/\D/g, "");
    channels.push({
      id: "phone",
      label: "Teléfono",
      detail: contact.phoneDisplay || contact.phone,
      href: `tel:+${digits}`,
      icon: "call",
      external: false,
    });
  }

  if (contact.email) {
    channels.push({
      id: "email",
      label: "Correo",
      detail: contact.email,
      href: `mailto:${contact.email}`,
      icon: "mail",
      external: false,
    });
  }

  return channels;
}
