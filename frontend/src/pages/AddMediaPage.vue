<template>
  <div>
    <base-header class="container" />
    <div>
      <h1 class="heading">Добавление медиа</h1>
      <Media :revoke="revokeChanges" :save="saveChanges" :media="getNewMedia" />
    </div>
  </div>
</template>

<script>
import Media from '@/components/Media.vue';
export default {
  data() {
    return {
      showDialogErrors: false,
      disabledSave: false,
    };
  },
  components: {
    Media,
  },
  beforeMount() {
    this.$store.dispatch('fetchCurrentUser');
  },
  computed: {
    getNewMedia() {
      return this.$store.getters.getNewMedia;
    },
    getNewMedia() {
      return this.$store.getters.getNewMedia;
    },
    getUser() {
      return this.$store.getters.getCurrentUser;
    },
    getFormData() {
      return this.$store.getters.getFormData;
    },
  },
  methods: {
    revokeChanges() {
      this.$store.commit('setNewMedia', {});
      this.$store.commit('setFormData', {});
      this.$router.push('/schedule/' + this.$route.params.idScreen);
    },
    saveChanges() {
      const data = {
        media: this.getNewMedia,
        formData: this.getFormData,
        user: this.getUser,
      };

      this.$store.dispatch('fetchCreateMedia', data);
    },
  },
};
</script>

<style></style>
