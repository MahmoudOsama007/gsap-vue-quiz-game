<template>
  <div class="container text-center my-4">
    <!-- Added Bootstrap classes -->
    <h1 class="display-4 mb-4">Take a Breath</h1>
    <!-- Using Bootstrap heading classes -->
    <div ref="imageContainer" class="d-flex justify-content-center gap-3">
      <!-- Bootstrap flex classes -->
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        class="img-thumbnail"
        alt="animated"
        style="
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 10px;
        "
      />
    </div>
    <button class="btn btn-success mt-4" @click="animateImages">
      <!-- Bootstrap button class -->
      Will Just Reload the images
    </button>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  data() {
    return {
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuTlCh37DJ-ggiVrrBg9EL66MF5dEwmuV14w&s",
      ],
    };
  },
  methods: {
    animateImages() {
      gsap.fromTo(
        this.$refs.imageContainer.children,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.3 }
      );
    },
  },
};
</script>
