<template>
  <header ref="header" class="header">
    <h1 class="logo">My Quiz Game</h1>
    <nav class="nav">
      <ul ref="navList" class="nav-list">
        <li class="nav-item" v-for="(item, index) in navItems" :key="index">
          {{ item }}
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { gsap } from "gsap";

export default {
  data() {
    return {
      navItems: ["Home", "About", "Quizzes", "Contact"],
    };
  },
  mounted() {
    this.animateHeader();
  },
  methods: {
    animateHeader() {
      gsap.from(this.$refs.header, { y: -100, opacity: 0, duration: 1 });
      gsap.fromTo(
        this.$refs.navList.children,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
      );
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #4a90e2;
  color: white;
  padding: 20px;
  text-align: center;
}

.logo {
  font-size: 2em;
  margin-bottom: 10px;
}

.nav {
  margin-top: 10px;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 30px;
}

.nav-item {
  cursor: pointer;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #ffcc00;
  transform: scale(1.1);
}
</style>
