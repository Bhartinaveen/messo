import React, { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X, Search } from "lucide-react";
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

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState(emptyFiles);

  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  /* ================= FETCH PRODUCTS ================= */

  const fetchProducts = async (p = 1) => {
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/products?page=${p}&limit=${PER_PAGE}`);
      const data = await res.json();

      setProducts(data?.items || []);
      setFilteredProducts(data?.items || []);
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

  /* ================= SEARCH + FILTER ================= */

  useEffect(() => {
    let temp = [...products];

    if (search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      temp = temp.filter((p) => p.category === category);
    }

    setFilteredProducts(temp);
  }, [search, category, products]);

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

  /* ================= SAVE PRODUCT ================= */

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

      setMessage(editing ? "Product Updated" : "Product Added");

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

  /* ================= UI ================= */

  return (
    <div className="bg-gray-100 min-h-screen p-6">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">

        <h1 className="text-2xl font-bold">
          Product Management
        </h1>

        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={18} /> Add Product
        </button>

      </div>

      {/* SEARCH + FILTER */}

      <div className="flex flex-col md:flex-row gap-3 mb-6">

        <div className="flex items-center border rounded-lg px-3 bg-white">
          <Search size={16} />
          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="all">All Categories</option>
          <option value="Fashion">Fashion</option>
          <option value="Electronics">Electronics</option>
          <option value="Shoes">Shoes</option>
        </select>

      </div>

      {/* MESSAGE */}

      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      {/* DESKTOP TABLE */}

      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredProducts.map((p) => (

              <tr key={p.id} className="border-t hover:bg-gray-50">

                <td className="p-4 flex items-center gap-3">

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

                <td>{p.category}</td>

                <td>₹{p.price}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      p.countInStock > 5
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {p.countInStock}
                  </span>
                </td>

                <td className="flex gap-2">

                  <button
                    onClick={() => openEdit(p)}
                    className="p-2 bg-blue-100 text-blue-600 rounded"
                  >
                    <Edit2 size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="p-2 bg-red-100 text-red-600 rounded"
                  >
                    <Trash2 size={16} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* MOBILE VIEW */}

      <div className="md:hidden grid gap-4">

        {filteredProducts.map((p) => (

          <div
            key={p.id}
            className="bg-white rounded-xl shadow p-4"
          >

            <div className="flex gap-4">

              <img
                src={p.image || "/image/logo.png"}
                alt={p.name}
                className="w-20 h-20 rounded object-cover"
              />

              <div className="flex-1">

                <h3 className="font-semibold">{p.name}</h3>

                <p className="text-xs text-gray-500 mb-2">
                  {p.description}
                </p>

                <p className="text-sm">₹{p.price}</p>

                <p className="text-xs text-gray-500">
                  Stock: {p.countInStock}
                </p>

              </div>

            </div>

            <div className="flex justify-end gap-2 mt-3">

              <button
                onClick={() => openEdit(p)}
                className="p-2 bg-blue-100 text-blue-600 rounded"
              >
                <Edit2 size={16} />
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="p-2 bg-red-100 text-red-600 rounded"
              >
                <Trash2 size={16} />
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* PAGINATION */}

      <div className="flex justify-between mt-6">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default Products;