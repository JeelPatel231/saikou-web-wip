<template>
  <router-view :key="this.$route.params.id" v-slot="{ Component }">
            <!-- ^ only re-render on root paths and not in nested -->
    <keep-alive max="5">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
