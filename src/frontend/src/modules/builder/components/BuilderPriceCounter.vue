<template>
  <div class="content__result">
    <p>Итого: {{ costPizza }} ₽</p>
    <button type="submit" class="button" :disabled="disabled">Готовьте!</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters("Builder", {
      selectedPizza: "selectedPizza",
      costPizza: "costPizza",
    }),
  },
};
</script>

<style scoped></style>
