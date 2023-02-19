<template>
  <div
    class="h-screen max-w-[340px] w-full bg-gray-900 outline outline-1 outline-gray-700 m-auto flex flex-col-reverse p-2 gap-4"
  >
    <ChatFooter :func="addMessage" />
    <ChatInput v-model="msg" :addMessage="addMessage" />
    <ChatLoader v-show="loading" />
    <ChatEmpty v-if="store.state.messages.length === 0 && !loading" />
    <ChatField v-else>
      <div v-for="(item, index) in store.state.messages" :key="index">
        <router-link
          :to="'Profile/' + item.user.userId"
          :style="`color: ${item.user.color}`"
        >
          {{ item.user.username }}
        </router-link>
        <span class="text-gray-300">: {{ item.message }}</span>
      </div>
    </ChatField>
  </div>
</template>

<script lang="ts" setup>
import ChatField from "@/components/Chat/ChatField.vue";
import ChatEmpty from "@/components/Chat/ChatEmpty.vue";
import ChatFooter from "@/components/Chat/ChatFooter.vue";
import ChatInput from "@/components/Chat/ChatInput.vue";
import ChatLoader from "@/components/Chat/ChatLoader.vue";

import router from "@/router";

import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const msg = ref("");
const loading = ref(false);
const user = store.state.currentUser;

function addMessage() {
  store.dispatch("addMessage", {
    message: msg.value,
    userId: user.userId,
    color: user.color,
  });
  msg.value = "";
}

onMounted(async () => {
  if (store.state.messages.length === 0) loading.value = true;
  await store.dispatch("getMessages");
  if (store.state.currentUser.userId === undefined) {
    router.push({ path: "/Login" });
  }
  loading.value = false;
});
</script>
