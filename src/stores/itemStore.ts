import { defineStore } from "pinia";
import type { ListItem } from "@/types";

export const useItemStore = defineStore("item", {
  state: () => ({
    item: null as ListItem | null,
  }),
  actions: {
    setItem(item: ListItem) {
      this.item = item;
    },
    reset() {
      this.item = null;
    },
  },
});
