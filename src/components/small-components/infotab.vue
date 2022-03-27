<template>
  <div class="container">
    <div class="gridtable padded-32">
      <span>Name</span> <span>{{ details.title.english }}</span>
      <span>Name Romaji</span> <span>{{ details.title.romaji }}</span>
      <span>Mean Score</span> <span>{{ details.meanScore / 10 }} / 10</span>
      <span>Status</span> <span>{{ details.status }}</span>
      <span v-if="details.episodes">Total Episodes</span>
      <span v-if="details.episodes">{{ details.episodes }}</span>
      <span v-if="details.chapters">Total Chapters</span>
      <span v-if="details.chapters">{{ details.chapters }}</span>
      <span v-if="details.duration">Average Duration</span>
      <span v-if="details.duration">{{ details.duration }}</span>
      <span>Format</span> <span>{{ details.format }}</span> <span>Source</span>
      <span>{{ details.source }}</span>
      <span v-if="details.studios.nodes.length">Studio</span>
      <span v-if="details.studios.nodes.length">{{
        details.studios.nodes[0].name
      }}</span>
      <span v-if="details.season">Season</span>
      <span v-if="details.season">{{ details.season }}</span>
      <span>Start Date</span>
      <span>{{
        `${details.startDate.year}-${details.startDate.month}-${details.startDate.day}`
      }}</span>
      <span>End Date</span>
      <span>{{
        `${details.endDate.year}-${details.endDate.month}-${details.endDate.day}`
      }}</span>
    </div>
    <h2 class="padded-32">Synonyms</h2>
    <div class="genre-chips unselectable padded-32">
      <div v-for="synonym in details.synonyms" :key="synonym" class="chip">{{synonym}}</div>
    </div>
    <h2 v-if="details.trailer" class="padded-32">Trailer</h2>
    <div v-if="details.trailer" class="padded-32">
      <video class="trailer-video" controls :src="ytsrc" />
    </div>
    <h2 class="padded-32">Tags</h2>
    <div class="genre-chips unselectable padded-32">
      <div v-for="tag in details.tags" :key="tag" class="chip">{{tag.name}} : {{tag.rank}}%</div>
    </div>
    <h2 class="padded-32">Genres</h2>
    <div class="genre-view unselectable padded-32">
      <GenreCard v-for="genre in details.genres" :key="genre" :genre="genre" />
    </div>
    <h2 class="padded-32">Characters</h2>
    <CardView
      :cardsize="'character'"
      viewmode="slide-view"
      v-bind:carddatalist="details.characters.edges"
    />
    <h2 class="padded-32">Relations</h2>
    <CardView
      :cardsize="'small'"
      viewmode="slide-view"
      v-bind:carddatalist="details.relations.edges"
      nestedPath="node"
    />
    <h2 class="padded-32">Recommendations</h2>
    <CardView
      :cardsize="'small'"
      viewmode="slide-view"
      v-bind:carddatalist="details.recommendations.nodes"
      nestedPath="mediaRecommendation"
    />
  </div>
</template>

<script>
import CardView from "@/components/merged-components/card-view.vue";
import GenreCard from "@/components/small-components/genre-card.vue";

export default {
  name: "infotab",
  props: ["details", "id", "fragment"], // id here to suppress props pass warning
  components: { CardView, GenreCard },
  data(){
    return{
      ytsrc : null,
      invidiousHost:"https://vid.puffyan.us",
    }
  },
  methods:{
    getVideoLinks(){
      if(!this.details.trailer) return 
      fetch(`${this.invidiousHost}/api/v1/videos/${this.details.trailer.id}?fields=formatStreams`).then(x=>x.json())
      .then((x)=>{
        var listurl = x.formatStreams;
        console.log(listurl)
        this.ytsrc = listurl[listurl.length - 1].url
      })
    }
  },
  created(){
    this.getVideoLinks()
  }
};
</script>

<style lang="scss" scoped>
.padded-32 {
  padding: 8px 32px;
}
.gridtable {
  font-size: 1rem;
  display: grid;
  grid-template-columns: max-content auto;
  margin-bottom: 20px;
  span {
    padding-right: 40px;
  }
}
.container {
  background: #eee;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px 0px;
  box-sizing: border-box;
}
.genre-view {
  display: flex;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    justify-content: center;
  }
}
.trailer-video{
  width: 100%;
  max-width: 720px;
  border-radius: 16px;
}
.genre-chips{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    overflow-x: auto;
    @media screen and (max-width: 700px) {
      flex-wrap: nowrap;
      scrollbar-width: none;
      &::-webkit-scrollbar {
          display: none;
      }
    }
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
}
</style>
