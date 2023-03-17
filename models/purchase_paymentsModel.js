const mongoose = require("mongoose");

const purchasepaymentsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    purchase_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "purchases",
      },
      amount: {
      type: String,
      required: false,
      trim: true,
    },
    date: {
        type: String,
        required: false,
        trim: true,
      },
      reference: {
        type: String,
        required: false,
        trim: true,
      },
      payment_method: {
        type: String,
        required: false,
        trim: true,
      },
      note: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Purchasepayments = mongoose.model("purchase_payments", purchasepaymentsSchema);
module.exports = Purchasepayments;
