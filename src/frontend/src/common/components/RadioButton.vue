<template>
  <input
    :class="className"
    :type="type"
    :name="name"
    :value="value"
    :checked="checked"
    @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  name: "RadioButton",
  props: {
    className: {
      type: String,
      default: '',
    },
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
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped></style>
