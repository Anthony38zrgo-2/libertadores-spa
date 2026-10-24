<script setup>
/**
 * Servicios — solo prestaciones verificadas y visibles. Sin códigos técnicos
 * ni autorizaciones en la interfaz comercial.
 */
import { computed } from "vue";
import services from "@/data/services.json";
import SectionHeader from "@/components/ui/SectionHeader.vue";

defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  note: { type: String, default: "" },
  variant: { type: String, default: "compact" },
});

const visibleServices = computed(() =>
  services.filter((service) => service.status === "verified" && service.visible !== false),
);
</script>

<template>
  <section id="servicios" class="services-section section-space" aria-labelledby="services-title">
    <div class="page-container services-layout">
      <div class="services-intro">
        <SectionHeader
          :eyebrow="eyebrow"
          :title="title"
          :description="description"
          heading-id="services-title"
        />
        <p v-if="note" class="services-note">{{ note }}</p>
      </div>

      <ol v-if="visibleServices.length" class="service-feature-list">
        <li v-for="(service, index) in visibleServices" :key="service.id" class="service-feature">
          <span class="service-feature-index">{{ String(index + 1).padStart(2, "0") }}</span>
          <div>
            <h3 class="service-feature-title">{{ service.title }}</h3>
            <p class="service-feature-copy">{{ service.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
