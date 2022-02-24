<template>
  <div class="searchwrapper">
    <div class="search">
      <div class="searchgroup">
        <input
          v-on:change="search()"
          v-bind:fragment="fragment"
          ref="searchText"
          type="text"
          required="required"
        />
        <span class="bar" />
        <label>Search {{ fragment }}</label>
      </div>
      <span v-on:click="search()" class="button material-icons">search</span>
    </div>
    <cardView
      cardsize="small"
      viewmode="slide-view"
      v-bind:carddatalist="this.response"
    />
  </div>
</template>

<script>
import { AnilistQueries, executeQuery } from "@/js/anilist";
import cardView from "@/components/merged-components/card-view.vue";

export default {
  name: "home",
  components: {
    cardView,
  },
  data() {
    return {
      response: [],
    };
  },
  props: ["fragment"],
  methods: {
    search() {
      let variables = {
        type: this.$refs.searchText.attributes.fragment.value,
        search: this.$refs.searchText.value,
      };
      executeQuery(AnilistQueries.searchQuery(), variables).then((x) => {
        this.response = x.data.Page.media;
        console.log(this.response);
      });
    },
  },
};
</script>

<style lang="scss">
.searchwrapper {
  position: absolute;
}

.searchgroup {
  position: relative;

  input {
    background: none;
    color: #08f;
    font-size: 18px;
    padding: 12px 10px 12px 15px;
    display: block;
    width: calc(100vw - 100px);
    max-width: 350px;
    margin-left: 10px;
    border-radius: 20px;
    border: 2px solid #08f;
    outline: none;
    &:focus ~ label,
    &:valid ~ label {
      top: -8px;
      font-size: 14px;
      background: #fff;
      left: 25px;
    }
  }

  label {
    color: #08f;
    font-size: 20px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 25px;
    padding: 0 4px;
    top: 12px;
    transition: 200ms ease all;
  }
}
.search {
  display: flex;
  align-content: center;
  font-size: 30px;
  margin-top: 10px;
  max-width: 450px;
}
.button {
  display: flex;
  width: 50px;
  justify-content: center;
  background: #08f;
  border-radius: 100px;
  flex-direction: column;
  text-align: center;
  color: #fff;
  margin: 0 auto;
}
</style>
