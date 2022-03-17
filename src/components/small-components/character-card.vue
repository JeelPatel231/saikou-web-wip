<template>
  <div class="card unselectable">
    <div class="animecard-span">
      <span class="skeleton" />
      <img
        v-lazy="{
          src: carddata.node.image.medium,
          lifecycle: lazyOptions.lifecycle,
        }"
        class="coverimage"
      />
    </div>
    <div class="info">
      <div class="name">
        {{ carddata.node.name.userPreferred }}
      </div>
      <div class="role">
        {{ carddata.role }}
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
    carddata: {},
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
.role {
  text-align: end;
}
.coverimage {
  object-fit: cover;
  height: 100%;
  width: 100%;
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
