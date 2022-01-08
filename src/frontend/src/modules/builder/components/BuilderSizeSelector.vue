<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
          v-for="size of sizes"
          :key="size.id"
          class="diameter__input"
          :class="`diameter__input--${size.type}`"
        >
          <radio-button
            class-name="visually-hidden"
            name="diameter"
            :value="size.type"
            :checked="size.type === sizeType"
            @input="$emit('selectSize', $event)"
          />
          <span>{{ size.name }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import RadioButton from "@/common/components/RadioButton.vue";
export default {
  name: "BuilderSizeSelector",
  components: { RadioButton },
  props: {
    sizes: {
      type: Array,
      required: true,
    },
    sizeType: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
