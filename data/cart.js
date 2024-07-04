import { products } from "./products.js";

export let cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },

  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function addToCart(buttonId) {
  let matchingItem;
  const btnProductId = buttonId.dataset.productId;
  cart.forEach((cartItem) => {
    if (cartItem.productId === btnProductId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: btnProductId,
      quantity: 1,
    });
  }
}

export function removeCartItem(deleteId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.id !== deleteId) newCart.push(cartItem);
  });
  cart = newCart;
}
