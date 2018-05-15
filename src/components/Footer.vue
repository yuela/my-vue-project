<template>
  <footer class="footer">
    <p class="contact">
    </p>
    <span class="copy">Copyright © 2018 </span>
  </footer>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped lang="scss">
  @import '../assets/css/public';
  .footer {
    padding: 1rem calc(50% - 31.25em);
    flex-direction: column;
    background: #000;
  .contact {
    width: 100%;
    text-align: center;
  }
  .copy {
    font-size: 0.8em;
    color: #fff;
  }
  }
</style>
