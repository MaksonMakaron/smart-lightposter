<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__links"></div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  padding: 5px 0;
  margin-bottom: 70px;
}

.footer__content {
  display: flex;
}

.footer__links {
  margin: 0 auto;
}

.footer__text {
  text-decoration: none;
  font-weight: 400;
  font-size: 13px;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.footer__text:hover {
  color: rgba(255, 255, 255, 1);
}

.footer__text:not(:last-child) {
  margin-right: 25px;
}
</style>
