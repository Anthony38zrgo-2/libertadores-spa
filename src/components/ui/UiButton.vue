<script setup>
/**
 * UiButton — enlace o botón unificado, sin comportamiento simulado.
 * variant: primary | secondary | light | ghost
 * Las URLs http(s) se abren en pestaña nueva con rel seguro.
 */
import { computed } from "vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

const props = defineProps({
  label: { type: String, required: true },
  href: { type: String, default: "" },
  variant: { type: String, default: "primary" },
  icon: { type: String, default: "" },
  external: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const isLink = computed(() => Boolean(props.href) && !props.disabled);
const isExternal = computed(() => props.external || /^https?:\/\//i.test(props.href));
const classes = computed(() => {
  const variants = {
    primary: "button-primary",
    secondary: "button-secondary",
    light: "button-light",
    ghost: "button-ghost",
  };
  return ["button", variants[props.variant] || variants.primary].join(" ");
});
</script>

<template>
  <a
    v-if="isLink"
    :href="href"
    :class="classes"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <span>{{ label }}</span>
    <SvgIcon v-if="icon" :name="icon" :size="18" />
    <span v-if="isExternal" class="visually-hidden"> (se abre en una pestaña nueva)</span>
  </a>
  <button v-else :class="classes" :disabled="disabled" type="button">
    <span>{{ label }}</span>
    <SvgIcon v-if="icon" :name="icon" :size="18" />
  </button>
</template>
