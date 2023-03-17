const mongoose = require("mongoose");
const purchaseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    supplier_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "suppliers",
      },
    date: {
      type: date,
      required: false,
    },
    reference: {
      type: String,
      required: false,
    },
    supplier_name: {
      type: String,
      required: false,
      trim: true,
    },
    tax_percentage: {
      type: String,
      required:false,
      trim: true,
    },
    tax_amount: {
      type: String,
      required: false,
      trim: true,
    },
    discount_percentage: {
      type: String,
      required:false,
      trim: true,
    },
    discount_amount: {
        type: String,
        required:false,
        trim: true,
      },
      shipping_amount: {
        type: String,
        required:false,
        trim: true,
      },
      total_amount: {
        type: String,
        required:false,
        trim: true,
      },
      paid_amount: {
        type: String,
        required:false,
        trim: true,
      },
      due_amount: {
        type: String,
        required:false,
        trim: true,
      },
      status: {
        type: String,
        required:false,
        trim: true,
      },
      payment_status: {
        type: String,
        required:false,
        trim: true,
      },
      payment_method: {
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

const Purchase = mongoose.model("purchases", purchaseSchema);
module.exports = Purchase;
