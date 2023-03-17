const mongoose = require("mongoose");
const SalesdetailSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sale_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "sales",
      },
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "products",
      },
    product_name: {
      type: String,
      required: false,
    },
    product_code: {
      type: String,
      required: false,
      unique:true,
    },
    quantity: {
      type: String,
      required: false,
      trim: true,
    },
    price: {
      type: String,
      required:false,
      trim: true,
    },
    unit_price: {
      type: String,
      required: false,
      trim: true,
    },
    sub_total: {
      type: String,
      required:false,
      trim: true,
    },
    product_discount_amount: {
        type: String,
        required:false,
        trim: true,
      },
      product_discount_type: {
        type: String,
        required:false,
        trim: true,
        default:"fixed",
      },
      product_tax_amount: {
        type: String,
        required:false,
        trim: true,
      },
      note: {
        type: String,
        required:false,
        trim: true,
      },
  },
  {
    timestamps: true,
  }
);

const Salesdetail = mongoose.model("saledetail", SalesdetailSchema);
module.exports = Salesdetail;
