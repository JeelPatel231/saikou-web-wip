import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home.vue";
import Anime from "@/views/anime.vue";
import Manga from "@/views/manga.vue";
import Search from "@/views/search.vue";
import Media from "@/views/media.vue";
import watchtab from "@/components/small-components/watchtab.vue";
import infotab from "@/components/small-components/infotab.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/anime",
    name: "Anime",
    component: Anime,
  },
  {
    path: "/manga",
    name: "Manga",
    component: Manga,
  },
  {
    path: "/search/:fragment",
    name: "Search",
    component: Search,
    props:true,
  },
  {
    path: "/media/",
    name: "Media",
    component: Media,
    children: [
      {
        path: "info/:id(\\d+)",
        name: "Info",
        components: {
          tab: infotab,
        },
      },
      {
        path: "watch/:id(\\d+)",
        name: "Watch",
        components: {
          tab: watchtab,
        },
      },
    ],
  },
  // {
  //   path: "/manga",
  //   name: "Manga",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "@/views/manga.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
