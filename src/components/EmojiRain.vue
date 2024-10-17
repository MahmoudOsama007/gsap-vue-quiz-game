<template>
  <div class="emoji-rain-container">
    <img
      v-for="emoji in emojis"
      :key="emoji.id"
      :src="require('@/assets/emoji/Vector Smart Object-3.svg')"
      :style="emoji.style"
      class="falling-emoji"
      alt="Falling Emoji"
    />
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "EmojiRain",
  data() {
    return {
      emojis: [],
    };
  },
  mounted() {
    this.createEmojis();
    this.$nextTick(() => {
      this.animateEmojis();
    });
  },
  methods: {
    createEmojis() {
      for (let i = 0; i < 50; i++) {
        this.emojis.push({
          id: i,
          style: {
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 100}%`,
          },
        });
      }
    },
    animateEmojis() {
      gsap.to(".falling-emoji", {
        y: "200vh",
        duration: 3,
        ease: "none",
        repeat: -1,
        stagger: {
          each: 0.1,
          from: "random",
        },
      });
    },
  },
};
</script>

<style scoped>
.emoji-rain-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
}

.falling-emoji {
  position: absolute;
  width: 30px;
  height: 30px;
}
</style>
