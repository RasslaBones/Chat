<script lang="ts" setup>
import LogInInput from "../Login/LogInInput.vue";
import LogInColor from "../Login/LogInColor.vue";
import LogInButton from "../Login/LogInButton.vue";
import { useStore } from "vuex";
import { ref } from "vue";

defineEmits(["toggleLogIn"]);

const store = useStore();
const username = store.state.currentUser.username;
const password = ref("");

const changeUsername = (payload: string) => {
  store.commit("CHANGE_USER_USERNAME", payload);
};

const colors = [
  "#FFFFFF",
  "#6b7280",
  "#60a5fa",
  "#1d4ed8",
  "#f87171",
  "#fb923c",
  "#a3e635",
  "#16a34a",
];
</script>
<template>
  <div
    class="w-screen h-screen bg-black/50 flex items-center justify-center absolute top-0"
  >
    <div
      class="bg-gray-900 outline outline-1 outline-gray-700 mx-auto w-[300px] px-4 py-2 flex flex-col gap-4"
    >
      <h1 class="text-center text-gray-200 font-medium text-2xl">
        Log into account
      </h1>
      <LogInInput
        title="Username"
        placeholder="coolguy123"
        v-model="username"
      />
      <LogInInput
        title="Password"
        placeholder="securePass"
        v-model="password"
        type="password"
      />
      <div class="grid grid-cols-4 justify-items-center gap-y-4">
        <LogInColor
          v-for="(item, index) in colors"
          :color="item"
          :key="index"
        />
      </div>
      <LogInButton
        text="Submit"
        @btn-click="$emit('toggleLogIn'), changeUsername(username)"
      />
    </div>
  </div>
</template>
