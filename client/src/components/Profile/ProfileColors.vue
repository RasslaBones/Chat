<script lang="ts" setup>
interface Props {
  color: string;
}
const props = defineProps<Props>();
</script>
<template>
  <div
    class="w-[35px] min-h-[35px] h-full cursor-pointer"
    :style="{ backgroundColor: props.color ? props.color : '' }"
  ></div>
</template>
