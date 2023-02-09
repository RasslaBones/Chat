<script lang="ts" setup>
import LogInInput from "@/components/Login/LogInInput.vue";
import LogInButton from "@/components/Login/LogInButton.vue";
import LogInCheckbox from "@/components/Login/LogInCheckbox.vue";

import { reactive, computed } from "vue";
import { useStore } from "vuex";

import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const userData = reactive({
  username: undefined,
  password: undefined,
  rememberMe: false,
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
    store.dispatch("logIn", userData);
  }
};
</script>
<template>
  <div
    class="w-screen h-screen bg-gray-800 overflow-hidden py-8 flex items-center justify-center"
  >
    <div class="bg-gray-900 p-4 px-16 flex flex-col gap-4 rounded-md">
      <h1 class="text-gray-100 text-3xl font-medium text-center relative">
        Log In
        <router-link
          to="/"
          class="absolute top-1/2 -translate-y-1/2 -left-12 cursor-pointer fill-gray-500 hover:fill-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M16 22L6 12L16 2l1.775 1.775L9.55 12l8.225 8.225Z" />
          </svg>
        </router-link>
      </h1>
      <h3
        class="w-[180px] text-red-400 outline-1 outline-red-400 outline rounded-md p-1 text-center mx-auto"
        v-if="store.state.loginError"
      >
        Couldn't find user with that username
      </h3>
      <LogInInput
        title="Username"
        placeholder="username..."
        :errorMessage="v$.username.$errors[0]?.$message ?? ''"
        v-model="userData.username"
      />
      <LogInInput
        title="Password"
        placeholder="password..."
        :errorMessage="v$.password.$errors[0]?.$message ?? ''"
        v-model="userData.password"
        type="password"
      />
      <LogInCheckbox title="Remember me" v-model="userData.rememberMe" />
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
