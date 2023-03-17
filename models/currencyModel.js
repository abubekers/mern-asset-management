const mongoose = require("mongoose");

const currencySchema = mongoose.Schema(
  {
    added_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    currency_name: {
      type: String,
      required: false,
      trim: true,
    },
    code: {
      type: String,
      required: false,
      trim: true,
    },
    symbol: {
      type: String,
      required: false,
      trim: true,
    },
    thousand_separator: {
      type: String,
      required: false,
      trim: true,
    },
    decimal_separator: {
      type: String,
      required: false,
      trim: true,
    },
    exchange_rate: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Curruncy = mongoose.model("currency", currencySchema);
module.exports = Curruncy;
