<script lang="ts" setup>
interface Props {
  title: string;
  modelValue: boolean;
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
  <div class="flex items-center gap-4">
    <input
      class="bg-gray-800 autofill:bg-gray-600 outline-none text-gray-100 border-gray-700 border rounded-sm px-2 py-1"
      name="input"
      type="checkbox"
      :value="props.modelValue"
      @input="handleInput"
    />
    <label for="input" class="text-gray-100 font-medium text-sm">{{
      props.title
    }}</label>
  </div>
</template>
