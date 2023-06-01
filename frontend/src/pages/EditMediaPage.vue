<template>
  <div>
    <base-header class="container" />
    <div>
      <h1 class="heading">Редактирование медиа</h1>
      <Media :revoke="revokeChanges" :save="saveChanges" :media="getCurrentMedia" />
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
    this.$store.dispatch('fetchCurrentMedia', this.$route.params.idMedia);
    this.$store.dispatch('fetchCurrentUser');
  },
  computed: {
    getCurrentMedia() {
      return this.$store.getters.getCurrentMedia;
    },
    getUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {
    revokeChanges() {
      this.$store.commit('setCurrentMedia', {});
      this.$router.push('/schedule/' + this.$route.params.idScreen);
    },
    saveChanges() {
      const media = this.getCurrentMedia;
      this.$store.dispatch('fetchUpdateMedia', media);
      this.$store.commit('setCurrentMedia', {});
      this.$router.push('/schedule/' + this.$route.params.idScreen);
    },
  },
};
</script>

<style></style>
