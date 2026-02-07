import { useEffect, useState, useMemo } from "react";
import { fetchProducts, deleteProduct } from "../api/productApi";
import ProductForm from "../components/ProductForm";
import Navbar from "../components/Navbar";

export default function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const { data } = await fetchProducts();
      setProducts(data.products);
      setFilteredProducts(data.products);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Product Dashboard
            </h2>
            <p className="text-gray-600">
              Manage your products efficiently and effectively
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 bg-white rounded-lg shadow p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-bold">{products.length}</span>
              </div>
              <span className="text-gray-700 font-medium">Total Products</span>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Product Form */}
        <ProductForm
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          reload={loadProducts}
        />

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeInUp">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800">Product List</h3>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center">
              <div className="inline-block mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-gray-700 mb-2">
                {searchTerm ? "No products found" : "No products available"}
              </h4>
              <p className="text-gray-500 mb-6">
                {searchTerm ? "Try a different search term" : "Add your first product using the form above"}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                >
                  Clear Search
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((p, index) => (
                    <tr 
                      key={p._id} 
                      className="hover:bg-gray-50 transition-colors duration-150 animate-fadeInUp"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                            <span className="font-bold text-blue-600">
                              {p.productName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {p.productName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {p.size}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {p.perUnit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-bold text-gray-900">
                          ₹ {parseFloat(p.rate).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => setEditingProduct(p)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-200 transform hover:scale-110"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="text-red-600 hover:text-red-900 transition-colors duration-200 transform hover:scale-110"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer */}
          {filteredProducts.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                <div>
                  Showing <span className="font-semibold">{filteredProducts.length}</span> of{" "}
                  <span className="font-semibold">{products.length}</span> products
                </div>
                {searchTerm && (
                  <div className="mt-2 md:mt-0">
                    <span className="text-blue-600 font-medium">
                      Search results for "{searchTerm}"
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}