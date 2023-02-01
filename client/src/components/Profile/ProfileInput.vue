<script lang="ts" setup>
interface Props {
  title: string;
  disabled: boolean;
}
const props = defineProps<Props>();
</script>
<template>
  <div class="flex gap-2">
    <h1 class="text-gray-100 text-lg font-medium w-[200px]">{{ title }}</h1>
    <textarea
      type="text"
      class="w-full resize-none outline-none bg-gray-800 disabled:bg-[#1c2530] rounded-md px-2 py-1 text-gray-100 disabled:text-gray-400 focus:outline-violet-500 transition-all"
      placeholder="About me"
      :disabled="disabled"
      rows="4"
      v-if="title === 'Bio'"
    />
    <input
      :type="title"
      class="w-full outline-none bg-gray-800 disabled:bg-[#1c2530] rounded-md px-2 py-1 text-gray-100 disabled:text-gray-400 focus:outline-violet-500 transition-all"
      :placeholder="title"
      :disabled="disabled"
      v-else
    />
  </div>
</template>
