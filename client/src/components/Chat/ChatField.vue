<template>
  <div
    class="w-full flex flex-col pl-1 pr-3 gap-1 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts" setup></script>
<style scoped>
*::-webkit-scrollbar-thumb {
  border-radius: 8px;
}
</style>
