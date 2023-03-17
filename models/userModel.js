
const mongoose = require("mongoose");
const { USER_TYPES } = require("../config/utils");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "Name is unique"],
      required: [true, "Name is required"],
    },
    userId: {
      type: String,
      trim: true,
      unique: [true, "User Id is Unique"],
      required: [true, "User Id is required"],
    },
    phone_number: {
      type: String,
      trim: true,
      unique: [true, "Phone Number is Unique"],
      required: [true, "Phone Number is required"],
    },
   
    avatar: {
      type: String,
      trim: true,
    },
    cover: {
      type: String,
      trim: true,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    user_type: {
      type: String,
      enum: USER_TYPES,
      default: "USER",
    },
    user_otp: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema,"User");


