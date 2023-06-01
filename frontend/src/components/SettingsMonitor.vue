<template>
  <block-content>
    <form @submit.prevent>
      <div class="settings__container">
        <div class="settings__block">
          <div class="settings__item">
            <p class="settings__text">Имя</p>
            <base-input maxlength="30" :text="settings.name" @changeInput="(value) => (settings.name = value)" />
          </div>
          <div class="settings__item__block">
            <div class="settings__item">
              <p class="settings__text">Время начала</p>
              <base-input :text="formatingTime(settings.startTime)" @changeInput="(value) => (settings.startTime = formatingTimeISO(value))" type-input="time" />
            </div>
            <div class="settings__item">
              <p class="settings__text">Время окончания</p>
              <base-input :text="formatingTime(settings.finishTime)" @changeInput="(value) => (settings.finishTime = formatingTimeISO(value))" type-input="time" />
            </div>
          </div>
          <div class="settings__item">
            <p class="settings__text">Аудио-вывод</p>
            <select :value="settings.audioOutput" @change="(value) => (settings.audioOutput = value.currentTarget.value)" class="select">
              <option v-for="option in getAudioOptions" :key="option.value" :value="option.value">
                {{ option.name }}
              </option>
            </select>
          </div>
          <div class="settings__item">
            <p class="settings__text">Формат даты</p>
            <select :value="settings.dateFormat" @change="(value) => (settings.dateFormat = value.currentTarget.value)" class="select">
              <option v-for="option in getDateFormatOptions" :key="option.value" :value="option.value">
                {{ option.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="settings__block">
          <div class="settings__toggle">
            <p class="settings__toggle-text">Показ заставки</p>
            <base-toggle @changeToggle="(value) => (settings.showSplach = value)" :toggle-value="settings.showSplach" toggleId="splash-screen"></base-toggle>
          </div>
          <div class="settings__item">
            <p class="settings__text">Маркетолог</p>
            <p class="settings__errors" v-show="searchMarketers.length === 0 && isChangeMarketer">Данный маркетолог не найден :(</p>
            <base-input v-show="isChangeMarketer" class="settings__item" placeholder="Найти маркетолога..." :text="searchQuery" @changeInput="(value) => (searchQuery = value)" />
            <p v-if="!isChangeMarketer">{{ getMarketer }}</p>
            <select v-else :disabled="!isChangeMarketer" :value="settings.id_user" @change="(event) => (settings.id_user = event.target.value)" class="select">
              <option v-for="option in searchMarketers" :key="option._id" :value="option._id">
                {{ `${option.lastName} ${option.firstName} ${option.patronymic}` }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </form>
    <span class="errors" :class="showDialogErrors ? 'errors-show' : 'errors-hide'">{{ errors }}</span>

    <div class="settings__btns">
      <base-button @click="revokeChanges" text="Отмена" type-btn="secondary" />
      <base-button @click="saveChanges" :disabled="disabledSave" text="Сохранить" type-btn="primary" />
    </div>
  </block-content>
</template>

<script>
import BlockContent from './BlockContent.vue';
import { formatingTime24Clock } from '@/helpers/formatingDateTime';

export default {
  data() {
    return {
      errors: '',
      showDialogErrors: false,
      disabledSave: false,
      formatDate: this.$store.getters.getCurrentSettigns.dateFormat,
      searchQuery: '',
    };
  },
  components: {
    BlockContent,
  },
  beforeMount() {
    this.$store.dispatch('fetchAudioOptions');

    if (this.isChangeMarketer) {
      this.$store.dispatch('fetchMarketers');
    } else {
      this.$store.dispatch('fetchCurrentMarketer', this.$route.params.idScreen);
    }
  },
  props: {
    settings: {
      type: Object,
      required: true,
    },
    revoke: {
      type: Function,
    },
    save: {
      type: Function,
    },
  },
  computed: {
    getAudioOptions() {
      return this.$store.getters.getAudioOptions;
    },
    getDateFormatOptions() {
      return this.$store.getters.getDateFormatOptions;
    },
    getMarketers() {
      return this.$store.getters.getMarketers;
    },
    getMarketer() {
      const marketer = this.$store.getters.getCurrentMarketer;
      if (Object.keys(marketer).length === 0) {
        return `Загрузка...`;
      }
      return `${marketer.lastName} ${marketer.firstName} ${marketer.patronymic}`;
    },

    isChangeMarketer() {
      if (this.$route.params.idScreen) {
        return false;
      }
      return true;
    },
    searchMarketers() {
      const searchResults = this.getMarketers.filter((marketer) => {
        const fullName = `${marketer.lastName.toLowerCase()} ${marketer.firstName.toLowerCase()} ${marketer.patronymic.toLowerCase()}`;
        if (!this.isChangeMarketer) {
          return this.getMarketers.filter((marketer) => marketer._id === this.settings.id_user);
        }
        return fullName.includes(this.searchQuery.toLowerCase());
      });
      return searchResults;
    },
  },
  methods: {
    formatingTime(string) {
      return `${formatingTime24Clock(string)}`;
    },
    formatingTimeISO(timeString) {
      const [hours, minutes] = timeString.split(':');
      const date = new Date('1970-01-01');
      date.setUTCHours(hours);
      date.setUTCMinutes(minutes);
      const formattedDate = date.toISOString();
      return formattedDate;
    },
    validate() {
      this.errors = '';
      if (!this.settings.name) {
        this.errors = 'Заполните имя монитора';
      }
      if (!this.settings.startTime || !this.settings.finishTime) {
        this.errors += '\r\nЗаполните время';
      }
      if (this.settings.startTime > this.settings.finishTime || this.settings.startTime === this.settings.finishTime) {
        this.errors += '\r\nВремя начала должна быть больше окончания';
      }
      if (!this.settings.audioOutput) {
        this.errors += '\r\nВыберите аудио-вывод';
      }
      if (!this.settings.dateFormat) {
        this.errors += '\r\nВыберите формат даты';
      }
      if (!this.settings.id_user) {
        this.errors += '\r\nВыберите маркетолога';
      }

      if (this.errors) {
        return false;
      }
      return true;
    },

    saveChanges() {
      this.$emit('update-settings', this.settings);
      if (!this.validate()) {
        this.showDialogErrors = true;
        setTimeout(() => {
          this.showDialogErrors = false;
        }, 3000);
        return;
      }
      this.save();
    },
    revokeChanges() {
      this.revoke();
    },
  },
};
</script>

<style>
.settings__heading {
  margin-bottom: 17px;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
}

.settings__container {
  display: flex;
}

.settings__block {
  flex-basis: 49%;
}
.settings__block:not(:last-child) {
  margin-right: 30px;
}

.settings__item {
  width: 100%;
  margin-bottom: 20px;
}

.settings__toggle {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settings__item__block .settings__item:not(:last-child) {
  margin-right: 30px;
}

.settings__item__block {
  display: flex;
}

.settings__text {
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 19px;
  color: #6c757d;
}

.settings__toggle {
  display: flex;
  align-items: center;
}

.settings__toggle-text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #212529;
}

.settings__btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
