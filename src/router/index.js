import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/home.vue";
import Anime from "@/views/anime.vue";
import Manga from "@/views/manga.vue";
import Search from "@/views/search.vue";
import Info from "@/views/info.vue";
import Watch from "@/views/watch.vue";

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
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/info/:id",
    name: "Info",
    component: Info,
  },
  {
    path: "/watch/:id",
    name: "Watch",
    component: Watch,
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
