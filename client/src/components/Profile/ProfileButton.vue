<script lang="ts" setup>
interface Props {
  title: string;
}
const props = defineProps<Props>();
const emits = defineEmits(["btnClick"]);
</script>
<template>
  <button
    class="px-2 py-1 mt-4 bg-violet-600 hover:bg-violet-700 text-gray-100 font-medium text-md rounded-sm"
    @click="$emit('btnClick')"
  >
    {{ title }}
  </button>
</template>
