<script setup>
/**
 * SectionRenderer — mapea el id de configuración al componente de sección.
 */
import { computed } from "vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import ServicesSection from "@/components/sections/ServicesSection.vue";
import CompanySection from "@/components/sections/CompanySection.vue";

const props = defineProps({
  section: { type: Object, required: true },
});

const registry = {
  hero: HeroSection,
  services: ServicesSection,
  company: CompanySection,
};

const component = computed(() => registry[props.section.id] ?? null);
</script>

<template>
  <component :is="component" v-if="component" v-bind="section.props" :variant="section.variant" />
</template>
