import axios from 'axios';
import router from '@/router';
import { createStore } from 'vuex';
import { scheduleModule } from './scheduleModule';
import { settingsModule } from './settingsModule';
import { systemInfoModule } from './systemInfoModule';
import { userModule } from './userModule';
import { screenModule } from './screenModule';

export default createStore({
  state: {
    currentIdScreen: null,
    errors: null,
  },
  getters: {},
  mutations: {
    setCurrentIdScreen(state, id) {
      state.currentIdScreen = id;
    },
    setErrors(state, erros) {
      state.errors = erros;
    },
  },
  actions: {
    async authorization({ state, commit }, data) {
      await axios
        .post('http://localhost:3000/login', {
          login: data.login,
          password: data.password,
        })
        .then((response) => {
          if (!response.data.message) {
            const token = response.data.token;
            localStorage.removeItem('jwt_token');
            localStorage.setItem('jwt_token', token);
            commit('setCurrentUser', response.data.user);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            router.push('/');
          } else {
            commit('setErrors', response.data.message);
            if (response.data.message === 'Токен истек') {
              router.push('/auth');
            }
          }
        });
    },
  },
  modules: {
    scheduleModule,
    settingsModule,
    systemInfoModule,
    userModule,
    screenModule,
  },
});
