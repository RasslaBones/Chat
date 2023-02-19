<script lang="ts" setup>
interface Props {
  color: string;
}
const props = defineProps<Props>();
</script>
<template>
  <div
    class="sm:w-[35px] w-full min-h-[35px] h-full cursor-pointer"
    :style="{ backgroundColor: props.color ? props.color : '' }"
  ></div>
</template>
