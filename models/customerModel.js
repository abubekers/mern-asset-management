const mongoose = require("mongoose");
const customerSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    customer_name: {
      type: String,
      required: false,
    },
    customer_email: {
      type: String,
      required: false,
    },
    customer_phone: {
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

const Customer = mongoose.model("customers", customerSchema);
module.exports = Customer;
