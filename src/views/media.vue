<template>
    <infoheader :response="response"/>
    <div style="background-color: #eee;">
        <div class="tabbar">
            <router-link :to="{name:'Info'}">
                <div class="tab-item">INFO</div>
            </router-link>
            <router-link :to="{name:'Watch'}">
                <div class="tab-item">WATCH</div>
            </router-link>
        </div>
        <router-view name="tab" :id="this.$route.params.id" :details="response" v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<script>
import { AnilistQueries, executeQuery } from "@/js/anilist";
import infoheader from "@/components/small-components/info-header.vue"
export default {
  name: "Media",
  components:{
      infoheader,
  },
  data(){
    return{
        response : {},
    }
  },
  created(){
      executeQuery(AnilistQueries.mediaInfo,{id:this.$route.params.id}).then(x=>{this.response=x.data.Media})
  }
}
</script>

<style scoped lang="scss">
.tabbar{
    display: flex;
    text-align: center;
    align-items: center;
    font-size: 1.3rem;
    background: #ffff;
    flex: 1;
    font-weight: 700;
    top: 0;
    position: sticky;
    z-index: 1;
    box-shadow: 0px 4px 8px 0 #60606070;
    &>*{
        flex:1;
        padding:10px 0;
    }
}
</style>