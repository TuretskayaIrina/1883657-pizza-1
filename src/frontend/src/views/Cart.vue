<template>
  <form action="test.html" method="post" class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <!--        TODO-->
        <!--        <div v-if="cart.pizzasList.length === 0 && cart.miscList.length === 0" class="sheet cart__empty">-->
        <!--          <p>В корзине нет ни одного товара</p>-->
        <!--        </div>-->

        <!-- TODO: v-if="cart.pizzasList.length != 0 && cart.miscList.length != 0"-->
        <ul class="cart-list sheet">
          <li
            v-for="(pizza, index) of cart.pizzasList"
            :key="index"
            class="cart-list__item"
          >
            <div class="product cart-list__product">
              <!-- TODO: Картинка??? -->
              <img
                src="../assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                alt="Капричоза"
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

            <!-- TODO: maxValue? -->
            <item-counter
              :orange-mode="true"
              :value="pizza.quantity"
              :max-value="100"
              class="cart-list__counter"
            />

            <div class="cart-list__price">
              <b>{{ pizza.cost }} ₽</b>
            </div>

            <!-- TODO: redirect to builder -->
            <div class="cart-list__button">
              <button type="button" class="cart-list__edit">Изменить</button>
            </div>
          </li>
        </ul>

        <div class="cart__additional">
          <ul class="additional-list">
            <li
              v-for="misc of allMisc"
              :key="misc.id"
              class="additional-list__item sheet"
            >
              <p class="additional-list__description">
                <img
                  :src="misc.image"
                  width="39"
                  height="60"
                  :alt="misc.name"
                />
                <span>{{ misc.name }}</span>
              </p>

              <div class="additional-list__wrapper">
                <!-- TODO: maxValue? -->
                <item-counter
                  :orange-mode="true"
                  :value="misc.count"
                  :max-value="99"
                  @change="changeCount({ type: misc.type, count: $event })"
                  class="additional-list__counter"
                />

                <div class="additional-list__price">
                  <b>× {{misc.price}} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="cart__form">
          <div class="cart-form">
            <label class="cart-form__select">
              <span class="cart-form__label">Получение заказа:</span>

              <select name="test" class="select">
                <option value="1">Заберу сам</option>
                <option value="2">Новый адрес</option>
                <option value="3">Дом</option>
              </select>
            </label>

            <label class="input input--big-label">
              <span>Контактный телефон:</span>
              <input type="text" name="tel" placeholder="+7 999-999-99-99" />
            </label>

            <div class="cart-form__address">
              <span class="cart-form__label">Новый адрес:</span>

              <div class="cart-form__input">
                <label class="input">
                  <span>Улица*</span>
                  <input type="text" name="street" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Дом*</span>
                  <input type="text" name="house" />
                </label>
              </div>

              <div class="cart-form__input cart-form__input--small">
                <label class="input">
                  <span>Квартира</span>
                  <input type="text" name="apartment" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link to="/" class="button button--border button--arrow">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ totalCost }} ₽</b>
      </div>

      <div class="footer__submit">
        <button type="submit" class="button">Оформить заказ</button>
      </div>
    </section>
    <pre>cart{{ cart }}</pre>
    <pre>allMisc{{ allMisc }}</pre>
  </form>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import {UPDATE_ADDITION_PRODUCT_COUNT} from "@/store/mutation-types.js";
import ItemCounter from "../common/components/ItemCounter";

export default {
  name: "Cart",
  components: { ItemCounter },
  computed: {
    ...mapGetters("Cart", {
      allMisc: "allMisc",
      cart: "cart",
      totalCost: "totalCost",
    }),
  },
  methods: {
    ...mapMutations("Cart", {
      changeCount: UPDATE_ADDITION_PRODUCT_COUNT,
    }),
    getIngredientsNames(ingredientsList) {
      const formattedText = ingredientsList.map((item) => item.name).join(', ');
      return formattedText;
    },
  },
};
</script>
