import axios from 'axios';
import router from './index';
import { notify } from '@kyvg/vue3-notification';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CONNECTION_REFUSED') {
      router.push('/auth');
      notify({
        title: 'Ошибка сервера',
        text: 'Произошла ошибка на сервере :(\r\n Пожалуйста, попробуйте позже',
        type: 'error',
      });
    } else {
    }
    if (error.response) {
      if (error.response.status === 401) {
        router.push('/auth');
      }
    }

    return Promise.reject(error);
  }
);
