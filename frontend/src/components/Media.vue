<template>
  <block-content>
    <form @submit.prevent>
      <div class="media__container">
        <div class="media__block">
          <div class="media__item">
            <p class="media__text">Имя</p>
            <base-input maxlength="30" :text="media.name" @changeInput="(value) => (media.name = value)" />
          </div>
          <p class="media__text">Дата и время начала</p>
          <div class="media__item__block">
            <div class="media__item">
              <base-input :text="formatDateTime(media.start)" @changeInput="(value) => (media.start = value)" type-input="datetime-local" />
            </div>
          </div>
          <p class="media__text">Дата и время окончания</p>
          <div class="media__item__block">
            <div class="media__item">
              <base-input :text="formatDateTime(media.finish)" @changeInput="(value) => (media.finish = value)" type-input="datetime-local" />
            </div>
          </div>
          <div class="media__item">
            <p class="media__text">Длительность (секунды)</p>
            <base-input :text="media.duration" @changeInput="(value) => (media.duration = value)" max="600" min="10" type-input="number" />
          </div>
        </div>
        <div class="media__block">
          <div class="media__toggle">
            <p class="media__toggle-text">Статус</p>
            <base-toggle @changeToggle="(value) => (media.status = value)" :toggle-value="media.status" toggleId="status"></base-toggle>
          </div>
          <div v-show="isChangeFile">
            <form>
              <div>
                <label class="media__file__block">
                  Выберите файл
                  <input type="file" id="file" name="file" @change="fileSelected" accept=".jpg,.jpeg,.png,.gif,.mp4,.mkv,.mov,.avi,.wmv" />
                </label>
                <span class="media__file__info" v-if="!file">Файл не выбран</span>
                <span class="media__file__info" v-else>{{ file.name }}</span>
              </div>
            </form>
          </div>
          <span v-show="!isChangeFile" class="media__file__info">{{ media.path }}</span>
        </div>
      </div>
    </form>
    <span class="errors" :class="showDialogErrors ? 'errors-show' : 'errors-hide'">{{ errors }}</span>

    <div class="media__btns">
      <base-button @click="revokeChanges" text="Отмена" type-btn="secondary" />
      <base-button @click="saveChanges" :disabled="disabledSave" text="Сохранить" type-btn="primary" />
    </div>
  </block-content>
</template>

<script>
import BlockContent from './BlockContent.vue';

export default {
  data() {
    return {
      errors: '',
      showDialogErrors: false,
      disabledSave: false,
      file: null,
      formData: new FormData(),
    };
  },
  components: {
    BlockContent,
  },
  beforeMount() {},
  props: {
    media: {
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
    isChangeFile() {
      if (this.$route.params.idMedia) {
        return false;
      }
      return true;
    },
  },
  methods: {
    fileSelected(e) {
      this.file = e.target.files[0];
      this.formData.append('file', this.file);
      this.$store.commit('setFormData', this.formData);
    },
    formatDateTime(dateTime) {
      if (dateTime) {
        const formattedDate = dateTime.slice(0, 16);
        return formattedDate;
      }
    },
    validate() {
      this.errors = '';
      if (!this.media.name) {
        this.errors += 'Введите имя медиа';
      }
      if (!this.media.duration) {
        this.errors += '\r\nВведите длительность';
      } else {
        if (this.media.duration <= 9 || this.media.duration >= 1001) {
          this.errors += '\r\nДлительность по умолчанию должна быть от 10 до 1000 секунд';
        }
      }
      if (!this.media.start || !this.media.finish) {
        this.errors += '\r\nЗаполните время';
      }
      if (this.media.start > this.media.finish || this.media.start === this.media.finish) {
        this.errors += '\r\nВремя начала должна быть больше окончания';
      }
      if (this.isChangeFile) {
        if (!this.file) {
          this.errors += '\r\nВыберите файл';
        }
      }
      if (this.errors) {
        return false;
      }
      return true;
    },

    saveChanges() {
      this.$emit('update-media', this.media);
      if (!this.validate()) {
        this.showDialogErrors = true;
        setTimeout(() => {
          this.showDialogErrors = false;
        }, 3000);
        return;
      }
      this.media.id_screen = this.$route.params.idScreen;
      this.save();
    },
    revokeChanges() {
      this.revoke();
    },
  },
};
</script>

<style scoped>
.media__heading {
  margin-bottom: 17px;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
}

.media__container {
  display: flex;
}

.media__block {
  flex-basis: 49%;
}
.media__block:not(:last-child) {
  margin-right: 30px;
}

.media__item {
  width: 100%;
  margin-bottom: 20px;
}

.media__toggle {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.media__item__block .media__item:not(:last-child) {
  margin-right: 30px;
}

.media__item__block {
  display: flex;
}

.media__text {
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 19px;
  color: #6c757d;
}

.media__toggle {
  display: flex;
  align-items: center;
}

.media__toggle-text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #212529;
}

.media__btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.media__file__block {
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
  color: #000000;
  padding: 6px 18px;
  border: 1px solid #ffe11a;
  border-radius: 7px;
  line-height: 21px;
}

form input,
textarea {
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
  color: #000000;
  background: #ffffff;
  border: 1px solid #ffe11a;
}

.media__file__block [type='file'] {
  cursor: pointer;
  display: block;
  font-size: 13px;
  filter: alpha(opacity=0);
  min-height: 100%;
  min-width: 100%;
  opacity: 0;
  position: absolute;
  left: 0;
  text-align: right;
  top: -8px;
}

.media__file__info {
  font-size: 13px;
  color: #a9a7a9;
  line-height: 53px;
  padding-left: 30px;
}
</style>
