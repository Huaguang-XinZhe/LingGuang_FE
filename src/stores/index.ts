// store.js
import { defineStore } from "pinia";

export const useStore = defineStore("storeId", {
  state: () => {
    return {
      sharedData: "initial value",
    };
  },
  actions: {
    updateSharedData(newValue) {
      this.sharedData = newValue;
    },
  },
});
