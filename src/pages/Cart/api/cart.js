import apiClient from "../../../api/apiClient";

// ADD TO CART
export const addToCartApi = async (productId, quantity = 1) => {
  try {
    const response = await apiClient.post("/cart/add", {
      product_id: productId,
      quantity,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// GET CART
export const getCartApi = async () => {
  try {
    const response = await apiClient.get("/cart");

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// UPDATE CART ITEM
export const updateCartItemApi = async (cartItemId, quantity) => {
  try {
    const response = await apiClient.put(`/cart/item/${cartItemId}`, {
      quantity,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// DELETE CART ITEM
export const deleteCartItemApi = async (cartItemId) => {
  try {
    const response = await apiClient.delete(`/cart/item/${cartItemId}`);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// CLEAR CART
export const clearCartApi = async () => {
  try {
    const response = await apiClient.delete("/cart/clear");

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// GET CART COUNT
export const getCartCountApi = async () => {
  try {
    const response = await apiClient.get("/cart/count");

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};