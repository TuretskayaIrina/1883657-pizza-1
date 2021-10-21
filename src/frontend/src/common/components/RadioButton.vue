<template>
  <input :type="type" :name="name" :value="value" :class="className" />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    type: {
      type: String,
      default: "radio",
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped></style>
