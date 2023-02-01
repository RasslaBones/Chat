<template>
  <div class="flex w-full justify-between items-center">
    <h1 :style="`color:${currentUser.color}`">
      {{ currentUser.username }}
    </h1>
    <div class="flex flex-row-reverse gap-2 items-center">
      <button
        class="bg-violet-700 hover:bg-violet-800 text-white rounded-md px-3 py-1 font-medium"
        @click="props.func"
      >
        Chat
      </button>
      <router-link :to="getUser">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          class="cursor-pointer fill-gray-400 hover:fill-gray-500"
        >
          <path
            d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"
          />
        </svg>
      </router-link>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  func: Function,
  currentUser: Object,
});
const store = useStore();
const currentUser = store.state.currentUser;

onMounted(() => {
  getColor(currentUser.color);
});
const getColor = (color: string) => {
  const root = document.documentElement;
  root.style.setProperty("--current-user-color", color);
};

const getUser = computed(() => {
  console.log(store.state.currentUser.value);
  if (store.state.currentUser.value) return "Profile";
  return "Login";
});
</script>
