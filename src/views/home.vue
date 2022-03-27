<template>
  <div class="centered-container padded-center-container">
    <div class="heading">Saikou Web</div>
    <div class="subtitle">The Best Anime, Manga & Novel app</div>
    <div style="display: flex;">
      <span class="icons"><img src="/assets/discord.svg" alt="discord"></span>
      <span class="icons"><img src="/assets/github.svg" alt="github"></span>
      <span class="icons"><img src="/assets/telegram.svg" alt="telegram"></span>
    </div>
  </div>
  <bottombar />
</template>

<script>
import bottombar from "@/components/bottombar.vue";

export default {
  name: "Home",
  components: {
    bottombar,
  },
};
</script>

<style lang="scss" scoped>
.centered-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  text-align: center;
}
.heading{
  font-size: 5rem;
  font-weight: 100;
  color: #ff007f;
  line-height: 5rem;
  margin-bottom: 32px;
}
.icons{
  height: 48px;
  width: 48px;
  margin: 32px 8px;
}
</style>
