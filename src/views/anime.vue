<template>
  <!-- TRENDING -->
  <carouselView 
      :query="AnilistQueries.searchQuery" :variables="{
      sort:'TRENDING_DESC',
      countryOfOrigin:'JP',
      type:'ANIME',
      perPage:10,
    }"/>

  <!-- RECENTLY UPDATED -->
  <cardview cardsize="small" nestedPath="media"  viewmode="slide-view" :query="AnilistQueries.recentlyUpdated" arrayPath="data.Page.airingSchedules" />

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
import carouselView from "@/components/merged-components/carousel-view.vue";
import bottombar from "@/components/bottombar.vue";
import cardview from "@/components/merged-components/card-view.vue";
import { AnilistQueries } from "@/js/anilist";

export default {
  name: "Anime",
  components: {
    cardview,
    bottombar,
    carouselView,
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
