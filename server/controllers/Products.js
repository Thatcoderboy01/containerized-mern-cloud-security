import mongoose from "mongoose";
import Product from "../models/Products.js";
import { createError } from "../error.js";

// ================= ADD PRODUCTS =================
export const addProducts = async (req, res, next) => {
  try {
    const productsData = req.body;

    if (!Array.isArray(productsData)) {
      return next(createError(400, "Expected array of products"));
    }

    const createdProducts = await Product.insertMany(productsData);

    return res.status(201).json({
      success: true,
      message: "Products added successfully",
      data: createdProducts,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET PRODUCTS =================
export const getProducts = async (req, res, next) => {
  try {
    let { categories, minPrice, maxPrice, sizes, search } = req.query;

    const filter = {};

    if (categories) {
      const categoryArray = categories.split(",");
      filter.category = { $elemMatch: { $in: categoryArray } };
    }

    if (sizes) {
      const sizeArray = sizes.split(",");
      filter.sizes = { $in: sizeArray };
    }

    if (minPrice || maxPrice) {
      filter["price.org"] = {};

      if (minPrice) filter["price.org"].$gte = Number(minPrice);
      if (maxPrice) filter["price.org"].$lte = Number(maxPrice);
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { desc: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ================= GET PRODUCT BY ID =================
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return next(createError(400, "Invalid Product ID"));
    }

    const product = await Product.findById(id);

    if (!product) {
      return next(createError(404, "Product not found"));
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
