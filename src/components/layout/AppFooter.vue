<script setup>
/**
 * AppFooter — cierre breve con marca, ubicación y datos legales confirmados.
 */
defineProps({
  brand: { type: Object, required: true },
  legal: { type: String, default: "" },
  location: { type: String, default: "" },
});

const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="page-container footer-inner">
      <div>
        <p class="footer-brand">{{ brand.name }}</p>
        <p v-if="brand.tagline" class="footer-tagline">{{ brand.tagline }}</p>
      </div>
      <div class="footer-meta">
        <p v-if="location">{{ location }}</p>
        <p>© {{ year }} {{ brand.name }}. {{ legal }}</p>
        <p><a class="footer-top" href="#top">Volver arriba</a></p>
      </div>
    </div>
  </footer>
</template>
