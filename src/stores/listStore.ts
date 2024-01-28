/** @format */

import { defineStore } from "pinia";
import type { CatCount, SampleInput } from "@/types";

export const useListStore = defineStore("list", {
  state: () => ({
    countList: [] as CatCount[],
    inputList: [] as SampleInput[],
  }),
  actions: {
    addItem(item: SampleInput) {
      this.inputList.push(item);
    },
    // 更新某个 item 的数据
    updateItem(itemObj: SampleInput, newContent: string) {
      // 找到需要更新的对象的位置（索引）
      const index = this.inputList.findIndex((item) => item.id === itemObj.id);
      // 根据索引替换数组中的元素（对象）
      this.inputList.splice(index, 1, {
        ...itemObj,
        content: newContent, // content 属性替换为新的内容
      });
    },
    // 往 countList 中添加数据
    addCount(item: CatCount) {
      // console.log(this.countList);
      // 已经有了的话，就不添加了
      const hasName = this.countList.some(
        (catCount) => catCount.name === item.name,
      );
      if (hasName) return;
      this.countList.push(item);
    },
    // 从 countList 中获取某个分类的数量
    getCountByName(name: string) {
      const item = this.countList.find((catCount) => catCount.name === name);
      return item?.total || undefined;
    },
  },
});
