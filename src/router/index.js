import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Overview",
    component: () => import('../views/Overview.vue')
  },
  {
    path: "/symptoms",
    name: "Symptoms",
    component: () => import("../views/Symptoms.vue")
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("../views/Test.vue")
  }
  ,
  {
    path: "/preventions",
    name: "Preventions",
    component: () => import("../views/Preventions.vue")
  }
  ,
  {
    path: "/hospital",
    name: "Hospital",
    component: () => import("../views/Hospital.vue")
  }
  ,
  {
    path: "/emergency",
    name: "Emergency",
    component: () => import("../views/Emergency.vue")
  }
  ,
  {
    path: "/journal",
    name: "Journal",
    component: () => import("../views/Diary.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
