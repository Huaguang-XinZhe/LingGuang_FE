import { defineStore } from "pinia";
import { unclassified } from "@/globals";

export const useAppStore = defineStore("app", {
  state: () => ({
    currentTitle: unclassified, // 默认值
  }),
  actions: {
    setCurrentTitle(title: string) {
      this.currentTitle = title;
    },
  },
});
