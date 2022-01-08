<template>
  <div class="content__result">
    <p>Итого: {{ totalPrice }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="disabled"
      @click="$emit('submit')"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
export default {
  name: "BuilderPriceCounter",
  props: {
    totalPrice: {
      type: Number,
      default: 0,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped></style>
