import axios from 'axios';
import { notify } from '@kyvg/vue3-notification';

export const screenModule = {
  state: () => ({
    currentScreen: {},
    newScreen: {},
    screens: {},
  }),
  getters: {
    getCurrentScreen(state) {
      return state.currentScreen;
    },
    getNewScreen(state) {
      return state.newScreen;
    },
    getScreens(state) {
      return state.screens;
    },
  },
  mutations: {
    setScreens(state, screens) {
      state.screens = screens;
    },
    setCurrentScreen(state, screen) {
      state.currentScreen = screen;
    },
    setNewScreen(state, newScreen) {
      state.newScreen = newScreen;
    },
  },
  actions: {
    async fetchScreens({ state, commit }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.get('http://localhost:3000/getScreens/', {}).then((response) => {
          commit('setScreens', response.data);
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
    async fetchCreateScreen({ state, commit }, screen) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        let idScreen = '';
        await axios.post('http://localhost:3000/postScreen', { screen: screen.screen }).then((response) => {
          idScreen = response.data._id;
        });
        screen.screenSysInfo.id_screen = idScreen;
        await axios.post('http://localhost:3000/postSystemInfo', { screenSysInfo: screen.screenSysInfo }).then((response) => {
          notify({
            title: 'Успешно',
            text: 'Экран добавлен',
            type: 'success',
          });
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
    async fetchDeleteScreen({ state, commit }, idScreen) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.delete('http://localhost:3000/deleteScreen', { data: { idScreen } }).then((response) => {
          const screens = state.screens.filter((screen) => screen._id !== idScreen);
          commit('setScreens', screens);
          notify({
            title: 'Успешно',
            text: 'Экран удален',
            type: 'success',
          });
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
