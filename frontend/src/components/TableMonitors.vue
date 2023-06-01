<template>
  <table class="table">
    <tr>
      <th class="cell-heading cell-heading__light">Наименование</th>
      <th class="cell-heading cell-heading__light">Начало</th>
      <th class="cell-heading cell-heading__light">Окончание</th>
      <th class="cell-heading cell-heading__light"></th>
    </tr>
    <h3 class="not-data" v-if="screens.length === 0">Отсутсвуют доступные мониторы</h3>
    <tr v-for="screen in screens">
      <td class="cell cell-name cell__light">
        <img class="cell-img" :src="require(`../assets/img/monitor.svg`)" alt="" />
        {{ screen.name }}
      </td>
      <td class="cell cell__light">{{ formatingTime(screen.startTime) }}</td>
      <td class="cell cell__light">{{ formatingTime(screen.finishTime) }}</td>
      <td class="cell cell__light">
        <div class="control-btns">
          <router-link v-show="!access" @click="selectScreen(screen._id)" :to="`schedule/${screen._id}`">
            <base-button :typeBtn="'only-icon-white'" positionIcon="right" :icon="'schedule.svg'" />
          </router-link>
          <router-link v-show="access" @click="selectScreen(screen._id)" :to="`settings/${screen._id}`">
            <base-button :typeBtn="'only-icon-white'" positionIcon="right" :icon="'settings.svg'" />
          </router-link>
          <router-link v-show="access" @click="selectScreen(screen._id)" :to="`sysinfo/${screen._id}`">
            <base-button :typeBtn="'only-icon-white'" positionIcon="right" :icon="'sysinfo.svg'" />
          </router-link>
          <base-button v-show="access" @click="deleteScreen(screen._id)" :typeBtn="'only-icon-white'" positionIcon="right" :icon="'delete.svg'"></base-button>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import { formatingTime24Clock } from '@/helpers/formatingDateTime';

export default {
  data() {
    return {
      formatDate: this.$store.getters.getCurrentSettigns.dateFormat,
      formatTime: this.$store.getters.getCurrentSettigns.use24format,
    };
  },
  props: {
    screens: {
      type: Object,
      default: {},
    },
    access: {
      type: Boolean,
    },
    goToPage: {
      type: Function,
    },
    typeTable: {
      type: String,
      default: 'light',
    },
  },
  computed: {},
  methods: {
    formatingTime(string) {
      return `${formatingTime24Clock(string, true)}`;
    },
    selectScreen(id) {
      this.$store.commit('setCurrentIdScreen', id);
    },
    deleteScreen(idScreen) {
      this.$store.dispatch('fetchDeleteScreen', idScreen);
      this.$store.dispatch('fetchScreens');
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.not-data {
  margin: 10px;
  margin-top: 20px;
  color: #6c757d;
}

.cell-heading {
  padding: 11px;
  text-align: left;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
}

.cell-heading__light {
  color: #6c757d;
  border-bottom: 3px solid #dee2e6;
}

.cell {
  padding: 11px;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
}

.cell-name {
  display: flex;
  align-items: center;
  padding: 18px;
}

.cell-img {
  margin-right: 13px;
  opacity: 0.8;
  width: 20px;
  height: 20px;
}

.cell__light {
  color: #212529;
  border-bottom: 1px solid #dee2e6;
}

.control-btns {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

tr:last-child td {
  border-bottom: none;
}
</style>
