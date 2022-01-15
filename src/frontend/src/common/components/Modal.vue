<template>
  <div v-if="showModal" class="popup">
    <span @click="close" class="close">
      <span class="visually-hidden">Закрыть попап</span>
    </span>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div @click="close" class="popup__button">
      <span class="button">Отлично, я жду!</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    document.body.addEventListener("keydown", this.onKeyDown);
  },
  destroyed() {
    document.body.removeEventListener("keydown", this.onKeyDown);
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onKeyDown(evt) {
      if (this.showModal && evt.key === "Escape") {
        this.close();
      }
    },
  },
};
</script>

<style scoped></style>
