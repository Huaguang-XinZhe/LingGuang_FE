<!-- @format -->

<template>
  <div class="container">
    <el-card class="card">
      <template #header>
        <!--    使用 el-image 不比 img，它对图片有深入的处理，需要服务端通过同源策略才行    -->
        <el-image
          class="image"
          :src="url"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="srcList"
          :initial-index="4"
          fit="cover"
        />
        <!-- <img
          src="https://image-bed-1315938829.cos.ap-nanjing.myqcloud.com/image-20240112213823465.png"
          alt="#"
        /> -->
      </template>
      <el-text class="text" contenteditable>
        {{ content }}
      </el-text>
      <template #footer>
        <el-row justify="space-between" align="middle">
          <el-tag class="tag" round size="large" effect="dark" contenteditable
            >这里放类属呀</el-tag
          >
          <el-button-group>
            <el-button type="primary" :icon="Plus" color="#626aef" plain
              >Guidance</el-button
            >
            <el-button type="danger" :icon="Delete" plain />
          </el-button-group>
        </el-row>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Delete, Plus } from "@element-plus/icons-vue";
// 接收 content
defineProps({
  content: String,
});
const url =
  "https://image-bed-1315938829.cos.ap-nanjing.myqcloud.com/image-20240112213823465.png";
const srcList = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
  "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
  "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
  "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
  "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
  "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
  "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
];
</script>

<style scoped>
.card {
  margin: 15px 20px;
  border-radius: 10px;
}
.image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.tag:focus {
  outline: none;
}
.text:focus {
  outline: none;
}
</style>
