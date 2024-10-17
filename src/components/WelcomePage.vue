<template>
  <div class="welcome">
    <div
      class="container-fluid d-flex align-items-center text-primary justify-content-center vh-100"
    >
      <div class="text-center welcome-content" ref="welcomeContainer">
        <h1
          class="display-4 mb-4 animate__animated animate__bounceInDown animate-title"
        >
          Welcome to TELEYPLAY!
        </h1>

        <div class="row justify-content-center mb-4 animated-emojis">
          <div
            class="col-4 col-md-2 mb-3"
            v-for="(emoji, index) in emojis"
            :key="index"
          >
            <img
              :src="emoji.src"
              :alt="emoji.alt"
              class="img-fluid rounded-circle emoji glowing-hover shadow-lg"
            />
          </div>
        </div>

        <button class="btn btn-gradient btn-lg pulse-button" @click="startGame">
          Start Game
        </button>
      </div>
    </div>

    <!-- Container for falling images -->
    <div
      ref="scoreContainer"
      style="position: relative; overflow: hidden"
    ></div>
  </div>
</template>

<script>
import { gsap } from "gsap";
import "animate.css"; // Import Animate.css for pre-built animations

export default {
  data() {
    return {
      images: [
        "https://cdn3.iconfinder.com/data/icons/object-emoji/50/Celebration-512.png",
        "https://www.freeiconspng.com/thumbs/celebration-icon-png/celebration-icon-png-9.png",
        "https://e7.pngegg.com/pngimages/353/573/png-clipart-computer-icons-celebration-miscellaneous-text.png",
      ],
      emojis: [
        {
          src: "https://c4.wallpaperflare.com/wallpaper/511/93/102/fantasy-samurai-banner-warrior-hd-wallpaper-preview.jpg",
          alt: "Heart",
        },
        {
          src: "https://www.shutterstock.com/image-vector/lady-samurai-red-moon-wallpaper-260nw-2371639329.jpg",
          alt: "Smile",
        },
        // Add more emojis as desired
      ],
    };
  },
  methods: {
    startGame() {
      console.log("Start Game button clicked!");
      this.$emit("startGame");
    },

    animateEmojis() {
      const emojis = this.$refs.welcomeContainer.querySelectorAll(".emoji");

      emojis.forEach((emoji) => {
        // Vertical floating animation (up-down)
        gsap.to(emoji, {
          y: "+=15",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut",
        });

        // Rotation and scaling animation
        gsap.fromTo(
          emoji,
          { scale: 0.8 },
          {
            // rotation: 50,
            scale: 1.1,
            duration: 1,
            repeat: -1,
            ease: "linear",
          }
        );
      });
    },

    createCelebrationEffect() {
      const scoreContainer = this.$refs.scoreContainer;
      const numberOfImages = 10; // Number of images to show

      for (let i = 0; i < numberOfImages; i++) {
        const img = document.createElement("img");
        img.src = this.images[Math.floor(Math.random() * this.images.length)];
        img.className = "falling-image";
        img.style.position = "absolute";
        img.style.width = "30px"; // Width of the image
        img.style.opacity = "0.7";

        // Set random position for each image, ensuring they stay within viewport
        const x = Math.random() * (window.innerWidth - 30); // Random horizontal position within viewport
        const y = Math.random() * (window.innerHeight - 30); // Random vertical position within viewport
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        scoreContainer.appendChild(img);

        // Animate the image to fade out and scale down
        gsap.fromTo(
          img,
          {
            scale: 1,
            opacity: 0.7,
          },
          {
            scale: 0.5,
            opacity: 0,
            duration: 2,
            ease: "power1.out",
            onComplete: () => img.remove(),
          }
        );
      }
    },
  },
  mounted() {
    this.animateEmojis();
    this.createCelebrationEffect(); // Start the celebration effect
  },
};
</script>

<style scoped>
/* Emoji hover effect with glowing border */
.welcome {
  background: linear-gradient(135deg, #7c45ea, #15dfea);
  /* background-image: url("https://wallpapercave.com/wp/wp12875104.png"); Correct syntax */
  background-size: cover; /* Optional: Cover the entire area */
  background-position: center; /* Optional: Center the image */
}

.glowing-hover {
  transition: box-shadow 0.6s, transform 0.3s;
}
.glowing-hover:hover {
  box-shadow: 0 0 15px rgba(72, 239, 255, 0.7), 0 0 30px rgba(72, 239, 255, 0.7);
  transform: scale(1.2);
}

/* Animated pulse effect for the button */
.pulse-button {
  animation: pulse 2s infinite;
  background: linear-gradient(45deg, #4caf50, #81c784);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 15px 30px;
  transition: transform 0.3s;
}
.pulse-button:hover {
  transform: scale(1.1);
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(182, 150, 233, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(72, 239, 255, 1);
  }
}

/* Animate title glow effect */
.animate-title {
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.7);
}

/* Add styles for falling images */
.falling-image {
  pointer-events: none; /* Prevent interaction with falling images */
}

/* New styles for emoji circular effect */
.emoji {
  width: 100px; /* Set width and height to keep them circular */
  height: 100px;
  object-fit: cover; /* Ensure the image covers the circle */
}
</style>
