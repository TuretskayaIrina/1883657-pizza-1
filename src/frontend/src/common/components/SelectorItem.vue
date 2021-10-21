<template>
  <span :class="['filling', `filling--${type}`]">
    {{ name }}
  </span>
</template>

<script>
export default {
  name: "SelectorItem",
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
