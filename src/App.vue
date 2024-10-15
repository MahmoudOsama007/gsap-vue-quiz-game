<template>
  <div id="app">
    <WelcomePage v-if="!gameStarted" @startGame="startGame" />
    <QuizGame
      v-else-if="!quizCompleted"
      :questions="questions"
      @quizComplete="finishQuiz"
    />

    <ScorePage v-else :score="score" @restart="resetGame" />
  </div>
</template>

<script>
import WelcomePage from "./components/WelcomePage.vue";
import QuizGame from "./components/QuizGame.vue";
import ScorePage from "./components/ScorePage.vue";
// import AnimatedImages from "./components/AnimatedImages.vue";

export default {
  components: {
    WelcomePage,
    QuizGame,
    ScorePage,
    // AnimatedImages,
  },
  data() {
    return {
      gameStarted: false,
      quizCompleted: false,
      score: 0,
      questions: [
        // Add your quiz questions here
        {
          question: "What is the capital of France? ",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          answer: "Paris",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
        },
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          answer: "Paris",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
        },
        {
          question: "What is the capital of France?",
          options: ["Berlin", "Madrid", "Paris", "Rome"],
          answer: "Paris",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Jupiter", "Saturn"],
          answer: "Mars",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
        },
        {
          question: "What is the largest ocean on Earth?",
          options: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Arctic Ocean",
            "Pacific Ocean",
          ],
          answer: "Pacific Ocean",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
        },
        // Add more questions as needed
      ],
    };
  },
  methods: {
    startGame() {
      this.gameStarted = true; // Start the game
      this.quizCompleted = false; // Ensure quiz is not completed
      this.score = 0; // Reset score
    },
    finishQuiz(score) {
      this.score = score; // Set the score
      this.quizCompleted = true; // Mark quiz as completed
    },
    resetGame() {
      this.gameStarted = false; // Reset to show welcome page
      this.quizCompleted = false; // Ensure quiz is not completed
      this.score = 0; // Reset score
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
</style>
