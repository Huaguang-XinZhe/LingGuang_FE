<template>
  <button @click="load">加载一下</button>
  <!--
  :infinite-scroll-delay="1000" // 延迟 1s 加载，会有种卡顿的感觉
  :infinite-scroll-immediate="false" // 默认为 true，表示一上来就加载，false 表示不加载
-->
  <!--  原来是 el-scrollbar 搞的鬼，如果将 ul 切换为它，就会不断的加载，不断的加载！！！-->
  <!--  <el-scrollbar-->
  <!--    v-infinite-scroll="load"-->
  <!--    class="infinite-list"-->
  <!--    style="overflow: auto"-->
  <!--    :infinite-scroll-distance="100"-->
  <!--  >-->
  <!--    &lt;!&ndash;    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>&ndash;&gt;-->
  <!--    <div-->
  <!--      v-for="comment in comments"-->
  <!--      :key="comment.id"-->
  <!--      class="infinite-list-item"-->
  <!--    >-->
  <!--      {{ comment.id }}-{{ comment.email }}-->
  <!--    </div>-->
  <!--  </el-scrollbar>-->
  <ul
    v-infinite-scroll="load"
    class="infinite-list"
    style="overflow: auto"
    :infinite-scroll-distance="100"
  >
    <!--    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>-->
    <li
      v-for="comment in comments"
      :key="comment.id"
      class="infinite-list-item"
    >
      {{ comment.id }}-{{ comment.email }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
// const count = ref(0);

// 它一上来默认会加载 3 次，这可能和设定的高度有关
// const load = () => {
//   console.log("加载了");
//   count.value += 4;
// };

interface Comment {
  body: string;
  email: string;
  id: number;
  name: string;
  postId: number;
}

const comments = reactive<Comment[]>([]);

// 请求网络数据
const load = async () => {
  console.log("加载一下");
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/comments?postId=1",
  );
  const data: Comment[] = await response.json(); // 这里等待解析JSON数据
  // console.log(data);
  comments.push(...data);
};
</script>

<style>
.infinite-list {
  width: 500px;
  height: 300px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
