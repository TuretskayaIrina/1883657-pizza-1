<template>
  <body>
    <app-layout :total="totalPrice" />

    <main class="content">
      <builder
        :dough="dough"
        :ingredients="ingredients"
        :sauces="sauces"
        :sizes="sizes"
        @confirm="confirmOrder"
      />
    </main>
  </body>
</template>

<script>
import AppLayout from "@/layouts/AppLayout.vue";
import Builder from "@/modules/builder/Builder";
import { dough, ingredients, sauces, sizes } from "@/static/pizza.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSizes,
} from "@/common/helpers.js";

export default {
  name: "Constructor",
  components: { Builder, AppLayout },
  data() {
    return {
      dough: dough.map((dough) => normalizeDough(dough)),
      ingredients: ingredients.map((ingredient) =>
        normalizeIngredients(ingredient)
      ),
      sauces: sauces.map((sauce) => normalizeSauces(sauce)),
      sizes: sizes.map((size) => normalizeSizes(size)),
      totalPrice: 0,
    };
  },
  methods: {
    confirmOrder(data) {
      this.totalPrice = data.totalPrice;
    },
  },
};
</script>

<style></style>
