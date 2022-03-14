<template>
  <div
    class="searchwrapper padded-center-container"
    v-on:click.self="this.$router.push({ name: 'Search' })"
  >
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
      <div class="filter">
        <div class="head">GENRES</div>
        <div class="item-list">
          <!-- Using dictionary for fast deletion and prevent repetation of genres -->
          <div
            v-for="genre in genres"
            :key="genre"
            class="item"
            v-on:click="genrefilters[genre] = 0"
          >
            {{ genre }}
          </div>
        </div>
      </div>
      <div class="filter">
        <div class="head">{{ sortfilter }}</div>
        <div class="item-list">
          <div
            v-for="sort in Object.keys(sorts)"
            :key="sort"
            class="item"
            v-on:click="sortfilter = sort"
          >
            {{ sort }}
          </div>
        </div>
      </div>
      <span v-on:click="search()" class="button material-icons-round"
        >search</span
      >
    </div>
    <div class="filter-view">
      <span
        v-on:click="delete genrefilters[filter]"
        v-for="filter in Object.keys(genrefilters)"
        :key="filter"
        >{{ filter }}</span
      >
    </div>
    <div class="searchresults">
      Search Results
      <div class="toggleviewbtns">
        <span v-on:click="cardsize = 'big'" class="material-icons-round">
          view_list
        </span>
        <span v-on:click="cardsize = 'small'" class="material-icons-round">
          grid_view
        </span>
      </div>
    </div>
    <cardView
      :cardsize="cardsize"
      viewmode="grid-view"
      v-bind:carddatalist="this.response"
    />
  </div>
</template>

<script>
import { AnilistQueries, executeQuery } from "@/js/anilist";
import cardView from "@/components/merged-components/card-view.vue";

export default {
  name: "searchbar",
  components: {
    cardView,
  },
  data() {
    return {
      response: [],
      genres: [], // list of all genres
      sorts: {
        SCORE: "SCORE_DESC",
        POPULARITY: "POPULARITY_DESC",
        TRENDING: "TRENDING_DESC",
        "A-Z": "TITLE_ENGLISH",
        "Z-A": "TITLE_ENGLISH_DESC",
        TRASH: "SCORE",
      }, // list of all sorts
      genrefilters: {},
      cardsize: "big",
      sortfilter: "POPULARITY", // string for now since only 1 sort filter is allowed
    };
  },
  props: ["fragment"],
  methods: {
    search() {
      let variables = {
        type: this.$refs.searchText.attributes.fragment.value, // MANGA || ANIME
        genres: Object.keys(this.genrefilters).length
          ? Object.keys(this.genrefilters)
          : null, // list of all genres selected
        search: this.$refs.searchText.value || null, // because "" doesnt match anything, null makes an empty query
        sort: [this.sorts[this.sortfilter]], // pass sort filter as array
      };
      executeQuery(AnilistQueries.searchQuery, variables).then((x) => {
        this.response = x.data.Page.media;
        console.log(this.response);
      });
    },
  },
  created() {
    executeQuery(AnilistQueries.genreCollection).then((x) => {
      this.genres = x.data.GenreCollection;
    }); // start genre collection
  },
};
</script>

<style lang="scss" scoped>
.searchresults {
  display: flex;
  font-size: 1.6rem;
  align-items: center;
  .toggleviewbtns {
    margin-left: auto;
    margin-right: 10px;
    span.material-icons-round {
      color: white;
      background-color: #08f;
      border-radius: 40px;
      padding: 10px;
    }
  }
}

.filter-view {
  padding: 10px;
  display: flex;
  cursor: pointer;
  flex-wrap: wrap;
  span {
    background-color: #08f;
    padding: 4px 8px;
    border-radius: 20px;
    color: #fff;
    margin: 0 10px 10px 0;
    &:hover::after {
      content: "✕";
      position: relative;
      padding: 0 4px;
      background: #3560d7;
      border-radius: 10px;
      margin-left: 4px;
    }
  }
}

.filter {
  position: relative;
  font-size: 1rem;
  margin-left: 10px;
  .head {
    height: 100%;
    display: flex;
    align-items: center;
    background: none;
    color: #08f;
    border-radius: 20px;
    border: 2px solid #08f;
    box-sizing: border-box;
    padding: 0 10px;
    width: 8rem;
    justify-content: center;
  }
  .item {
    height: 30px;
    min-width: max-content;
    line-height: 30px;
    padding: 0 10px;
    &:hover {
      background: #ddd;
    }
  }
  .item-list {
    display: none;
    min-width: 8rem;
    border-radius: 20px;
    border: 2px solid #08f;
    box-sizing: border-box;
    background: #eee;
    font-size: 1rem;
    position: absolute;
    overflow: hidden;
  }
  &:hover > .item-list {
    display: block;
  }
}

// .searchwrapper {
//   position: absolute;
// }

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
  z-index: 1;
  position: relative;
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
  margin: 0 auto 0 10px;
}
</style>
