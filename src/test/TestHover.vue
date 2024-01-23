<script setup lang="ts"></script>

<template>
  <div class="container">
    水波效果不仅在圆形上
    <!--    这个按钮默认会在文本的下方，紧贴文本（节点）-->
    <button class="hover-button">用中文好</button>
  </div>
</template>

<style scoped>
/* 设置外部容器的样式 */
.container {
  position: relative;
  padding: 20px;
  background: #333; /* 类控制台的深灰色 */
  color: white;
  width: 200px; /* 如果没有设置 box-sizing: border-box，那 width 默认就是内容区的宽度，不包括 padding*/
}

/* 设置按钮的初始样式 */
.hover-button {
  position: absolute; /* 开启绝对定位后，它默认会定位到右下角，然后相对于右上角定位！！！ */
  right: 10px;
  top: 18.5px;
  opacity: 0; /* 不透明度为 0，完全透明，看不见 */
  transition: opacity 0.5s ease;
}

/* 当鼠标悬停在容器上时改变按钮的样式 */
.container:hover .hover-button {
  opacity: 1; /*完全不透明，可见*/
}
</style>
