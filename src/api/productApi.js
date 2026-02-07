import axios from "axios";

const API = axios.create({
  baseURL: "https://ramesh-agency-product-backend.onrender.com/api/products",
});

export const fetchProducts = () => API.get("/list");
export const createProduct = (data) => API.post("/create", data);
export const updateProduct = (id, data) => API.put(`/update/${id}`, data);
export const deleteProduct = (id) => API.delete(`/delete/${id}`);
export const getProduct = (id) => API.get(`/${id}`);
