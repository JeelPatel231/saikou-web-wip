<template>
  <div id="bottombar" class="bottombar unselectable">
    <div class="pill">
      <router-link class="icon" :to="{ name: 'Anime' }">
        <span class="material-icons-round">movie_filter</span>
      </router-link>
      <router-link class="icon" :to="{ name: 'Home' }">
        <span class="material-icons-round">home</span>
      </router-link>
      <router-link class="icon" :to="{ name: 'Manga' }">
        <span class="material-icons-round">import_contacts</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottombar",
  data() {
    return {
      currentTab: "anime",
    };
  },
  methods: {
    // scrollListener(){
    //   window.addEventListener("scroll",()=>{
    //     const scrolled = window.scrollY;
    //     if(this.scrollBefore > scrolled && this.scrollState != "up"){
    //         this.scrollState = "up"
    //         this.scrollBefore = scrolled;
    //         //
    //         console.log("ScrollUP");
    //     }else if(this.scrollState != "down"){
    //         this.scrollBefore = scrolled;
    //         this.scrollState = "down"
    //         //
    //         console.log("ScrollDOWN");
    //     }
    //   })
    // }
  },
  mounted() {
    // this.scrollListener()
  },
};
</script>

<style>
.bottombar {
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100vw;
  justify-content: center;
  padding-bottom: 30px;
}

.pill {
  height: 48px;
  width: 192px;
  background: #1b1b1b;
  border-radius: 30px;
  display: flex;
  padding: 0 10px;
  overflow: hidden;
  cursor: pointer;
}

.icon {
  min-width: 20px;
  flex: 1;
  color: white;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden {
  bottom: -100px;
}
</style>
