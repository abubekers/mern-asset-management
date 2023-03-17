const mongoose = require("mongoose");
const SalesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "customers",
      },
    date: {
      type: date,
      required: false,
    },
    reference: {
      type: String,
      required: false,
    },
    customer_name: {
      type: String,
      required: false,
      trim: true,
    },
    tax_percentage: {
      type: String,
      required:false,
      trim: true,
      default:0,
    },
    tax_amount: {
      type: String,
      required: false,
      trim: true,
      default:0,
    },
    discount_percentage: {
      type: String,
      required:false,
      trim: true,
      default:0,
    },
    discount_amount: {
        type: String,
        required:false,
        trim: true,
        default:0,
      },
      shipping_amount: {
        type: String,
        required:false,
        trim: true,
        default:0,
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

const Sales = mongoose.model("sales", SalesSchema);
module.exports = Sales;
