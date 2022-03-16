<template>
<div class="padded-center-container">
    <div class="searchgroup">
        <input ref="searchText" v-on:change="search()" v-bind:fragment="fragment" type="text" required="required" spellcheck="false" autocorrect="off">
        <label>{{ fragment }}</label>
        <span v-on:click="search()" class="search-button unselectable material-icons-round">search</span>
    </div>
    <div class="filters">
        <div class="filter-list">
            <div class="filter-block">{{ sortfilter }}</div>
            <div class="list-view">
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
        <div class="filter-list">
            <div class="filter-block">GENRES</div>
            <div class="list-view">
                <div
                    v-for="genre in genres"
                    :key="genre"
                    v-on:click="genrefilters[genre] = 0"
                    >
                {{ genre }}
                </div>
            </div>
        </div>
        <div class="genre-chips">
            <div class="chip unselectable"
                v-on:click="delete genrefilters[filter]"
                v-for="filter in Object.keys(genrefilters)"
                :key="filter">
                {{ filter }}
            </div>
        </div>
    </div>
    <div class="title-bar">
        <h2>Search Results</h2>
        <div class="toggleviewbtns">
            <span v-on:click="cardsize = 'big'" v-bind:class="{ active : (cardsize=='big')}" class="material-icons-round">
            view_list
            </span>
            <span v-on:click="cardsize = 'small'" v-bind:class="{ active : (cardsize=='small')}" class="material-icons-round">
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

export default{
    name:"searchNew",
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
        cardsize: "small",
        sortfilter: "POPULARITY", // string for now since only 1 sort filter is allowed
        };
    },
    props: ["fragment"],
    methods:{
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
}
</script>

<style scoped lang="scss">
.toggleviewbtns{
    margin-left: auto;
    span{
        font-size: 1.6rem;
        border-radius: 100px;
        margin-left: 8px;
        color: #008bff;
        background: #008bff2b;
        transition: 200ms ease;
        padding: 8px;
        &:hover{
            box-shadow: 0 2px 2px 0px #00000052;
        }
        &.active{
            color: #fff;
            background:#008bff;
        }
    }
}
.title-bar{
    display: flex;
    margin-top: 12px;
}
.genre-chips{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.chip{
    border: 2px #0101017d solid;
    line-height: 36px;
    margin: 10px 10px 0 0;
    border-radius: 12px;
    padding: 0 10px;
    font-weight: 700;
    min-width: max-content;
    color: #111;
    transition: 200ms ease;
    background: #fff;

    display: flex;
    align-items: center;

    &:hover{
        background-color: #E63956;
    }
}
.list-view{
    z-index: 1;
    background-color: #fff;
    max-height: 0px;
    transition: 200ms ease;
    position: absolute;
    width: 100%;
    overflow-y: auto;
    overflow-x: clip;
    box-shadow: 0px 2px 10px 0px rgb(0 0 0 / 35%);
    border-radius: 0 0 8px 8px;
    
    scrollbar-color: rgb(0 0 0 / 58%) white;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-track {
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgb(0 0 0 / 58%);
        border-radius: 10px;
    }
    &>*{
        padding: 5px 5px 5px 12px;
        font-weight: 700;
        &:hover{
            background-color: rgba(0,0,0,0.32);
        }
    }
}
.filters{
    display: flex;
    flex-wrap: wrap;
}
.filter-list{
    margin-right:10px;
    width: 150px;
    position: relative;
    &:hover > .filter-block::after{
        transform: scaleY(-1);
    }
    &:hover>.filter-block{
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    &:hover>.list-view{
        max-height: 256px;
    }
}
.filter-block{
    border: 2px #08f solid;
    line-height: 44px;
    margin-top: 12px;
    border-radius: 20px;
    padding: 0 10px;
    font-weight: 700;
    min-width: 100px;
    position: relative;
    color: rgba(0,0,0,0.58);
    transition: 200ms ease;
    &::after{
        font-family: "Material Icons Round";
        transition: 200ms ease;
        content: "expand_more";
        position: absolute;
        right: 10px;
        font-size: 1.8rem;
    }
}
.searchgroup {
    margin-top: 64px;
    position: relative;
    input {
    background: none;
    box-sizing: border-box;
    color: #111;
    font-size: 18px;
    border-radius: 100px;
    border: 2px solid #08f;
    outline: none;
    width: 100%;
    line-height: 50px;
    padding: 0 50px 0 24px;
    font-weight: 700;
    text-transform: capitalize;
        &:focus ~ label,
        &:valid ~ label {
            top: -8px;
            font-size: 14px;
            background: #fff;
            left: 25px;
            color: #08f;
        }
    }

    label {
        color: rgba(0,0,0,0.58);
        font-size: 20px;
        font-weight: 700;
        position: absolute;
        pointer-events: none;
        left: 25px;
        padding: 0 4px;
        top: 12px;
        transition: 200ms ease;
    }

    .search-button{
        position: absolute;
        display: block;
        right: 0px;
        top: 0;
        line-height: 54px;
        font-size: 2rem;
        width: 54px;
        text-align: center;
        color: #008bff;
    }
}

</style>