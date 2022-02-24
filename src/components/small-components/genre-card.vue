<template>
  <div v-bind:class="span" class="genre">
    <img v-bind:src="imgsrc" />
    <span class="dark-overlay" />
    <div class="genrename">
      {{ genre }}
      <span v-if="span" />
    </div>
  </div>
</template>

<script>
export default {
  name: "genreCard",
  props: ["genre", "span", "imgsrc"],
};
</script>

<style lang="scss">
.genre {
  width: 150px;
  background: #009fff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  position: relative;
  overflow: hidden;

  padding: 10px 0;

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
    margin-top: 4px;
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
