const mongoose = require("mongoose");
const suppliersSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    supplier_name: {
      type: String,
      required: false,
    },
    supplier_email: {
      type: String,
      required: false,
    },
    supplier_phone: {
      type: String,
      required: false,
      trim: true,
    },
    city: {
      type: String,
      required:false,
      trim: true,
    },
    country: {
      type: String,
      required: false,
      trim: true,
    },
    address: {
      type: String,
      required:false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Supplier = mongoose.model("suppliers", suppliersSchema);
module.exports = Supplier;
