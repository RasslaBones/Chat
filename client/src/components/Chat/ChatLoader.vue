<script lang="ts" setup></script>
<template>
  <div
    class="h-full w-full flex items-center justify-center text-gray-100 text-3xl"
  >
    <div class="relative w-[80px] h-[80px] loader">
      <div v-for="item in 4" :key="item"></div>
    </div>
  </div>
</template>

<style scoped>
.loader div {
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  animation: anim 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}

.loader div:nth-child(1) {
  animation-delay: -0.45s;
}
.loader div:nth-child(2) {
  animation-delay: -0.3s;
}
.loader div:nth-child(3) {
  animation-delay: -0.15s;
}

@keyframes anim {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
