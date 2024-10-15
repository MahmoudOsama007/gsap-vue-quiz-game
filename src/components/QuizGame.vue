<template>
  <div class="quiz-wrapper">
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="quiz-container card p-4 text-center" ref="quizContainer">
        <img
          :src="currentQuestion.image"
          alt="Question Image"
          class="question-image img-fluid mb-4"
        />
        <h2 class="question">{{ currentQuestion.question }}</h2>

        <!-- Progress Bar for Timer -->
        <div class="progress mb-3">
          <div
            class="progress-bar bg-info"
            role="progressbar"
            :style="{ width: `${(timeLeft / 30) * 100}%` }"
            :aria-valuenow="timeLeft"
            aria-valuemin="0"
            aria-valuemax="30"
          >
            {{ timeLeft }}s
          </div>
        </div>

        <ul class="options list-unstyled">
          <li
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            :class="[
              'option',
              'p-2',
              'my-2',
              'rounded',
              'text-white',
              {
                'bg-warning': selectedOption === option,
                'bg-primary': selectedOption !== option,
              },
            ]"
            @click="selectOption(option, index)"
            :ref="`option-${index}`"
          >
            {{ option }}
          </li>
        </ul>

        <button
          class="btn btn-success mt-3 pulse-button"
          @click="nextQuestion"
          v-if="selectedOption"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  props: {
    questions: Array,
  },
  data() {
    return {
      currentQuestionIndex: 0,
      selectedOption: null,
      score: 0,
      lastEffect: null,
      timeLeft: 30,
      scorePerQuestion: 5,
      timerInterval: null,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  methods: {
    startTimer() {
      this.timeLeft = 30;
      this.scorePerQuestion = 5;

      this.timerInterval = setInterval(() => {
        this.timeLeft--;

        if (this.timeLeft === 20) this.scorePerQuestion = 4;
        if (this.timeLeft === 10) this.scorePerQuestion = 3;

        if (this.timeLeft <= 0) {
          clearInterval(this.timerInterval);
          this.nextQuestion();
        }
      }, 1000);
    },
    selectOption(option, index) {
      this.selectedOption = option;
      clearInterval(this.timerInterval);

      if (option === this.currentQuestion.answer) {
        this.score += this.scorePerQuestion;
      } else {
        this.shakeOption(index);
      }

      this.scaleAndRotateOption(index);
    },
    shakeOption(index) {
      const optionElement = this.$refs[`option-${index}`];
      if (optionElement) {
        gsap.to(optionElement[0], {
          x: -10,
          duration: 0.1,
          repeat: 5,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    },
    scaleAndRotateOption(index) {
      const optionElement = this.$refs[`option-${index}`];
      if (optionElement) {
        gsap.to(optionElement[0], {
          scale: 1.2,
          rotation: 15,
          duration: 0.3,
          onComplete: () => {
            gsap.to(optionElement[0], {
              scale: 1,
              rotation: 0,
              duration: 0.3,
            });
          },
        });
      }
    },
    nextQuestion() {
      clearInterval(this.timerInterval);

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.animateQuestion();
      } else {
        this.$emit("quizComplete", this.score);
      }
    },
    animateQuestion() {
      const questionElement = this.$refs.quizContainer;
      const options = questionElement.querySelectorAll(".option");

      const effects = [this.bounceIn, this.rotateOut, this.fadeOut];
      let randomEffect;

      do {
        randomEffect = effects[Math.floor(Math.random() * effects.length)];
      } while (randomEffect === this.lastEffect);

      this.lastEffect = randomEffect;
      randomEffect.call(this, questionElement, options);
      this.startTimer();
    },
    bounceIn(questionElement, options) {
      gsap.fromTo(
        questionElement,
        { scale: 0, rotation: 0 },
        {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "bounce.out",
          onComplete: () => this.nextQuestionTransition(options),
        }
      );
    },
    rotateOut(questionElement, options) {
      gsap.to(questionElement, {
        scale: 0,
        rotation: 360,
        duration: 0.5,
        onComplete: () => this.nextQuestionTransition(options),
      });
    },
    fadeOut(questionElement, options) {
      gsap.to([questionElement, ...options], {
        opacity: 0,
        scale: 0.8,
        rotation: 0,
        duration: 0.5,
        onComplete: () => this.nextQuestionTransition(options),
      });
    },
    nextQuestionTransition(options) {
      this.currentQuestionIndex++;
      this.selectedOption = null;

      gsap.set([this.$refs.quizContainer, ...options], {
        scale: 1,
        opacity: 1,
        rotation: 0,
      });
    },
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timerInterval);
  },
};
</script>
<style scoped>
.quiz-wrapper {
  background: linear-gradient(135deg, #83a4d4, #b6fbff);
}

.question-image {
  max-width: 100%;
  height: auto;
}

.option {
  background-color: #4a90e2;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.option:hover {
  background-color: #357abf;
  transform: scale(1.05);
  box-shadow: 0 0 10px rgba(53, 122, 191, 0.5);
}

.progress {
  height: 10px;
}

.pulse-button {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(72, 239, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 30px rgba(72, 239, 255, 1);
  }
}
</style>
