import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    deliveryOptionId: "2",
  },

  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: "1",
  },
];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(buttonId) {
  let matchingItem;
  const btnProductId = buttonId.dataset.productId;
  cart.forEach((cartItem) => {
    if (cartItem.id === btnProductId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      id: btnProductId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveCart();
}

export function removeCartItem(deleteId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id !== deleteId) newCart.push(cartItem);
  });
  cart = newCart;
  saveCart();
}

export function updateDeliveryOptionId(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) matchingItem = cartItem;
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveCart();
}
