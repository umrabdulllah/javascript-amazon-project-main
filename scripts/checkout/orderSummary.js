import {
  cart,
  removeCartItem,
  updateDeliveryOptionId,
} from "../../data/cart.js";
import { products, getProducts } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";

export function renderOrderSummary() {
  let cartHTML = "";

  cart.forEach((cartItem) => {
    const matchingItem = getProducts(cartItem.id);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today
      .add(deliveryOption.deliveryDays, "days")
      .format("dddd, MMMM D");

    cartHTML += `
  <div class="cart-item-container js-cart-container-${matchingItem.id}">
            <div class="delivery-date">Delivery date: ${deliveryDate}</div>

            <div class="cart-item-details-grid">
              <img
                class="product-image"
                src="${matchingItem.image}"
              />

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">$${formatCurrency(
                  matchingItem.priceCents
                )}</div>
                <div class="product-quantity">
                  <span> Quantity: <span class="quantity-label">${
                    cartItem.quantity
                  }</span> </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link js-delete-link link-primary" data-delete-id = ${
                    matchingItem.id
                  }>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem, cartItem)}
                
                
                
              </div>
            </div>
          </div>
  
  `;
  });

  function deliveryOptionsHTML(matchingItem, cartItem) {
    let deliveryHTML = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today
        .add(deliveryOption.deliveryDays, "days")
        .format("dddd, MMMM D");

      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      deliveryHTML += `
    <div class="delivery-option js-delivery-option" data-product-id = "${
      matchingItem.id
    }" data-delivery-option-id = "${deliveryOption.id}">
      <input
        type="radio"
        ${isChecked ? "checked" : ""}
        class="delivery-option-input"
        name="delivery-option-${matchingItem.id}"
      />
      <div>
        <div class="delivery-option-date">${deliveryDate}</div>
        <div class="delivery-option-price">${priceString} Shipping</div>
      </div>
    </div>
    `;
    });
    return deliveryHTML;
  }

  document.querySelector(".js-order-summary").innerHTML = cartHTML;
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const deleteLinkId = link.dataset.deleteId;
      removeCartItem(deleteLinkId);

      document.querySelector(`.js-cart-container-${deleteLinkId}`).remove();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOptionId(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
