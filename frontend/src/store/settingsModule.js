import axios from 'axios';
import { notify } from '@kyvg/vue3-notification';

export const settingsModule = {
  state: () => ({
    newSettings: null,
    currentSettigns: {},
    audioOptions: [],
    dateFormatOptions: [
      { value: 'd/m/y', name: 'день/месяц/год' },
      { value: 'm/d/y', name: 'месяц/день/год' },
      { value: 'y/m/d', name: 'год/месяц/день' },
    ],
  }),
  getters: {
    getCurrentSettigns(state) {
      return state.currentSettigns;
    },
    getAudioOptions(state) {
      return state.audioOptions;
    },
    getDateFormatOptions(state) {
      return state.dateFormatOptions;
    },
  },
  mutations: {
    setCurrentSettigns(state, settigns) {
      state.currentSettigns = settigns;
    },
    setAudioOptions(state, audioOptions) {
      state.audioOptions = audioOptions;
    },
  },
  actions: {
    async fetchCurrentSettigns({ state, commit }, idScreen) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.get('http://localhost:3000/getScreen/' + idScreen, {}).then((response) => {
          commit('setCurrentSettigns', response.data);
        });
      } catch (error) {
        notify({
          title: 'Ошибка',
          text: error.message,
          type: 'error',
        });
      }
    },
    async fetchUpdateCurrentSettigns({ state, commit }, settings) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios
          .put('http://localhost:3000/putScreen', { settings })
          .then((response) => {
            commit('setCurrentSettigns', response.data);
            notify({
              title: 'Успешно',
              text: 'Настройки сохранены',
              type: 'success',
            });
          })
          .catch((error) => {
            console.log(error.response.data);
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
    async fetchAudioOptions({ state, commit }) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.get('http://localhost:3000/getAudio', {}).then((response) => {
          commit('setAudioOptions', response.data);
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
