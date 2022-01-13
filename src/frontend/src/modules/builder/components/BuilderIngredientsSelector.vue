<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            v-for="sauce of allSauces"
            :key="sauce.id"
            class="radio ingredients__input"
          >
            <radio-button
              name="sauce"
              :value="sauce.type"
              :checked="sauce.id === selectedPizza.sauce.id"
              @input="selectSauce($event)"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="ingredient of allIngredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <AppDrag
                :draggable="ingredient.count < 3"
                :transfer-data="ingredient"
              >
                <selector-item
                  :name="ingredient.name"
                  :type="ingredient.type"
                />
              </AppDrag>
              <item-counter
                class="ingredients__counter"
                :value="ingredient.count"
                @change="changeCount({ type: ingredient.type, count: $event })"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  UPDATE_PIZZA_SAUCE,
  UPDATE_PIZZA_INGREDIENT_COUNT,
} from "@/store/mutation-types.js";
import RadioButton from "@/common/components/RadioButton.vue";
import SelectorItem from "@/common/components/SelectorItem.vue";
import ItemCounter from "@/common/components/ItemCounter.vue";
import AppDrag from "@/common/components/AppDrag.vue";
export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppDrag,
    ItemCounter,
    SelectorItem,
    RadioButton,
  },
  computed: {
    ...mapGetters("Builder", {
      allIngredients: "allIngredients",
      allSauces: "allSauces",
      selectedPizza: "selectedPizza",
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      selectSauce: UPDATE_PIZZA_SAUCE,
      changeCount: UPDATE_PIZZA_INGREDIENT_COUNT,
    }),
  },
};
</script>

<style scoped></style>
