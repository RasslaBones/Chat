<template>
  <div class="w-screen h-screen bg-gray-800 relative py-8">
    <Chat />
  </div>
</template>

<script lang="ts" setup>
import Chat from "@/components/Chat/Chat.vue";

import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.dispatch("getMessages");
});
</script>
