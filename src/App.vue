<template>
  <router-view v-slot="{ Component }">
    <keep-alive max="5">
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <bottombar />
</template>

<script>
import bottombar from "./components/bottombar.vue";

export default {
  name: "App",
  components: {
    bottombar,
  },
};
</script>

<style></style>
