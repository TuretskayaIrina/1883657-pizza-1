<template>
  <div class="popup">
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
  created() {
    document.body.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.$emit("close");
      }
    });
  },
  unmounted() {
    document.body.removeEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.$emit("close");
      }
    });
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  emits: ["close"],
};
</script>

<style scoped></style>
