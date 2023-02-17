<script lang="ts" setup>
import ProfileInput from "@/components/Profile/ProfileInput.vue";
import ProfileButton from "@/components/Profile/ProfileButton.vue";
import ProfileColors from "@/components/Profile/ProfileColors.vue";
import ProfileLoader from "@/components/Profile/ProfileLoader.vue";

import { ref, reactive, computed, onMounted } from "vue";
import axios from "@/global";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, maxLength } from "@vuelidate/validators";
import { User } from "@/store/index";

const store = useStore();
const { params } = useRoute();
let user = ref<User>({});

const loading = ref(true);
onMounted(async () => {
  loading.value = true;
  const { data } = await axios.get<User>(
    process.env.VUE_APP_GET_USER + params.id
  );
  user.value = data;
  loading.value = false;
});
const currentUser = store.state.currentUser;
const profileVals = reactive({
  userId: currentUser.userId,
  username: currentUser.username,
  email: currentUser.email,
  password: "",
});
const rules = computed(() => {
  return {
    username: {
      isUnique: helpers.withMessage(
        "Username is already taken",
        (): boolean => {
          return CheckUsername.value;
        }
      ),
    },
    email: {
      email: helpers.withMessage("Email must be valid", email),
      isUnique: helpers.withMessage("Email is already taken", (): boolean => {
        return CheckEmail.value;
      }),
    },
    password: {
      required: helpers.withMessage("Password is required", required),
      isValid: helpers.withMessage("Password is incorrect", (): boolean => {
        return CheckPassword.value;
      }),
    },
  };
});

const clearProfileError = () => {
  if (
    CheckUsername.value == false ||
    CheckEmail.value == false ||
    CheckPassword.value == false
  ) {
    store.commit("REGISTER_ERROR", {
      username: true,
      email: true,
      password: true,
    });
  }
};

const CheckPassword = computed(() => {
  return store.state.passwordError;
});

const CheckUsername = computed(() => {
  return store.state.usernameError;
});
const CheckEmail = computed(() => {
  return store.state.emailError;
});

const getUserDate = () => {
  const userDate = Date.parse(currentUser.createdAt);
  const currentDate = Date.now();
  return Math.round((currentDate - userDate) / (1000 * 3600 * 24));
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

const changeColor = (color: string) => {
  store.dispatch("changeUserColor", {
    userId: currentUser.userId,
    color,
  });
};

const logOut = () => {
  store.commit("LOG_OUT");
};

const disabled = ref(true);

const v$ = useVuelidate(rules, profileVals);
const updateUserValues = async () => {
  if (disabled.value == false) {
    await store.dispatch("checkUniqueUser", {
      username: profileVals.username,
      email: profileVals.email,
    });
    v$.value.$validate();
    if (!v$.value.$error) {
      store.dispatch("changeUserData", profileVals);
    }
  } else disabled.value = !disabled.value;
};

const checkUserProfile = computed(() => {
  return store.state.currentUser.userId == user.value._id;
});
</script>
<template>
  <div
    class="w-screen h-screen bg-gray-800 relative overflow-hidden py-8 flex items-center justify-center"
  >
    <div class="bg-gray-900 w-[650px] h-[532px] p-4 relative">
      <ProfileLoader v-show="loading" />
      <div class="flex gap-4" v-show="!loading">
        <div class="flex flex-col gap-2">
          <div
            class="w-[125px] h-[125px] outline outline-1 outline-gray-100 flex items-center justify-center text-white"
          >
            User Image
          </div>
          <ProfileButton
            @btnClick=""
            title="Change Image"
            v-show="checkUserProfile"
          />
        </div>
        <div class="flex flex-col gap-4 flex-1">
          <h1 class="text-gray-100 text-3xl">
            {{ user.username }}'s Profile Settings
          </h1>
          <h3 class="text-gray-300 text-base">
            {{ user.username }}'s account was created {{ getUserDate() }} days
            ago.
          </h3>
          <h3 class="text-gray-300 text-base">
            {{ user.username }} sent {{ user.messagesSent }} messages.
          </h3>
        </div>
        <router-link to="/" class="h-max fill-gray-400 hover:fill-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6Z"
            />
          </svg>
        </router-link>
      </div>
      <hr class="my-6" v-show="!loading" />
      <h1 class="text-2xl text-gray-100" v-show="checkUserProfile">
        {{ user.username }}'s Private Information
      </h1>
      <div
        class="flex justify-between mt-4 gap-2 h-max"
        v-show="checkUserProfile"
      >
        <div class="flex flex-col gap-4 w-1/3">
          <h1 class="text-gray-100 text-lg">Change username Color</h1>
          <div class="px-2 grid grid-cols-4 gap-4 items-center h-full">
            <ProfileColors
              :color="item"
              v-for="(item, index) in colors"
              :key="index"
              @click="changeColor(item)"
            />
          </div>
          <h2
            class="text-gray-100 max-h-6 h-full text-ellipsis overflow-hidden whitespace-nowrap"
          >
            Current color:
            <span :style="`color: ${currentUser.color}`"
              >Loremipsumdolorsit, amet consectetur adipisicing elit. Cumque,
              numquam?
            </span>
          </h2>
        </div>
        <div class="w-[2px] bg-gray-100"></div>
        <div class="flex flex-col w-2/3 gap-4">
          <h1 class="text-gray-100 text-lg">Update profile values</h1>
          <ProfileInput
            :disabled="disabled"
            title="Username"
            v-model="profileVals.username"
            :error-message="v$.username.$errors[0]?.$message ?? ''"
            @input="clearProfileError"
          />
          <ProfileInput
            :disabled="disabled"
            title="Email"
            v-model="profileVals.email"
            :error-message="v$.email.$errors[0]?.$message ?? ''"
            @input="clearProfileError"
          />
          <ProfileInput
            :disabled="disabled"
            title="Password"
            v-model="profileVals.password"
            :error-message="v$.password.$errors[0]?.$message ?? ''"
            @input="clearProfileError"
          />
        </div>
      </div>
      <div class="w-full flex justify-between" v-show="checkUserProfile">
        <ProfileButton @btnClick="logOut" title="Log Out" />
        <ProfileButton
          @btnClick="updateUserValues()"
          :title="disabled ? 'Update Settings' : 'Confirm'"
        />
      </div>
    </div>
  </div>
</template>
