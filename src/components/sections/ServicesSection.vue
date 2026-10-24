<script setup>
/**
 * Rutas y servicios — un solo bloque compacto: ruta autorizada y hasta tres
 * prestaciones verificadas. Los datos pendientes o históricos no se publican.
 */
import { computed } from "vue";
import routes from "@/data/routes.json";
import services from "@/data/services.json";
import SectionHeader from "@/components/ui/SectionHeader.vue";
import SvgIcon from "@/components/ui/SvgIcon.vue";

defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  variant: { type: String, default: "compact" },
});

const route = computed(() => routes.find((item) => item.editorial?.state === "verified") ?? routes[0] ?? null);
const visibleServices = computed(() => services.filter((item) => item.status === "verified").slice(0, 3));
const authorizationYears = computed(() => {
  if (!route.value?.authorizations?.length) return "";
  return [...new Set(route.value.authorizations.map((item) => item.date.slice(0, 4)))].join(" y ");
});
</script>

<template>
  <section id="servicios" class="services-section section-space" aria-labelledby="services-title">
    <div class="page-container">
      <SectionHeader
        :eyebrow="eyebrow"
        :title="title"
        :description="description"
        heading-id="services-title"
      />

      <div v-if="route" class="route-panel">
        <div class="route-points">
          <div class="route-node">
            <p class="route-node-label">Origen</p>
            <p class="route-node-name">{{ route.origin }}</p>
          </div>
          <span class="route-icon" aria-hidden="true">
            <SvgIcon name="route" :size="28" />
          </span>
          <div class="route-node">
            <p class="route-node-label">Destino</p>
            <p class="route-node-name">{{ route.destination }}</p>
          </div>
        </div>
        <p class="route-meta">
          <span><strong>Ruta autorizada</strong> por el MTC</span>
          <span v-if="authorizationYears">Autorizaciones {{ authorizationYears }}</span>
          <span>{{ route.serviceType }}</span>
        </p>
      </div>

      <ol v-if="visibleServices.length" class="service-list">
        <li v-for="(service, index) in visibleServices" :key="service.id" class="service-item">
          <span class="service-index">{{ String(index + 1).padStart(2, "0") }}</span>
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-copy">{{ service.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
