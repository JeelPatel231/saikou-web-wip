<template>
  <div v-bind:class="viewmode">
    <template v-if="cardsize == 'small'">
      <!-- 2 VIEW MODES, 'slide-view' AND 'grid-view' -->
        <cardSmall  v-for="item in response" :key="item" :carddata="(item instanceof Array) ? item.media : item" />
    </template>
    <template v-if="cardsize == 'big'">
      <!-- 2 VIEW MODES, 'LIST' AND 'CAROUSEL' -->
        <cardBig v-for="item in response" :key="item" :carddata="(item instanceof Array) ? item.media : item" />
    </template>
  </div>
</template>

<script>
// you can pass either ( query and variables ) or (api response itself) to this component

import cardSmall from "@/components/small-components/card-small.vue";
import { executeQuery } from "@/js/anilist";
import addSlider from "@/js/slider";
import cardBig from "../small-components/card-big.vue";

export default {
  name: "cardView",
  components: {
    cardSmall,
    cardBig,
  },
  props: ["carddatalist", "viewmode", "query", "variables", "cardsize", "arrayPath"],
  data() {
    return {
      response: [], // assign response as variable , but this makes the component update 2x
    };
  },
  mounted() {
    if (this.viewmode == "slide-view") {
      addSlider(".slide-view"); // add mouse drag slider if slideview is rendered
    }
  },
  updated() {
    if (this.carddatalist != undefined) {
      this.response = this.carddatalist; // if cardlist is defined, move array to response
    }
  },
  created() {
    if (this.query != undefined) {
      executeQuery(this.query, this.variables).then((x) => {
        x; // placebo for error
        this.response = eval(`x.${this.arrayPath}`); // if query is defined, make a call and move array to response
        console.log(this.response);
      }); // execute query
    } // if statement
  }, // created()
};
</script>

<style lang="scss">
.slide-view {
  display: flex;
  overflow: auto;
  width: 100vw;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  .card {
    margin: 10px;
  }
}

.grid-view {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  max-height: calc(100vh - 60px);
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  .card {
    margin: 10px;
  }
}
</style>
