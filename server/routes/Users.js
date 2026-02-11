import express from "express";
import {
  addToCart,
  addToFavorites,
  getAllCartItems,
  getAllOrders,
  getUserFavourites,
  placeOrder,
  removeFromCart,
  removeFromFavorites,
  UserLogin,
  UserRegister,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// login and signup
router.post("/signup", UserRegister);
router.post("/login", UserLogin);

// Cart
router.get("/cart", verifyToken, getAllCartItems);
router.post("/cart", verifyToken, addToCart);
router.patch("/cart", verifyToken, removeFromCart);

// Order
router.get("/order", verifyToken, getAllOrders);
router.post("/order", verifyToken, placeOrder);

// favourites
router.get("/favorite", verifyToken, getUserFavourites);
router.post("/favorite", verifyToken, addToFavorites);
router.patch("/favorite", verifyToken, removeFromFavorites);

export default router;
