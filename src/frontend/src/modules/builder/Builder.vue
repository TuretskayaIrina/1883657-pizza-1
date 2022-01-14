<template>
  <!-- TODO: prevent? -->
  <form>
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <builder-dough-selector />
      <builder-size-selector />
      <builder-ingredients-selector />
      <builder-pizza-view />
    </div>
  </form>
</template>

<script>
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
};
</script>

<style scoped></style>
