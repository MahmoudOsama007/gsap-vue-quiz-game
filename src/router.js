import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "./components/HomePage.vue";
import QuizGame from "./components/QuizGame.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/quiz-game", name: "quiz", component: QuizGame },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
