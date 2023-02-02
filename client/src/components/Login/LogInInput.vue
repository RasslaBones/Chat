<script lang="ts" setup>
import { Ref } from "vue";
interface Props {
  title: string;
  placeholder: string;
  modelValue?: string;
  type?: "text" | "password";
  errorMessage?: Ref<string> | string;
}
const props = defineProps<Props>();
const emits = defineEmits(["update:modelValue"]);

const isTargetValid = (
  target: EventTarget | null
): target is HTMLInputElement => {
  return target !== null;
};
const handleInput = (event: Event) => {
  if (isTargetValid(event?.target))
    emits("update:modelValue", event.target.value);
};
</script>
<template>
  <div class="flex flex-col gap-1">
    <label for="input" class="text-gray-100 font-medium text-lg">{{
      props.title
    }}</label>
    <input
      class="bg-gray-800 autofill:bg-gray-600 outline-none text-gray-100 border-gray-700 border rounded-sm px-2 py-1"
      :class="props.errorMessage && 'border-red-400'"
      :type="type"
      name="input"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="handleInput"
    />
    <span class="text-red-400 text-sm" v-if="props.errorMessage">{{
      errorMessage
    }}</span>
  </div>
</template>
