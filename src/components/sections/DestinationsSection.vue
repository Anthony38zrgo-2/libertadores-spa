<script setup>
/**
 * Destinos — tarjeta de la ruta documentada y sus turnos informados.
 * No se publica una ruta sin estado verified ni se asume un sentido.
 */
import { computed } from "vue";
import { siteConfig } from "@/config/site.config";
import { buildWhatsAppUrl } from "@/composables/useContact";
import routes from "@/data/routes.json";
import schedules from "@/data/schedules.json";
import { findVerifiedRoute, getConfirmedSchedules, sortSchedules } from "@/data/routeHelpers";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import UiButton from "@/components/ui/UiButton.vue";

defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  ctaLabel: { type: String, default: "Consultar por WhatsApp" },
  routeKicker: { type: String, default: "Ruta documentada" },
  routeNote: { type: String, default: "" },
  scheduleLabel: { type: String, default: "Turnos informados" },
  scheduleNote: { type: String, default: "" },
  emptySchedulesMessage: { type: String, default: "" },
  emptyMessage: { type: String, default: "" },
  variant: { type: String, default: "grid" },
});

const route = computed(() => findVerifiedRoute(routes));
const scheduleItems = computed(() =>
  route.value ? sortSchedules(getConfirmedSchedules(schedules, route.value.id)) : [],
);
const whatsappHref = computed(() =>
  buildWhatsAppUrl(siteConfig.site.contact.whatsapp, siteConfig.site.contact.whatsappMessage),
);
</script>

<template>
  <section id="destinos" class="destinations-section section-space" aria-labelledby="destinations-title">
    <div class="page-container">
      <SectionHeader
        :eyebrow="eyebrow"
        :title="title"
        :description="description"
        heading-id="destinations-title"
      />

      <article v-if="route" class="destination-card">
        <div class="destination-summary">
          <p class="destination-kicker">{{ routeKicker }}</p>
          <h3 class="destination-route">
            <span>{{ route.origin }}</span>
            <SvgIcon name="route" :size="24" class="destination-route-icon" />
            <span>{{ route.destination }}</span>
          </h3>
          <p v-if="routeNote" class="destination-note">{{ routeNote }}</p>
        </div>

        <div class="destination-shifts">
          <p class="destination-shifts-label">{{ scheduleLabel }}</p>
          <div v-if="scheduleItems.length" class="shift-grid">
            <div v-for="schedule in scheduleItems" :key="schedule.id" class="shift-card">
              <span class="shift-label">{{ schedule.label }}</span>
              <time class="shift-time" :datetime="schedule.time">{{ schedule.displayTime }}</time>
            </div>
          </div>
          <p v-else-if="emptySchedulesMessage" class="destination-note">{{ emptySchedulesMessage }}</p>
          <p v-if="scheduleNote" class="destination-shifts-note">{{ scheduleNote }}</p>
          <UiButton
            v-if="whatsappHref"
            :label="ctaLabel"
            :href="whatsappHref"
            variant="primary"
            icon="chat"
            external
          />
        </div>
      </article>

      <p v-else-if="emptyMessage" class="section-empty">{{ emptyMessage }}</p>
    </div>
  </section>
</template>
