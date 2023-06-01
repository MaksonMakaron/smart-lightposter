import axios from 'axios';
import { notify } from '@kyvg/vue3-notification';

export const systemInfoModule = {
  state: () => ({
    systemInfo: {},
    newSystemInfo: {},
  }),
  getters: {
    getSysInfo(state) {
      return state.systemInfo;
    },
    getNewSystemInfo(state) {
      return state.newSystemInfo;
    },
  },
  mutations: {
    setSystemInfo(state, systemInfo) {
      state.systemInfo = systemInfo;
    },
    setNewSystemInfo(state, newSystemInfo) {
      state.systemInfo = newSystemInfo;
    },
  },
  actions: {
    async fetchSystemInfo({ state, commit }, idScreen) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
        await axios.get('http://localhost:3000/getSystemInfo/' + idScreen, {}).then((response) => {
          commit('setSystemInfo', response.data);
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
    async fetchUpdateSystemInfo({ state, commit }, screenSysInfo) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
        await axios.put('http://localhost:3000/putSystemInfo', { screenSysInfo }).then((response) => {
          commit('setSystemInfo', response.data);
          notify({
            title: 'Успешно',
            text: 'Системная информация обновлена',
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
