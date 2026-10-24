/**
 * useContact — construye canales reales de consulta.
 * No inventa canales: si teléfono, correo o WhatsApp están vacíos, no se
 * renderizan. Facebook y el enlace de ubicación se publican como referencias.
 */

export function buildMapSearchUrl(query) {
  const value = String(query || "").trim();
  if (!value) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
}

export function getContactChannels(config) {
  const contact = config?.site?.contact;
  if (!contact) return [];

  const channels = [];

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
