<script setup>
/**
 * Contacto — WhatsApp primero, luego canales secundarios.
 * La ubicación se muestra como referencia de distrito, sin enlace de mapa.
 */
import { computed } from "vue";
import { siteConfig } from "@/config/site.config";
import { getContactChannels } from "@/composables/useContact";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  note: { type: String, default: "" },
  localityNote: { type: String, default: "" },
  cardLabel: { type: String, default: "Consulta directa" },
  cardNote: { type: String, default: "" },
  secondaryTitle: { type: String, default: "Otros canales" },
  variant: { type: String, default: "split" },
});

const channels = getContactChannels(siteConfig);
const whatsapp = computed(() => channels.find((channel) => channel.id === "whatsapp") ?? null);
const secondaryChannels = computed(() => channels.filter((channel) => channel.id !== "whatsapp"));
const locality = siteConfig.site.contact.locality;
</script>

<template>
  <section id="contacto" class="contact-section section-space" aria-labelledby="contact-title">
    <div class="page-container contact-grid">
      <div class="contact-copy">
        <SectionHeader
          :eyebrow="eyebrow"
          :title="title"
          :description="description"
          heading-id="contact-title"
        />
        <p v-if="note" class="contact-note">{{ note }}</p>

        <div class="contact-locality-block">
          <p class="contact-locality-label">Ubicación de referencia</p>
          <p class="contact-locality">{{ locality }}</p>
          <p v-if="localityNote" class="contact-locality-note">{{ localityNote }}</p>
        </div>
      </div>

      <div class="contact-card">
        <p class="contact-card-label">{{ cardLabel }}</p>

        <a
          v-if="whatsapp"
          class="contact-whatsapp"
          :href="whatsapp.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="contact-whatsapp-name">{{ whatsapp.label }}</span>
          <span class="contact-whatsapp-number">{{ whatsapp.detail }}</span>
          <SvgIcon name="chat" :size="24" />
          <span class="visually-hidden"> (se abre en una pestaña nueva)</span>
        </a>

        <p v-if="cardNote" class="contact-card-note">{{ cardNote }}</p>

        <div v-if="secondaryChannels.length" class="contact-secondary">
          <p class="contact-secondary-label">{{ secondaryTitle }}</p>
          <a
            v-for="channel in secondaryChannels"
            :key="channel.id"
            class="contact-secondary-link"
            :href="channel.href"
            :target="channel.external ? '_blank' : undefined"
            :rel="channel.external ? 'noopener noreferrer' : undefined"
          >
            <span>{{ channel.label }}</span>
            <SvgIcon :name="channel.icon" :size="18" />
            <span v-if="channel.external" class="visually-hidden"> (se abre en una pestaña nueva)</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
