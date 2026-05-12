export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      ...product,
      quantity,
    });
  }

  saveCart(cart);
};

export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);

  saveCart(cart);
};

export const updateCartQuantity = (id, quantity) => {
  const cart = getCart().map((item) =>
    item.id === id
      ? { ...item, quantity }
      : item
  );

  saveCart(cart);
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};

export const getCartCount = () => {
  const cart = getCart();

  return cart.reduce(
    (total, item) => total + item.quantity,
    0
  );
};

export const getCartItemQuantity = (id) => {
  const cart = getCart();

  const item = cart.find((item) => item.id === id);

  return item ? item.quantity : 0;
};

export const decreaseCartItem = (id) => {

  let cart = getCart();

  const item = cart.find((item) => item.id === id);

  if (!item) return;

  if (item.quantity === 1) {
    cart = cart.filter((item) => item.id !== id);
  } else {
    item.quantity -= 1;
  }

  saveCart(cart);
};