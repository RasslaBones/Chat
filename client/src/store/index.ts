import { createStore } from "vuex";
import axios from "axios";
import { isAxiosError } from "axios";
import router from "@/router";

interface iState {
  messages: Message[];
  currentUser: User;
  usernameError: boolean;
  emailError: boolean;
  passwordError: boolean;
  loginError: boolean;
}

interface Message {
  message: string;
  user: User;
}

interface User {
  userId?: string;
  username?: string;
  email?: string;
  color?: string;
  profilePic?: string;
  createdAt?: Date;
  messagesSent?: number;
}

const mainStore = createStore({
  state: (): iState => {
    return {
      messages: [],
      currentUser: {
        username: undefined,
        color: undefined,
        userId: undefined,
        createdAt: undefined,
        profilePic: undefined,
        messagesSent: undefined,
      },
      usernameError: true,
      emailError: true,
      passwordError: true,
      loginError: false,
    };
  },
  getters: {},
  mutations: {
    ADD_MESSAGE(store, payload): void {
      const res = {
        message: payload.message,
        user: {
          username: payload.username,
          color: payload.color,
          userId: payload.userId,
        },
      };
      if (res.message.length > 0) store.messages.push(res);
    },
    GET_MESSAGES(store, payload) {
      store.messages = [];
      for (let i = 0; i < payload.data.length; i++) {
        const user = {
          username: payload.data[i].username,
          color: payload.data[i].color,
          userId: payload.data[i].userId,
        };

        store.messages.push({
          message: payload.data[i].message,
          user: user,
        });
      }
    },
    CHANGE_USER_COLOR(store, payload: string) {
      if (store.currentUser) {
        store.currentUser.color = payload;
      }
    },
    CHANGE_USER_VALS(store, payload) {
      if (payload.username) store.currentUser.username = payload.username;
      if (payload.email) store.currentUser.email = payload.email;
    },
    LOGIN_USER(store, payload) {
      store.currentUser.userId = payload._id;
      store.currentUser.username = payload.username;
      store.currentUser.color = payload.color;
      store.currentUser.createdAt = payload.createdAt;
      store.currentUser.email = payload.email;
      store.currentUser.profilePic = payload.profilePic;
      store.currentUser.messagesSent = payload.messagesSent;
    },
    REGISTER_ERROR(store, payload) {
      if (payload.username !== undefined)
        store.usernameError = payload.username;
      if (payload.email !== undefined) store.emailError = payload.email;
      if (payload.password !== undefined)
        store.passwordError = payload.password;
    },
    LOGIN_ERROR(store, payload) {
      store.loginError = payload;
    },
  },
  actions: {
    async getMessages({ commit }) {
      try {
        const res = await axios.get(process.env.VUE_APP_GET_ALL_MESSAGE);
        commit("GET_MESSAGES", res);
      } catch (err) {
        console.warn("getMessages : ", err);
      }
    },
    async addMessage({ commit }, payload) {
      if (payload.message && payload.username && payload.color) {
        const { userId } = payload;
        try {
          const res = await axios.get(process.env.VUE_APP_GET_USER + userId);
          await axios.post(process.env.VUE_APP_CREATE_MESSAGE, payload);
          const updateVals = {
            userId: userId,
            messagesSent: res.data.messagesSent + 1,
          };
          await axios.put(process.env.VUE_APP_UPDATE_USER + userId, updateVals);
          commit("ADD_MESSAGE", payload);
        } catch (err) {
          console.warn("addMessage : ", err);
        }
      }
    },
    async logIn({ commit }, payload) {
      if (payload.username && payload.password) {
        try {
          const res = await axios.post(process.env.VUE_APP_LOGIN_API, payload);
          commit("LOGIN_USER", res.data);
          commit("LOGIN_ERROR", false);
          router.push({ path: "/" });
        } catch (err) {
          if (isAxiosError(err)) {
            commit("LOGIN_ERROR", true);
          }
        }
      }
    },
    async register({ commit }, payload) {
      if (payload.username && payload.email && payload.password) {
        try {
          commit("REGISTER_ERROR", { username: true, email: true });
          const res = await axios.post(
            process.env.VUE_APP_REGISTER_API,
            payload
          );
          commit("LOGIN_USER", res.data);
          router.push({ path: "/" });
        } catch (err) {
          if (isAxiosError(err)) {
            commit("REGISTER_ERROR", {
              username: !err.response?.data.usernameError,
              email: !err.response?.data.emailError,
            });
          }
        }
      }
    },
    async changeUserData({ commit }, payload) {
      console.log(payload);
      if (payload.userId !== undefined && payload.password !== undefined) {
        try {
          await axios.put(
            process.env.VUE_APP_UPDATE_USER + payload.userId,
            payload
          );
          commit("CHANGE_USER_VALS", {
            username: payload.username,
            email: payload.email,
          });
          router.push({ path: "/" });
        } catch (err) {
          if (isAxiosError(err)) {
            commit("REGISTER_ERROR", {
              password: !err.response?.data.valid,
            });
          }
        }
      }
    },
    async changeUserColor({ commit }, payload) {
      if (payload.userId !== undefined && payload.color !== undefined) {
        try {
          await axios.put(
            process.env.VUE_APP_UPDATE_USER + payload.userId,
            payload
          );
          commit("CHANGE_USER_COLOR", payload.color);
        } catch (err) {
          console.warn("changeUserColor : ", err);
        }
      }
    },
    async checkUniqueUser({ commit }, payload) {
      try {
        if (payload.username !== undefined) {
          const usernameRes = await axios.post(
            process.env.VUE_APP_CHECK_USER + payload.username,
            { username: true }
          );
          if (usernameRes.data == false)
            commit("REGISTER_ERROR", { username: false });
        }
        if (payload.email !== undefined) {
          const emailRes = await axios.post(
            process.env.VUE_APP_CHECK_USER + payload.email,
            { email: true }
          );
          if (emailRes.data == false)
            commit("REGISTER_ERROR", { email: false });
        }
      } catch (err) {
        console.warn("checkUniqueUser : ", err);
      }
    },
  },
  modules: {},
});

export default mainStore;
