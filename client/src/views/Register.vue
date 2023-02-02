<script lang="ts" setup>
import RegisterInput from "@/components/Register/RegisterInput.vue";
import RegisterButton from "@/components/Register/RegisterButton.vue";
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import router from "@/router";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  sameAs,
  email,
  helpers,
  minLength,
} from "@vuelidate/validators";

const checkUsername = async () => {
  return await store.dispatch("checkUsername", registerVals);
};
const store = useStore();
const registerVals = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage("Username is required", required),
      isUnique: checkUsername,
    },
    email: {
      required: helpers.withMessage("Email is required", required),
      email: helpers.withMessage("Email must be valid", email),
    },
    password: {
      required: helpers.withMessage("Password is required", required),
      minLength: helpers.withMessage(
        "Password can't be less 6 characters",
        minLength(1)
      ),
    },
    confirmPassword: {
      required: helpers.withMessage("Confirm password is required", required),
      sameAs: helpers.withMessage(
        "Password must match",
        sameAs(registerVals.password)
      ),
    },
  };
});

const v$ = useVuelidate(rules, registerVals);

const submit = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    console.log("register !");
    // store.dispatch("register", registerVals);
    // router.push({ path: "/" });
  }
};
</script>
<template>
  <div
    class="w-screen h-screen bg-gray-800 relative overflow-hidden py-8 flex items-center justify-center"
  >
    <div class="bg-gray-900 py-8 px-16 flex flex-col gap-4 rounded-md">
      <h1 class="text-gray-100 text-3xl font-medium text-center">Register</h1>
      <RegisterInput
        title="Username"
        placeholder="Username"
        :error-message="v$.username.$errors[0]?.$message ?? ''"
        v-model="registerVals.username"
      />
      <RegisterInput
        title="Email"
        placeholder="Email"
        :error-message="v$.email.$errors[0]?.$message ?? ''"
        v-model="registerVals.email"
      />
      <RegisterInput
        title="Password"
        placeholder="Password"
        :error-message="v$.password.$errors[0]?.$message ?? ''"
        v-model="registerVals.password"
      />
      <RegisterInput
        title="Confirm password"
        placeholder="Confirm password"
        :error-message="v$.confirmPassword.$errors[0]?.$message ?? ''"
        v-model="registerVals.confirmPassword"
      />
      <RegisterButton text="Submit" @btn-click="submit" />
    </div>
  </div>
</template>
