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
            <radio-button
              name="sauce"
              :value="sauce.type"
              :checked="sauce.type === sauceType"
              @input="$emit('selectSauce', $event)"
            />
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
                :value="ingredient.count"
                @change="changeCount(ingredient.type, $event)"
              />
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
import AppDrag from "@/common/components/AppDrag.vue";
export default {
  name: "BuilderIngredientsSelector",
  components: {
    AppDrag,
    ItemCounter,
    SelectorItem,
    RadioButton,
  },
  props: {
    sauces: {
      type: Array,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
    sauceType: {
      type: String,
      required: true,
    },
  },
  methods: {
    changeCount(type, count) {
      this.$emit("changeCount", {
        type,
        count,
      });
    },
  },
};
</script>

<style scoped></style>
