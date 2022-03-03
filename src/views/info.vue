<template>
    <img class="bannerImage" :src="response.bannerImage ? response.bannerImage : response.coverImage.large">
    <div class="container">
        <div class="grid">
            <img class="coverImage" :src="response.coverImage.large" >
            <div class="info color-setter">
                <div class="status">{{response.status}}</div>
                <div class="title">{{response.title.userPreferred}}</div>
            </div>
            <div class="anilist-btn color-setter">
                ADD TO LIST
            </div>
            <div class="description" v-on:click="collapsed = !collapsed" v-bind:class="{collapsed : collapsed}" v-html="response.description"></div>
        </div>
    </div>
</template>

<script>
import { AnilistQueries, executeQuery } from "@/js/anilist";

export default {
  name: "Info",
  data(){
      return{
          id:this.$route.params.id,
          response:{},
          collapsed : true,
      }
  },
  created(){
      executeQuery(AnilistQueries.mediaInfo,{id:this.id}).then(x=>{this.response=x.data.Media})
  }
}
</script>

<style scoped lang="scss">

$media-critical-point:600px;
.color-setter{
    color:white;
    @media screen and (min-width:$media-critical-point) {
        color: black;
    }
}

.container{
    display: flex;
    justify-content: center;
}

.status{
    padding: 10px 0 0 20px;
}
.title{
    font-size: 1.3rem;
    @media screen and (min-width:$media-critical-point) {
        font-size: 2rem;
    }
}

.grid{
    display: grid;
    grid-template-areas:
    'cover none'
    'cover info'
    'button button'
    'desc desc';
    grid-template-columns: min-content auto;
    gap: 10px;
    max-width: 1420px;
    padding: 10px 30px;
    @media screen and (min-width:$media-critical-point) {
        grid-template-rows: 100px 80px 145px auto;
        grid-template-areas: 
        'cover none'
        'cover info'
        'cover desc'
        'button desc';
        margin-top: 160px;
    }
}
span.filler{
    grid-area: filler;
    height: 300px;
}
.description{
    grid-area: desc;
    line-height: 1.3rem;
    @media screen and (min-width:$media-critical-point) {
        padding: 10px 0 0 20px;
    }
    &.collapsed{
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 10;
        -webkit-box-orient: vertical;
    }
}

.anilist-btn{
    height: 40px;
    border: 2px #08f solid;
    box-sizing: border-box;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0px;
    grid-area: button;
}
.info{
    display: flex;
    flex-direction: column-reverse;
    grid-area: info;
    &>*{
        padding: 10px 0 0 20px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        @media screen and (min-width:$media-critical-point) {
            -webkit-line-clamp: 1; // desktop view
        }
    }
}
img.bannerImage{
    height: 280px;
    object-fit: cover;
    width: 100vw;
    top: 0;
    z-index: -1;
    position: absolute;
    filter: brightness(0.6);
}
img.coverImage{
    border-radius: 20px;
    box-shadow: 0px 0px 20px 0;
    height: 200px;
    grid-area: cover;
    @media screen and (min-width:$media-critical-point) {
        height: 350px;
    }
}

</style>