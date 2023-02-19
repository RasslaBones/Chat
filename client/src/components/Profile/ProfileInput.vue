<script lang="ts" setup>
import { Ref } from "vue";

interface Props {
  title: string;
  disabled: boolean;
  modelValue?: string;
  errorMessage?: Ref<string> | string;
}
const props = defineProps<Props>();
const emits = defineEmits(["update:modelValue", "input"]);

const isTargetValid = (
  target: EventTarget | null
): target is HTMLInputElement => {
  return target !== null;
};

const handleInput = (event: Event) => {
  if (isTargetValid(event?.target))
    emits("update:modelValue", event.target.value);
  emits("input");
};
</script>
<template>
  <div class="flex sm:justify-start justify-between">
    <h1 class="text-gray-100 text-lg font-medium min-w-[125px]">{{ title }}</h1>
    <div class="flex flex-col gap-1 w-full sm:max-w-[270px] max-w-[350px]">
      <textarea
        type="text"
        class="w-full resize-none outline-none bg-gray-800 disabled:bg-[#1c2530] rounded-md px-2 py-1 text-gray-100 disabled:text-gray-400 focus:outline-violet-500 transition-all"
        placeholder="About me"
        :disabled="disabled"
        :value="props.modelValue"
        @input="handleInput"
        rows="4"
        v-if="title === 'Bio'"
      />
      <input
        :type="title"
        class="w-full outline-none bg-gray-800 disabled:bg-[#1c2530] rounded-md px-2 py-1 text-gray-100 disabled:text-gray-400 focus:outline-violet-500 transition-all"
        :placeholder="title"
        :disabled="disabled"
        :value="props.modelValue"
        @input="handleInput"
        v-else
      />
      <span class="text-red-400 text-sm" v-if="props.errorMessage">{{
        errorMessage
      }}</span>
    </div>
  </div>
</template>
