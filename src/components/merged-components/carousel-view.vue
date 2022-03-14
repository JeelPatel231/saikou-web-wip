<template>
<div class="scrollwrapper">
<div class="slide-buttons unselectable material-icons-round" v-on:click="changeCurrent(-1);resetTimer()">navigate_before</div>
<div ref="scrollparent" class="scrollparent">
    <div v-for="item in response" :key="item" class="carousel-item">
        <div class="bannerImage" v-bind:style="{backgroundImage : `url('${item.bannerImage ?? item.coverImage.extraLarge}')` }"></div>
        <div class="info-grid padded-center-container">
        <router-link style="margin: 0 auto;" :to="{ name: 'Info', params: { id: item.id } }">
            <img class="coverImage" :src="item.coverImage.large">
        </router-link>
        <div class="content">
            <div class="title">{{item.title.english ?? item.title.userPreferred}}</div>
            <div v-if="item.nextAiringEpisode || item.episodes" class="info">Episodes : {{item.nextAiringEpisode ? item.nextAiringEpisode.episode + " /" : ''}} {{item.episodes ?? "~"}}</div>
            <div v-if="item.chapters" class="info">Chapters : {{item.chapters}}</div>
        </div>
        </div>
    </div>
</div>
<div class="slide-buttons end unselectable material-icons-round" v-on:click="changeCurrent(1);resetTimer()">navigate_next</div>
</div>
</template>

<script>
import { executeQuery } from "@/js/anilist";

export default {
    name:"carousel",
    data(){
        return{
            response:[],
            current : 1,
            myTimer : null, // timer as data to access within diff functions
        }
    },
    props:["query","variables"],
    methods:{
        apicall() {
            if (this.query != undefined) {
                executeQuery(this.query,this.variables).then((x) => {
                    this.response = this.response.concat(x.data.Page.media); // if query is defined, make a call and move array to response
                    console.log(this.response);
                }); // execute query
                this.page++
            } // if statement
        }, // api call()
        changeCurrent(direction){
            let scrollView = this.$refs.scrollparent
            let count = scrollView.childElementCount
            if(this.current == count-1 && direction==1){this.current = 0} // reset to 0 when limit reached
            else if(this.current == 0 && direction==-1){this.current = count-1} // go to last element 
            else{this.current+=direction} // go with the direction provided
            scrollView.scrollLeft = scrollView.clientWidth*this.current
        },
        resetTimer(){
            // this function is called to reset timer when a button is clicked
            // to avoid multiple switches, from user and system simultaneously
            clearInterval(this.myTimer)
            this.myTimer = setInterval(()=>{
                this.changeCurrent(1)
            },4000)
        }
    },
    created(){
        this.apicall()
    },
    updated(){
        this.resetTimer()
    },
    watch:{
        $route(){
            clearInterval(this.myTimer)
        }
    } 
}
</script>

<style lang="scss" scoped>

$carousel-breakpoint:650px;

.slide-buttons {
  position: absolute;
  z-index: 1;
  background: #fff;
  top: 0;
  opacity: 0;
  transition: 200ms ease;
  font-size: 3rem;
  border-radius: 100%;
  margin: 10rem 10px 10px 10px;
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
.scrollwrapper{
    position: relative;
    &:hover >.slide-buttons{
        opacity: 0.7;
    } 
}
.button{
  position: absolute;
  top: 0;
  z-index: 1;
  &.left{
      left: 0;
  }
  &.right{
      right: 0;
  }
}
.scrollparent{
    position: relative;
    height: 400px;
    display: flex;
    overflow: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
}
.info-grid{
    display: grid;
    grid-template-columns: min-content auto;
    grid-template-rows: 1fr;
    align-items: center;
    position: relative;
    box-sizing: border-box;

    @media screen and (max-width: $carousel-breakpoint) {
        grid-template-columns: 1fr;
        grid-template-rows: min-content auto;
    }
}

.content{
    color:#fff;
    align-self: flex-end;
    margin: 20px;
    @media screen and (max-width:$carousel-breakpoint) {
        text-align: center;
    }

    .title{
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: 0.02rem;

        // clamp lines to 2
        -webkit-line-clamp: 2;
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
    }

}
.carousel-item{
    position: relative;
    width: 100%;
    flex-shrink: 0;
    scroll-snap-align: center;
    display: flex;
    align-items: center;
}
.bannerImage{
    position: absolute;
    height: 100%;
    width: 100%;
    filter: brightness(0.6);
    background-repeat: no-repeat;
    background-position: 50% 35%;
    background-position-y: 35%;
    background-size: cover;
}
.coverImage{
    height: 16rem;
    border-radius: 16px;
    box-shadow: 0px 0px 16px 0 #6060608c;
}
</style>