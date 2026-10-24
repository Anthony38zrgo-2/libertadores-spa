<script setup>
/**
 * Portada — fotografía del bus como fondo, texto blanco y consulta directa.
 * No simula búsqueda ni disponibilidad.
 */
import { computed } from "vue";
import { siteConfig } from "@/config/site.config";
import { isConfiguredLinkAvailable } from "@/config/sections";
import { buildWhatsAppUrl } from "@/composables/useContact";
import { getSiteImage } from "@/data/images";
import routes from "@/data/routes.json";
import schedules from "@/data/schedules.json";
import { findVerifiedRoute, getConfirmedSchedules, sortSchedules } from "@/data/routeHelpers";
import UiButton from "@/components/ui/UiButton.vue";

const props = defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  scheduleLabel: { type: String, default: "Turnos informados" },
  scheduleNote: { type: String, default: "" },
  actions: { type: Array, default: () => [] },
  visual: { type: Object, default: null },
  variant: { type: String, default: "split" },
});

const image = computed(() =>
  props.visual?.type === "image" ? getSiteImage(props.visual.key) : null,
);
const imageAlt = computed(() => props.visual?.alt || image.value?.alt || props.title);
const whatsappHref = computed(() =>
  buildWhatsAppUrl(siteConfig.site.contact.whatsapp, siteConfig.site.contact.whatsappMessage),
);
const route = findVerifiedRoute(routes);
const scheduleItems = computed(() =>
  route ? sortSchedules(getConfirmedSchedules(schedules, route.id)) : [],
);

function resolveAction(action) {
  if (action.type === "whatsapp") {
    if (!whatsappHref.value) return null;
    return { ...action, href: whatsappHref.value, external: true };
  }
  if (!isConfiguredLinkAvailable(action.href, siteConfig)) return null;
  return { ...action, external: /^https?:\/\//i.test(action.href || "") };
}

const visibleActions = computed(() => (props.actions || []).map(resolveAction).filter(Boolean));
</script>

<template>
  <section
    id="top"
    class="hero-section"
    :class="[variant === 'centered' ? 'hero-centered' : '', image ? 'hero-has-image' : 'hero-no-image']"
    aria-labelledby="hero-title"
  >
    <template v-if="image">
      <img
        class="hero-background"
        :src="image.src"
        :alt="imageAlt"
        :width="image.width"
        :height="image.height"
        loading="eager"
        fetchpriority="high"
        decoding="async"
      >
      <span class="hero-scrim" aria-hidden="true" />
    </template>

    <div class="page-container hero-inner">
      <div class="hero-copy">
        <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
        <h1 id="hero-title" class="display-title">{{ title }}</h1>
        <p v-if="description" class="lead">{{ description }}</p>

        <div v-if="scheduleItems.length" class="hero-schedule">
          <p class="hero-schedule-label">{{ scheduleLabel }}</p>
          <div class="hero-schedule-times">
            <time
              v-for="schedule in scheduleItems"
              :key="schedule.id"
              class="hero-schedule-time"
              :datetime="schedule.time"
            >
              {{ schedule.displayTime }}
            </time>
          </div>
          <p v-if="scheduleNote" class="hero-schedule-note">{{ scheduleNote }}</p>
        </div>

        <div v-if="visibleActions.length" class="button-row">
          <UiButton
            v-for="action in visibleActions"
            :key="action.label"
            :label="action.label"
            :href="action.href"
            :variant="action.variant || 'primary'"
            :icon="action.icon || ''"
            :external="action.external"
          />
        </div>
      </div>
    </div>
  </section>
</template>
