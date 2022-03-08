<template>
  <!-- TRENDING -->
  <!-- <cardview cardsize="big" :query="AnilistQueries.searchQuery" :variables="{
      sort:'TRENDING_DESC',
      countryOfOrigin:'JP',
      type:'ANIME',
      perPage:10,
    }"
    arrayPath="data.Page.media" /> -->

  <!-- RECENTLY UPDATED -->
  <!-- <cardview cardsize="big" :query="AnilistQueries.recentlyUpdated" arrayPath="data.Page.airingSchedules" /> -->

  <!-- POPULAR -->
  <cardview
    cardsize="big"
    viewmode="grid-view"
    :query="AnilistQueries.searchQuery"
    :variables="{
      countryOfOrigin: 'JP',
      type: 'ANIME',
    }"
    arrayPath="data.Page.media"
    :pagination="true"
  />
  <bottombar />
</template>

<script>
import bottombar from "@/components/bottombar.vue";
import cardview from "@/components/merged-components/card-view.vue";
import { AnilistQueries } from "@/js/anilist";

export default {
  name: "Anime",
  components: {
    cardview,
    bottombar,
  },
  data() {
    return {
      AnilistQueries: AnilistQueries,
    };
  },
  props: ["carddata"],
};
</script>

<style></style>
