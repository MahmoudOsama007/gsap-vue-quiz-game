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
          id: 1,
          question: "What civilization is known for its pyramids and pharaohs?",
          options: [
            "Ancient Greece",
            "Ancient Egypt",
            "Maya Civilization",
            "Roman Empire",
          ],
          answer: "Ancient Egypt",
          image:
            "https://i.natgeofe.com/n/535f3cba-f8bb-4df2-b0c5-aaca16e9ff31/giza-plateau-pyramids.jpg?w=1436&h=958",
        },
        {
          id: 2,
          question: "Which ancient empire was ruled by Cyrus the Great?",
          options: [
            "Ottoman Empire",
            "Persian Empire",
            "Mongol Empire",
            "Byzantine Empire",
          ],
          answer: "Persian Empire",
          image:
            "https://assets.editorial.aetnd.com/uploads/2022/07/gettyimages-1340093865.jpg?width=2048&height=1764&crop=2048%3A1764%2Csmart&quality=75&auto=webp",
        },
        {
          id: 3,
          question:
            "What document, signed in 1215, limited the powers of the English king?",
          options: [
            "The Magna Carta",
            "The Bill of Rights",
            "The Declaration of Independence",
            "The Constitution",
          ],
          answer: "The Magna Carta",
          image:
            "https://cdn.britannica.com/28/144228-159-8BC5506B/engraving-King-John-Magna-Carta-Runnymede-England-June-15-1215.jpg",
        },
        {
          id: 4,
          question: "What revolution began in France in 1789?",
          options: [
            "The Industrial Revolution",
            "The American Revolution",
            "The French Revolution",
            "The Russian Revolution",
          ],
          answer: "The French Revolution",
          image:
            "https://cdn.britannica.com/98/90498-050-5527D0C1/prison-event-Bastille-French-Revolution-engraving-July-14-1789.jpg",
        },
        {
          id: 5,
          question: "Which global conflict lasted from 1939 to 1945?",
          options: [
            "World War I",
            "World War II",
            "The Cold War",
            "The Vietnam War",
          ],
          answer: "World War II",
          image:
            "https://assets.editorial.aetnd.com/uploads/2021/05/wwii-battles-gettyimages-538297253.jpg",
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
