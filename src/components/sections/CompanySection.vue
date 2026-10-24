<script setup>
/**
 * Empresa y contacto — presentación breve, fotografía del equipo y canales
 * reales en el mismo bloque. No hay formulario ni confirmación simulada.
 */
import { computed } from "vue";
import { siteConfig } from "@/config/site.config";
import { getContactChannels } from "@/composables/useContact";
import MediaVisual from "@/components/ui/MediaVisual.vue";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

const props = defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  contactTitle: { type: String, default: "Atención y contacto" },
  contactNote: { type: String, default: "" },
  visual: { type: Object, default: null },
  variant: { type: String, default: "split" },
});

const channels = getContactChannels(siteConfig);
const locality = siteConfig.site.contact.locality;
const gridClass = computed(() => (props.variant === "split-reverse" ? "split-reverse" : ""));
</script>

<template>
  <section id="contacto" class="company-section section-space" aria-labelledby="company-title">
    <div class="page-container company-grid" :class="gridClass">
      <div class="company-copy">
        <SectionHeader
          :eyebrow="eyebrow"
          :title="title"
          :description="description"
          heading-id="company-title"
        />

        <div class="contact-block">
          <h3 class="contact-title">{{ contactTitle }}</h3>
          <p class="contact-locality">{{ locality }}</p>
          <p v-if="contactNote" class="contact-note">{{ contactNote }}</p>

          <div v-if="channels.length" class="channel-list">
            <a
              v-for="channel in channels"
              :key="channel.id"
              class="channel"
              :href="channel.href"
              :target="channel.external ? '_blank' : undefined"
              :rel="channel.external ? 'noopener noreferrer' : undefined"
            >
              <span class="channel-icon" aria-hidden="true">
                <SvgIcon :name="channel.icon" :size="20" />
              </span>
              <span class="channel-text">
                <span class="channel-label">{{ channel.label }}</span>
                <span class="channel-detail">{{ channel.detail }}</span>
              </span>
              <span v-if="channel.external" class="visually-hidden"> (se abre en una pestaña nueva)</span>
            </a>
          </div>
        </div>
      </div>

      <MediaVisual v-if="visual" :visual="visual" :label="title" class="company-media" />
    </div>
  </section>
</template>
