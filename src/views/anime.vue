<template>
  <cardview cardsize="big" :query="query" :variables="variables" />
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
      query: AnilistQueries.searchQuery(),
      variables: {
        page: 1,
        sort: ["TRENDING_DESC", "POPULARITY_DESC"],
        type: "ANIME",
      },
    };
  },
  props: ["carddata"],
};
</script>

<style></style>
