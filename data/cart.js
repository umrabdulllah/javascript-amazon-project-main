export const cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
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
