<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough of allDough"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${dough.type}`"
        >
          <radio-button
            class-name="visually-hidden"
            name="dough"
            :value="dough.type"
            :checked="dough.id === selectedPizza.dough.id"
            @input="selectDough($event)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { UPDATE_PIZZA_DOUGH } from "@/store/mutation-types.js";
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  computed: {
    ...mapGetters("Builder", {
      allDough: "allDough",
      selectedPizza: "selectedPizza",
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      selectDough: UPDATE_PIZZA_DOUGH,
    }),
  },
};
</script>

<style scoped></style>
