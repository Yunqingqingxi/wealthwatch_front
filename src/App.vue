<template>
  <RouterView  class="transition " />
</template>

<script setup>

</script>

<style scoped>
.transition {
  animation: fade-in-fwd 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
    transform: translateZ(-80px);
    opacity: 0;
  }

  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
</style>
