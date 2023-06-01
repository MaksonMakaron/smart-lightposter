<template>
  <div>
    <base-header class="container" />
    <div>
      <div class="sys_info__header">
        <h1 class="heading">Информация о системе</h1>
        <router-link class="sys_info__edit" :to="'/editSysInfoMonitor/' + getSysInfo.id_screen">
          <base-button v-show="getAccess" text="Изменить" type-btn="gold" />
        </router-link>
      </div>
      <block-content>
        <table-system-info :system-info="getSysInfo" class="system-info__table" />
      </block-content>
    </div>
  </div>
</template>

<script>
import BlockContent from '@/components/BlockContent.vue';
import TableSystemInfo from '@/components/TableSystemInfo.vue';

export default {
  components: {
    BlockContent,
    TableSystemInfo,
  },
  beforeMount() {
    this.$store.dispatch('fetchSystemInfo', this.$route.params.idScreen);
    this.$store.dispatch('fetchCurrentUser');
  },
  methods: {},
  computed: {
    getSysInfo() {
      return this.$store.getters.getSysInfo;
    },
    getAccess() {
      return this.$store.getters.getCurrentUser.role === 'ADMIN' ? true : false;
    },
  },
};
</script>

<style scoped>
.system-info__table {
  margin-bottom: 40px;
}
.system-info__heading {
  margin-bottom: 16px;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #212529;
}

.sys_info__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 25px;
}

.sys_info__edit {
  text-decoration: none;
}

.sys_info__header__btns {
  display: flex;
}

.system-info__line {
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.system-info__null {
  padding: 20px 11px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #212529;
}
</style>
