<script setup>
/**
 * SectionRenderer — mapea el id de configuración al componente de sección.
 */
import { computed } from "vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import DestinationsSection from "@/components/sections/DestinationsSection.vue";
import ServicesSection from "@/components/sections/ServicesSection.vue";
import AgenciesSection from "@/components/sections/AgenciesSection.vue";
import CompanySection from "@/components/sections/CompanySection.vue";
import FaqSection from "@/components/sections/FaqSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";

const props = defineProps({
  section: { type: Object, required: true },
});

const registry = {
  hero: HeroSection,
  destinations: DestinationsSection,
  services: ServicesSection,
  agencies: AgenciesSection,
  company: CompanySection,
  faq: FaqSection,
  contact: ContactSection,
};

const component = computed(() => registry[props.section.id] ?? null);
</script>

<template>
  <component :is="component" v-if="component" v-bind="section.props" :variant="section.variant" />
</template>
