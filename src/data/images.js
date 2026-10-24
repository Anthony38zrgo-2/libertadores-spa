/**
 * IMÁGENES PUBLICADAS — derivados WebP locales.
 * Los originales se conservan en images/; aquí solo entran los recortes
 * revisados que usa la página.
 */
import busCarretera from "@/assets/images/bus-carretera.webp";
import equipoAgencia from "@/assets/images/equipo-agencia.webp";
import logoLibertadores from "@/assets/images/logo-libertadores.webp";

export const SITE_IMAGES = Object.freeze({
  "bus-carretera": {
    src: busCarretera,
    width: 1200,
    height: 900,
    alt: "Bus interprovincial en una carretera de montaña del Perú.",
  },
  "equipo-agencia": {
    src: equipoAgencia,
    width: 1086,
    height: 1358,
    alt: "Equipo de atención de Transportes Libertadores en una agencia.",
  },
  "logo-libertadores": {
    src: logoLibertadores,
    width: 1200,
    height: 264,
    alt: "Transportes Libertadores",
  },
});

export function getSiteImage(key) {
  return SITE_IMAGES[key] ?? null;
}
