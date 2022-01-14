<template>
  <div class="content__result">
    <p>Итого: {{ selectedPizza.cost }} ₽</p>
    <button
      @click="checkedPizza ? edit() : submit()"
      type="button"
      class="button"
      :disabled="disabled"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { RESET_PIZZA } from "@/store/mutation-types.js";

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
      checkedPizza: "checkedPizza",
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      resetPizza: RESET_PIZZA,
    }),
    ...mapActions("Cart", {
      editPizza: "editPizza",
      putToCart: "addPizza",
    }),
    edit() {
      this.editPizza(this.selectedPizza);
      this.resetPizza();
      this.$router.push("/cart");
    },
    submit() {
      this.putToCart();
      this.resetPizza();
      this.$router.push("/cart");
    },
  },
};
</script>

<style scoped></style>
