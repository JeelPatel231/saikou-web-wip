<template>
  <div v-if="Object.keys(response).length">
    <infoheader :response="response" />
    <div style="background-color: #eee">
      <div class="tab-wrapper">
        <div class="tabbar padded-center-container">
        <router-link :to="{ name: 'Info' }">
          <div class="tab-item">INFO</div>
        </router-link>
        <router-link :to="{ name: 'Watch' }">
          <div v-if="(['MANGA','NOVEL','ONE_SHOT'].includes(response.format))" class="tab-item">READ</div>
          <div v-else class="tab-item">WATCH</div>
        </router-link>
        </div>
      </div>
    <div class="padded-center-container needed-0">
      <router-view
        name="tab"
        :id="this.$route.params.id"
        :details="response"
        v-slot="{ Component }"
      >
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
  </div>
</template>

<script>
import { AnilistQueries, executeQuery } from "@/js/anilist";
import infoheader from "@/components/small-components/info-header.vue";
export default {
  name: "Media",
  components: {
    infoheader,
  },
  data() {
    return {
      response: {},
    };
  },
  created() {
    executeQuery(AnilistQueries.mediaInfo, { id: this.$route.params.id }).then(
      (x) => {
        this.response = x.data.Media;
      }
    );
  },
};
</script>

<style scoped lang="scss">
.tab-wrapper{
  background: #ffff;
  top: 0;
  position: sticky;
  box-shadow: 0px 4px 8px 0 #60606070;
  z-index: 2;
}
.tabbar {
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 1.3rem;
  flex: 1;
  font-weight: 700;
  & > * {
    flex: 1;
    padding: 10px 0;
  }
}
</style>
