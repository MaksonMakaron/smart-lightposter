<template>
  <div>
    <base-header class="container" />
    <div>
      <div class="settings__heading">
        <h1 class="heading">Настройки</h1>
      </div>
      <settings-monitor :revoke="revokeChanges" :save="saveChanges" :settings="this.$store.getters.getCurrentSettigns" />
    </div>
  </div>
</template>

<script>
import SettingsMonitor from '@/components/SettingsMonitor.vue';

export default {
  data() {
    return {
      errors: '',

      showDialogErrors: false,
      disabledSave: false,
      settings: this.$store.getters.getCurrentSettigns,
    };
  },
  beforeMount() {
    this.$store.dispatch('fetchCurrentSettigns', this.$route.params.idScreen);
  },
  components: {
    SettingsMonitor,
  },
  methods: {
    revokeChanges() {
      this.$store.dispatch('fetchCurrentSettigns', this.$route.params.idScreen);
    },
    saveChanges() {
      this.$store.dispatch('fetchUpdateCurrentSettigns', this.$store.getters.getCurrentSettigns);

      this.disabledSave = true;
      setTimeout(() => {
        this.disabledSave = false;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.settings__heading {
  margin-bottom: 25px;
}
</style>
