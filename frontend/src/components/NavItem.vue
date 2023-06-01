<template>
  <router-link class="nav-item__text">
    <button class="nav-item__btn">
      <img class="nav-item__img" :src="require(`../assets/img/${icon}`)" />
      <span class="nav-item__text">{{ text }}</span>
    </button>
  </router-link>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.nav-item__btn {
  display: flex;
  align-items: center;
  background: none;
  border: none;
}

.nav-item__img {
  margin-right: 5px;
}

.nav-item__text {
  text-decoration: none;
  color: white;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
}
</style>
