<script setup>
/**
 * AppHeader — marca, navegación de anclas, CTA de WhatsApp y menú móvil.
 * El logotipo va sobre una placa blanca para conservar su legibilidad.
 */
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { siteConfig } from "@/config/site.config";
import { getFirstContentHref, isConfiguredLinkAvailable } from "@/config/sections";
import { buildWhatsAppUrl } from "@/composables/useContact";
import { getSiteImage } from "@/data/images";
import SvgIcon from "@/components/ui/SvgIcon.vue";
import UiButton from "@/components/ui/UiButton.vue";

const props = defineProps({
  brand: { type: Object, required: true },
  navigation: { type: Array, default: () => [] },
  action: { type: Object, default: null },
});

const logo = getSiteImage("logo-libertadores");
const homeHref = computed(() => getFirstContentHref(siteConfig));
const whatsappHref = computed(() =>
  buildWhatsAppUrl(siteConfig.site.contact.whatsapp, siteConfig.site.contact.whatsappMessage),
);

function resolveAction(action) {
  if (!action) return null;
  if (action.type === "whatsapp") {
    if (!whatsappHref.value) return null;
    return { ...action, href: whatsappHref.value, external: true };
  }
  if (!isConfiguredLinkAvailable(action.href, siteConfig)) return null;
  return { ...action, external: /^https?:\/\//i.test(action.href || "") };
}

const visibleAction = computed(() => resolveAction(props.action));

const menuOpen = ref(false);
let desktopQuery = null;

function closeMenu() {
  menuOpen.value = false;
}

function handleKeydown(event) {
  if (event.key === "Escape") closeMenu();
}

function handleDesktopChange(event) {
  if (event.matches) closeMenu();
}

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  if (typeof window.matchMedia === "function") {
    desktopQuery = window.matchMedia("(min-width: 1024px)");
    desktopQuery.addEventListener("change", handleDesktopChange);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
  desktopQuery?.removeEventListener("change", handleDesktopChange);
});
</script>

<template>
  <header class="site-header">
    <div class="page-container header-inner">
      <a class="header-brand" :href="homeHref" :aria-label="`Ir al inicio de ${brand.name}`">
        <img
          v-if="logo"
          class="header-logo"
          :src="logo.src"
          :alt="logo.alt"
          :width="logo.width"
          :height="logo.height"
        >
      </a>

      <nav class="header-nav" aria-label="Navegación principal">
        <a v-for="item in navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>

      <div class="header-actions">
        <UiButton
          v-if="visibleAction"
          class="header-cta"
          :label="visibleAction.label"
          :href="visibleAction.href"
          :variant="visibleAction.variant || 'primary'"
          :icon="visibleAction.icon || ''"
          :external="visibleAction.external"
        />
        <button
          type="button"
          class="menu-toggle"
          :aria-expanded="menuOpen"
          :aria-controls="menuOpen ? 'mobile-navigation' : undefined"
          :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
          @click="menuOpen = !menuOpen"
        >
          <SvgIcon :name="menuOpen ? 'close' : 'menu'" :size="22" />
        </button>
      </div>
    </div>

    <div v-if="menuOpen" id="mobile-navigation" class="mobile-nav">
      <nav class="page-container" aria-label="Navegación móvil">
        <a
          v-for="item in navigation"
          :key="item.href"
          class="mobile-nav-link"
          :href="item.href"
          @click="closeMenu"
        >
          <span>{{ item.label }}</span>
          <SvgIcon name="arrow_forward" :size="18" />
        </a>
        <UiButton
          v-if="visibleAction"
          :label="visibleAction.label"
          :href="visibleAction.href"
          :variant="visibleAction.variant || 'primary'"
          :icon="visibleAction.icon || ''"
          :external="visibleAction.external"
          @click="closeMenu"
        />
      </nav>
    </div>
  </header>
</template>
