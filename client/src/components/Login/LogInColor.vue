<script lang="ts" setup>
import { useStore } from "vuex";

interface Props {
  color: string;
}
const props = defineProps<Props>();
const store = useStore();
const changeUserColor = (payload: string) => {
  store.commit("CHANGE_USER_COLOR", payload);
};
</script>
<template>
  <div
    class="w-[35px] h-[35px] cursor-pointer"
    :style="{ backgroundColor: props.color ? props.color : '' }"
    @click="changeUserColor(props.color)"
  ></div>
</template>
