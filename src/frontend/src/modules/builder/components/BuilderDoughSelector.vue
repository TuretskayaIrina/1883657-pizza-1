<template>
  <div class="content__dough">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите тесто</h2>

      <div class="sheet__content dough">
        <label
          v-for="dough of dough"
          :key="dough.id"
          class="dough__input"
          :class="`dough__input--${dough.type}`"
        >
          <radio-button
            class-name="visually-hidden"
            name="dough"
            :value="dough.type"
            :checked="dough.type === doughType"
            @input="$emit('selectDough', $event)"
          />
          <b>{{ dough.name }}</b>
          <span>{{ dough.description }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "BuilderDoughSelector",
  components: { RadioButton },
  props: {
    dough: {
      type: Array,
      required: true,
    },
    doughType: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
