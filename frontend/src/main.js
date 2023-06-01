import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Notifications from '@kyvg/vue3-notification';
import store from './store';
import { components } from './components/UI';
import './router/axios-interceptor';
import axios from 'axios';

const app = createApp(App);
app.use(Notifications);
app.config.globalProperties.$axios = axios;

components.forEach((component) => {
  app.component(component.name, component.component);
});

app.use(router).use(store).mount('#app');
