<template>
<div class="scrollparent">
    <div v-for="item in response" :key="item" class="carousel-item">
        <div class="bannerImage" v-bind:style="{backgroundImage : `url('${item.bannerImage ? item.bannerImage : item.coverImage.large}')` }"></div>
        <div class="info-grid">
        <img class="coverImage" :src="item.coverImage.large">
        <div class="content">
            <div class="title">{{item.title.english}}</div>
            <div v-if="item.nextAiringEpisode || item.episodes" class="info">Episodes : {{item.nextAiringEpisode ? item.nextAiringEpisode.episode + " /" : ''}} {{item.episodes ? item.episodes : "~"}}</div>
            <div v-if="item.chapters" class="info">Chapters : {{item.chapters}}</div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
import { executeQuery } from "@/js/anilist";

export default {
    name:"carousel",
    data(){
        return{
            response:[],
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
    },
    created(){
        this.apicall()
    }
}
</script>

<style lang="scss" scoped>

$carousel-breakpoint:650px;
.scrollparent{
    position: relative;
    height: 400px;
    display: flex;
    overflow: auto;
    scroll-snap-type: x mandatory;

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
    margin: 0 auto;
    max-width: 1200px;
    padding: 20px;
    box-sizing: border-box;
    width: 100%;

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
    background-attachment: fixed;
    background-position-x: center;
    background-repeat: no-repeat;
    background-size: auto 400px; // auto {{ parent height }}
}
.coverImage{
    height: 16rem;
    margin: 0 auto;
    border-radius: 16px;
    box-shadow: 0px 0px 16px 0 #6060608c;
}
</style>