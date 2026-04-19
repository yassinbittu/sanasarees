import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import Modal from "../components/common/Modal";

import {
  getProducts,
  createProduct,
  uploadImage,
  deleteProduct,
  updateProduct,
} from "./api/products";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    occasion: "Wedding",
    fabric: "Silk",
    color: "",
    care: "",
    inStock: true,
    isNew: false,
  });

  const inputCls =
    "w-full px-3 py-2.5 border border-[#E5E2DE] rounded-lg text-sm outline-none focus:border-[#7A1E2D] transition";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (pageNum = 1) => {
    try {
      setLoading(true);

      const res = await getProducts(pageNum);

      setProducts(res.data || []);
      setPagination(res.pagination || {});
      setPage(pageNum);

    } catch {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEdit = (p) => {
    setEditId(p.id);

    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      originalPrice: p.original_price,
      occasion: p.occasion,
      fabric: p.fabric,
      color: p.color,
      care: p.care,
      inStock: p.in_stock,
      isNew: p.is_new,
    });

    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      let image_url = "";

      if (imageFile) {
        const res = await uploadImage(imageFile);
        image_url = res.data.url;
      }

      const existing = products.find((p) => p.id === editId);

      const payload = {
        name: form.name,
        description: form.description || "",
        price: Number(form.price),
        original_price: Number(form.originalPrice || form.price),

        occasion: form.occasion,
        fabric: form.fabric,
        color: form.color || "",
        care: form.care || "",

        in_stock: form.inStock,
        is_new: form.isNew,

        // ✅ only for update
        ...(editId && { is_active: true }),

        image_url: image_url || existing?.image_url || null,
      };

      console.log("FINAL PAYLOAD 👉", payload); // debug

      if (editId) {
        await updateProduct(editId, payload);
      } else {
        await createProduct(payload);
      }

      resetForm();
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    fetchProducts();
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      occasion: "Wedding",
      fabric: "Silk",
      color: "",
      care: "",
      inStock: true,
      isNew: false,
    });
    setImageFile(null);
    setEditId(null);
  };

  return (
  <div className="flex min-h-screen bg-[#FAF9F7]">
    <AdminSidebar />

    <main className="flex-1 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#1C1C1C]">
          Manage Products
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-[#7A1E2D] text-white px-5 py-2 rounded-lg shadow hover:bg-[#651725] transition"
        >
          + Add Product
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#F5F3F0] text-gray-600 text-xs uppercase">
              <th className="px-5 py-3 text-left">Product</th>
              <th className="px-5 py-3 text-left">Price</th>
              <th className="px-5 py-3 text-left">Occasion</th>
              <th className="px-5 py-3 text-left">Color</th>
              <th className="px-5 py-3 text-left">Care</th>
              <th className="px-5 py-3 text-left">Stock</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* PRODUCT */}
                  <td className="px-5 py-4 flex items-center gap-3">
                    <img src={`https://sana-backend-fim0.onrender.com${p.image_url}`} 
                      className="w-12 h-12 rounded-lg object-cover border"
                    />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-gray-400">
                        {p.fabric || "-"}
                      </p>
                    </div>
                  </td>

                  {/* PRICE */}
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#1C1C1C]">
                      ₹{p.price}
                    </p>
                    <p className="text-xs text-gray-400 line-through">
                      ₹{p.original_price || "-"}
                    </p>
                  </td>

                  {/* OCCASION */}
                  <td className="px-5 py-4">{p.occasion || "-"}</td>
{/* COLOR ✅ */}
  <td className="px-5 py-4">
    <span className="text-sm font-medium">
      {p.color || "-"}
    </span>
  </td>

  {/* CARE ✅ */}
  <td className="px-5 py-4">
    <span className="text-xs text-gray-500">
      {p.care || "-"}
    </span>
  </td>

                  {/* STOCK */}
                  <td className="px-5 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        p.in_stock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.in_stock ? "In Stock" : "Out"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-5 py-4 flex gap-3">
                    <button
                      onClick={() => handleEdit(p)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-5">
        <p className="text-sm text-gray-500">
          Page {pagination.page} of {pagination.pages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={!pagination.has_prev}
            onClick={() => fetchProducts(page - 1)}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
          >
            Prev
          </button>

          <button
            disabled={!pagination.has_next}
            onClick={() => fetchProducts(page + 1)}
            className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </main>

    {/* MODAL (keep your existing one, it's already good) */}
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      title={editId ? "Edit Product" : "Add Product"}
      footer={
        <>
          <button
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>

          <button
            className="bg-[#7A1E2D] text-white px-4 py-2 rounded-lg hover:bg-[#651725]"
            onClick={handleSave}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </>
      }
    >
       {/* MODAL */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editId ? "Edit Product" : "Add Product"}
        footer={
          <>
            <button
              className="px-4 py-2 border rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="bg-[#7A1E2D] text-white px-4 py-2 rounded-lg"
              onClick={handleSave}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <input name="name" value={form.name} onChange={handleChange} className={inputCls} placeholder="Product Name" />

          <textarea name="description" value={form.description} onChange={handleChange} className={inputCls} placeholder="Description" />

          <div className="grid grid-cols-2 gap-4">
            <input name="price" type="number" value={form.price} onChange={handleChange} className={inputCls} placeholder="Price" />
            <input name="originalPrice" type="number" value={form.originalPrice} onChange={handleChange} className={inputCls} placeholder="Original Price" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <select name="occasion" value={form.occasion} onChange={handleChange} className={inputCls}>
              <option>Wedding</option>
              <option>Festival</option>
              <option>Party</option>
              <option>Casual</option>
            </select>

            <select name="fabric" value={form.fabric} onChange={handleChange} className={inputCls}>
              <option>Silk</option>
              <option>Cotton</option>
              <option>Chiffon</option>
              <option>Georgette</option>
            </select>
          </div>

          <input name="color" value={form.color} onChange={handleChange} className={inputCls} placeholder="Color" />
          <input name="care" value={form.care} onChange={handleChange} className={inputCls} placeholder="Care Instructions" />

          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
              In Stock
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" name="isNew" checked={form.isNew} onChange={handleChange} />
              New
            </label>
          </div>
        </div>
      </Modal>
    </Modal>
  </div>
);
}

export default ManageProducts