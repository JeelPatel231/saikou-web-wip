<template>
  <!-- <cardview cardsize="big" :query="AnilistQueries.recentlyUpdated" arrayPath="data.Page.airingSchedules" /> -->
  <cardview cardsize="big" :query="AnilistQueries.searchQuery()" arrayPath="data.Page.media" />

  <!-- <cardview cardsize="big" :query="AnilistQueries.searchQuery()" :variables="{
        page: 1,
        sort: ['TRENDING_DESC', 'POPULARITY_DESC'],
        type: 'ANIME',
      }
      " />  -->
</template>

<script>
import cardview from "@/components/merged-components/card-view.vue";
import { AnilistQueries } from "@/js/anilist";

export default {
  name: "Anime",
  components: {
    cardview,
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
