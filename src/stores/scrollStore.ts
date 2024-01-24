/** @format */

import { defineStore } from "pinia";
import type { ScrollIns } from "@/types";

export const useScrollStore = defineStore("scroll", {
  state: () => ({
    scrollIns: undefined as ScrollIns,
  }),
  actions: {
    setScrollIns(scrollIns: ScrollIns) {
      this.scrollIns = scrollIns;
    },
    scrollToBottom() {
      // console.log("scrollToBottom", this.scrollIns);
      if (this.scrollIns) {
        this.scrollIns.setScrollTop(100000);
      }
    },
  },
});
