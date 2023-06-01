<template>
  <div>
    <base-header class="container" />
    <block-content v-if="Object.keys(getNewScreen).length === 0">
      <p>
        <strong> Упс... Что-то пошло не так :(</strong> <br />
        Вернитесь на страницу добавления и попробуйте еще раз
      </p>
    </block-content>
    <div v-else>
      <h1 class="heading">Добавление системной информации о мониторе</h1>
      <sys-info-monitor :revoke="revokeChanges" :save="saveChanges" :sys-info="getNewSystemInfo" />
    </div>
  </div>
</template>

<script>
import SysInfoMonitor from '@/components/SysInfoMonitor.vue';
import BlockContent from '@/components/BlockContent.vue';

export default {
  beforeMount() {},
  data() {
    return {
      showDialogErrors: false,
      disabledSave: false,
    };
  },
  components: {
    SysInfoMonitor,
    BlockContent,
  },

  computed: {
    getNewScreen() {
      return this.$store.getters.getNewScreen;
    },
    getNewSystemInfo() {
      return this.$store.getters.getNewSystemInfo;
    },
  },
  methods: {
    revokeChanges() {
      this.$router.push('/addMonitor');
    },
    saveChanges() {
      this.disabledSave = true;
      const screen = {
        screen: this.getNewScreen,
        screenSysInfo: this.getNewSystemInfo,
      };
      this.$store.commit('setNewScreen', {});
      this.$store.dispatch('fetchCreateScreen', screen);
      setTimeout(() => {
        this.disabledSave = false;
      }, 3000);
      this.$router.push('/');
    },
  },
};
</script>

<style></style>
