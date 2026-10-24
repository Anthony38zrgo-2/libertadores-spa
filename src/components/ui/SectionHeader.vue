<script setup>
/**
 * SectionHeader — encabezado reutilizable con jerarquía h2.
 */
defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  headingId: { type: String, default: "" },
  align: { type: String, default: "left" },
});
</script>

<template>
  <div class="section-heading" :class="{ 'is-center': align === 'center' }">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h2 :id="headingId" class="section-title">{{ title }}</h2>
    <p v-if="description" class="section-intro">{{ description }}</p>
  </div>
</template>
