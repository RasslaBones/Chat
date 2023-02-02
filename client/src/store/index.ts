import { createStore } from "vuex";
import axios from "axios";

interface iState {
  messages: Message[];
  currentUser: User;
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
    CHANGE_USER_USERNAME(store, payload: string) {
      if (store.currentUser) {
        store.currentUser.username = payload;
      }
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
  },
  actions: {
    async getMessages(store) {
      try {
        const res = await axios.get(process.env.VUE_APP_GET_ALL_MESSAGE);
        store.commit("GET_MESSAGES", res);
      } catch (err) {
        console.warn("getMessages : ", err);
      }
    },
    async addMessage(store, payload) {
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
          store.commit("ADD_MESSAGE", payload);
        } catch (err) {
          console.warn("addMessage : ", err);
        }
      }
    },
    async logIn(store, payload) {
      if (payload.username && payload.password) {
        try {
          const res = await axios.post(process.env.VUE_APP_LOGIN_API, payload);
          store.commit("LOGIN_USER", res.data);
          console.log("LOGIN SUCCESS!!", res.data);
        } catch (err) {
          console.warn("login : ", err);
        }
      }
    },
    async register(store, payload) {
      if (payload.username && payload.email && payload.password) {
        try {
          await axios.post(process.env.VUE_APP_REGISTER_API, payload);
          store.commit("LOGIN_USER", payload);
        } catch (err) {
          console.warn("register : ", err);
        }
      }
    },
    async checkUsername(store, payload) {
      if (payload.username) {
        try {
          const res = await axios.post(
            process.env.VUE_APP_CHECK_USER + payload.username
          );
          if (res.data) {
            return true;
          } else return false;
        } catch (err) {
          console.warn("checkUsername : ", err);
        }
      }
    },
  },
  modules: {},
});

export default mainStore;
