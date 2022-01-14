<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">История заказов</h1>
    </div>

    <!-- TODO: Присвоение айдишника с бэка? -->
    <section
      v-for="(item, index) of allOrders"
      :key="index"
      class="sheet order"
    >
      <div class="order__wrapper">
        <div class="order__number">
          <!-- TODO: Вывести id заказа -->
          <b>Заказ #11199929</b>
        </div>

        <div class="order__sum">
          <span>Сумма заказа: {{ item.cost }} ₽</span>
        </div>

        <!-- TODO: Работа кнопок -->
        <div class="order__button">
          <button type="button" class="button button--border">Удалить</button>
        </div>
        <div class="order__button">
          <button type="button" class="button">Повторить</button>
        </div>
      </div>

      <ul class="order__list">
        <li
          v-for="(pizza, index) of item.order.pizzasList"
          :key="index"
          class="order__item"
        >
          <div class="product">
            <!-- TODO: Картинка пиццы -->
            <img
              src="../assets/img/product.svg"
              class="product__img"
              width="56"
              height="56"
              :alt="pizza.name"
            />
            <div class="product__text">
              <h2>{{ pizza.name }}</h2>
              <ul>
                <li>Тесто: {{ pizza.dough.name }}</li>
                <li>Размер: {{ pizza.size.name }}</li>
                <li>Соус: {{ pizza.sauce.name }}</li>
                <li>Начинка: {{ getIngredientsNames(pizza.ingredients) }}</li>
              </ul>
            </div>
          </div>

          <p class="order__price">{{ pizza.quantity }} * {{ pizza.cost }} ₽</p>
        </li>
      </ul>

      <ul class="order__additional">
        <li v-for="product of item.order.miscList" :key="product.id">
          <img
            :src="product.image"
            width="20"
            height="30"
            :alt="product.name"
          />
          <p>
            <span>{{ product.name }}</span>
            <b>{{ product.count }} * {{ product.price }} ₽</b>
          </p>
        </li>
      </ul>

      <!-- TODO: Адрес -->
      <p class="order__address">
        Адрес доставки: Тест (или если адрес новый - писать целиком)
      </p>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Orders",
  computed: {
    ...mapGetters("Orders", {
      allOrders: "allOrders",
    }),
  },
  methods: {
    getIngredientsNames(ingredientsList) {
      const formattedText = ingredientsList.map((item) => item.name).join(", ");
      return formattedText;
    },
  },
};
</script>
