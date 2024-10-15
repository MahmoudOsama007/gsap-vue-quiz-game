<template>
  <div class="welcome">
    <div
      class="container-fluid vh-100 d-flex align-items-center justify-content-center"
    >
      <div class="text-center welcome-content" ref="welcomeContainer">
        <h1
          class="display-4 mb-4 text-primary animate__animated animate__bounceInDown animate-title"
        >
          Welcome to the Quiz Game!
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
  </div>
</template>

--- ### Script Section ```javascript
<script>
import { gsap } from "gsap";
import "animate.css"; // Import Animate.css for pre-built animations

export default {
  data() {
    return {
      emojis: [
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
          alt: "Heart",
        },
        {
          src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
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
        gsap.to(emoji, {
          y: "+=15",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut",
        });

        gsap.fromTo(
          emoji,
          { rotation: 0 },
          {
            rotation: 360,
            duration: 3,
            repeat: -1,
            ease: "linear",
          }
        );
      });
    },
  },
  mounted() {
    this.animateEmojis();
  },
};
</script>
<style scoped>
/* Emoji hover effect with glowing border */
.welcome {
  background: linear-gradient(135deg, #9175c8, #1ca8af);
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
    box-shadow: 0 0 5px rgba(72, 239, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 20px rgba(72, 239, 255, 1);
  }
}

/* Animate title glow effect */
.animate-title {
  text-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
}
</style>
