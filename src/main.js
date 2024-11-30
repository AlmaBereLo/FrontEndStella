import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";

// LightBootstrap plugin
import LightBootstrap from "./light-bootstrap-main";
<<<<<<<<< Temporary merge branch 1
import axios from "axios";  // Asegúrate de importar axios directamente
import VueAxios from "vue-axios";  // Importa VueAxios correctamente
=========
import axios from "axios";
//import VueAxios from "vue-axios";
>>>>>>>>> Temporary merge branch 2
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

// router setup
import routes from "./routes/routes";

import "./registerServiceWorker";

// plugin setup
Vue.use(VueRouter);
Vue.use(LightBootstrap);
<<<<<<<<< Temporary merge branch 1
Vue.use(VueAxios, axios);
=========
Vue.use(axios);


>>>>>>>>> Temporary merge branch 2
// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: "nav-item active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
  router,
});
