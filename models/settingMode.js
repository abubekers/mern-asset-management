const mongoose = require("mongoose");
const settingsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    company_name: {
      type: String,
      required: false,
    },
    company_email: {
      type: String,
      required: false,
    },
    company_phone: {
      type: String,
      required: false,
      trim: true,
    },
    logo: {
      type: Object,
      required: false,
    },
    default_currency_id: {
      type: String,
      required:false,
      trim: true,
    },
    default_currency_position: {
      type: String,
      required: false,
      trim: true,
    },
    notification_email: {
      type: String,
      required:false,
      trim: true,
    },
    footer_text: {
        type: String,
        required:false,
        trim: true,
      },
      company_address: {
        type: String,
        required:false,
        trim: true,
      },
  },
  {
    timestamps: true,
  }
);

const Setting = mongoose.model("settings", settingsSchema);
module.exports = Setting;
