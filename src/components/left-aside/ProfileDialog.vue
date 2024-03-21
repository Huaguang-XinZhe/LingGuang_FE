<template>
  <el-dialog
    width="40%"
    center
    :model-value="dialogStore.isDialogVisible"
    @update:model-value="dialogStore.hideDialog()"
  >
    <!--    Vue 的编译后往 CSS 中加的 data 属性在一个组件中是一致的，对这个组件而言，它是从 el-row 开始的！-->
    <el-row justify="center">
      <el-avatar
        :size="80"
        src="https://image-bed-1315938829.cos.ap-nanjing.myqcloud.com/image-20240112213823465.png"
      />
      <el-text class="nickname" contenteditable truncated>Huaguang</el-text>
    </el-row>
    <template #footer>
      <el-upload
        class="upload-block"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        drag
      >
        <!--      下边的几个类都不能删，它会影响图标的样式-->
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { UploadFilled } from "@element-plus/icons-vue";
import { useDialogStore } from "@/stores/dialogStore";

const dialogStore = useDialogStore();
</script>

<style scoped>
/*把 container 切换为 el-dialog 也不行*/
/*.container {
  !* 这个变量又引用了另一个变量，加 !important 也没用 *!
  !*--el-dialog-border-radius: 10px !important;*!
  !*怎么直接修改这个变量也没用？*!
  !* --el-border-radius-small: 10px;*!
}*/
/* 让 .el-dialog 的样式不加属性选择器，变为全局样式，脱离 scope 的限制 */
:global(.el-dialog) {
  /*这个样式还是会被组件的样式覆盖，但加上 !important 就没问题了。*/
  border-radius: 10px !important;
}
/*在这里使用深度选择器没什么用，都不会在浏览器的 style 中显示*/
/*:deep(.el-dialog) {
  border-radius: 10px;
}*/
/*用 container 也是一样的，也是会被组件的样式覆盖！*/
/*:global(.container) {
  border-radius: 10px !important;
}*/
/*深度选择器，选择子组件的样式，在这里，它是放在最上面的（后覆前），不需要 !important！*/
:deep(.el-upload-dragger) {
  border-width: 2px;
}
.nickname {
  margin: 10px 15px;
  font-weight: bold;
  font-size: 25px;
}
.nickname:focus {
  outline: none;
}
.upload-block {
  width: 80%;
  margin: 0 auto 20px;
}
</style>
