<template>
  <div>
    <base-header class="container" />
    <div>
      <h1 class="heading">Добавление монитора</h1>
      <settings-monitor :revoke="revokeChanges" :save="saveChanges" :settings="getNewScreen" />
    </div>
  </div>
</template>

<script>
import SettingsMonitor from '@/components/SettingsMonitor.vue';

export default {
  data() {
    return {
      showDialogErrors: false,
      disabledSave: false,
    };
  },
  components: {
    SettingsMonitor,
  },
  computed: {
    getNewScreen() {
      return this.$store.getters.getNewScreen;
    },
  },
  methods: {
    revokeChanges() {
      this.$store.commit('setNewScreen', {});
      this.$router.push('/');
    },
    saveChanges() {
      this.$notify({
        title: 'Успешно',
        text: 'Продолжите добавление монитора',
        type: 'success',
      });
      this.$store.commit('setNewScreen', this.getNewScreen);
      this.$router.push('/addSysInfoMonitor');
    },
  },
};
</script>

<style></style>
