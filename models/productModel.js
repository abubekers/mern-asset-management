const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    product_name: {
      type: String,
      required: false,
      trim: true,
    },
    product_code: {
      type: String,
      required: false,
      trim: true,
      unique:true,
    },
    product_barcode_symbology: {
      type: String,
      required: false,
      trim: true,
    },
    product_quantity: {
      type: Number,
      required:false,
      trim: true,
    },
    product_cost: {
      type: Number,
      required: false,
      trim: true,
    },
    product_price: {
      type: Number,
      required: false,
      trim: true,
    },
    product_unit: {
      type: String,
      required: false,
      trim: true,
    },
    product_stock_alert: {
      type: Number,
      required: false,
      trim: true,
    },
    product_order_tax: {
      type: String,
      required: false,
      trim: true,
    },
    product_tax_type: {
      type: String,
      required: false,
      trim: true,
    },
    product_note: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
