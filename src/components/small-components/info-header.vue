<template>
  <img
    class="bannerImage"
    :src="
      response.bannerImage ? response.bannerImage : response.coverImage.extraLarge
    "
  />
  <div class="grid padded-center-container">
    <img class="coverImage" :src="response.coverImage.large" />
    <div class="info color-setter">
      <div class="status">{{ response.status }}</div>
      <div class="title">{{ response.title.userPreferred }}</div>
    </div>
    <div class="anilist-btn color-setter">ADD TO LIST</div>
    <div
      class="description"
      v-on:click="collapsed = !collapsed"
      v-bind:class="{ collapsed: collapsed }"
      v-html="response.description"
    ></div>
  </div>
</template>

<script>
export default {
  name: "InfoHeader",
  props: ["response"],
  data() {
    return {
      collapsed: true,
    };
  },
};
</script>

<style scoped lang="scss">
$media-critical-point: 600px;
.color-setter {
  color: white;
  @media screen and (min-width: $media-critical-point) {
    color: black;
  }
}

.status {
  padding: 10px 0 0 20px;
}
.title {
  font-size: 1.3rem;
  @media screen and (min-width: $media-critical-point) {
    font-size: 1.8rem;
  }
}

.grid {
  display: grid;
  grid-template-areas:
    "cover none"
    "cover info"
    "button button"
    "desc desc";
  grid-template-columns: min-content auto;
  gap: 10px;
  padding-top: 10px;
  @media screen and (min-width: $media-critical-point) {
    grid-template-rows: 120px 90px 125px auto;
    grid-template-areas:
      "cover none"
      "cover info"
      "cover desc"
      "button desc";
    margin: 0 auto;
    padding-top: 160px;
  }
}
.description {
  grid-area: desc;
  margin: 10px 0;
  line-height: 1.3rem;
  @media screen and (min-width: $media-critical-point) {
    padding: 10px 0 0 20px;
  }
  &.collapsed {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
  }
}

.anilist-btn {
  height: 48px;
  border: 2px #08f solid;
  box-sizing: border-box;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
  grid-area: button;
}
.info {
  display: flex;
  flex-direction: column-reverse;
  grid-area: info;
  & > * {
    padding: 10px 0 0 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    @media screen and (min-width: $media-critical-point) {
      -webkit-line-clamp: 1; // desktop view
    }
  }
}
img.bannerImage {
  height: 290px;
  object-fit: cover;
  width: 100%;
  top: 0;
  z-index: -1;
  position: absolute;
  filter: brightness(0.6);
}
img.coverImage {
  border-radius: 20px;
  box-shadow: 0px 0px 32px 0 #606060c9;
  height: 200px;
  grid-area: cover;
  max-width: 140px;
  object-fit: cover;
  @media screen and (min-width: $media-critical-point) {
    height: 350px;
    max-width: 250px;
  }
}
</style>
