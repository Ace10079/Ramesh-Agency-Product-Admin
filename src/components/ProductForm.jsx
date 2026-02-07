import { useEffect, useState } from "react";
import { createProduct, updateProduct } from "../api/productApi";

const CATEGORY_OPTIONS = [
  "Bath Mats",
  "Bed Cover",
  "Bed Protector",
  "Bedsheets",
  "BedSpreads",
  "Blanket",
  "Blinds",
  "Carpets",
  "Cotton Towels",
  "Curtains",
  "Cushion Cover",
  "Deewan Set",
  "Dohar",
  "Door Mats",
  "Fabric",
  "Kerchief",
  "Lungi",
  "Mosquito net",
  "Napkin",
  "Pillows",
  "Pillow Covers",
  "Comforters",
  "Sofa back",
  "Stitching",
  "Table Cloth",
  "Towels",
  "Tracks",
  "Accessories",
  "Vesty",
  "Shawls",
];

export default function ProductForm({
  editingProduct,
  setEditingProduct,
  reload,
}) {
  const [form, setForm] = useState({
    productName: "",
    size: "",
    perUnit: "",
    rate: "",
    category: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, form);
      } else {
        await createProduct(form);
      }

      setForm({
        productName: "",
        size: "",
        perUnit: "",
        rate: "",
        category: "",
      });
      setEditingProduct(null);
      reload();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Product Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Product Name *
            </label>
            <input
              name="productName"
              placeholder="Enter product name"
              value={form.productName}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Size */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Size *
            </label>
            <input
              name="size"
              value={form.size}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Unit */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Unit *
            </label>
            <input
              name="perUnit"
              value={form.perUnit}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Rate */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Rate (₹) *
            </label>
            <input
              name="rate"
              type="number"
              placeholder="0.00"
              value={form.rate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              <option value="">Select Category</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            }`}
          >
            {isLoading ? "Processing..." : editingProduct ? "Update Product" : "Add Product"}
          </button>

          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setForm({
                  productName: "",
                  size: "",
                  perUnit: "",
                  rate: "",
                  category: "",
                });
              }}
              className="px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
