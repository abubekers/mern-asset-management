const User = require("../models/userModel");
const { sign } = require("jsonwebtoken");
const { generateOTP } = require("../utils/otp.utils");
const bcrypt = require("bcrypt")

require("dotenv").config();

const {
  PHONE_NOT_FOUND_ERR,
  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR
} = require("../config/errors");


/* User Auth Controllers */
const getLastUserId = async () => {
  const lastId = await User.findOne().sort({ createdAt:-1}).select({ "userId": 1, "_id": 0 }).exec();
  let id = lastId ? parseInt(lastId.userId, 10) + 1 : 1
  id = parseInt(id)
  if (id < 10) return `00000${id}`;
  if (id < 100) return `0000${id}`;
  if (id < 1000) return `000${id}`;
  if (id < 10000) return `00${id}`;
  if (id < 100000) return `0${id}`;
}
 
// ---------------------- verify admin phone otp -------------------------
exports.verifyAdminAccountWithOtp = async (req, res) => {
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
          user_typ: user.user_type,
          name: user.name,
          phone_number: user.phone_number,
        },
      });
    } catch (error) {
      return res.status(404).send({ message: error });
    }
  };
  exports.loginAdminWithOtp = async (req, res) => {
    try {
      const { phone_number } = req.body;
      const user = await User.findOne({
         phone_number:phone_number,
         user_type:{$in:["ADMIN", "BUSSINES_ACCOUNT", "SUPERADMIN"]} });
  
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
  

/* Create Admin User Account Controllers */
exports.createAdminUserAccount = async (req, res,) => {

    try {
        const userData = req.body;
        const phone_number = userData.phone_number;

        userData.userId = await getLastUserId();

        const phoneExist = await User.findOne({ phone_number });

        if (phoneExist) {
            res.status(400).send({ "message": PHONE_ALREADY_EXISTS_ERR });
            return;
        }

        const newUser = await User.create(userData);

        

        res
            .status(201)
            .send({ newUser, message: "User Created Saved Succesfully !" });
            
        // generate otp
        // const otp = generateOTP(4);
        const otp = "0000";
        const hash = await bcrypt.hash(otp, 10);
        // save otp to user collection
        newUser.user_otp = hash;
        await newUser.save();
        //TODO send otp to phone number
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
};



exports.getAllusers = async (req, res) => {
    try {
        const user = await User.find({user_type:"USER"}).populate("religion")
        .populate("gender")
        .populate("education_level")
        .populate("occupation")
        .populate("martial_status")
        .populate("martial_detail")
        .populate({
          path: "region",
          populate: { path: "cities", model: "CityDropDown" },
        })
        .populate("city")
        .populate("height")
        .populate("weight")
        .populate("skin_color")
        .populate("hiv_status")
        .populate("special_prefs")
        .populate("community")
        .populate("religious_background")
        .populate({
          path: "quizeAnswers",
          populate: [
            { path: "question", model: "Quize" },
            { path: "answer", model: "Answer" },
          ],
        });

        if (!user) {
            return res.status(404).send({ message: "Users not found" });
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
};


exports.getAdminUsers = async (req, res) => {
  try {
      const user = await User.find({user_type:req.params.user_type,_id:{$ne:req.user.id}});

      if (!user) {
          return res.status(404).send({ message: "Users not found" });
      }

      return res.status(200).send(user);
  } catch (error) {
      return res.status(404).send({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate("religion")
        .populate("gender")
        .populate("education_level")
        .populate("occupation")
        .populate("martial_status")
        .populate("martial_detail")
        .populate({
          path: "region",
          populate: { path: "cities", model: "CityDropDown" },
        })
        .populate("city")
        .populate("height")
        .populate("weight")
        .populate("skin_color")
        .populate("hiv_status")
        .populate("special_prefs")
        .populate("community")
        .populate("religious_background")
        .populate({
          path: "quizeAnswers",
          populate: [
            { path: "question", model: "Quize" },
            { path: "answer", model: "Answer" },
          ],
        });

        if (!user) {
            return res.status(404).send({ message: "Users not found" });
        }

        return res.status(200).send(user);
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
};


// delete,deactivate and update from Admin - to User
exports.deleteUser = async (req, res) => {
    try {
            User.findOne({ _id: req.params.id }, async function(err, user) {

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
              .send({ message: "User Deleted Succesfully !" });
            });
    } catch (error) {
        if (error.message) return res.status(404).send({ message: error.message });
        return res.status(404).send({ message: error });
    }
};

exports.suspendUser = async (req, res) => {
    try {
        const userToDeactivate = await User.findById(req.params.id);

        if(!userToDeactivate){
          return res.status().send({message:"User Does not exist!"});
        }
            
        if(userToDeactivate.is_active == false){
          userToDeactivate.is_active = true;
          userToDeactivate.save()
          return res
            .status(200)
            .send({ userToDeactivate, message: "User Activated Succesfully !" });
        }else{
          userToDeactivate.is_active = false;
          userToDeactivate.save()
          return res
            .status(200)
            .send({ userToDeactivate, message: "User Suspended Succesfully !" });
        }
    } catch (error) {
        if (error.message) return res.status(404).send({ message: error.message });
        return res.status(404).send({ message: error });
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const newUserInfo = req.body;

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            newUserInfo,
            { new: true });
        return res
            .status(202)
            .send({ updatedUser, message: "User Updated Succesfully !" });
    } catch (error) {
        if (error.message) return res.status(404).send({ message: error.message });
        return res.status(404).send({ message: error });
    }
};



