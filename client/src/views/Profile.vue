<script lang="ts" setup>
import ProfileInput from "@/components/Profile/ProfileInput.vue";
import ProfileButton from "@/components/Profile/ProfileButton.vue";
import { ref, reactive } from "vue";
import { useStore } from "vuex";
const store = useStore();
const user = store.state.currentUser;

const profileVals = reactive({
  username: user.username,
  email: user.email,
  password: user.password,
});
const disabled = ref(true);
</script>
<template>
  <div
    class="w-screen h-screen bg-gray-800 relative overflow-hidden py-8 flex items-center justify-center"
  >
    <div class="bg-gray-900 w-[650px] p-4">
      <div class="flex gap-4">
        <div class="flex flex-col gap-2">
          <div
            class="w-[125px] h-[125px] outline outline-1 outline-gray-100 flex items-center justify-center text-white"
          >
            User Image
          </div>
          <ProfileButton @btnClick="" title="Change Image" />
        </div>
        <div class="flex flex-col gap-4 flex-1">
          <h1 class="text-gray-100 text-3xl">
            {{ user.username }}'s Profile Settings
          </h1>
          <h3 class="text-gray-300 text-base">
            {{ user.username }}'s account was created 158 days ago.
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
      <hr class="my-8" />
      <h1 class="text-2xl text-gray-100">
        {{ user.username }}'s Private Information
      </h1>
      <div class="flex flex-col gap-4 mt-4">
        <ProfileInput
          :disabled="disabled"
          title="Username"
          v-model="profileVals.username"
        />
        <ProfileInput
          :disabled="disabled"
          title="Email"
          v-model="profileVals.email"
        />
        <ProfileInput :disabled="disabled" title="Bio" />
        <ProfileInput
          :disabled="disabled"
          title="Password"
          v-model="profileVals.password"
        />
      </div>
      <div class="w-full flex justify-between">
        <ProfileButton @btnClick="" title="Log Out" />
        <ProfileButton
          @btnClick="disabled = !disabled"
          :title="disabled ? 'Update Settings' : 'Confirm'"
        />
      </div>
    </div>
  </div>
</template>
