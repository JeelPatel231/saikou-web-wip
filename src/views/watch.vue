<template>
    <infoheader :response="response"/>
    <div class="watch">
        WATCH
    </div>
</template>

<script>
import { AnilistQueries, executeQuery } from "@/js/anilist";
import infoheader from "@/components/small-components/info-header.vue"
export default {
  name: "Watch",
  components:{
      infoheader
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

<style scoped lang="scss"></style>