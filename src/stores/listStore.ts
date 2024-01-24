import { defineStore } from "pinia";

interface ListItem {
  id: number;
  content: string;
}

export const useListStore = defineStore("list", {
  state: () => ({
    list: [
      {
        id: 1,
        content:
          "待办1的<br />sdfjdkfjd sfkd<br />jkfwo c监控疯狂反<br />倒发到付三分扫地k待办1的<br />sdfjdkfjd sfkd<br />jkfwo c监控疯狂反<br />倒发到付三分扫地k",
      },
      {
        id: 2,
        content: "待办2的内容",
      },
      {
        id: 3,
        content: "待办3的内容",
      },
      {
        id: 4,
        content: "待办4的内容",
      },
      {
        id: 5,
        content: "待办5的内容",
      },
      {
        id: 6,
        content: "待办6的内容",
      },
    ] as ListItem[],
  }),
  actions: {
    addToList(item: ListItem) {
      this.list.push(item);
    },
  },
});
