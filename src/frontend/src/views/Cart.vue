<template>
  <form class="layout-form">
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <h1 class="title title--big">Корзина</h1>
        </div>

        <div
          v-if="cart.pizzasList.length === 0 && cart.miscList.length === 0"
          class="sheet cart__empty"
        >
          <p>В корзине нет ни одного товара</p>
        </div>

        <ul v-if="cart.pizzasList.length !== 0" class="cart-list sheet">
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

            <item-counter
              :orange-mode="true"
              :value="pizza.quantity"
              :max-value="99"
              class="cart-list__counter"
              @change="
                changePizzasQuantity({ name: pizza.name, quantity: $event })
              "
            />

            <div class="cart-list__price">
              <b>{{ pizza.cost }} ₽</b>
            </div>

            <div class="cart-list__button">
              <button
                @click="changePizza(pizza)"
                type="button"
                class="cart-list__edit"
              >
                Изменить
              </button>
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
                <item-counter
                  :orange-mode="true"
                  :value="misc.count"
                  :max-value="99"
                  @change="changeCount({ type: misc.type, count: $event })"
                  class="additional-list__counter"
                />

                <div class="additional-list__price">
                  <b>× {{ misc.price }} ₽</b>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div
          v-if="cart.pizzasList.length !== 0 || cart.miscList.length !== 0"
          class="cart__form"
        >
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
    <section
      v-if="cart.pizzasList.length !== 0 || cart.miscList.length !== 0"
      class="footer"
    >
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

      <div @click="submitOrder" class="footer__submit">
        <button type="button" class="button">Оформить заказ</button>
      </div>
    </section>
    <Modal :showModal="showModal" @close="closeModal" />
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {
  UPDATE_PIZZA,
  UPDATE_ADDITION_PRODUCT_COUNT,
  UPDATE_PIZZAS_QUANTITY,
  RESET_CART,
  CONFIRM_ORDER,
} from "@/store/mutation-types.js";
import ItemCounter from "../common/components/ItemCounter";
import Modal from "../common/components/Modal";

export default {
  name: "Cart",
  data() {
    return {
      showModal: false,
    };
  },
  components: { Modal, ItemCounter },
  computed: {
    ...mapGetters("Cart", {
      allMisc: "allMisc",
      cart: "cart",
      totalCost: "totalCost",
    }),
  },
  methods: {
    ...mapMutations("Builder", {
      updatePizza: UPDATE_PIZZA,
    }),
    ...mapMutations("Cart", {
      changeCount: UPDATE_ADDITION_PRODUCT_COUNT,
      changePizzasQuantity: UPDATE_PIZZAS_QUANTITY,
      resetCart: RESET_CART,
    }),
    ...mapMutations("Orders", {
      confirmOrder: CONFIRM_ORDER,
    }),
    getIngredientsNames(ingredientsList) {
      const formattedText = ingredientsList.map((item) => item.name).join(", ");
      return formattedText;
    },
    changePizza(pizza) {
      this.updatePizza(pizza);
      this.$router.push("/");
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.resetCart();
      this.showModal = false;
      this.$router.push("/orders");
    },
    submitOrder() {
      this.confirmOrder({ cost: this.totalCost, order: this.cart });
      this.openModal();
    },
  },
};
</script>
