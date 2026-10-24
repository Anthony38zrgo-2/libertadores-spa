<script setup>
/**
 * Portada — una fotografía, título breve, una frase y CTA de consulta.
 * Las acciones se filtran para no enlazar a secciones deshabilitadas.
 */
import { computed } from "vue";
import { siteConfig } from "@/config/site.config";
import { isConfiguredLinkAvailable } from "@/config/sections";
import MediaVisual from "@/components/ui/MediaVisual.vue";
import UiButton from "@/components/ui/UiButton.vue";

const props = defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  actions: { type: Array, default: () => [] },
  visual: { type: Object, default: null },
  variant: { type: String, default: "split" },
});

const visibleActions = computed(() =>
  (props.actions || []).filter((action) => isConfiguredLinkAvailable(action.href, siteConfig)),
);
</script>

<template>
  <section id="top" class="hero-section" :class="`hero-${variant}`" aria-labelledby="hero-title">
    <div class="page-container" :class="variant === 'split' ? 'hero-grid' : 'hero-centered'">
      <div class="hero-copy">
        <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
        <h1 id="hero-title" class="display-title">{{ title }}</h1>
        <p v-if="description" class="lead">{{ description }}</p>
        <div v-if="visibleActions.length" class="button-row">
          <UiButton
            v-for="action in visibleActions"
            :key="action.label"
            :label="action.label"
            :href="action.href"
            :variant="action.variant || 'primary'"
            :icon="action.icon || ''"
          />
        </div>
      </div>

      <MediaVisual v-if="visual" :visual="visual" :label="title" class="hero-media" priority />
    </div>
  </section>
</template>
