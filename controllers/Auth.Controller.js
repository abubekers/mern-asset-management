const User = require("../models/userModel");
const { sign } = require("jsonwebtoken");
const { generateOTP } = require("../utils/otp.utils");
const bcrypt = require("bcrypt")
const moment = require("moment-timezone");

require("dotenv").config();

const {
  PHONE_NOT_FOUND_ERR,
  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
} = require("../config/errors");

/* User Auth Controllers */
 
const getLastUserId = async () => {
  const lastId = await User.findOne()
    .sort({ createdAt: -1 })
    .select({ userId: 1, _id: 0 })
    .exec();
  let id = lastId ? parseInt(lastId.userId, 10) + 1 : 1;
  id = parseInt(id);
  if (id < 10) return `00000${id}`;
  if (id < 100) return `0000${id}`;
  if (id < 1000) return `000${id}`;
  if (id < 10000) return `00${id}`;
  if (id < 100000) return `0${id}`;
};

exports.createAccount = async (req, res, next) => {
  try {
    const userData = req.body;
    const phone_number = userData.phone_number;

    const phoneExist = await User.findOne({ phone_number });
    userData.userId = await getLastUserId();

    if (phoneExist) {
      res.status(400).send({ message: PHONE_ALREADY_EXISTS_ERR });
      return;
    }

    const newUser = await User.create(userData);
  
    res
      .status(201)
      .send({ newUser, message: "Account Created Saved Succesfully !" });

    // generate otp
    // const otp = generateOTP(4);
    const otp = "0000";
    const hash = await bcrypt.hash(otp, 10);
    // save otp to user collection
    newUser.user_otp = hash;
    await newUser.save();
    //TODO send otp to phone number
    createNotification({
      "user":newUser._id,
      "title":"Welcome to my asset",
    });
    
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.loginWithOtp = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const user = await User.findOne({ phone_number });

    if (!user) {
      res.status(404).send({ message: PHONE_NOT_FOUND_ERR });
      return;
    }

    if(user.user_type != "USER" && user.is_active == false){
      res.status(403).send({message: "Your account is Suspended Contact the system admin" });
      return;
    }

    // generate otp
    // const otp = generateOTP(4);
    const otp = "0000";
    const hash = await bcrypt.hash(otp, 10);
    // save otp to user collection
    user.user_otp = hash;
    user.is_verified = true;
    await user.save();
    // //TODO send otp to phone number

    res.status(200).json({
      message: "OTP sent to your registered phone number",
      data: {
        user_id: user._id,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

// ---------------------- verify phone otp -------------------------
exports.verifyAccountWithOtp = async (req, res) => {
  try {
    const { otp, user_id } = req.body;
    const user = await User.findById(user_id);

    if (!user) {
      res.status(404).send({ message: USER_NOT_FOUND_ERR });
      return;
    }

    const result = await bcrypt.compare(otp, user.user_otp);

    if (!result) {
      res.status(403).send({ message: INCORRECT_OTP_ERR });
      return;
    }

    const accessToken = sign(
      { name: user.name, id: user.id, user_type: user.user_type },
      process.env.JWT_TOKEN_SECRET_KEY
    );

    user.user_otp = "";
    user.is_verified = true;
    user.is_active = true;
    await user.save();
    res.status(200).json({
      message: "OTP verified successfully",
      data: {
        accessToken,
        user_id: user._id,
      },
    });
  } catch (error) {
    return res.status(404).send({ message: error });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
    .populate("religion").populate("gender")
    .populate("education_level").populate("occupation")
    .populate("martial_status").populate("martial_detail")
    .populate({path:"region",populate:{path:"cities",model:"CityDropDown"}})
    .populate("city").populate("height").populate("weight")
    .populate("skin_color").populate("hiv_status")
    .populate("special_prefs").populate("community")
    .populate("religious_background")
    .populate({path:"quizeAnswers",
              populate:[{path:"question",model:"Quize"},{path:"answer",model:"Answer"}],});
    // .populate("short_lists");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

exports.updateAccount = async (req, res, next) => {
  try {
    const newUserInfo = req.body;
    const userID = req.user.id;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).send({ message: USER_NOT_FOUND_ERR });
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userID },
      newUserInfo,
      { new: true }
    );
    return res
      .status(202)
      .send({ updatedUser, message: "Profile Updated Succesfully !" });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    // await User.deleteOne({ _id: req.user.id });

     User.findOne({ _id: req.user.id }, async function(err, user) {

      if(err){
        return res.status(400)
        .send({ message: err });
      }
      if(!user){
        return res.status(404).send({message:"User Not Found"})
      }
      
      await User.updateMany({user_type:"USER"},{
        $pullAll: {
            short_lists: [user._id],
            likes: [user._id],
            views: [user._id]
        }
      }
    );
    
    
      
    user.remove();
      
      return res
      .status(200)
      .send({ message: "Your Account has been Deleted Succesfully !" });
    });
    
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};

exports.deactivateAccount = async (req, res) => {
  try {
    const reason = req.body.reason;
    const deactivatedUser = await User.findOneAndUpdate(
      { _id: req.user.id },
      { is_active: false,deactivate_reason:reason }
    );
    return res.status(202).send({
      deactivatedUser,
      message: "Your Account is Deactivated Succesfully !",
    });
  } catch (error) {
    if (error.message) return res.status(404).send({ message: error.message });
    return res.status(404).send({ message: error });
  }
};


exports.addtoOnline =  async (req,res)=>{
  const user = await User.findById(req.user.id);
  if(user != null){
      user.is_online = true;    
      user.last_login = moment().utc(moment.tz(Date.now(), "Africa/Addis_Ababa"), "YYYY-MM-DD HH:mm:ss").toDate();
      user.save();
  }
  return res.status(200).send({"message":"to online"});

};

exports.removeFromOnline = async (req,res)=>{
  const user = await User.findById(req.user.id);
  if(user != null){
      user.is_online = false;
      user.last_login = moment().utc(moment.tz(Date.now(), "Africa/Addis_Ababa"), "YYYY-MM-DD HH:mm:ss").toDate();
      user.save();    
  }
  return res.status(200).send({"message":"to ofline"});
};