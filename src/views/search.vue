<template>
  <searchbar :fragment="fragment.toUpperCase()" />
</template>

<script>
import searchbar from "@/components/small-components/search.vue";

export default {
  name: "search",
  props:["fragment"],
  components: {
    searchbar,
  },
};
</script>

<style></style>
