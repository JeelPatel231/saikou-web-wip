<template>
  <div v-bind:class="viewmode">
    <template v-if="cardsize == 'small'">
      <!-- 2 VIEW MODES, 'slide-view' AND 'grid-view' -->
        <cardSmall v-for="item in response" :key="item" :carddata="item.media ? item.media : item" />
    </template>
    <template v-if="cardsize == 'big'">
      <!-- 2 VIEW MODES, 'LIST' AND 'CAROUSEL' -->
        <cardBig v-for="item in response" :key="item" :carddata="item.media ? item.media : item" />
    </template>
  </div>
</template>

<script>
// you can pass either ( query and variables ) or (api response itself) to this component

import cardSmall from "@/components/small-components/card-small.vue";
import { executeQuery } from "@/js/anilist";
import addSlider from "@/js/slider";
import cardBig from "@/components/small-components/card-big.vue";

export default {
  name: "cardView",
  components: {
    cardSmall,
    cardBig,
  },
  props: ["carddatalist", "viewmode", "query", "variables", "cardsize", "arrayPath","pagination"],
  data() {
    return {
      response: [], // assign response as variable , but this makes the component update 2x
      page:1, // anilist page starts a @ 1 rather 0
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
  methods:{
    apicall(){
      if (this.query != undefined) {
        executeQuery(this.query, Object.assign({},this.variables,{page:this.page})).then((x) => {
          x; // placebo for error
          this.response = this.response.concat(eval(`x.${this.arrayPath}`)); // if query is defined, make a call and move array to response
          console.log(this.response);
        }); // execute query
      } // if statement
    } // api call()
  },
  created() {
    this.apicall()
    if (this.pagination == true){ // add listener only if said
      // console.log("assigned onscroll event")
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow) {
          // console.log("bottom");
          this.page++
          console.log(this.page);
          this.apicall();
        }
      }; // on scroll event
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

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  .card {
    margin: 10px;
  }
}
</style>
