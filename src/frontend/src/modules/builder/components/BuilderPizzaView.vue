<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="selectedPizza.name"
        @input="changePizzaName($event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <AppDrop
        @drop="
          changeCount({
            type: $event.type,
            count: $event.count + 1,
          })
        "
      >
        <div class="pizza" :class="classSelectedDough">
          <div class="pizza__wrapper">
            <template v-for="ingredient of selectedPizza.ingredients">
              <div
                :key="ingredient.type"
                class="pizza__filling"
                :class="`pizza__filling--${ingredient.type}`"
              ></div>
              <div
                v-if="ingredient.count === 2"
                :key="`${ingredient.type}-2`"
                class="pizza__filling pizza__filling--second"
                :class="`pizza__filling--${ingredient.type}`"
              ></div>
              <div
                v-if="ingredient.count === 3"
                :key="`${ingredient.type}-3`"
                class="pizza__filling pizza__filling--third"
                :class="`pizza__filling--${ingredient.type}`"
              ></div>
            </template>
          </div>
        </div>
      </AppDrop>
    </div>

    <builder-price-counter
      :disabled="
        selectedPizza.ingredients.length === 0 ||
        selectedPizza.name.length === 0
      "
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  UPDATE_PIZZA_NAME,
  UPDATE_PIZZA_INGREDIENT_COUNT,
} from "@/store/mutation-types.js";
import BuilderPriceCounter from "./BuilderPriceCounter";
import AppDrop from "../../../common/components/AppDrop.vue";
export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
    AppDrop,
  },
  computed: {
    ...mapGetters("Builder", {
      selectedPizza: "selectedPizza",
      allSauces: "allSauces",
    }),
    classSelectedDough() {
      let className = "";
      const selectedSauce = this.allSauces.find(
        (item) => item.id === this.selectedPizza.sauce.id
      );

      this.selectedPizza.dough.id === 1
        ? (className = `pizza--foundation--small-${selectedSauce.type}`)
        : (className = `pizza--foundation--big-${selectedSauce.type}`);
      return className;
    },
  },
  methods: {
    ...mapMutations("Builder", {
      changePizzaName: UPDATE_PIZZA_NAME,
      changeCount: UPDATE_PIZZA_INGREDIENT_COUNT,
    }),
  },
};
</script>

<style scoped></style>
