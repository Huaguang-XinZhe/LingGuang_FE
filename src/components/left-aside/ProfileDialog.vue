<template>
  <el-dialog
    width="50%"
    center
    class="container"
    :model-value="dialogStore.isDialogVisible"
    @update:model-value="dialogStore.hideDialog()"
  >
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
.container {
  border-radius: 10px !important;
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
