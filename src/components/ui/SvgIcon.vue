<script setup>
/**
 * SvgIcon — icono Material Symbols inline, currentColor.
 * Decorativo por defecto; si no, recibe un nombre accesible en `title`.
 */
import { computed } from "vue";
import { getIcon } from "@/icons/registry";

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  title: { type: String, default: "" },
  decorative: { type: Boolean, default: true },
});

const icon = computed(() => getIcon(props.name));
const dimension = computed(() => (typeof props.size === "number" ? `${props.size}px` : props.size));
</script>

<template>
  <svg
    v-if="icon"
    :width="dimension"
    :height="dimension"
    :viewBox="icon.viewBox"
    fill="currentColor"
    focusable="false"
    :aria-hidden="decorative ? 'true' : undefined"
    :role="decorative ? undefined : 'img'"
    :aria-label="decorative ? undefined : title || name"
  >
    <title v-if="!decorative">{{ title || name }}</title>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <g v-html="icon.content" />
  </svg>
  <span v-else class="inline-block" :style="{ width: dimension, height: dimension }" aria-hidden="true" />
</template>
