<script setup>
import { computed } from "vue";
import { siteConfig } from "@/config/site.config";
import { validateConfig } from "@/config/validate";
import { getNavigationItems, getOrderedSections, isSectionEnabled } from "@/config/sections";
import { useTheme } from "@/composables/useTheme";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import SectionRenderer from "@/components/sections/SectionRenderer.vue";

const errors = validateConfig(siteConfig);
if (errors.length) {
  console.warn("Configuración inválida:\n - " + errors.join("\n - "));
}

useTheme(siteConfig);

const contentSections = computed(() =>
  getOrderedSections(siteConfig).filter((section) => !["header", "footer"].includes(section.id)),
);

const navigation = computed(() => getNavigationItems(siteConfig));

const headerSection = computed(() => siteConfig.sections.find((section) => section.id === "header"));
const footerSection = computed(() => siteConfig.sections.find((section) => section.id === "footer"));

const headerAction = computed(() => headerSection.value?.props?.action ?? null);
const footerLegal = computed(() => footerSection.value?.props?.legal ?? "");
const footerLocation = computed(() => footerSection.value?.props?.location ?? "");
const footerNote = computed(() => footerSection.value?.props?.note ?? "");

const showHeader = computed(() => isSectionEnabled("header", siteConfig));
const showFooter = computed(() => isSectionEnabled("footer", siteConfig));
</script>

<template>
  <div class="page-shell">
    <a class="skip-link" href="#contenido">Saltar al contenido</a>

    <AppHeader
      v-if="showHeader"
      :brand="siteConfig.site.brand"
      :navigation="navigation"
      :action="headerAction"
    />

    <main id="contenido" tabindex="-1">
      <SectionRenderer v-for="section in contentSections" :key="section.id" :section="section" />
    </main>

    <AppFooter
      v-if="showFooter"
      :brand="siteConfig.site.brand"
      :legal="footerLegal"
      :location="footerLocation"
      :note="footerNote"
    />
  </div>
</template>
