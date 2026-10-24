<script setup>
/**
 * Nosotros — presentación breve y fotografía del equipo.
 * Sin historia, valores ni cifras no aprobadas.
 */
import { computed } from "vue";
import MediaVisual from "@/components/ui/MediaVisual.vue";
import SectionHeader from "@/components/ui/SectionHeader.vue";

const props = defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  visual: { type: Object, default: null },
  variant: { type: String, default: "split" },
});

const gridClass = computed(() => (props.variant === "split-reverse" ? "split-reverse" : ""));
</script>

<template>
  <section id="nosotros" class="company-section section-space" aria-labelledby="company-title">
    <div class="page-container company-grid" :class="gridClass">
      <div class="company-copy">
        <SectionHeader
          :eyebrow="eyebrow"
          :title="title"
          :description="description"
          heading-id="company-title"
        />
      </div>

      <MediaVisual v-if="visual" :visual="visual" :label="title" class="company-media" />
    </div>
  </section>
</template>
