import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, ImageIcon } from "lucide-react";

const STORAGE_KEY = "heroItems";

const HeroManager = () => {
  const [items, setItems] = useState([]);
  const [series, setSeries] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = JSON.parse(raw || "[]");
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch {
      setItems([]);
    }
  }, []);

  const saveItems = (next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event("heroItemsChanged"));
  };

  const resetForm = () => {
    setSeries("");
    setTitle("");
    setImage("");
    setAlt("");
    setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!series || !title || !image) {
      setMessage("Please fill required fields.");
      return;
    }

    if (editingIndex !== null) {
      const updated = items.map((it, i) =>
        i === editingIndex ? { series, title, image, alt: alt || title } : it
      );
      setItems(updated);
      saveItems(updated);
      setMessage("Hero updated successfully");
    } else {
      const newItems = [{ series, title, image, alt: alt || title }, ...items];
      setItems(newItems);
      saveItems(newItems);
      setMessage("Hero added successfully");
    }

    resetForm();
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = (index) => {
    const it = items[index];
    setSeries(it.series);
    setTitle(it.title);
    setImage(it.image);
    setAlt(it.alt);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemove = (index) => {
    const next = items.filter((_, i) => i !== index);
    setItems(next);
    saveItems(next);
  };

  return (
    <section className="bg-white shadow rounded-xl p-6 space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Hero Showcase Manager</h2>
        <div className="text-sm text-gray-500">
          Total Slides: {items.length}
        </div>
      </div>

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >

        <div>
          <label className="text-sm text-gray-600">Series</label>
          <input
            value={series}
            onChange={(e) => setSeries(e.target.value)}
            placeholder="New Arrivals"
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Effortless Style"
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Image URL</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="/images/banner.jpg"
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-600">Alt Text</label>
          <input
            value={alt}
            onChange={(e) => setAlt(e.target.value)}
            placeholder="Hero banner"
            className="w-full border rounded-lg px-3 py-2 mt-1"
          />
        </div>

        {/* Preview */}

        {image && (
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Preview</p>
            <img
              src={image}
              alt="preview"
              className="w-full max-h-60 object-cover rounded-lg border"
              onError={(e) =>
                (e.target.src =
                  "https://placehold.co/800x300?text=Preview+Image")
              }
            />
          </div>
        )}

        <div className="md:col-span-2 flex gap-3 flex-wrap">

          <button
            type="submit"
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
            <Plus size={16} />
            {editingIndex !== null ? "Update Slide" : "Add Slide"}
          </button>

          {editingIndex !== null && (
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2 border rounded-lg"
            >
              Cancel
            </button>
          )}
        </div>

      </form>

      {/* Message */}

      {message && (
        <div className="text-green-600 text-sm bg-green-50 p-2 rounded">
          {message}
        </div>
      )}

      {/* Hero Items */}

      {items.length === 0 ? (
        <p className="text-gray-500">No hero slides added.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {items.map((it, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm"
            >

              <img
                src={it.image}
                alt={it.alt}
                className="w-full h-40 object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://placehold.co/400x200?text=Hero+Image")
                }
              />

              <div className="p-3 space-y-1">
                <p className="font-semibold">{it.title}</p>
                <p className="text-xs text-gray-500">{it.series}</p>
              </div>

              <div className="flex justify-between p-3 border-t">

                <button
                  onClick={() => handleEdit(index)}
                  className="flex items-center gap-1 text-blue-600 text-sm"
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  onClick={() => handleRemove(index)}
                  className="flex items-center gap-1 text-red-600 text-sm"
                >
                  <Trash2 size={14} />
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>
      )}
    </section>
  );
};

export default HeroManager;