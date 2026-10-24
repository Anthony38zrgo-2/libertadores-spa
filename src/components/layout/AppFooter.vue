<script setup>
/**
 * AppFooter — marca, canales confirmados y enlaces internos.
 * Sin RUC ni políticas legales hasta que el operador los apruebe.
 */
import { computed } from "vue";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/composables/useContact";

defineProps({
  brand: { type: Object, required: true },
  legal: { type: String, default: "" },
  location: { type: String, default: "" },
  note: { type: String, default: "" },
});

const year = new Date().getFullYear();
const whatsappUrl = computed(() =>
  buildWhatsAppUrl(siteConfig.site.contact.whatsapp, siteConfig.site.contact.whatsappMessage),
);
const whatsappDisplay = siteConfig.site.contact.whatsappDisplay;
const facebookUrl = siteConfig.site.contact.facebookUrl;
</script>

<template>
  <footer class="site-footer">
    <div class="page-container footer-inner">
      <div class="footer-brand-block">
        <p class="footer-brand">{{ brand.name }}</p>
        <p v-if="brand.tagline" class="footer-tagline">{{ brand.tagline }}</p>
        <p v-if="note" class="footer-note">{{ note }}</p>
      </div>

      <nav class="footer-nav" aria-label="Enlaces del pie">
        <a
          v-if="whatsappUrl"
          class="footer-link"
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>WhatsApp</span>
          <small>{{ whatsappDisplay }}</small>
        </a>
        <a
          v-if="facebookUrl"
          class="footer-link"
          :href="facebookUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Facebook</span>
          <small>@{{ siteConfig.site.contact.facebookHandle }}</small>
        </a>
        <a class="footer-top" href="#preguntas">Preguntas frecuentes</a>
        <a class="footer-top" href="#contacto">Contacto</a>
      </nav>

      <div class="footer-meta">
        <p v-if="location">{{ location }}</p>
        <p>© {{ year }} {{ brand.name }}. {{ legal }}</p>
        <p><a class="footer-top" href="#top">Volver arriba</a></p>
      </div>
    </div>
  </footer>
</template>
