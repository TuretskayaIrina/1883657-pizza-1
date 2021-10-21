<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <builder-dough-selector :dough="dough" />
      <builder-size-selector :sizes="sizes" />
      <builder-ingredients-selector
        :sauces="sauces"
        :ingredients="ingredients"
      />
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
  props: {
    dough: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
