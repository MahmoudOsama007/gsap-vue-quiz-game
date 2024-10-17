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
            <div class="quiz-card rounded-4 shadow p-4" ref="quizCard">
              <div v-if="!quizCompleted">
                <!-- Quiz header -->
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

                <!-- Question card -->
                <div
                  class="question-card bg-white rounded-4 shadow p-4"
                  v-if="currentQuestion"
                  :key="currentQuestionIndex"
                >
                  <div
                    class="question-header d-flex justify-content-between mb-3"
                  >
                    <span class="question-number text-primary"
                      >{{ currentQuestionIndex + 1 }}/{{
                        questions.length
                      }}</span
                    >
                    <span
                      class="timer"
                      :class="{ 'text-danger': timeLeft <= 0 }"
                    >
                      <img
                        src="../assets/emoji/Clock.svg"
                        alt="Clock"
                        class="clock-icon me-1"
                      />
                      {{ formatTime(Math.abs(timeLeft)) }}
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
                    @click="checkAnswer"
                    :disabled="!selectedAnswer"
                  >
                    {{
                      currentQuestionIndex === questions.length - 1
                        ? "FINISH"
                        : "NEXT"
                    }}
                  </button>
                </div>
              </div>

              <!-- Quiz completion section -->
              <div v-if="quizCompleted" class="text-center mt-4">
                <h2 class="mb-3">Quiz Completed!</h2>
                <div class="score-display p-3 bg-light rounded-3 mb-4">
                  <h3 class="mb-0">Your Score</h3>
                  <p
                    class="display-4 fw-bold text-primary mb-0"
                    ref="finalScore"
                  >
                    {{ score }}
                  </p>
                </div>
                <button
                  class="btn btn-primary btn-lg w-100 py-3 rounded-pill shadow-sm"
                  @click="goToHomePageWithAnimation"
                >
                  <i class="bi bi-arrow-repeat me-2"></i> Try Again
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
      overTime: 0,
      quizCompleted: false,
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
    checkAnswer() {
      if (
        this.currentQuestion &&
        this.selectedAnswer === this.currentQuestion.answer
      ) {
        if (this.timeLeft > 0) {
          this.score += 100;
        } else {
          this.score += 50; // Half points for correct answer after time's up
        }
      }

      if (this.currentQuestionIndex === this.questions.length - 1) {
        this.animateFinalQuestionTransition();
      } else {
        this.nextQuestion();
      }
    },
    nextQuestion() {
      if (this.currentQuestionIndex < this.questions.length - 1) {
        const transition = this.getRandomTransition();
        transition();
      } else {
        this.completeQuiz();
      }
    },
    showNextQuestion() {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.resetTimer();

      if (this.currentQuestionIndex >= this.questions.length) {
        this.completeQuiz();
      }
    },
    completeQuiz() {
      this.quizCompleted = true;
      clearInterval(this.timer);
      this.$emit("quizComplete", this.score);
      this.$nextTick(() => {
        this.animateFinalScore();
      });
    },
    formatTime(seconds) {
      const isNegative = seconds < 0;
      const absoluteSeconds = Math.abs(seconds);
      const minutes = Math.floor(absoluteSeconds / 60);
      const remainingSeconds = absoluteSeconds % 60;
      return `${isNegative ? "-" : ""}${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    },
    resetTimer() {
      clearInterval(this.timer);
      this.timeLeft = 30;
      this.overTime = 0;
      this.startTimer();
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.overTime++;
          this.timeLeft--; // This will make timeLeft go negative
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

    goToHomePage() {
      this.$emit("goToHome");
    },
    animateFinalScore() {
      const finalScoreElement = this.$refs.finalScore;
      gsap.fromTo(
        finalScoreElement,
        { scale: 0, opacity: 0, rotation: -180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
          onStart: () => {
            gsap.to(finalScoreElement, {
              textContent: this.score,
              duration: 1.5,
              snap: { textContent: 1 },
              ease: "power1.inOut",
            });
          },
        }
      );
    },
    animateFinalQuestionTransition() {
      const quizCard = this.$refs.quizCard;
      gsap.to(quizCard, {
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          this.completeQuiz();
          gsap.to(quizCard, {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });
        },
      });
    },
    goToHomePageWithAnimation() {
      gsap.to(this.$el, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          this.goToHomePage();
        },
      });
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
  transform-origin: center center;
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

.timer.text-danger {
  color: #dc3545 !important;
}

.score-display {
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  border: 2px solid #4caf50;
  overflow: hidden; /* Ensure the animation doesn't overflow */
}

.btn-primary {
  background-color: #9c27b0;
  border-color: #9c27b0;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #7b1fa2;
  border-color: #7b1fa2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Add this if you want to use Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");

@media (max-width: 414px) {
  .header {
    display: none; /* Hide header for phone sizes */
  }

  .quiz-wrapper {
    padding-top: 20px; /* Add some top padding to compensate for the hidden header */
  }

  .quiz-card {
    padding: 15px;
  }

  .quiz-title {
    font-size: 1.5rem;
  }

  .score {
    font-size: 1.2rem;
  }

  .coin-icon,
  .clock-icon {
    width: 20px;
    height: 20px;
  }

  .question-card {
    padding: 15px;
  }

  .question-text {
    font-size: 1.2rem;
  }

  .option-button {
    padding: 10px 15px;
    font-size: 0.9rem;
  }

  .option-letter {
    width: 25px;
    height: 25px;
    font-size: 0.8rem;
  }

  .next-button {
    padding: 12px 25px;
    font-size: 1rem;
  }

  .emoji {
    width: 60px;
    height: 60px;
  }

  .heart-emoji {
    bottom: 10px;
    left: 10px;
  }

  .sun-emoji {
    top: 10px;
    right: 10px;
  }

  .score-display {
    padding: 10px;
  }

  .score-display h3 {
    font-size: 1.2rem;
  }

  .score-display p {
    font-size: 2rem;
  }

  .btn-primary {
    font-size: 1rem;
    padding: 10px 20px;
  }
}
</style>
