<template>
  <div>
    <base-header class="container" />
    <div>
      <h1 class="heading">Измнение системной информации о мониторе</h1>
      <sys-info-monitor :revoke="revokeChanges" :save="saveChanges" :sys-info="getSysInfo" />
    </div>
  </div>
</template>

<script>
import SysInfoMonitor from '@/components/SysInfoMonitor.vue';
import BlockContent from '@/components/BlockContent.vue';

export default {
  data() {
    return {
      showDialogErrors: false,
      disabledSave: false,
      settings: null,
    };
  },
  components: {
    SysInfoMonitor,
    BlockContent,
  },
  beforeMount() {
    this.$store.dispatch('fetchSystemInfo', this.$route.params.idScreen);
    this.$store.dispatch('fetchCurrentUser');
  },
  computed: {
    getSysInfo() {
      return this.$store.getters.getSysInfo;
    },
    getAccess() {
      return this.$store.getters.getCurrentUser.role === 'ADMIN' ? true : false;
    },
  },
  methods: {
    revokeChanges() {
      this.$router.push('/sysinfo/' + this.$route.params.idScreen);
    },
    saveChanges() {
      this.$store.dispatch('fetchUpdateSystemInfo', this.$store.getters.getSysInfo);
      this.disabledSave = true;
      setTimeout(() => {
        this.disabledSave = false;
      }, 3000);
      this.$router.push('/sysinfo/' + this.$route.params.idScreen);
    },
  },
};
</script>

<style></style>
