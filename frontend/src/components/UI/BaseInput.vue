<template>
  <input :value="text" @input="$emit('changeInput', $event.target.value)" class="input" :type="typeInput" />
</template>

<script>
export default {
  props: {
    typeInput: {
      type: String,
      requared: true,
    },
    text: {
      type: [Number, String],
      default: '',
    },
  },
};
</script>

<style scoped>
.input {
  width: 100%;
  padding: 7px 9px;
  background: #ffffff;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.04em;
  color: #485056;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
