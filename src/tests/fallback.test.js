import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

vi.mock("@/data/routes.json", () => ({
  default: [
    {
      id: "ruta-pendiente",
      origin: "Ciudad A",
      destination: "Ciudad B",
      editorial: { state: "pending" },
    },
  ],
}));

import DestinationsSection from "@/components/sections/DestinationsSection.vue";

describe("fallback de rutas", () => {
  it("no publica una ruta pendiente ni datos de fallback", () => {
    const wrapper = mount(DestinationsSection, {
      props: {
        title: "Destinos",
        emptyMessage: "Ruta en revisión editorial.",
      },
    });
    const html = wrapper.html();
    expect(html).not.toContain("Ciudad A");
    expect(html).not.toContain("Ciudad B");
    expect(html).not.toContain("ruta-pendiente");
    expect(html).toContain("Ruta en revisión editorial.");
    expect(wrapper.find(".destination-card").exists()).toBe(false);
  });
});
