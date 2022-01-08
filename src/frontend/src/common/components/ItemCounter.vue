<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      class="counter__button counter__button--minus"
      type="button"
      @click="handlerCountMinus"
      :disabled="dataValue <= minValue"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      class="counter__input"
      type="text"
      name="counter"
      :readonly="readonly"
      :value="dataValue"
    />
    <button
      class="counter__button counter__button--plus"
      type="button"
      @click="handlerCountPlus"
      :disabled="dataValue >= maxValue"
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
  },
  data() {
    return {
      dataValue: this.value,
    };
  },
  watch: {
    value: {
      handler() {
        this.dataValue = this.value;
      },
    },
  },
  methods: {
    handlerCountPlus() {
      this.$emit("change", ++this.dataValue);
    },
    handlerCountMinus() {
      this.$emit("change", --this.dataValue);
    },
  },
};
</script>

<style scoped></style>
