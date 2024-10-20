<template>
  <canvas ref="canvas" class="mouse-trail"></canvas>
</template>

<script>
export default {
  name: "MouseTrail",
  data() {
    return {
      canvas: null,
      ctx: null,
      mouse: { x: 0, y: 0 },
      points: [],
      maxPoints: 50,
      gradient: null,
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.resizeCanvas();
    this.createGradient();
    window.addEventListener("resize", this.resizeCanvas);
    window.addEventListener("mousemove", this.updateMousePosition);
    this.animate();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeCanvas);
    window.removeEventListener("mousemove", this.updateMousePosition);
  },
  methods: {
    resizeCanvas() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.createGradient();
    },
    createGradient() {
      this.gradient = this.ctx.createLinearGradient(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.gradient.addColorStop(0, "rgba(0, 255, 255, 0.5)");
      this.gradient.addColorStop(0.5, "rgba(255, 0, 255, 0.5)");
      this.gradient.addColorStop(1, "rgba(0, 255, 255, 0.5)");
    },
    updateMousePosition(e) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    },
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.points.unshift({ x: this.mouse.x, y: this.mouse.y });
      if (this.points.length > this.maxPoints) {
        this.points.pop();
      }

      this.ctx.beginPath();
      this.ctx.moveTo(this.points[0].x, this.points[0].y);

      for (let i = 1; i < this.points.length - 1; i++) {
        const xc = (this.points[i].x + this.points[i + 1].x) / 2;
        const yc = (this.points[i].y + this.points[i + 1].y) / 2;
        this.ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
      }

      this.ctx.lineWidth = 4;
      this.ctx.lineCap = "round";
      this.ctx.strokeStyle = this.gradient;
      this.ctx.shadowBlur = 15;
      this.ctx.shadowColor = "rgba(0, 255, 255, 0.5)";
      this.ctx.stroke();

      requestAnimationFrame(this.animate);
    },
  },
};
</script>

<style scoped>
.mouse-trail {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
}
</style>
