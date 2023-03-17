const mongoose = require("mongoose");

const PurchasereturnpaymentsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    purchase_return_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "purchase_returns",
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

const Purchasereturnpayments = mongoose.model("purchase_returns", PurchasereturnpaymentsSchema);
module.exports = Purchasereturnpayments;
