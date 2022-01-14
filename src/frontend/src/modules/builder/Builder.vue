<template>
<!-- TODO: prevent? -->
  <form @submit.prevent="submit">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <builder-dough-selector />
      <builder-size-selector />
      <builder-ingredients-selector />
      <builder-pizza-view />
    </div>
    <pre>selectedPizza.cost: {{ selectedPizza.cost }}</pre>
    <pre>selectedPizza{{ selectedPizza }}</pre>
  </form>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { RESET_PIZZA } from "@/store/mutation-types.js";
import BuilderDoughSelector from "./components/BuilderDoughSelector";
import BuilderSizeSelector from "./components/BuilderSizeSelector";
import BuilderIngredientsSelector from "./components/BuilderIngredientsSelector";
import BuilderPizzaView from "./components/BuilderPizzaView";

export default {
  name: "Builder",
  components: {
    BuilderPizzaView,
    BuilderIngredientsSelector,
    BuilderSizeSelector,
    BuilderDoughSelector,
  },
  computed: {
    ...mapGetters("Builder", {
      selectedPizza: "selectedPizza",
      costPizza: "costPizza",
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      resetPizza: RESET_PIZZA,
    }),
    ...mapActions("Cart", {
      putToCart: "addPizza",
    }),
    submit() {
      this.putToCart();
      this.resetPizza();
      // TODO: Вернуть редирект?
      // this.$router.push('/cart');
    },
  },
};
</script>

<style scoped></style>
