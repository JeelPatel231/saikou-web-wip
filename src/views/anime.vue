<template>
  <!-- TRENDING -->
  <Headbar :fragment="fragment.toUpperCase()" />
  <carouselView 
      :query="AnilistQueries.searchQuery" :variables="{
      sort:'TRENDING_DESC',
      countryOfOrigin:'JP',
      type:fragment.toUpperCase(),
      perPage:10,
    }"/>
<div style="margin-top: 8px;" class="padded-center-container needed-0">
  <h2 class="padded-32">Recently Updated</h2>
  <!-- RECENTLY UPDATED -->
  <cardview cardsize="small" 
    nestedPath="media"
    viewmode="slide-view"
    :query="AnilistQueries.recentlyUpdated"
    :variables="{type: fragment.toUpperCase(),}"
    arrayPath="data.Page.airingSchedules" />

  <!-- POPULAR -->
  <h2 class="padded-32">Popular Anime</h2>
  <cardview
    cardsize="big"
    viewmode="grid-view"
    :query="AnilistQueries.searchQuery"
    :variables="{
      countryOfOrigin: 'JP',
      type: fragment.toUpperCase(),
    }"
    arrayPath="data.Page.media"
    :pagination="true"
  />
</div>
  <bottombar />
</template>

<script>
import carouselView from "@/components/merged-components/carousel-view.vue";
import bottombar from "@/components/bottombar.vue";
import cardview from "@/components/merged-components/card-view.vue";
import { AnilistQueries } from "@/js/anilist";
import Headbar from "../components/small-components/header.vue";

export default {
  name: "Anime",
  components: {
    cardview,
    bottombar,
    carouselView,
    Headbar
},
  data() {
    return {
      fragment:"anime",
      AnilistQueries: AnilistQueries,
    };
  },
  props: ["carddata"],
};
</script>

<style>
.padded-32{
  padding: 8px 32px;
}
</style>
