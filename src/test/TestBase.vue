<template>
  <div class="container">
    <h1>基础测试</h1>
    <button @click="modifyArr">修改 Arr3 的数据</button>
    <!--    <div class="div-pre">-->
    <!--      {{ reactiveArr3 }}-->
    <!--    </div>-->
    <pre>
<!--      这里转不转都是一样的，Vue 的插值语法默认会转-->
<!--      这里虽然写的是响应式对象，但在插值中，它就是普通对象，Vue 底层会处理这一点-->
      {{ reactiveArr3 }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRaw } from "vue";

let reactiveObj = ref({ name: "Vue3" });

let normalObj = toRaw(reactiveObj.value);

let reactiveArr = ref([1, 2, 3]);

let normalArr = toRaw(reactiveArr.value);

let reactiveArr2 = reactive(["a", "b", "c"]);
let normalArr2 = toRaw(reactiveArr2);

// 响应式数组（里边是对象）
// 尽管加了 reactive，外边是 Proxy，但里边的对象并不是 Proxy
let reactiveArr3 = reactive([
  { id: 1, label: "a" },
  { id: 2, label: "b" },
  { id: 3, label: "c" },
]);
let normalArr3 = toRaw(reactiveArr3);

function modifyArr() {
  // 直接修改数组中某个对象的某个属性，就能触发视图更新，但数组里边的 obj 是不需要带上 Proxy 的
  reactiveArr3[0].label = "A";
  console.log(reactiveArr3); // 打印的是已经修改后的响应式数据
}

onMounted(() => {
  // console.log("@", list);
  // console.log(reactiveObj);
  // console.log(reactiveObj.value);
  // console.log(normalObj); // 输出：{ name: 'Vue3' }
  // console.log(reactiveArr);
  // console.log(reactiveArr.value);
  // console.log(normalArr); // 输出：[1, 2, 3]
  // console.log(reactiveArr2);
  // console.log(normalArr2);

  // console.log(reactiveArr3);
  console.log(normalArr3);

  // 把 reactive 的数组展开
  // 这里的展开符真要不得，会让里边的每个对象都变成 Proxy 的
  // console.log(...reactiveArr3);
  // 这里展开后就是普通对象了
  console.log(...normalArr3);
});
</script>

<style scoped>
.container {
  background-color: skyblue;
}
.div-pre {
  white-space: pre; /* 或者使用 "pre-wrap" 如果你也想保持长行的换行 */
  /*  font-family: monospace;*/ /* 如果你想保持字体的等宽 */
}
</style>
