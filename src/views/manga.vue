<template>
  <searchbar fragment="MANGA" />
  <bottombar />

</template>

<script>
import bottombar from "../components/bottombar.vue";
import searchbar from "@/components/small-components/search.vue";

export default {
  name: "Manga",
  components: {
    searchbar,
    bottombar
  },
};
</script>

<style></style>
