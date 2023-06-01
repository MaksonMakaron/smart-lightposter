<template>
  <block-content>
    <form @submit.prevent>
      <div class="sys_info__container">
        <div class="sys_info__block sys_info__block__left">
          <div class="sys_info__item">
            <p class="sys_info__text">Монитор</p>
            <base-input placeholder="Например: state 0xa [HDMI CEA (16) RGB lim 16:9], 1920x1080 @ 60.00Hz" :text="sysInfo.monitor" @changeInput="(value) => (sysInfo.monitor = value)" />
          </div>
          <div class="sys_info__item">
            <p class="sys_info__text">Модель Raspberry Pi</p>
            <base-input placeholder="Например: Raspberry Pi 3 Model B Rev" :text="sysInfo.modelRaspeberryPi" @changeInput="(value) => (sysInfo.modelRaspeberryPi = value)" maxlength="20" />
          </div>
          <div class="sys_info__item__block">
            <div class="sys_info__item">
              <p class="sys_info__text">Мощность дисплея (Вт)</p>
              <base-input type-input="number" placeholder="Например: 60" :text="sysInfo.displayPower" @changeInput="(value) => (sysInfo.displayPower = value)" maxlength="6" />
            </div>
            <div class="sys_info__item">
              <p class="sys_info__text">Память (Гб)</p>
              <base-input type-input="number" placeholder="Например: 32" max="64" min="1" :text="sysInfo.memoryTotal" @changeInput="(value) => (sysInfo.memoryTotal = value)" />
            </div>
          </div>
          <div class="sys_info__item">
            <p class="sys_info__text">MAC-адрес</p>
            <base-input maxlength="30" placeholder="Например: 61-98-41-AК-CD-EА" :text="sysInfo.addressMAC" @changeInput="(value) => (sysInfo.addressMAC = value)" />
          </div>
        </div>
      </div>
    </form>
    <span class="errors" :class="showDialogErrors ? 'errors-show' : 'errors-hide'">{{ errors }}</span>
    <div class="sys_info__btns">
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
    };
  },
  components: {
    BlockContent,
  },
  props: {
    sysInfo: {
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
  methods: {
    validate() {
      this.errors = '';
      if (!this.sysInfo.monitor) {
        this.errors = 'Заполните информацию о мониторе';
      }
      if (!this.sysInfo.displayPower) {
        this.errors += '\r\nВведите мощность';
      } else if (this.sysInfo.displayPower <= 0 || this.sysInfo.displayPower >= 600) {
        this.errors += '\r\nМощность должна быть от 1 до 600';
      }
      if (!this.sysInfo.modelRaspeberryPi) {
        this.errors += '\r\nЗаполните информацию о модели Raspberry Pi ';
      }
      if (!this.sysInfo.memoryTotal) {
        this.errors += '\r\nВведите память';
      } else if (this.sysInfo.memoryTotal <= 0 || this.sysInfo.memoryTotal >= 65) {
        this.errors += '\r\nПамять должна быть от 1 до 64';
      }

      if (!this.sysInfo.addressMAC) {
        this.errors += '\r\nВведите MAC-адрес';
      }

      if (this.errors) {
        return false;
      }
      return true;
    },

    saveChanges() {
      this.$emit('update-sysInfo', this.sysInfo);
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
.sysInfo__heading {
  margin-bottom: 17px;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
}

.sys_info__container {
  display: flex;
}

.sys_info__block {
  flex-basis: 49%;
}

.sys_info__block__left {
  flex-basis: 60%;
}
.sys_info__block:not(:last-child) {
  margin-right: 30px;
}

.sys_info__item {
  width: 100%;
  margin-bottom: 20px;
}

.sysInfo__toggle {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sys_info__item__block .sys_info__item:not(:last-child) {
  margin-right: 30px;
}

.sys_info__item__block {
  display: flex;
}

.sys_info__text {
  margin-bottom: 8px;
  font-weight: 400;
  font-size: 12px;
  line-height: 19px;
  color: #6c757d;
}

.sysInfo__toggle {
  display: flex;
  align-items: center;
}

.sysInfo__toggle-text {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #212529;
}

.sys_info__btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
