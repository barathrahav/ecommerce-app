import React, { useEffect, useState } from "react";
import api from "../services/api";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    price: "",
    description: "",
    category: "",
    stock: "",
    isActive: true,
  });

  const loadProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  useEffect(() => {
  if (!editingId && form.title) {
    setForm((prev) => ({
      ...prev,
      slug: prev.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, ""),
    }));
  }
}, [form.title, editingId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
  ...form,
  stock: Number(form.stock) || 0,
  price: Number(form.price),
  images,
};

    if (editingId) {
      await api.put(`/products/${editingId}`, payload);
      setEditingId(null);
    } else {
      await api.post("/products", payload);
    }

    setForm({
      title: "",
      slug: "",
      price: "",
      description: "",
      category: "",
      stock: "",
      isActive: true,
    });
    setImages([]);
    setEditingId(null);
    loadProducts();
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append("images", file);
    }

    try {
      setUploading(true);
      const res = await api.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImages((prev) => [...prev, ...res.data.urls]);
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response || err);
      console.log("Cloudinary API KEY:", process.env.CLOUDINARY_API_KEY);
      alert(err.response?.data?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products</h1>
      </div>

      {/* CREATE / EDIT FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow flex gap-3 flex-wrap"
      >
        <input
          name="title"
          placeholder="Title"
          className="border p-2 rounded w-48"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Price"
          className="border p-2 rounded w-32"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          name="slug"
          placeholder="Slug"
          className="border p-2 rounded w-48"
          value={form.slug}
          onChange={handleChange}
          required
        />

        <select
  name="category"
  value={form.category}
  onChange={handleChange}
  required
  className="border p-2 rounded w-48"
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat.slug}>
      {cat.name}
    </option>
  ))}
</select>

        <input
          name="stock"
          type="number"
          placeholder="Stock"
          className="border p-2 rounded w-32"
          value={form.stock}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded w-full"
          value={form.description}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2 rounded"
        />

        {uploading && <p className="text-sm text-blue-600">Uploading...</p>}

        <div className="flex gap-3 mt-2">
          {images.map((img) => (
            <img
              key={img}
              src={img}
              alt="preview"
              className="w-16 h-16 rounded object-cover border"
            />
          ))}
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm({
                title: "",
                slug: "",
                price: "",
                description: "",
                category: "",
                stock: "",
                isActive: true,
              });
              setImages([]);
            }}
            className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </form>

      {/* PRODUCT LIST */}
      <div className="bg-white rounded-xl shadow divide-y">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex justify-between items-center p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <img
                src={p.images?.[0] || "https://via.placeholder.com/50"}
                alt={p.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium">{p.title}</p>
                <p className="text-sm text-gray-500">
                  ₹{p.price} • {p.category || "Uncategorized"}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs
                  ${
                    p.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-300 text-gray-700"
                  }`}
              >
                {p.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(p._id);
                  setForm({
                    title: p.title,
                    slug: p.slug,
                    price: p.price,
                    description: p.description || "",
                    category: p.category || "",
                    stock: p.stock || "",
                    isActive: p.isActive,
                  });
                  setImages(p.images || []);
                }}
                className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
              >
                <PencilIcon className="w-4 h-4" />
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200"
              >
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
