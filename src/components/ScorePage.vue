<template>
  <div
    class="score score-container text-center my-4 vh-100"
    ref="scoreContainer"
  >
    <h2>Congratulations!</h2>
    <h3>Your Score: {{ score }}</h3>
    <button class="btn btn-success mt-3" @click="restartQuiz">
      Restart Quiz
    </button>
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
        // Add your image URLs here
        "https://cdn3.iconfinder.com/data/icons/object-emoji/50/Celebration-512.png",
        "https://www.freeiconspng.com/thumbs/celebration-icon-png/celebration-icon-png-9.png",
        "https://e7.pngegg.com/pngimages/353/573/png-clipart-computer-icons-celebration-miscellaneous-text.png",
        // Add more images as needed
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
      const numberOfImages = 100; // Adjust the number of images

      // First loop
      for (let i = 0; i < numberOfImages; i++) {
        const img = document.createElement("img");
        img.src = this.images[Math.floor(Math.random() * this.images.length)]; // Random image from the array
        img.className = "falling-image";
        img.style.position = "absolute";
        img.style.top = "-50px"; // Start above the screen
        img.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        img.style.width = "50px"; // Adjust image size
        img.style.opacity = "0.7"; // Semi-transparent effect
        this.$refs.scoreContainer.appendChild(img);

        // Animate the image falling down
        gsap.to(img, {
          y: window.innerHeight + 50, // Move it below the screen
          duration: Math.random() * 2 + 3, // Random duration between 3 and 5 seconds
          ease: "power1.out",
          onComplete: () => {
            img.remove(); // Remove the image after falling
          },
        });
      }

      // Delay between the first and second loop
      await this.sleep(2000); // 2 seconds delay

      // Second loop
      for (let i = 0; i < numberOfImages; i++) {
        const img = document.createElement("img");
        img.src = this.images[Math.floor(Math.random() * this.images.length)]; // Random image from the array
        img.className = "falling-image";
        img.style.position = "absolute";
        img.style.top = "-50px"; // Start above the screen
        img.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        img.style.width = "50px"; // Adjust image size
        img.style.opacity = "0.7"; // Semi-transparent effect
        this.$refs.scoreContainer.appendChild(img);

        // Animate the image falling down
        gsap.to(img, {
          y: window.innerHeight + 50, // Move it below the screen
          duration: Math.random() * 2 + 3, // Random duration between 3 and 5 seconds
          ease: "power1.out",
          onComplete: () => {
            img.remove(); // Remove the image after falling
          },
        });
      }

      // Delay between the second and third loop
      await this.sleep(2000); // 2 seconds delay

      // Third loop
      for (let i = 0; i < numberOfImages; i++) {
        const img = document.createElement("img");
        img.src = this.images[Math.floor(Math.random() * this.images.length)]; // Random image from the array
        img.className = "falling-image";
        img.style.position = "absolute";
        img.style.top = "-50px"; // Start above the screen
        img.style.left = `${Math.random() * 100}vw`; // Random horizontal position
        img.style.width = "50px"; // Adjust image size
        img.style.opacity = "0.7"; // Semi-transparent effect
        this.$refs.scoreContainer.appendChild(img);

        // Animate the image falling down
        gsap.to(img, {
          y: window.innerHeight + 50, // Move it below the screen
          duration: Math.random() * 2 + 3, // Random duration between 3 and 5 seconds
          ease: "power1.out",
          onComplete: () => {
            img.remove(); // Remove the image after falling
          },
        });
      }
    },
  },
  mounted() {
    this.createRainOfImages(); // Call the method when the component is mounted
  },
};
</script>

<style scoped>
.score {
  background: linear-gradient(135deg, #83a4d4, #b6fbff);
}
.falling-image {
  transition: opacity 0.5s;
  will-change: transform; /* Helps improve performance during animations */
}
</style>
