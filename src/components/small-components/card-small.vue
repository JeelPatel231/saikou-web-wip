<template>
  <div class="card unselectable">
    <div class="animecard-span">
      <span class="skeleton">
        <span class="skeleton-wiper" />
      </span>
      <img
        v-lazy="{
          src: carddata.coverImage.large,
          lifecycle: lazyOptions.lifecycle,
        }"
        class="coverimage"
      />
      <div v-if="carddata.meanScore" class="score">
        {{ carddata.meanScore }}
        <span class="material-icons">star</span>
      </div>
    </div>
    <div class="info" v-if="carddata.title && infoVisible">
      <!-- show relation if passed as prop -->
      <div v-if="relation" class="relation">
        {{carddata.type}}
        {{relation}}
      </div>

      <div class="anime-name">
        {{ carddata.title.userPreferred }}
      </div>

      <!-- show episodes if available or chapters if manga -->

      <div v-if="carddata.episodes" class="episode-info">
        <span v-if="carddata.nextAiringEpisode">
          {{ carddata.nextAiringEpisode.episode }} |
        </span>
        {{ carddata.episodes }}
      </div>
      <div v-else-if="carddata.chapters" class="episode-info">
        {{ carddata.chapters }}
      </div>
    </div>
    <span class="clear-overlay" />
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "cardSmall",
  props: {
    relation:{},
    carddata: {},
    infoVisible: {
      default: true,
      type: Boolean,
    },
  },
  setup() {
    const lazyOptions = reactive({
      lifecycle: {
        loaded: (el) => {
          el.parentNode.querySelector("span").remove(); // find a better way to remove skeleton class
        },
      },
    });
    return {
      lazyOptions,
    };
  },
};
</script>

<style lang="scss" scoped>
span[lazy="loaded"] {
  display: none;
}
.coverimage {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.anime-name {
  /* https://stackoverflow.com/questions/3922739/limit-text-length-to-n-lines-using-css */

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  margin: 5px;
}

.animecard-span {
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
}

.card {
  position: relative;
  width: 130px;
  flex-shrink: 0;
}

.score {
  position: absolute;
  bottom: 0px;
  right: 0px;
  padding: 3px 7px 3px 7px;
  background: red;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  border-radius: 10px 0 0 0;
}

.episode-info {
  margin: 5px;
}

.clear-overlay {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.skeleton {
  background: #595858;
  position: absolute;
  width: 100%;
  height: 100%;
}

.skeleton-wiper {
  @keyframes wipe {
    0% {
      top: -100px;
    }
    50% {
      top: 250px;
    }
    100% {
      top: 250px;
    }
  }

  position: absolute;
  background: linear-gradient(#eee0, #eee, #eee, #eee0);
  height: 20%;
  width: 200%;
  transform: rotate(-45deg);
  top: -10px;
  bottom: 0px;
  right: -50%;
  animation: wipe 2s ease infinite;
}
</style>
