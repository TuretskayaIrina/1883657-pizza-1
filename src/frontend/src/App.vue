<template>
  <div id="app">
    <Constructor />
  </div>
</template>

<script>
import Constructor from "@/views/Index.vue";
export default {
  name: "App",
  components: {
    Constructor,
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/app";
</style>
