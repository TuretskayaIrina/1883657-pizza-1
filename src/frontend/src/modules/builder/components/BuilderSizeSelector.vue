<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size of allSizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${size.type}`"
        >
          <radio-button
            class-name="visually-hidden"
            name="diameter"
            :value="size.type"
            :checked="size.id === selectedPizza.size.id"
            @input="selectSize($event)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { UPDATE_PIZZA_SIZE } from "@/store/mutation-types.js";
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  computed: {
    ...mapGetters("Builder", {
      allSizes: "allSizes",
      selectedPizza: "selectedPizza",
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      selectSize: UPDATE_PIZZA_SIZE,
    }),
  },
};
</script>

<style scoped></style>
