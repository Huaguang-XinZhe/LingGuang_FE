import { defineStore } from "pinia";

export const useDialogStore = defineStore("dialog", {
  state: () => ({
    isDialogVisible: false,
  }),
  actions: {
    showDialog() {
      this.isDialogVisible = true;
    },
    hideDialog() {
      this.isDialogVisible = false;
    },
  },
});
