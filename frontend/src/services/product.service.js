import api from "./api";

export const fetchProducts = async () => {
  const res = await api.get("/products");
  return res.data;
};

export const fetchProductBySlug = async (slug) => {
  const res = await api.get(`/products/${slug}`);
  return res.data;
};
