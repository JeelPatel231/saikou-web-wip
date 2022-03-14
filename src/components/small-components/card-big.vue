<template>
  <div class="covercard">
    <!-- set cover image as banner if banner image is null -->
    <img
      v-lazy="{
        src: carddata.bannerImage ?? carddata.coverImage.large,
      }"
    />
    <span class="gradient-overlay" />

    <!-- info visible override for false -->
    <cardSmall :carddata="carddata" :infoVisible="false" />

    <div class="info">
      <div class="name">{{ carddata.title.userPreferred }}</div>
      <div v-if="carddata.episodes" class="episodes">
        Episodes : {{ carddata.episodes }}
      </div>
      <div v-if="carddata.chapters" class="episodes">
        Chapters : {{ carddata.chapters }}
      </div>
    </div>
  </div>
</template>

<script>
import cardSmall from "@/components/small-components/card-small.vue";

export default {
  name: "covercard",
  components: {
    cardSmall,
  },
  props: ["carddata"],
};
</script>

<style lang="scss" scoped>
.banner {
  position: absolute;
  width: 100%;
  height: 100%;
}

.gradient-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(#fff0, #000 90%);
  bottom: 0;
}

.covercard {
  width: 400px;
  border-radius: 28px;
  display: flex;
  position: relative;
  overflow: hidden;
  background-blend-mode: overlay;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin: 8px;
  flex-grow: 1;
  max-width: 600px;

  img {
    object-fit: cover;
    position: absolute;
    height: 100%;
    width: inherit;
    width: 100%;
  }

  .card {
    margin: 16px;
  }
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 10px;
  color: #fff;
  position: relative;
  .name {
    font-weight: 700;
  }
  & > * {
    margin: 0 0 10px 0;
  }
}
</style>
