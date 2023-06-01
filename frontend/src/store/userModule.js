import axios from 'axios';
import router from '@/router/index';
import { notify } from '@kyvg/vue3-notification';

export const userModule = {
  state: () => ({
    currentUser: {},
    marketers: [],
    currentMarketer: {},
  }),
  getters: {
    fullNameCurrentUser(state) {
      if (state.currentUser) {
        return `${state.currentUser.lastName} ${state.currentUser.firstName} ${state.currentUser.patronymic}`;
      }
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    getMarketers(state) {
      return state.marketers;
    },
    getCurrentMarketer(state) {
      return state.currentMarketer;
    },
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setMarketers(state, marketers) {
      state.marketers = marketers;
    },
    setCurrentMarketer(state, marketer) {
      state.currentMarketer = marketer;
    },
  },
  actions: {
    async fetchCurrentUser({ state, commit }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.get('http://localhost:3000/getUser', {}).then((response) => {
          commit('setCurrentUser', response.data);
        });
      } catch (error) {
        if (error.code === 'ERR_BAD_REQUEST') {
          notify({
            title: 'Ошибка',
            text: error.response.data,
            type: 'error',
          });
          return;
        }
        notify({
          title: 'Ошибка',
          text: error.message,
          type: 'error',
        });
      }
    },
    async fetchMarketers({ state, commit }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.get('http://localhost:3000/getMarketers', {}).then((response) => {
          commit('setMarketers', response.data);
        });
      } catch (error) {
        if (error.code === 'ERR_BAD_REQUEST') {
          notify({
            title: 'Ошибка',
            text: error.response.data,
            type: 'error',
          });
          return;
        }
        notify({
          title: 'Ошибка',
          text: error.message,
          type: 'error',
        });
      }
    },
    async fetchCurrentMarketer({ state, commit }, idScreen) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.get('http://localhost:3000/getMarketerToScreen/' + idScreen, {}).then((response) => {
          commit('setCurrentMarketer', response.data);
        });
      } catch (error) {
        if (error.code === 'ERR_BAD_REQUEST') {
          notify({
            title: 'Ошибка',
            text: error.response.data,
            type: 'error',
          });
          return;
        }
        notify({
          title: 'Ошибка',
          text: error.message,
          type: 'error',
        });
      }
    },
  },
};
