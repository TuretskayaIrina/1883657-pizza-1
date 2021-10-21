<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            v-for="sauce of sauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <radio-button name="sauce" :value="sauce.type" />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient of ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <selector-item :name="ingredient.name" :type="ingredient.type" />
              <item-counter />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
import SelectorItem from "@/common/components/SelectorItem.vue";
import ItemCounter from "@/common/components/ItemCounter.vue";
export default {
  name: "BuilderIngredientsSelector",
  components: { ItemCounter, SelectorItem, RadioButton },
  props: {
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
