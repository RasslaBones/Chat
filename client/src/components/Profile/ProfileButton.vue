<script lang="ts" setup>
interface Props {
  title: string;
}
defineProps<Props>();
defineEmits(["btnClick"]);
</script>
<template>
  <button
    class="px-1 py-1 mt-4 bg-violet-600 hover:bg-violet-700 text-gray-100 font-medium sm:text-md text-sm rounded-sm"
    @click="$emit('btnClick')"
  >
    {{ title }}
  </button>
</template>
