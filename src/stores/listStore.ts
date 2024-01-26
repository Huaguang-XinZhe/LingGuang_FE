import { defineStore } from "pinia";
import type { SampleInput } from "@/types";

export const useListStore = defineStore("list", {
  state: () => ({
    title: "",
    list: [] as SampleInput[],
    total: 0,
  }),
  actions: {
    setList(list: SampleInput[]) {
      this.list = list;
    },
    addItem(item: SampleInput) {
      this.list.push(item);
    },
    // 更新某个 item 的数据
    updateItem(itemObj: SampleInput, newContent: string) {
      // 找到需要更新的对象的位置（索引）
      const index = this.list.findIndex((item) => item.id === itemObj.id);
      // 根据索引替换数组中的元素（对象）
      this.list.splice(index, 1, {
        ...itemObj,
        content: newContent, // content 属性替换为新的内容
      });
    },
    setTitle(title: string) {
      this.title = title;
    },
  },
});
