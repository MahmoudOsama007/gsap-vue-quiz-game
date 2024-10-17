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
  props: {
    triggerAnimation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      emojis: [],
    };
  },
  watch: {
    triggerAnimation: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.createEmojis();
          this.$nextTick(() => {
            this.animateEmojis();
          });
        }
      },
    },
  },
  methods: {
    createEmojis() {
      this.emojis = [];
      for (let i = 0; i < 50; i++) {
        this.emojis.push({
          id: i,
          style: {
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 100 + 100}%`, // Start above the screen
          },
        });
      }
    },
    animateEmojis() {
      gsap.to(".falling-emoji", {
        y: "200vh",
        duration: 4,
        ease: "none",
        repeat: -1,
        stagger: {
          each: 0.2,
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
