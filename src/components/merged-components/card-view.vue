<template>
  <div v-bind:class="viewmode" ref="view">
    <template v-if="cardsize == 'small'">
      <!-- 2 VIEW MODES, 'slide-view' AND 'grid-view' -->
        <cardSmall v-for="item in response" :key="item" :relation="item.relationType" :carddata="eval(item,nestedPath)" />
    </template>
    <template v-if="cardsize == 'big'">
      <!-- 2 VIEW MODES, 'LIST' AND 'CAROUSEL' -->
        <cardBig v-for="item in response" :key="item" :carddata="eval(item,nestedPath)" />
    </template>
    <template v-if="cardsize == 'character'">
      <!-- 2 VIEW MODES, 'LIST' AND 'CAROUSEL' -->
        <CharacterCard v-for="item in response" :key="item" :carddata="item" />
    </template>
  </div>
</template>

<script>
// you can pass either ( query and variables ) or (api response itself) to this component

import cardSmall from "@/components/small-components/card-small.vue";
import { executeQuery } from "@/js/anilist";
import addSlider from "@/js/slider";
import cardBig from "@/components/small-components/card-big.vue";
import CharacterCard from "../small-components/character-card.vue";

export default {
  name: "cardView",
  components: {
    cardSmall,
    cardBig,
    CharacterCard
},
  props: ["carddatalist", "viewmode", "query", "variables", "cardsize", "arrayPath","pagination","nestedPath","relation"],
  data() {
    return {
      response: [], // assign response as variable , but this makes the component update 2x
      page:1, // anilist page starts a @ 1 rather 0
    };
  },
  mounted() {
    // console.log("mounted ............")
    this.updateResponse()
    if (this.viewmode == "slide-view") {
      addSlider(this.$refs.view); // add mouse drag slider if slideview is rendered
    }
  },
  updated() {
    // console.log("updated ............")
    this.updateResponse()
  },
  methods:{
    eval(item,arg){
      if(arg == "" || arg == undefined ){return item}
      return eval(item[arg])
    },
    apicall(){
      if (this.query != undefined) {
        executeQuery(this.query, Object.assign({},this.variables,{page:this.page})).then((x) => {
          x; // placebo for error
          this.response = this.response.concat(eval(`x.${this.arrayPath}`)); // if query is defined, make a call and move array to response
          console.log(this.response);
        }); // execute query
      } // if statement
    }, // api call()
    updateResponse(){
      if (this.carddatalist != undefined) {
        this.response = this.carddatalist; // if cardlist is defined, move array to response
      }
    }
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
  width: min-content;
  max-width: 100%;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  .card {
    margin: 10px;
    &:first-child{
      margin-left: 24px;
    }
    &:last-child{
      margin-right: 24px;
    }
  }
}

.grid-view {
  margin-top: 16px;
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
