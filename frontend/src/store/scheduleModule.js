import axios from 'axios';
import { notify } from '@kyvg/vue3-notification';
import router from '../router/index';

export const scheduleModule = {
  state: () => ({
    media: [],
    newMedia: {},
    formData: {},
    currentMedia: {},
  }),
  getters: {
    getActiveMedia(state) {
      return state.media.filter((media) => media.status).sort((a, b) => a.ordinal - b.ordinal);
    },
    getDisabledMedia(state) {
      return state.media.filter((media) => !media.status);
    },
    getNewMedia(state) {
      return state.newMedia;
    },
    getFormData(state) {
      return state.formData;
    },
    getCurrentMedia(state) {
      return state.currentMedia;
    },
  },
  mutations: {
    updateMediaOrder(state, payload) {
      const { newMedia, store } = payload;
      const mediaDisabled = state.media.filter((media) => !media.status);
      state.media = [...newMedia, ...mediaDisabled];

      state.media.forEach((item) => {
        if (!item.status) {
          item.ordinal = null;
        }
      });

      store.dispatch('fetchOrdinalMedia', state.media);
    },
    setMedia(state, media) {
      state.media = media;
    },
    setCurrentMedia(state, currentMedia) {
      state.currentMedia = currentMedia;
    },
    setNewMedia(state, newMedia) {
      state.newMedia = newMedia;
    },
    setFormData(state, formData) {
      state.formData = formData;
    },
    setStatusMedia(state, _id) {
      let media = state.media.find((media) => media._id === _id);
      media.status = !media.status;
    },
  },
  actions: {
    async fetchMedia({ state, commit }, idScreen) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.get('http://localhost:3000/getMedia/' + idScreen, {}).then((response) => {
          commit('setMedia', response.data);
        });
      } catch (error) {
        notify({
          title: 'Ошибка',
          text: error.message,
          type: 'error',
        });
      }
    },
    async fetchCurrentMedia({ state, commit }, idMedia) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.get('http://localhost:3000/getCurrentMedia/' + idMedia, {}).then((response) => {
          commit('setCurrentMedia', response.data);
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
    async fetchUpdateMedia({ state, commit }, media) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      if (!media.start.includes(':00.000Z')) {
        media.start = media.start + ':00.000Z';
      }
      if (!media.finish.includes(':00.000Z')) {
        media.finish = media.finish + ':00.000Z';
      }
      try {
        await axios.put('http://localhost:3000/putMedia', { media }).then((response) => {
          notify({
            title: 'Успешно',
            text: 'Медиа обновлено',
            type: 'success',
          });
          commit('setNewMedia', {});
          commit('setFormData', {});
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
    async fetchOrdinalMedia({ state, commit }, arrMedia) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.patch('http://localhost:3000/patchMediaOrdinal', { arrMedia }).then((response) => {
          commit('setMedia', response.data);
        });
      } catch (error) {
        notify({
          title: 'Ошибка',
          text: error.message,
          type: 'error',
        });
      }
    },
    async fetchStatusMedia({ state, commit }, idMedia) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.patch('http://localhost:3000/patchMediaStatus', { _id: idMedia }).then((response) => {});
      } catch (error) {
        notify({
          title: 'Ошибка',
          text: error.message,
          type: 'error',
        });
      }
    },
    async fetchCreateMedia({ state, commit }, data) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      data.media.start = data.media.start + ':00.000Z';
      if (!data.media.start.includes(':00.000Z')) {
        data.media.start = data.media.start + ':00.000Z';
      }
      if (!data.media.finish.includes(':00.000Z')) {
        data.media.finish = data.media.finish + ':00.000Z';
      }
      try {
        let pathFile = null;
        await axios
          .post(`http://localhost:3000/uploadMedia/${data.user._id}`, data.formData)
          .then((response) => {
            pathFile = response.data.file.filename;
          })
          .catch((error) => {
            notify({
              title: 'Ошибка',
              text: error.message,
              type: 'error',
            });
            console.log(error);
            return;
          });
        data.media.path = pathFile;
        data.media.ordinal = 1000;
        if (!data.media.status) {
          data.media.status = false;
          data.media.ordinal = null;
        }

        await axios.post('http://localhost:3000/postMedia', { media: data.media }).then((response) => {
          let updateMedia = state.media;
          updateMedia.push(response.data);
          commit('setMedia', updateMedia);
          notify({
            title: 'Успешно',
            text: 'Медиа добавлено',
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
    async fetchDeleteMedia({ state, commit }, data) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
      try {
        await axios.delete(`http://localhost:3000/deleteMedia/${data.idUser}/${data.idMedia}`, {}).then((response) => {
          const media = state.media.filter((m) => m._id !== data.idMedia);
          commit('setMedia', media);
          notify({
            title: 'Успешно',
            text: 'Медиа удалено',
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
    async fetchDownloadMedia({ state, commit }, data) {
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
        const response = await axios.get(`http://localhost:3000/downloadMedia/${data.idUser}/${data.idMedia}`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        const contentDisposition = response.headers['content-disposition'];
        const match = contentDisposition.match(/filename="(.+)"/);
        const filename = match[1];

        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
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
