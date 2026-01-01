import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/product.service";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import ProductSidebar from "../components/ProductSidebar";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [params, setParams] = useSearchParams();
  const selectedCategory = params.get("category") || "";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // Fetch categories (once)
  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  // Fetch products (on category change)
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(selectedCategory);
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory]);

  if (loading) {
    return <p className="p-6">Loading products...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
  <h1 className="text-3xl font-bold mb-6">Shop</h1>

  <div className="grid grid-cols-12 gap-6">
    {/* SIDEBAR */}
    <aside className="col-span-12 md:col-span-3">
      <ProductSidebar
        categories={categories}
        selectedCategory={selectedCategory}
        setParams={setParams}
      />
    </aside>

    {/* PRODUCTS GRID */}
    <main className="col-span-12 md:col-span-9">
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </main>
  </div>
</div>

  );
};

export default Products;
