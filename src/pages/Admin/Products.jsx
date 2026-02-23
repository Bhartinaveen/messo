import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import getS3PutUrlService from "../../services/s3/getS3PutUrlService";
import uploadFileToS3Service from "../../services/s3/uploadFileToS3Service";

const PER_PAGE = 8;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const emptyForm = {
  name: "",
  price: "",
  description: "",
  image: "",
  category: "",
  countInStock: 0,
};

const emptyFiles = {
  image: null,
  preview: null,
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState(emptyFiles);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  /* ================= FETCH ================= */
  const fetchProducts = async (p = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/products?page=${p}&limit=${PER_PAGE}`);
      const data = await res.json();
      setProducts(data?.items || []);
      setTotal(data?.total || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  /* ================= ADD / EDIT ================= */
  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setFiles(emptyFiles);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({ ...p });
    setFiles({
      image: null,
      preview: p.image || null,
    });
    setModalOpen(true);
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles({
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSave = async () => {
    if (!form.name || !form.price || !form.category) {
      alert("Name, Price & Category required!");
      return;
    }

    try {
      let updatedForm = { ...form };

      if (files.image) {
        const key = `products/${Date.now()}_${files.image.name}`;
        const type = files.image.type;

        const putUrl = await getS3PutUrlService(key, type, false);
        await uploadFileToS3Service(putUrl, files.image, type);

        updatedForm.image = key;
      }

      const url = editing
        ? `${BASE_URL}/products/${editing.id}`
        : `${BASE_URL}/products`;

      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedForm),
      });

      if (!res.ok) throw new Error("Save failed");

      setMessage(editing ? "Updated successfully!" : "Added successfully!");
      setModalOpen(false);
      fetchProducts(page);

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Delete failed");
      fetchProducts(page);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Product Management</h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 w-full sm:w-auto justify-center"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
          {message}
        </div>
      )}

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img
                    src={p.image || "/image/logo.png"}
                    alt={p.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-gray-500">
                      {p.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">{p.category}</td>
                <td className="px-6 py-4">₹{p.price}</td>
                <td className="px-6 py-4">{p.countInStock}</td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => openEdit(p)}
                    className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 bg-red-100 text-red-600 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <div className="flex gap-4">
              <img
                src={p.image || "/image/logo.png"}
                alt={p.name}
                className="w-20 h-20 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-xs text-gray-500 mb-1">
                  {p.description}
                </p>
                <p className="text-sm">₹{p.price}</p>
                <p className="text-sm">Stock: {p.countInStock}</p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => openEdit(p)}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              {editing ? "Edit Product" : "Add Product"}
            </h3>

            <div className="space-y-3">
              <input
                placeholder="Product Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border rounded p-2"
              />

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
                className="w-full border rounded p-2"
              />

              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full border rounded p-2"
              />

              <input
                type="number"
                placeholder="Stock"
                value={form.countInStock}
                onChange={(e) =>
                  setForm({ ...form, countInStock: e.target.value })
                }
                className="w-full border rounded p-2"
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border rounded p-2"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full"
              />

              {files.preview && (
                <img
                  src={files.preview}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded"
                />
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  {editing ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;