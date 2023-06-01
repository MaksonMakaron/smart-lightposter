<template>
  <div class="toggle">
    <input :checked="toggleValue" @change="$emit('changeToggle', !this.toggleValue)" type="checkbox" :id="toggleId" />
    <label :for="toggleId"></label>
  </div>
</template>

<script>
export default {
  props: {
    toggleId: {
      type: String,
      requared: true,
    },
    toggleValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.toggle {
  display: flex;
}

input[type='checkbox'] {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: 45px;
  height: 20px;
  background: #bdbdbd;
  display: block;
  border-radius: 100px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  width: 25px;
  height: 25px;
  background: #fff;
  border: 1px solid #bdbdbd;
  border-radius: 90px;
  transition: 0.3s;
}

input:checked + label {
  background: #fff2a7;
}

input:checked + label:after {
  background: #ffe136;
  border: none;
  left: calc(100%);
  transform: translateX(-100%);
}

label:active:after {
  width: 32px;
}
</style>
