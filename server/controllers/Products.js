import mongoose from "mongoose";
import Product from "../models/Products.js";
import { createError } from "../error.js";

export const addProducts = async (req, res, next) => {
  try {
    const productsData = req.body;

    if (!Array.isArray(productsData)) {
      return next(
        createError(400, "Invalid request. Expected an array of products.")
      );
    }

    const createdproducts = [];
    for (const productInfo of productsData) {
      const { title, name, desc, img, price, sizes, category } = productInfo;
      const product = new Product({
        title,
        name,
        desc,
        img,
        price,
        sizes,
        category,
      });
      const createdproduct = await product.save();
      createdproducts.push(createdproduct);
    }
    return res
      .status(201)
      .json({ message: "Products added successfully", createdproducts });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    let { categories, minPrice, maxPrice, sizes, search } = req.query;
    sizes = sizes?.split(",");
    categories = categories?.split(",");
    search = search?.toLowerCase();

    const filter = {};

    if (categories && Array.isArray(categories)) {
      filter.category = { $in: categories };
    }

    if (minPrice || maxPrice) {
      filter["price.org"] = {};
      if (minPrice) filter["price.org"]["$gte"] = parseFloat(minPrice);
      if (maxPrice) filter["price.org"]["$lte"] = parseFloat(maxPrice);
    }

    if (sizes && Array.isArray(sizes)) {
      filter.sizes = { $in: sizes };
    }

    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { desc: { $regex: new RegExp(search, "i") } },
      ];
    }

    const products = await Product.find(filter);
    return res.status(200).json(products);

  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return next(createError(400, "Invalid product ID"));
    }
    const product = await Product.findById(id);
    if (!product) {
      return next(createError(404, "Product not found"));
    }
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};