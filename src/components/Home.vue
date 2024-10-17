<template>
  <div class="home-container">
    <div class="content-wrapper">
      <div class="emoji-container">
        <div class="main-emoji">😄</div>
        <div class="secondary-emoji angry">😠</div>
        <div class="secondary-emoji surprised">😮</div>
        <div class="secondary-emoji love">❤️</div>
        <div class="secondary-emoji thinking">🤔</div>
      </div>
      <h1 class="game-title">
        <span class="tele">TELE</span><span class="play">PLAY</span>
      </h1>
      <p class="game-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
      <b-button variant="warning" size="lg" class="start-button"
        >START GAME</b-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.home-container {
  background-color: #e8f5e9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.content-wrapper {
  text-align: center;
  max-width: 600px;
}

.emoji-container {
  position: relative;
  height: 200px;
  width: 200px;
  margin: 0 auto 30px;
}

.main-emoji {
  font-size: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.secondary-emoji {
  font-size: 40px;
  position: absolute;
}

.angry {
  top: 0;
  left: 20%;
}

.surprised {
  top: 20%;
  right: 0;
}

.love {
  bottom: 20%;
  left: 0;
}

.thinking {
  bottom: 0;
  right: 20%;
}

.game-title {
  font-size: 48px;
  margin-bottom: 20px;
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
}

.start-button {
  font-size: 24px;
  padding: 10px 40px;
}
</style>
