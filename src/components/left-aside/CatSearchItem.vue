<template>
  <el-autocomplete
    v-model="autocompleteInput"
    :fetch-suggestions="fetchAutocompleteSuggestions"
    :trigger-on-focus="false"
    clearable
    placeholder="Search Category"
    @select="handleSelection"
  />
</template>

<script setup lang="ts">
interface AutocompleteItem {
  value: string; // 这个属性还非得是 value 不可，要不然不会显示
  url: string;
}

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
</script>

<style scoped>
:global(.el-autocomplete) {
  margin: 0 5px;
}
</style>
