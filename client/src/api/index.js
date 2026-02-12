import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// ================= AUTH =================
export const UserSignUp = (data) => API.post("/user/signup", data);
export const UserSignIn = (data) => API.post("/user/login", data);

// ================= PRODUCTS =================
export const getAllProducts = (query = "") =>
  API.get(`/products${query ? `?${query}` : ""}`);

export const getProductDetails = (id) =>
  API.get(`/products/${id}`);

// ================= CART =================
export const getCart = (token) =>
  API.get("/user/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = (token, data) =>
  API.post("/user/cart", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromCart = (token, data) =>
  API.patch("/user/cart", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ================= FAVORITES =================
export const getFavourite = (token) =>
  API.get("/user/favorite", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToFavourite = (token, data) =>
  API.post("/user/favorite", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromFavourite = (token, data) =>
  API.patch("/user/favorite", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ================= ORDERS =================
export const placeOrder = (token, data) =>
  API.post("/user/order", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrder = (token) =>
  API.get("/user/order", {
    headers: { Authorization: `Bearer ${token}` },
  });
