<template>
  <div>
    <base-header class="container" />
    <div class="home">
      <h1 class="heading">{{ getFullName }}</h1>
      <div class="home__btns">
        <router-link class="home__btn__add" to="/addMonitor">
          <base-button v-show="getAccess" text="Добавить" type-btn="gold" />
        </router-link>
        <base-button text="Выйти" @click="signOut" type-btn="secondary" icon="arrow-right.svg" position-icon="right" />
      </div>
    </div>
    <block-content>
      <h3 class="home__heading">Доступные мониторы</h3>
      <table-monitors :access="getAccess" :screens="getScreens" />
    </block-content>
  </div>
</template>

<script>
import BlockContent from '@/components/BlockContent.vue';
import TableMonitors from '@/components/TableMonitors.vue';

export default {
  components: {
    BlockContent,
    TableMonitors,
  },
  beforeMount() {
    this.$store.dispatch('fetchCurrentUser');
    this.$store.dispatch('fetchScreens');
  },
  computed: {
    getFullName() {
      return this.$store.getters.fullNameCurrentUser;
    },
    getScreens() {
      return this.$store.getters.getScreens;
    },
    getAccess() {
      const user = this.$store.getters.getCurrentUser;
      if (user) {
        if (user.role === 'ADMIN') {
          return true;
        } else if (user.role === 'MARKETER') {
          return false;
        }
      }
    },
  },
  methods: {
    signOut() {
      localStorage.removeItem('jwt_token');
      this.$router.push('/auth');
      this.$store.state.userModule.currentUser = null;
    },
  },
};
</script>

<style>
.home {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.home__heading {
  margin-bottom: 15px;
  font-weight: 700;
  font-size: 19px;
  line-height: 24px;
  color: #212529;
}

.home__btns {
  display: flex;
}

.home__btn__add {
  text-decoration: none;
}
</style>
