<script lang="ts" setup>
import LogInInput from "@/components/Login/LogInInput.vue";
import LogInButton from "@/components/Login/LogInButton.vue";
import { reactive, computed } from "vue";
import { useStore } from "vuex";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import router from "@/router";

const userData = reactive({
  username: undefined,
  password: undefined,
});
const rules = computed(() => {
  return {
    username: { required },
    password: { required },
  };
});
const v$ = useVuelidate(rules, userData);

const store = useStore();

const logIn = () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    router.push({ path: "/" });
    store.dispatch("logIn", userData);
  }
};
</script>
<template>
  <div
    class="w-screen h-screen bg-gray-800 relative overflow-hidden py-8 flex items-center justify-center"
  >
    <div class="bg-gray-900 p-4 px-16 flex flex-col gap-4 rounded-md">
      <h1 class="text-gray-100 text-3xl font-medium text-center">Log In</h1>
      <LogInInput
        title="Username"
        placeholder="username..."
        :errorMessage="v$.username.$error && v$.username.$errors[0].$message"
        v-model="userData.username"
      />
      <LogInInput
        title="Password"
        placeholder="password..."
        :errorMessage="v$.password.$error && v$.password.$errors[0].$message"
        v-model="userData.password"
        type="password"
      />
      <LogInButton text="Enter" @btn-click="logIn" />
      <h3 class="text-gray-100 text-sm text-center">
        New here?
        <router-link to="/Register" class="text-blue-500 underline"
          >Register</router-link
        >
        now!
      </h3>
    </div>
  </div>
</template>
