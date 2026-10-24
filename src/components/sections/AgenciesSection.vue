<script setup>
/**
 * Agencias — solo se publican registros con atención confirmada.
 * Si no hay ninguno, se informa sin exponer direcciones pendientes.
 */
import { computed } from "vue";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/composables/useContact";
import agencies from "@/data/agencies.json";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import UiButton from "@/components/ui/UiButton.vue";

defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  emptyTitle: { type: String, default: "Agencias en confirmación" },
  emptyMessage: { type: String, default: "" },
  emptyNote: { type: String, default: "" },
  ctaLabel: { type: String, default: "Consultar por WhatsApp" },
  variant: { type: String, default: "list" },
});

const confirmedAgencies = computed(() =>
  agencies.filter((agency) => agency.editorial?.state === "confirmed"),
);
const whatsappHref = computed(() =>
  buildWhatsAppUrl(siteConfig.site.contact.whatsapp, siteConfig.site.contact.whatsappMessage),
);
</script>

<template>
  <section id="agencias" class="agencies-section section-space" aria-labelledby="agencies-title">
    <div class="page-container">
      <SectionHeader
        :eyebrow="eyebrow"
        :title="title"
        :description="description"
        heading-id="agencies-title"
      />

      <div v-if="confirmedAgencies.length" class="agency-list">
        <article v-for="agency in confirmedAgencies" :key="agency.id" class="agency-card">
          <h3>{{ agency.name }}</h3>
          <p class="agency-place">{{ agency.city }} · {{ agency.district }}</p>
          <p v-if="agency.addresses?.[0]" class="agency-detail">{{ agency.addresses[0] }}</p>
          <p v-if="agency.schedule" class="agency-detail">Horario: {{ agency.schedule }}</p>
          <a v-if="agency.phone" class="agency-link" :href="`tel:${agency.phone.replace(/\D/g, '')}`">
            {{ agency.phone }}
          </a>
          <a
            v-if="agency.mapUrl"
            class="agency-link"
            :href="agency.mapUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver mapa
          </a>
        </article>
      </div>

      <div v-else class="agencies-empty">
        <p class="agencies-empty-label">{{ emptyTitle }}</p>
        <p class="agencies-empty-message">{{ emptyMessage }}</p>
        <p v-if="emptyNote" class="agencies-empty-note">{{ emptyNote }}</p>
        <UiButton
          v-if="whatsappHref"
          :label="ctaLabel"
          :href="whatsappHref"
          variant="primary"
          icon="chat"
          external
        />
      </div>
    </div>
  </section>
</template>
