<template>
  <div
    class="h-full w-[340px] bg-gray-900 outline outline-1 outline-gray-700 mx-auto flex flex-col-reverse p-2 gap-4"
  >
    <ChatFooter :func="addMessage" />
    <ChatInput v-model="msg" :addMessage="addMessage" />
    <ChatEmpty v-if="store.state.messages.length === 0" />
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
import { ref } from "vue";
import { useStore } from "vuex";

import ChatField from "../Chat/ChatField.vue";
import ChatEmpty from "../Chat/ChatEmpty.vue";
import ChatFooter from "../Chat/ChatFooter.vue";
import ChatInput from "../Chat/ChatInput.vue";

defineEmits(["optionClick"]);
const store = useStore();

const msg = ref("");
const user = store.state.currentUser;

function addMessage() {
  store.dispatch("addMessage", {
    message: msg.value,
    userId: user.userId,
    color: user.color,
  });
  msg.value = "";
}
</script>
