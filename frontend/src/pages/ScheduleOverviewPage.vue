<template>
  <div>
    <base-header class="container" />
    <div class="schedule">
      <div class="schedule__header">
        <h1 class="heading">Расписание</h1>
        <router-link class="schedule__header__btns" :to="`/addMedia/${this.$route.params.idScreen}`">
          <base-button text="Добавить" type-btn="gold" />
        </router-link>
      </div>
      <div>
        <h2 class="schedule__name">{{ this.$store.state.settingsModule.currentSettigns.name }}</h2>
        <block-content class="schedule__video__block">
          <h3 class="schedule__heading__active">Активные</h3>
          <table-schedule :move-enabled="true" :media-list="getActiveMedia" type-table="dark" />
        </block-content>
        <block-content>
          <h3 class="schedule__heading__disabled">Не активные</h3>
          <table-schedule :media-list="getDisabledMedia" type-table="light" />
        </block-content>
      </div>
    </div>
  </div>
</template>

<script>
import BlockContent from '@/components/BlockContent.vue';
import TableSchedule from '@/components/TableSchedule.vue';

export default {
  components: {
    TableSchedule,
    BlockContent,
  },
  beforeMount() {
    this.$store.dispatch('fetchMedia', this.$route.params.idScreen);
    this.$store.dispatch('fetchCurrentSettigns', this.$route.params.idScreen);
  },
  computed: {
    getActiveMedia() {
      return this.$store.getters.getActiveMedia;
    },
    getDisabledMedia() {
      return this.$store.getters.getDisabledMedia;
    },
  },
};
</script>

<style scoped>
.schedule__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.schedule__header__btns {
  display: flex;
  text-decoration: none;
}

.schedule__name {
  margin-bottom: 23px;
  font-weight: 400;
  font-size: 23px;
  line-height: 29px;
  color: #ffffff;
}

.schedule__video__block {
  background: #492955;
}

.schedule__heading__active {
  margin-bottom: 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  color: #ffffff;
}

.schedule__heading__disabled {
  margin-bottom: 15px;
  font-weight: 700;
  font-size: 19px;
  line-height: 24px;
  color: #212529;
}
</style>
