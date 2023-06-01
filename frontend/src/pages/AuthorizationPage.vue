<template>
  <div class="auth">
    <block-content class="auth__content">
      <img class="auth__img" src="../assets/img/monitor.svg" />
      <h1 class="auth__header">Вход</h1>
      <form @submit.prevent autocomplete="off" class="auth__content">
        <base-input class="auth__input" placeholder="Логин" :text="login" @changeInput="(value) => (login = value)" />
        <base-input class="auth__input" placeholder="Пароль" :text="password" @changeInput="(value) => (password = value)" type-input="password" />
        <p class="auth__errors" v-if="this.$store.state.errors">{{ this.$store.state.errors }}</p>
        <base-button text="Войти" @click="signIn" type-btn="gold" />
      </form>
    </block-content>
  </div>
</template>

<script>
import BlockContent from '@/components/BlockContent.vue';

export default {
  components: {
    BlockContent,
  },
  data() {
    return {
      login: null,
      password: null,
    };
  },
  computed: {},
  methods: {
    signIn() {
      const data = {
        login: this.login,
        password: this.password,
      };

      let error = '';
      if (!this.login) {
        error = 'Введите логин';
      }
      if (!this.password) {
        error += '\r\nВведите пароль';
      }
      if (error) {
        this.$store.commit('setErrors', error);
        return;
      }
      this.$store.dispatch('authorization', data);
    },
  },
};
</script>

<style scoped>
.auth {
  display: flex;
  align-items: center;
  width: 414px;
  min-height: 100vh;
}

.auth__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth__img {
  width: 105px;
  margin-bottom: 20px;
}

.auth__header {
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.05em;
  color: #212529;
}

.auth__input {
  margin-bottom: 20px;
  min-width: 300px;
}
.auth__errors {
  color: #c40101;
  margin-bottom: 20px;
  white-space: pre-line;
}
</style>
