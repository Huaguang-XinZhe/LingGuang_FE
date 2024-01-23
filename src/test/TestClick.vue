<script setup lang="ts">
interface Item {
  id: number;
  label: string;
}

function handleClick(e: MouseEvent) {
  // 虽然这里打印出来的 e 是 PointerEvent 类型，但是却不能这样声明，与 @click 要求的 payload: MouseEvent 不匹配；
  // 即使将 e 声明为 MouseEvent，打印出来的类型仍然是 PointerEvent，这可能表明 PointerEvent 是更为具体的类型；
  // console.log(e);

  // 获取作用的目标对象
  const target = e.target as HTMLLIElement;
  target.classList.add("clicked"); // 测试通过👌
}

const items: Item[] = [
  {
    id: 1,
    label: "Item 1",
  },
  {
    id: 2,
    label: "Item 2",
  },
  {
    id: 3,
    label: "Item 3",
  },
];
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id" @click="handleClick">
      {{ item.label }}
    </li>
  </ul>
</template>

<style scoped>
.clicked {
  background-color: red;
}
</style>
