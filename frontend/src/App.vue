<template>
  <notifications classes="my-notification" :ignoreDuplicates="true" :duration="5000" :pauseOnHover="true" />
  <router-view class="container" />
</template>

<script>
export default {};
</script>

<style lang="scss">
@import url('./assets/fonts/opensans.css');

* {
  font-family: 'Open Sans', sans-serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #280034;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.heading {
  margin-bottom: 17px;
  font-weight: 700;
  font-size: 23px;
  line-height: 29px;
  color: #ffffff;
}

.errors {
  display: block;
  min-height: 50px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  color: #c40101;
  white-space: pre-line;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.errors-show {
  animation-name: fade-in;
}

.errors-hide {
  animation-name: fade-out;
}

.select {
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

.my-notification {
  margin: 10px;
  padding: 20px;
  font-size: 12px;
  border-radius: 4px;
  color: #ffffff;
  border-left: 5px solid #ffffff;

  .notification-title {
    margin-bottom: 5px;
    font-size: 15px;
  }

  .notification-content {
    font-size: 13px;
  }

  &.success {
    background: #239746;
    border-left: 5px solid rgb(50, 131, 1);
  }

  &.warn {
    background: #ffb648;
    border-left: 5px solid #a76b12;
  }

  &.error {
    background: #e54d42;
    border-left: 5px solid #930a00;
  }
}
</style>
