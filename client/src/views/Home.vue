<template>
  <div class="w-screen h-screen bg-gray-800 relative py-8">
    <Chat />
  </div>
</template>

<script lang="ts" setup>
import Chat from "@/components/Chat/Chat.vue";
import router from "@/router";

import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("getMessages");
  if (store.state.currentUser.userId === undefined) {
    router.push({ path: "/Login" });
  }
});
</script>
