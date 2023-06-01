<template>
  <table class="table">
    <tr>
      <th class="cell-heading">Опция</th>
      <th class="cell-heading">Значение</th>
    </tr>
    <tr class="row">
      <td class="cell">Память</td>
      <td class="cell">{{ systemInfo.memoryTotal }} Гб</td>
    </tr>
    <tr class="row">
      <td class="cell">Монитор</td>
      <td class="cell">{{ systemInfo.monitor }}</td>
    </tr>
    <tr class="row">
      <td class="cell">Мощность дисплея</td>
      <td class="cell">{{ systemInfo.displayPower }} Вт</td>
    </tr>
    <tr class="row">
      <td class="cell">Модель Raspberry Pi</td>
      <td class="cell">{{ systemInfo.modelRaspeberryPi }}</td>
    </tr>
    <tr class="row">
      <td class="cell">MAC-адрес</td>
      <td class="cell">{{ systemInfo.addressMAC }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  props: {
    systemInfo: {
      type: Object,
      default: {},
      required: true,
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.cell-heading {
  padding: 11px;
  text-align: left;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #6c757d;
  border-bottom: 3px solid #dee2e6;
}

.cell {
  padding: 11px;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #212529;
  border-bottom: 1px solid #dee2e6;
}

tr:last-child td {
  border-bottom: none;
}

tr td:first-child,
th:first-child {
  width: 220px;
}
</style>
