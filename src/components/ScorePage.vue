<template>
  <div class="score-container d-flex text-center vh-100" ref="scoreContainer">
    <div class="overlay"></div>
    <!-- Add overlay div for gray background -->
    <div class="score text-center align-content-center">
      <div class="content">
        <h2>Congratulations!</h2>
        <h3>Your Score: {{ score }}</h3>
        <button class="btn btn-success mt-3" @click="restartQuiz">
          Restart Quiz
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    score: Number,
  },
  data() {
    return {
      images: [
        "https://cdn3.iconfinder.com/data/icons/object-emoji/50/Celebration-512.png",
        "https://www.freeiconspng.com/thumbs/celebration-icon-png/celebration-icon-png-9.png",
        "https://e7.pngegg.com/pngimages/353/573/png-clipart-computer-icons-celebration-miscellaneous-text.png",
      ],
    };
  },
  methods: {
    restartQuiz() {
      this.$emit("restart"); // Emit the restart event
    },

    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    async createRainOfImages() {
      await this.$nextTick(); // Ensure the DOM is ready

      const scoreContainer = this.$refs.scoreContainer;
      if (!scoreContainer) {
        console.error("Score container not found.");
        return;
      }

      const numberOfImages = 100;

      for (let i = 0; i < numberOfImages; i++) {
        const img = document.createElement("img");
        img.src = this.images[Math.floor(Math.random() * this.images.length)];
        img.className = "falling-image";
        img.style.position = "absolute";
        img.style.top = `${-Math.random() * 100}px`; // Start from a negative top value to create the overflow effect
        img.style.left = `${Math.random() * 100}vw`;
        img.style.width = "50px";
        img.style.opacity = "0.8";

        scoreContainer.appendChild(img);

        gsap.to(img, {
          y: window.innerHeight + 50,
          duration: Math.random() * 2 + 3,
          ease: "power1.out",
          onComplete: () => img.remove(),
        });
      }

      await this.sleep(2000);
      this.createRainOfImages(); // Optional: repeat the animation
    },
  },
  mounted() {
    // this.createRainOfImages();
  },
};
</script>

<style scoped>
.score-container {
  display: flex;
  align-items: center; /* Vertical centering */
  justify-content: center; /* Horizontal centering */
  max-height: 100vh; /* Limit the maximum height to 100vh */
  overflow: hidden; /* Hide overflowing content */
  position: relative; /* Allow absolute positioning of falling images */
  background-image: url("https://wallpapers.com/images/hd/1080p-for-honor-background-1920-x-1080-3fcn40avxh3xj3is.jpg"); /* Background image */
  background-size: cover; /* Cover the entire area */
  background-position: center; /* Center the image */
  color: white;
}

.overlay {
  position: absolute; /* Position overlay on top of background */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(128, 128, 128, 0.5); /* Gray background with transparency */
  z-index: 1; /* Place the overlay below the score content */
}

.score {
  position: relative; /* Ensure the content stays above the overlay */
  z-index: 2; /* Make sure score content is above the overlay */
}

.content {
  text-align: center;
}

.falling-image {
  transition: opacity 0.5s;
  will-change: transform;
}
</style>
