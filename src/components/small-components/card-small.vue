<template>
  <router-link
    class="card unselectable"
    :to="{ name: 'Info', params: { id: carddata.id } }"
  >
    <div class="animecard-span">
      <span class="skeleton" />
      <img
        v-lazy="{
          src: carddata.coverImage.large,
          lifecycle: lazyOptions.lifecycle,
        }"
        class="coverimage"
      />
      <div v-if="carddata.meanScore" class="score">
        {{ carddata.meanScore / 10 }}
        <span class="material-icons-round">star</span>
      </div>
    </div>
    <div class="info" v-if="carddata.title && infoVisible">
      <!-- show relation if passed as prop -->
      <div v-if="relation" v-bind:class="carddata.type" class="relation">
        {{ relation }}
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
  </router-link>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "cardSmall",
  props: {
    relation: {},
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
          el.parentElement
            .querySelectorAll("span.skeleton")
            .forEach((x) => x.remove());
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
.coverimage {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.relation{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  padding: 4px 0 0 0;
  font-style: italic;
  opacity: 0.58;

  @mixin pseudo{
    font-family: 'Material Icons Round';
    font-size: 1.1rem;
    padding: 0 0.2rem;
  }

  &.ANIME::before{
    @include pseudo();
    content: 'movie_filter';
  }
  &.MANGA::before{
    @include pseudo();
    content: 'import_contacts';
  }
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
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: 0px 0px 16px 0 #6060608c;
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
  padding: 2px 6px 0px 12px;
  background: #ff0080bf;
  color: #fff;
  display: flex;
  line-height: 1.3rem;
  font-size: 0.8rem;
  font-weight: bold;
  border-radius: 24px 0 0 0;
  align-items: center;
  span.material-icons-round {
    margin-bottom: 0.125rem;
  }
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

  // &::before{
  //   @keyframes wipe {
  //     0% {
  //       top: -100px;
  //     }
  //     80% {
  //       top: 270px;
  //     }
  //     100% {
  //       top: 270px;
  //     }
  //   }

  //   content: '';
  //   position: absolute;
  //   background: linear-gradient(#eee0, #aeaeae, #aeaeae, #eee0);
  //   height: 20%;
  //   width: 200%;
  //   transform: rotate(-45deg);
  //   top: -10px;
  //   bottom: 0px;
  //   right: -50%;
  //   animation: wipe 2s ease infinite;
  //   }
}

</style>
