<template>
  <form action="#" method="post">
    <div class="content__wrapper">
      <h1 class="title title--big">Конструктор пиццы</h1>
      <builder-dough-selector
        :dough="dough"
        :dough-type="pizza.dough.type"
        @selectDough="selectDough"
      />
      <builder-size-selector
        :sizes="sizes"
        :size-type="pizza.size.type"
        @selectSize="selectSize"
      />
      <builder-ingredients-selector
        :sauces="sauces"
        :sauce-type="pizza.sauce.type"
        :ingredients="ingredients"
        @selectSauce="selectSauce"
        @changeCount="changeCount"
      />
      <builder-pizza-view
        :ingredients="selectedIngredients"
        :selectedDough="pizza.dough.type"
        :selectedSauce="pizza.sauce.type"
        :total-price="totalPrice"
        :pizza-name="pizza.name"
        @drop="changeCount"
        @input="pizza.name = $event"
        @submit="submitOrder"
      />
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
  data() {
    return {
      pizza: {
        name: "",
        dough: this.dough.find((item) => item.type === "light"),
        sauce: this.sauces.find((item) => item.type === "tomato"),
        size: this.sizes.find((item) => item.type === "small"),
      },
    };
  },
  computed: {
    selectedIngredients() {
      return this.ingredients.filter((ingredient) => ingredient.count > 0);
    },
    priceIngredients() {
      const price = this.selectedIngredients.reduce((cost, item) => {
        cost += item.count * item.price;
        return cost;
      }, 0);
      return price;
    },
    totalPrice() {
      //  мультипликатор размера х (стоимость теста + соус + ингредиенты).
      let total = 0;
      const multiplier = this.pizza.size.multiplier;
      const priceDough = this.pizza.dough.price;
      const priceSauce = this.pizza.sauce.price;

      total = multiplier * (priceDough + priceSauce + this.priceIngredients);

      return total;
    },
  },
  methods: {
    selectDough(value) {
      this.pizza.dough = this.dough.find((item) => item.type === value);
    },
    selectSauce(value) {
      this.pizza.sauce = this.sauces.find((item) => item.type === value);
    },
    selectSize(value) {
      this.pizza.size = this.sizes.find((item) => item.type === value);
    },
    changeCount({ type, count }) {
      const selectedIngredient = this.ingredients.find(
        (ingredient) => ingredient.type === type
      );
      if (selectedIngredient) {
        selectedIngredient.count = count;
      }
    },
    submitOrder() {
      const data = {
        pizza: this.pizza,
        totalPrice: this.totalPrice,
      };
      this.$emit("confirm", data);
    },
  },
};
</script>

<style scoped></style>
