<template>
  <div class="counter counter--orange">
    <button
      class="counter__button counter__button--minus"
      type="button"
      @click="handlerCountMinus"
      :disabled="value <= minValue"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      class="counter__input"
      type="text"
      name="counter"
      :readonly="readonly"
      :value="value"
    />
    <button
      class="counter__button counter__button--plus"
      :class="orangeMode ? 'counter__button--orange' : ''"
      type="button"
      @click="handlerCountPlus"
      :disabled="value >= maxValue"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ItemCounter",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 3,
    },
    readonly: {
      type: Boolean,
      default: true,
    },
    orangeMode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handlerCountPlus() {
      this.$emit("change", this.value + 1);
    },
    handlerCountMinus() {
      this.$emit("change", this.value - 1);
    },
  },
};
</script>

<style scoped></style>
