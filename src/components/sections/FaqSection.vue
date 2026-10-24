<script setup>
/**
 * Preguntas frecuentes — respuestas informativas y condiciones pendientes.
 * No se afirma ninguna política que no esté confirmada por el operador.
 */
import faq from "@/data/faq.json";
import SectionHeader from "@/components/ui/SectionHeader.vue";

defineProps({
  eyebrow: { type: String, default: "" },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  variant: { type: String, default: "list" },
});
</script>

<template>
  <section id="preguntas" class="faq-section section-space" aria-labelledby="faq-title">
    <div class="page-container faq-layout">
      <SectionHeader
        :eyebrow="eyebrow"
        :title="title"
        :description="description"
        heading-id="faq-title"
      />

      <div class="faq-list">
        <details v-for="item in faq" :key="item.id" class="faq-item">
          <summary class="faq-question">
            <span>{{ item.question }}</span>
          </summary>
          <p class="faq-answer">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
