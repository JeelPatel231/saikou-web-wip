<template>
  <div class="view-parent">
    <div
      v-if="viewmode == 'slide-view'"
      ref="slideleft"
      v-on:click="scroll(-1)"
      class="slide-buttons unselectable material-icons-round"
    >
      navigate_before
    </div>
    <div v-bind:class="viewmode" ref="view">
      <template v-if="cardsize == 'small'">
        <!-- 2 VIEW MODES, 'slide-view' AND 'grid-view' -->
        <cardSmall
          v-for="item in response"
          :key="item"
          :relation="item.relationType"
          :carddata="eval(item, nestedPath)"
        />
      </template>
      <template v-if="cardsize == 'big'">
        <!-- 2 VIEW MODES, 'LIST' AND 'CAROUSEL' -->
        <cardBig
          v-for="item in response"
          :key="item"
          :carddata="eval(item, nestedPath)"
        />
        <div
          v-if="pagination"
          v-on:click="apicall()"
          class="material-icons-round expandmore"
        >
          expand_more
        </div>
      </template>
      <template v-if="cardsize == 'character'">
        <!-- 2 VIEW MODES, 'LIST' AND 'CAROUSEL' -->
        <CharacterCard v-for="item in response" :key="item" :carddata="item" />
      </template>
    </div>
    <div
      v-if="viewmode == 'slide-view'"
      ref="slideright"
      v-on:click="scroll(1)"
      class="slide-buttons end unselectable material-icons-round"
    >
      navigate_next
    </div>
  </div>
</template>

<script>
// you can pass either ( query and variables ) or (api response itself) to this component

import cardSmall from "@/components/small-components/card-small.vue";
import { executeQuery } from "@/js/anilist";
import cardBig from "@/components/small-components/card-big.vue";
import CharacterCard from "@/components/small-components/character-card.vue";

export default {
  name: "cardView",
  components: {
    cardSmall,
    cardBig,
    CharacterCard,
  },
  props: [
    "carddatalist",
    "viewmode",
    "query",
    "variables",
    "cardsize",
    "arrayPath",
    "pagination",
    "nestedPath",
    "relation",
  ],
  data() {
    return {
      response: [], // assign response as variable , but this makes the component update 2x
      page: 1, // anilist page starts a @ 1 rather 0
    };
  },
  mounted() {
    // console.log("mounted ............")
    this.updateResponse();
  },
  updated() {
    // console.log("updated ............")
    this.updateResponse();
    this.setSliderDisplay();
  },
  methods: {
    eval(item, arg) {
      if (arg == "" || arg == undefined) {
        return item;
      }
      return eval(item[arg]);
    },
    apicall() {
      if (this.query != undefined) {
        executeQuery(
          this.query,
          Object.assign({}, this.variables, { page: this.page })
        ).then((x) => {
          x; // placebo for error
          this.response = this.response.concat(eval(`x.${this.arrayPath}`)); // if query is defined, make a call and move array to response
          console.log(this.response);
        }); // execute query
        this.page++
      } // if statement
    }, // api call()
    updateResponse() {
      if (this.carddatalist != undefined) {
        this.response = this.carddatalist; // if cardlist is defined, move array to response
      }
    },
    scroll(side) {
      let el = this.$refs.view;
      el.scrollLeft += side * el.offsetWidth * 0.8;
    },
    // show slide button if within offset limit
    setSliderDisplay(){
      if (this.viewmode == "slide-view") {
        let el = this.$refs.view;
        let offset = 50
        if (el.scrollLeft <= offset) {this.$refs.slideleft.style.display = "none";}
        else{this.$refs.slideleft.style.display = "block";}

        if (el.scrollLeft >= el.scrollLeftMax - offset) {this.$refs.slideright.style.display = "none";}
        else{this.$refs.slideright.style.display = "block";}

        this.setEventSlideButtons() // set event listener after 1 execution
      }
    },
    setEventSlideButtons() {
    // add event listener to the function to auto update on scroll 
      this.$refs.view.onscroll = this.setSliderDisplay
    }
  },
  created() {
    this.apicall();
  }, // created()
};
</script>

<style lang="scss" scoped>
.view-parent {
  position: relative;

  &:hover > .slide-buttons {
    opacity: 0.8;
  }
}
.slide-buttons {
  position: absolute;
  z-index: 1;
  background: #fff;
  top: 0;
  opacity: 0;
  transition: 200ms ease;
  font-size: 3rem;
  border-radius: 100%;
  margin: 5.5rem 10px 10px 10px;
  cursor: pointer;
  box-shadow: 2px 2px 2px 0 rgba(0, 0, 0, 0.1);
  &.end {
    right: 0;
  }
  &:hover {
    opacity: 1 !important;
    transition: 0ms;
  }
  &:active {
    background: #aeaeae;
  }
}

.slide-view {
  display: flex;
  overflow: auto;
  width: min-content;
  max-width: 100%;
  scrollbar-width: none;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  .card {
    margin: 10px;
    &:first-child {
      margin-left: 24px;
    }
    &:last-child {
      margin-right: 24px;
    }
  }
}

.grid-view {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  position: relative;
  padding-bottom: 150px;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;

  .card {
    margin: 10px;
  }
}

.expandmore{
  font-size: 3rem;
  background: #000;
  color: #fff;
  border-radius: 30px;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  margin-bottom: 100px;
}
</style>
