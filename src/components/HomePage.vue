<template>
  <div class="page-container">
    <header class="header">
      <div class="logo">
        <span class="logo-text">TELEPLAY</span>
      </div>
    </header>
    <div class="home-container">
      <div class="content-wrapper">
        <div class="emoji-container" ref="emojiContainer">
          <div class="main-emoji emoji">
            <img
              src="@/assets/emoji/Vector Smart Object-1.svg"
              alt="Main Emoji"
            />
          </div>
          <div class="secondary-emoji angry emoji">
            <img
              src="@/assets/emoji/Vector Smart Object-3.svg"
              alt="Angry Emoji"
            />
          </div>
          <div class="secondary-emoji surprised emoji">
            <img
              src="@/assets/emoji/Vector Smart Object-2.svg"
              alt="Surprised Emoji"
            />
          </div>
          <div class="secondary-emoji heart emoji">
            <img
              src="@/assets/emoji/Vector Smart Object-5.svg"
              alt="Heart Emoji"
            />
          </div>
          <div class="secondary-emoji sad emoji">
            <img src="@/assets/emoji/Sad.svg" alt="Sad Emoji" />
          </div>
          <div class="circle"></div>
          <div class="blue-line-img emoji secondary-emoji">
            <img src="@/assets/emoji/blue-line.svg" alt="Blue Line" />
          </div>
          <div class="pink-line emoji secondary-emoji">
            <img src="@/assets/emoji/pink-line.svg" alt="Pink Line" />
          </div>
          <div class="orange-rectangle emoji secondary-emoji">
            <img
              src="@/assets/emoji/orange-rectangle.svg"
              alt="Orange Rectangle"
            />
          </div>
          <div class="orange-rectangle2 emoji secondary-emoji">
            <img
              src="@/assets/emoji/orange-rectangle.svg"
              alt="Orange Rectangle"
            />
          </div>
          <div class="yellow-circle emoji secondary-emoji">
            <img src="@/assets/emoji/yellow-circle.svg" alt="Yellow Circle" />
          </div>
          <div class="red-circle"></div>
        </div>
        <h1 class="game-title">
          <span class="tele">TELE</span><span class="play">PLAY</span>
        </h1>
        <p class="game-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
        <button
          class="start-button"
          ref="startButton"
          @click="startGameWithAnimation"
        >
          START GAME
        </button>
      </div>
    </div>
    <!-- Container for falling images -->
    <div ref="scoreContainer" class="score-container"></div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "HomePage",
  data() {
    return {
      images: [
        "https://cdn3.iconfinder.com/data/icons/object-emoji/50/Celebration-512.png",
        "https://www.freeiconspng.com/thumbs/celebration-icon-png/celebration-icon-png-9.png",
        "https://e7.pngegg.com/pngimages/353/573/png-clipart-computer-icons-celebration-miscellaneous-text.png",
      ],
    };
  },
  mounted() {
    this.animateEmojis();
    this.animateButton();
  },
  methods: {
    animateEmojis() {
      const emojis = this.$refs.emojiContainer.querySelectorAll(".emoji");

      emojis.forEach((emoji) => {
        gsap.to(emoji, {
          scale: 1.1,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      });
    },
    animateButton() {
      const button = this.$refs.startButton;

      gsap.to(button, {
        scale: 1.05,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      gsap.to(button, {
        boxShadow: "0 0 20px rgba(72, 239, 255, 1)",
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    startGameWithAnimation() {
      gsap.to(this.$el, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          this.startGame();
        },
      });
    },
    startGame() {
      console.log("Start Game button clicked!");
      // Navigate to the QuizGame component
      this.$router.push("/quiz-game");
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
        const x = Math.random() * (window.innerWidth - 30);
        const y = Math.random() * (window.innerHeight - 30);
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
};
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.header {
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  width: 120px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #9c27b0;
}

.home-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.content-wrapper {
  text-align: center;
  max-width: 1000px;
  position: relative;
  background-color: #e8f5e9;
  padding: 60px 40px;
  border-radius: 20px;
}

.emoji-container {
  position: relative;
  height: 400px;
  width: 400px;
  margin: 0 auto 40px;
}

.main-emoji,
.secondary-emoji {
  position: absolute;
}

.main-emoji {
  width: 120px;
  height: 120px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.secondary-emoji {
  width: 60px;
  height: 60px;
}

.angry {
  top: 15%;
  left: 15%;
  z-index: 1;
}
.surprised {
  top: 15%;
  right: 13%;
  z-index: 1;
}
.heart {
  bottom: 12%;
  left: 19%;
  z-index: 1;
}
.sad {
  bottom: 30%;
  right: 10%;
  font-size: 50px;
  z-index: 1;
}

.circle {
  position: absolute;
  width: 300px;
  height: 300px;
  border: 2px dashed #ccc;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.blue-line,
.pink-line,
.orange-rectangle,
.yellow-circle,
.red-circle {
  position: absolute;
}

.blue-line {
  width: 60px;
  height: 4px;
  /* background-color: #00bcd4; */
  top: 45%;
  left: 5%;
  transform: rotate(45deg);
}
.blue-line-img {
  top: 45%;
  left: 5%;
  transform: rotate(-45deg);
}

.pink-line {
  /* width: 40px;
  height: 40px;
  border: 3px solid #ff4081; */
  /* border-radius: 50% 50% 50% 0; */
  width: 100px;
  height: 100px;
  bottom: -3%;
  right: 22%;
  transform: rotate(5deg);
}

.orange-rectangle {
  /* width: 25px;
  height: 50px;
  background-color: #ff9800; */
  bottom: -3%;
  right: -40%;
  transform: rotate(44deg);
}
.orange-rectangle2 {
  top: -10%;
  left: -19%;
  transform: rotate(-33deg);
}
.yellow-circle {
  /* width: 40px;
  height: 40px;
  background-color: #ffeb3b; */
  border-radius: 50%;
  bottom: 10%;
  left: -19%;
}

.red-circle {
  width: 200px;
  height: 200px;
  background-color: rgba(244, 67, 54, 0.2);
  border-radius: 50%;
  top: 100px;
  right: 100px;
  backdrop-filter: blur(20px); /* Standard */
  -webkit-backdrop-filter: blur(20px); /* Safari */
}

.game-title {
  font-size: 56px;
  margin-bottom: 20px;
  font-weight: bold;
}

.tele {
  color: #9c27b0;
}
.play {
  color: #4caf50;
}

.game-description {
  color: #666;
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.5;
}

.start-button {
  font-size: 24px;
  padding: 15px 50px;
  background-color: #ffc107;
  color: #ff1493;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

.main-emoji img,
.secondary-emoji img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.score-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 1000;
}

.falling-image {
  pointer-events: none;
}

/* Tablet Styles */
@media (max-width: 768px) {
  .content-wrapper {
    padding: 40px 20px;
  }

  .emoji-container {
    height: 300px;
    width: 300px;
  }

  .main-emoji {
    width: 90px;
    height: 90px;
  }

  .secondary-emoji {
    width: 45px;
    height: 45px;
  }

  .circle {
    width: 225px;
    height: 225px;
  }

  .red-circle {
    width: 150px;
    height: 150px;
  }

  .game-title {
    font-size: 42px;
  }

  .game-description {
    font-size: 14px;
  }

  .start-button {
    font-size: 20px;
    padding: 12px 40px;
  }
}

/* Phone Styles */
@media (max-width: 480px) {
  .content-wrapper {
    padding: 30px 15px;
  }

  .emoji-container {
    height: 200px;
    width: 200px;
  }

  .main-emoji {
    width: 60px;
    height: 60px;
  }

  .secondary-emoji {
    width: 30px;
    height: 30px;
  }

  .circle {
    width: 150px;
    height: 150px;
  }

  .red-circle {
    width: 100px;
    height: 100px;
  }

  .game-title {
    font-size: 32px;
  }

  .game-description {
    font-size: 12px;
  }

  .start-button {
    font-size: 16px;
    padding: 10px 30px;
  }

  .logo-text {
    font-size: 20px;
  }

  .blue-line-img,
  .pink-line,
  .orange-rectangle,
  .orange-rectangle2,
  .yellow-circle {
    width: 40px;
    height: 40px;
  }
}

/* Adjust positions for smaller screens */
@media (max-width: 768px) {
  .angry {
    top: 10%;
    left: 10%;
  }
  .surprised {
    top: 10%;
    right: 10%;
  }
  .heart {
    bottom: 10%;
    left: 15%;
  }
  .sad {
    bottom: 25%;
    right: 8%;
  }
  .blue-line-img {
    top: 40%;
    left: 0;
  }
  .pink-line {
    bottom: 0;
    right: 15%;
  }
  .orange-rectangle {
    bottom: 0;
    right: -30%;
  }
  .orange-rectangle2 {
    top: -5%;
    left: -15%;
  }
  .yellow-circle {
    bottom: 5%;
    left: -15%;
  }
}
</style>
