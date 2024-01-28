<script setup lang="ts">
import MainItem from "@/components/main/MainItem.vue";
import type { PagingQueryResponse, SampleInput } from "@/types";
import axios from "axios";
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useAppStore } from "@/stores/appStore";

const appStore = useAppStore();
// 这个值会缓存到浏览器本地，当获取不到时，会在下次请求中添加一个 boolean 值，让后端重新获取
// 所以这个值是始终和类属列表的长度保持一致的
// 全局状态（类属-total 键值对列表）
const currentTotalMap = new Map<string, number>();
// 我还得存储一个旧的 total 键值对列表，用于判断是否还有更多数据
const oldTotalMap = new Map<string, number>();

const inputs = reactive<SampleInput[]>([]);
const loading = ref(false);
const noMore = ref(false);
// 控制首次加载动画的变量
const firstLoad = ref(false);
const hasData = computed(() => inputs.length > 0);
// ref 里边的东西只是值，当 ref 里边的值发生变化时，不会触发 ref 本身的更新，所以要用 computed
// const catName = ref(appStore.currentTitle); // 它应该来源于全局状态
// 计算属性也要 `.value`，和 ref 一样！
const catName = computed(() => appStore.currentTitle);
let pageNum = 0;

onMounted(() => {
  console.log("mounted");
  setTimeout(() => {
    load();
  }, 500); // 首次默认加载的时候先缓一缓，否则网络太快的话会发生快闪
});

// 监视 categoryName 的变化，如果变化了，就重置相关状态
// 如果是 ref 变量，直接写就可以了，但如果是 string，就要写成 () => categoryName
watch(
  () => appStore.currentTitle,
  () => {
    console.log("categoryName 变化了");
    pageNum = 0;
    inputs.splice(0, inputs.length); // 清空数组
    // console.log("noMore", noMore.value);
    // 必须重置 noMore，以避免上次滚动结果的影响！
    noMore.value = false;
    load();
  },
);

// function changeCatName() {
//   appStore.setCurrentTitle("编程");
// }

const load = async () => {
  // 读取当前组件中 catName 的值
  const categoryName = catName.value;
  // 看一下两个 Map 中的数据
  // console.log(currentTotalMap);
  // console.log(oldTotalMap);
  // 让 noMore 能控制数据加载
  // if (noMore.value) return;
  // 如果 oldTotalMap 中没有这个类属，说明是第一次请求，就直接请求
  // console.log("categoryName", categoryName); // 为什么这里第二次请求的时候就是 undefined？
  // 因为没在模板中给 load 传参，所以获取不到，但问题是无限滚动指令绑定的函数又不能传参，所以只能去掉了！
  if (!oldTotalMap.has(categoryName)) {
    console.log("第一次请求");
    firstLoad.value = true;
    await loadInner(categoryName);
    firstLoad.value = false;
  } else if (
    oldTotalMap.get(categoryName)! < currentTotalMap.get(categoryName)!
  ) {
    // oldTotalMap 中有这个类属，说明不是第一次请求，就要判断是否还有更多数据
    console.log("还有更多数据");
    pageNum++; // 请求下一页
    await loadInner(categoryName, pageNum);
  } else {
    // 如果旧的 total 大于等于当前的 total，说明没有更多数据了，就不用请求了
    noMore.value = true;
  }
};

const loadInner = async (categoryName: string, pageNum: number = 0) => {
  try {
    // 即使拥有全局异常处理器，也最好 try-catch，否则会有未捕获的异常
    // 如果旧的 total 小于当前的 total，说明还有更多数据，就可以请求
    console.log("加载一下");
    loading.value = true;
    const result: PagingQueryResponse = await getResult(categoryName, pageNum);
    loading.value = false;
    // console.log(result.sampleInputs);
    const resultLength = result.sampleInputs.length;
    if (resultLength === 0) {
      // 此时传过来的 total 肯定也是 0，所以说，total 是 0 的话根本就不会设置
      noMore.value = true;
      return; // 如果没有数据，就不要再继续设置 oldTotal 并添加 input 了
    }
    // oldTotal 是在原来的基础上不断地累加，不能直接设置
    // 由于第一次已经设置过了，所以这里的获取一定不为 undefined，否则加起来会是 NaN
    // 这会输出 undefined，因为 JS 的 Map 不支持方括号语法（得用 get），支持的是对象！
    // console.log(oldTotalMap[categoryName]);
    // 在 JS 中，赋值操作的左侧必须是一个变量或属性访问，而不能是一个值，所以下面的代码会报错！
    // oldTotalMap.get(categoryName) += resultLength;
    const oldTotal = oldTotalMap.get(categoryName) || 0; // 获取当前值，如果没有则默认为 0
    oldTotalMap.set(categoryName, oldTotal + resultLength); // 更新 Map 中的值
    // 只有 total 传过来了，不为 undefined，才设置
    if (result.total) currentTotalMap.set(categoryName, result.total);
    // 看一下旧的 Map
    // todo：这里可能有点问题，怎么会比 154 还多呢？
    // console.log("oldTotalMap", oldTotalMap);
    // console.log("currentTotalMap", currentTotalMap);
    inputs.push(...result.sampleInputs);
  } catch (e) {
    // console.log("局部捕获异常", e);
  }
};

async function getResult(
  categoryName: string,
  pageNum: number = 0,
): Promise<PagingQueryResponse> {
  const response = await axios.get(
    `http://localhost:8080/inputs/${categoryName}?pageNum=${pageNum}`,
  );
  return response.data.data;
}
</script>

<template>
  <!--  再套一个 container 是为了让滚动条紧靠屏幕-->
  <div class="container" v-loading="firstLoad">
    <!--    <button @click="changeCatName">改变 categoryName 的值</button>-->
    <div class="inner-container" v-if="hasData">
      <h1 contenteditable>{{ catName }}</h1>
      <!-- 注意，千万不要把指令的位置放错了！这么愚蠢的问题都犯！！！ -->
      <div class="infinite-list-wrapper">
        <!--        注意，别把 distance 设置的太高，可能会出问题，不断地触发加载！！！-->
        <!--        Element 无限滚动组件的指令要求必须传入一个无参函数！！！-->
        <div v-infinite-scroll="load" :infinite-scroll-distance="100">
          <MainItem v-for="input in inputs" :key="input.id" :item="input" />
        </div>
        <p v-show="loading">Loading...😀</p>
        <p v-show="noMore">No more 😥</p>
      </div>
    </div>
    <el-empty description="暂无数据" v-else />
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.inner-container {
  flex-grow: 1;
  position: relative;
}
h1 {
  font-size: 28px;
  max-width: 800px;
  margin: 0 auto;
  padding: 10px 0 15px 80px;
  border-bottom: 0.1px solid #efebeb;
  position: sticky;
  top: 0; /*在距离顶端 0 像素的位置粘住*/
  background-color: white;
  z-index: 1000;
}
h1:focus {
  outline: none;
}
.infinite-list-wrapper {
  /*绑定脚本中变量值的写法，可变化*/
  /*min-width: calc(v-bind("wrapperWidth.minWidth") * 1px);
  max-width: calc(v-bind("wrapperWidth.maxWidth") * 1px);*/
  min-width: 600px;
  max-width: 800px;
  margin: 0 auto;
}
p {
  text-align: center;
  color: #ccc;
  font-weight: bold;
  margin: 20px 0;
}
.el-empty {
  flex-grow: 1;
}
</style>
