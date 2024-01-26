import { defineStore } from "pinia";
import type { SampleInput } from "@/types";

export const useItemStore = defineStore("item", {
  state: () => ({
    item: null as SampleInput | null,
  }),
  actions: {
    setItem(item: SampleInput) {
      this.item = item;
    },
    reset() {
      this.item = null;
    },
  },
});
