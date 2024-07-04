export const cart = [];

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
