<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        :value="pizzaName"
        @input="$emit('input', $event.target.value)"
      />
    </label>

    <div class="content__constructor">
      <AppDrop @drop="onDrop($event)">
        <div
          class="pizza"
          :class="
            selectedDough === 'light'
              ? `pizza--foundation--small-${selectedSauce}`
              : `pizza--foundation--big-${selectedSauce}`
          "
        >
          <div class="pizza__wrapper">
            <template v-for="ingredient of ingredients">
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
      :disabled="ingredients.length === 0 || pizzaName.length === 0"
      :total-price="totalPrice"
      @submit="$emit('submit')"
    />
  </div>
</template>

<script>
import BuilderPriceCounter from "./BuilderPriceCounter";
import AppDrop from "../../../common/components/AppDrop.vue";
export default {
  name: "BuilderPizzaView",
  components: {
    BuilderPriceCounter,
    AppDrop,
  },
  props: {
    selectedDough: {
      type: String,
      required: true,
    },
    selectedSauce: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    pizzaName: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    onDrop(event) {
      this.$emit("drop", {
        type: event.type,
        count: event.count + 1,
      });
    },
  },
};
</script>

<style scoped></style>
