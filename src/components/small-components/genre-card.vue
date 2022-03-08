<template>
  <div v-bind:class="span" class="genre">
    <img v-bind:src="propsrc ? propsrc : imgsrc" />
    <!-- use given propsrc, else use from genre-map -->
    <span class="dark-overlay" />
    <div class="genrename">
      {{ genre }}
      <span v-if="span" />
    </div>
  </div>
</template>

<script>
import { genreImageMap } from "@/js/anilist";

export default {
  name: "genreCard",
  data() {
    return {
      imgsrc: genreImageMap[this.genre],
    };
  },
  props: ["genre", "span", "propsrc"],
};
</script>

<style lang="scss">
.genre {
  min-width: 150px;
  background: #009fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  padding: 8px 0;
  flex-grow: 1;
  margin: 16px 16px 0 16px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}

.big {
  height: 70px;
  padding: 0;
}

.genrename {
  color: #fff;
  position: relative;
  span {
    border-bottom: 3px yellow solid;
    width: 100%;
    border-radius: 100px;
    margin: 8px auto;
    display: block;
  }
}

.dark-overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
}
</style>
