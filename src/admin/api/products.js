import api from "../../api/apiClient";

// ✅ GET ALL PRODUCTS (with pagination)
export const getProducts = async (page = 1) => {
  const res = await api.get(`/products?page=${page}&per_page=12`);
  return res.data;
};

// ✅ GET PRODUCT BY ID ⭐ NEW
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data.data.product; 
  // returning only product object for easy use
};

// ✅ GET FILTERS ⭐ NEW
export const getProductFilters = async () => {
  const res = await api.get(`/products/filters`);
  return res.data.data; 
  // { colors: [], fabrics: [], occasions: [] }
};

// ✅ UPLOAD IMAGE
export const uploadImage = async (file) => {
  if (!file) throw new Error("No file selected");

  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/upload/image", formData);
  return res.data;
};

// ✅ CREATE
export const createProduct = async (data) => {
  const res = await api.post("/products", data);
  return res.data;
};

// ✅ UPDATE
export const updateProduct = async (id, data) => {
  const res = await api.put(`/products/${id}`, data);
  return res.data;
};

// ✅ DELETE
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data;
};