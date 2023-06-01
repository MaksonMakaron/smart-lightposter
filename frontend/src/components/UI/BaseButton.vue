<template>
  <button class="btn" :class="getClass">
    <img v-if="positionIcon === 'left'" :src="require(`../../assets/img/${icon}`)" />
    {{ text }}
    <img v-if="positionIcon === 'right'" :src="require(`../../assets/img/${icon}`)" />
  </button>
</template>

<script>
export default {
  props: {
    typeBtn: {
      type: String,
      requared: true,
    },
    icon: {
      type: String,
      default: null,
    },
    positionIcon: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
  computed: {
    getClass() {
      switch (this.typeBtn) {
        case 'danger':
          return 'danger';
        case 'primary':
          return 'primary';
        case 'secondary':
          return 'secondary';
        case 'gold':
          return 'gold';
        case 'only-icon-white':
          return 'only-icon-white';
        case 'only-icon-purple':
          return 'only-icon-purple';
        default:
          return 'default';
      }
    },
  },
};
</script>

<style scoped>
.btn {
  display: flex;
  align-items: stretch;
  margin: 2px;
  padding: 10px 35px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.btn:disabled {
  opacity: 0.5;
}

.btn:hover {
  transform: translateY(-3px);
}

.danger {
  color: #ffffff;
  background: #dc3545;
  border: 1px solid #dc3545;
}

.primary {
  color: #270035;
  background: #ffe11a;
  border: 1px solid #ffe11a;
}

.secondary {
  color: #000000;
  background: #ffffff;
  border: 1px solid #ffe11a;
}

.gold {
  color: #280034;
  background: linear-gradient(90deg, #fff76a 0%, #ffda34 100%);
  border: 1px solid #ffe11a;
}

.only-icon-white {
  background: none;
  padding: 0px 0px;
  border: none;
}

.only-icon-purple {
  background: none;
  padding: 0px 0px;
  border: none;
}
</style>
