import api from "./api";

export const fetchProducts = async (category) => {
  const url = category ? `/products?category=${category}` : "/products";

  const res = await api.get(url);
  return res.data;
};

export const fetchProductBySlug = async (slug) => {
  const res = await api.get(`/products/${slug}`);
  return res.data;
};
