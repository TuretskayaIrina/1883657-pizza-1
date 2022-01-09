<template>
  <div>
    <AppLayoutHeader />
    <main class="layout">
      <div class="layout__sidebar sidebar">
        <router-link to="/" class="logo layout__logo">
          <img
            src="../assets/img/logo.svg"
            alt="V!U!E! Pizza logo"
            width="90"
            height="40"
          />
        </router-link>

        <router-link to="/orders" class="layout__link layout__link--active">
          История заказов
        </router-link>
        <router-link to="/profile" class="layout__link">Мои данные</router-link>
      </div>
      <slot />
    </main>
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader";

export default {
  name: "AppLayoutMain",
  components: {
    AppLayoutHeader,
  },
};
</script>
