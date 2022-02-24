import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueLazyLoad from "vue3-lazyload";

createApp(App).use(VueLazyLoad).use(router).mount("#app");
