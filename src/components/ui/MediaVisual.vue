<script setup>
/**
 * MediaVisual — imagen WebP local con dimensiones y carga diferida.
 * No usa ilustraciones de ejemplo: si la clave no existe, deja un bloque
 * neutro para no publicar un placeholder visible.
 */
import { computed } from "vue";
import { getSiteImage } from "@/data/images";

const props = defineProps({
  visual: { type: Object, required: true },
  label: { type: String, default: "" },
  priority: { type: Boolean, default: false },
});

const image = computed(() => (props.visual?.type === "image" ? getSiteImage(props.visual.key) : null));
const alt = computed(() => props.visual?.alt || image.value?.alt || props.label);
const aspect = computed(() => props.visual?.aspect || "4 / 3");
</script>

<template>
  <div class="media-visual" :style="{ aspectRatio: aspect }">
    <img
      v-if="image"
      :src="image.src"
      :alt="alt"
      :width="image.width"
      :height="image.height"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : undefined"
      decoding="async"
    >
  </div>
</template>
