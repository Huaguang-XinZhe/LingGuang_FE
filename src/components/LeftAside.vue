<template>
  <div class="container">
    <el-autocomplete
      class="category-search"
      v-model="autocompleteInput"
      :fetch-suggestions="fetchAutocompleteSuggestions"
      :trigger-on-focus="false"
      clearable
      placeholder="Please Input"
      @select="handleSelection"
    />
    <div class="category-container"></div>
    <el-dropdown placement="top">
      <el-row justify="center" class="user-item">
        <el-avatar
          :size="32"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <el-text class="text" truncated
          >HuaguangHuaguangHuaguangHuaguang</el-text
        >
      </el-row>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="EditPen" @click="modifyProfile"
            >修改头像、昵称</el-dropdown-item
          >
          <el-dropdown-item divided :icon="SwitchButton" @click="logout"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <ProfileDialog
    :is-show-from-parent="centerDialogVisible"
    @update:is-show-from-parent="updateVisible"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { EditPen, SwitchButton } from "@element-plus/icons-vue";
import ProfileDialog from "@/components/ProfileDialog.vue";

interface AutocompleteItem {
  value: string; // 这个属性还非得是 value 不可，要不然不会显示
  url: string;
}

const centerDialogVisible = ref(false);
const autocompleteInput = ref<string>("");
const autocompleteData = ref<AutocompleteItem[]>([]);

const filterAutocompleteItems = (queryString: string) => {
  return autocompleteData.value.filter((item) =>
    item.value.toLowerCase().startsWith(queryString.toLowerCase()),
  );
};

const fetchAutocompleteSuggestions = (
  queryString: string,
  callback: Function,
) => {
  const results = queryString
    ? filterAutocompleteItems(queryString)
    : autocompleteData.value;
  console.log("results:", results);
  callback(results);
};

const loadAutocompleteData = (): AutocompleteItem[] => {
  return [
    { value: "Vue", url: "https://github.com/vuejs/vue" },
    { value: "Element", url: "https://github.com/ElemeFE/element" },
    {
      value: "Composition API",
      url: "https://v3.vuejs.org/api/composition-api.html",
    },
    { value: "Vue Router", url: "https://" },
  ];
};

const handleSelection = (item: AutocompleteItem) => {
  console.log("Selected item:", item);
};

onMounted(() => {
  autocompleteData.value = loadAutocompleteData();
});
function modifyProfile() {
  centerDialogVisible.value = true;
  console.log("modify profile");
}

function logout() {
  console.log("logout");
  // todo: 跳转到登录页面
}
function updateVisible(newVal: boolean) {
  centerDialogVisible.value = newVal;
}
</script>

<style scoped>
.container {
  text-align: center; /* text-align 是在父容器中对子元素而言的！不能在子元素中应用。 */
  /*padding: 20px 0;*/
  display: flex;
  flex-direction: column;
  height: 100%; /* 指定高度为父容器的高度就必须去除 padding，否则会有滚动条 */
}
.category-container {
  flex-grow: 1;
  /*background-color: skyblue;*/
}
.user-item {
  border-radius: 10px;
  padding: 5px 10px;
  margin: 10px;
}
.user-item:focus {
  outline: none;
}
.user-item:hover {
  background-color: rgb(232, 235, 239);
  cursor: pointer;
}
.text {
  width: 100px;
  /*max-width: 100px;*/ /* 当昵称过长，就会被挤到下一行，这时设置 max-width 没用，得直接设置 width */
  margin-left: 10px;
  font-weight: bold;
  user-select: none;
}
</style>
