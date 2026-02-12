import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

    img: {
      type: String,
      required: true,
    },

    price: {
      org: {
        type: Number,
        required: true,
      },
      mrp: {
        type: Number,
        default: 0,
      },
      off: {
        type: Number,
        default: 0,
      },
    },

    sizes: {
      type: [String],
      required: true,
    },

    category: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", ProductsSchema);