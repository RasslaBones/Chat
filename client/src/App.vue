<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import AxiosInstance from "@/global";
import { onBeforeMount } from "vue";
import { useStore } from "vuex";

const store = useStore();

const geteCookie = (cname: string) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

onBeforeMount(async () => {
  const token = geteCookie("token");
  if (token) {
    AxiosInstance.defaults.headers.common["token"] = token;
    const res = await AxiosInstance.get(
      process.env.VUE_APP_CHECK_USER + "remember"
    );

    if (res) {
      store.commit("LOGIN_USER", res.data);
    }
  }
});
</script>
