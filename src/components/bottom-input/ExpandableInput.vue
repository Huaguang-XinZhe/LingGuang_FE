<!-- @format -->

<template>
  <div class="container">
    <!-- 问题就出在这个 height！！！ -->
    <textarea
      ref="textarea"
      placeholder="写点想法吧～"
      @input="adjustHeight"
    ></textarea>
    <button>发送</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const maxHeight = 580;

const textarea = ref();

// 防抖有待实现！！！
function adjustHeight() {
  console.log("调整执行！");
  // if (textarea.value == null) return;
  // 重置 textarea 的高度（关键临时步骤，要求立即执行，以准确测量 scrollHeight 的高度）
  // 只有 textarea 的高度非固定（为 auto），才能准确测量 scrollHeight 的高度
  textarea.value.style.height = "auto";
  // 这个 scrollHeight 是包括行高和内 padding 的，但不包括边框
  // 每次回车会增加 scrollHeight 的高度——一个行高
  // textareaHeight.value = "auto"; // 直接这样写没用！！！在删除的时候不会自动减少高度
  const scrollHeight = textarea.value.scrollHeight;
  // console.log("scrollHeight: ", scrollHeight);

  // textareaHeight.value = scrollHeight + "px"; // 设置新的高度
  if (scrollHeight > maxHeight) {
    textarea.value.style.overflowY = "scroll";
    textarea.value.style.height = scrollHeight + 2 + "px"; // 设置新的高度
  } else {
    textarea.value.style.overflowY = "hidden";
    // 这里也必须直接操作 DOM，让它立即生效，否则在同一行输入的时候 scrollHeight 不会变化，textareaHeight 也就不会变化；
    // 非同一行输入的时候，scrollHeight 会变化，textareaHeight 才会被设置
    // 有些时候还真的不得不直接操作 DOM，因为它快呀！！！
    textarea.value.style.height = scrollHeight + 2 + "px"; // 设置新的高度
  }
}
</script>

<style>
:root {
  --max-height: 580px;
}
.container {
  /*width: 100%;*/ /* 写不写都是默认撑满盒子 content 的宽度（不包括内 padding）*/
  height: 100%; /* 加上这一行就可以避免父容器高度塌陷的问题 */
  position: relative;
}
textarea {
  position: absolute;
  bottom: 20px;
  width: 100%; /* 这里就必须写好宽度，要不然就是默认的，而默认的不会撑满盒子 content 的宽度（div 会） */
  box-sizing: border-box; /* 如果去掉，textarea 会和 Footer 一样宽，加上的话就会被限制在 content 内。但这样的话，就得考虑边框对 height 造成的影响了。 */
  font-size: 16px;
  line-height: 1.5;
  resize: none; /* 禁止调整大小 */
  height: auto;
  overflow-y: hidden;
  max-height: var(--max-height);
  padding: 10px 20px;
}
</style>
