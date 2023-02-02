<script lang="ts" setup>
interface Props {
  text: string;
}
const props = defineProps<Props>();
defineEmits(["btnClick"]);
</script>
<template>
  <button
    class="bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg rounded-sm py-1"
    @click="$emit('btnClick')"
  >
    {{ props.text }}
  </button>
</template>
