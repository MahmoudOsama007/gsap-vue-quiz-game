<template>
  <div class="quiz-wrapper d-flex flex-column min-vh-100">
    <header class="header">
      <div class="logo">
        <span class="logo-text">TELEPLAY</span>
      </div>
    </header>
    <div
      class="quiz-container flex-grow-1 d-flex align-items-center position-relative"
    >
      <img
        src="@/assets/emoji/Vector Smart Object-5.svg"
        alt="Heart"
        class="emoji heart-emoji"
        ref="heartEmoji"
      />
      <img
        src="@/assets/emoji/yellow-circle.svg"
        alt="Sun"
        class="emoji sun-emoji"
        ref="sunEmoji"
      />
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="quiz-card rounded-4 shadow p-4">
              <div
                class="quiz-header d-flex justify-content-between align-items-center mb-4"
              >
                <h1 class="quiz-title m-0">
                  <span class="tele">TELE</span><span class="play">PLAY</span>
                </h1>
                <div class="score">
                  <img
                    src="../assets/emoji/Group.svg"
                    alt="Coin"
                    class="coin-icon me-2"
                  />
                  <span>{{ score }}</span>
                </div>
              </div>

              <div
                class="question-card bg-white rounded-4 shadow p-4"
                v-if="currentQuestion"
                :key="currentQuestionIndex"
              >
                <div
                  class="question-header d-flex justify-content-between mb-3"
                >
                  <span class="question-number text-primary"
                    >{{ currentQuestionIndex + 1 }}/{{ questions.length }}</span
                  >
                  <span class="timer text-success">
                    <img
                      src="../assets/emoji/Clock.svg"
                      alt="Clock"
                      class="clock-icon me-1"
                    />
                    {{ formatTime(timeLeft) }}
                  </span>
                </div>

                <h2 class="question-text mb-4">
                  {{ currentQuestion.question }}
                </h2>

                <div class="options-container">
                  <button
                    v-for="(option, index) in currentQuestion.options"
                    :key="index"
                    class="option-button btn btn-outline-light w-100 text-start mb-3 d-flex align-items-center"
                    :class="{
                      'option-a': index === 0,
                      'option-b': index === 1,
                      'option-c': index === 2,
                      'option-d': index === 3,
                      selected: selectedAnswer === option,
                    }"
                    @click="selectAnswer(option)"
                  >
                    <span
                      class="option-letter rounded-circle me-3 d-flex justify-content-center align-items-center mr-3"
                    >
                      {{ ["A", "B", "C", "D"][index] }}
                    </span>
                    {{ option }}
                  </button>
                </div>

                <button
                  class="next-button btn btn-primary w-100 mt-4"
                  @click="nextQuestion"
                  :disabled="!selectedAnswer"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name: "QuizGame",
  props: ["questions"],
  data() {
    return {
      currentQuestionIndex: 0,
      score: 0,
      selectedAnswer: null,
      timeLeft: 30,
      timer: null,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  methods: {
    selectAnswer(answer) {
      this.selectedAnswer = answer;
    },
    nextQuestion() {
      if (this.selectedAnswer === this.currentQuestion.answer) {
        this.score += 100;
      }

      const transition = this.getRandomTransition();
      transition();

      this.animateEmojis();
    },
    formatTime(seconds) {
      return `00:${seconds.toString().padStart(2, "0")}`;
    },
    resetTimer() {
      clearInterval(this.timer);
      this.timeLeft = 30;
      this.startTimer();
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.nextQuestion();
        }
      }, 1000);
    },
    animateEmojis() {
      const emojis = [this.$refs.heartEmoji, this.$refs.sunEmoji];

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
    getRandomTransition() {
      const transitions = [
        this.spinTransition,
        this.elasticSlideTransition,
        this.flipTransition,
        this.zoomTransition,
        this.bounceScaleTransition,
      ];
      return transitions[Math.floor(Math.random() * transitions.length)];
    },

    spinTransition() {
      gsap.to(".question-card", {
        scale: 0,
        rotation: 720,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          this.showNextQuestion();
          gsap.fromTo(
            ".question-card",
            { scale: 0, rotation: -720, opacity: 0 },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            }
          );
        },
      });
    },

    elasticSlideTransition() {
      gsap.to(".question-card", {
        x: -window.innerWidth,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        onComplete: () => {
          this.showNextQuestion();
          gsap.fromTo(
            ".question-card",
            { x: window.innerWidth, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
          );
        },
      });
    },

    flipTransition() {
      gsap.to(".question-card", {
        rotationY: 90,
        duration: 0.4,
        ease: "power1.in",
        onComplete: () => {
          this.showNextQuestion();
          gsap.fromTo(
            ".question-card",
            { rotationY: -90 },
            { rotationY: 0, duration: 0.4, ease: "power1.out" }
          );
        },
      });
    },

    zoomTransition() {
      gsap.to(".question-card", {
        scale: 1.5,
        opacity: 0,
        duration: 0.6,
        ease: "power2.in",
        onComplete: () => {
          this.showNextQuestion();
          gsap.fromTo(
            ".question-card",
            { scale: 0.5, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
          );
        },
      });
    },

    bounceScaleTransition() {
      gsap.to(".question-card", {
        scale: 0,
        y: 100,
        opacity: 0,
        duration: 0.6,
        ease: "back.in(1.7)",
        onComplete: () => {
          this.showNextQuestion();
          gsap.fromTo(
            ".question-card",
            { scale: 0, y: -100, opacity: 0 },
            { scale: 1, y: 0, opacity: 1, duration: 0.8, ease: "bounce.out" }
          );
        },
      });
    },

    showNextQuestion() {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.resetTimer();

      if (this.currentQuestionIndex >= this.questions.length) {
        this.$emit("quizComplete", this.score);
      }
    },
  },
  mounted() {
    this.animateEmojis();
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.quiz-wrapper {
  background-color: #e8f5e9;
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

.quiz-card {
  background: linear-gradient(
    135deg,
    #e8f5e9,
    #fbfcfb
  ); /* Gradient background */
  border-radius: 20px;
}

.quiz-title {
  font-size: 2rem;
  font-weight: bold;
}

.tele {
  color: #9c27b0;
}
.play {
  color: #4caf50;
}

.score {
  font-size: 1.5rem;
  font-weight: bold;
}

.coin-icon,
.clock-icon {
  width: 24px;
  height: 24px;
  margin-right: 5px;
}

.question-card {
  border-radius: 20px;
  transform-origin: center center;
}

.question-text {
  font-size: 1.5rem;
  color: #333;
}

.option-button {
  border-radius: 50px;
  padding: 15px 20px;
  font-size: 1.1rem;
  background-color: white;
  border: 2px solid #e0e0e0;
  color: #333;
}

.option-button:hover {
  background-color: #f5f5f5;
}

.option-letter {
  width: 30px;
  height: 30px;
  font-weight: bold;
  color: white;
}

.option-a .option-letter {
  background-color: #9c27b0;
}
.option-b .option-letter {
  background-color: #4caf50;
}
.option-c .option-letter {
  background-color: #ff9800;
}
.option-d .option-letter {
  background-color: #2196f3;
}

.next-button {
  border-radius: 50px;
  padding: 15px 30px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #9c27b0;
  border-color: #9c27b0;
}

.next-button:hover {
  background-color: #7b1fa2;
  border-color: #7b1fa2;
}

.emoji {
  position: absolute;
  width: 80px;
  height: 80px;
}

.heart-emoji {
  bottom: 20px;
  left: 20px;
}

.sun-emoji {
  top: 20px;
  right: 20px;
}

.option-button.selected {
  background-color: #e0e0e0;
  border-color: #9c27b0;
}

.quiz-container {
  background: linear-gradient(135deg, #e8f5e9, #fbfcfb);
}
</style>
