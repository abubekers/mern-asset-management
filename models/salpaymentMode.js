const mongoose = require("mongoose");
const salepaymentsSchema = mongoose.Schema(
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
      amount: {
        type: date,
        required: false,
      },
    date: {
      type: date,
      required: false,
    },
    reference: {
      type: String,
      required: false,
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

const salepayments = mongoose.model("salepayments", salepaymentsSchema);
module.exports = salepayments;
