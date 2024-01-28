import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    currentTitle: "待办", // 默认值
  }),
  actions: {
    setCurrentTitle(title: string) {
      this.currentTitle = title;
    },
  },
});
