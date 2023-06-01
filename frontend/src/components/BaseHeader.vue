<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/">
        <img class="nav__logo" src="../assets/img/logo.svg" />
      </router-link>
      <div class="nav-links">
        <nav-item :class="{ 'nav-item__active': $route.path === '/' }" class="nav-item" to="/" text="Главная" icon="home.svg" />
      </div>
    </nav>
  </header>
</template>

<script>
import NavItem from './NavItem.vue';

export default {
  components: {
    NavItem,
  },
};
</script>

<style scoped>
.header {
  padding: 20px 0px;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-item {
  opacity: 0.5;
}

.nav-item:hover {
  opacity: 1;
}

.nav-item__active {
  opacity: 1;
}

.nav-item:not(:last-child) {
  margin-right: 40px;
}

.nav__logo {
  height: 50px;
}

.nav-links {
  display: flex;
  justify-content: space-between;
}
</style>
