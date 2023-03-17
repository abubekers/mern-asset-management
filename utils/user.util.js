const User = require("../models/User");
const moment = require("moment-timezone");


exports.addtoOnline =  async (userId)=>{
    const user = await User.findById(userId);
    if(user != null){
        user.is_online = true;    
        user.last_login = moment().utc(moment.tz(Date.now(), "Africa/Addis_Ababa"), "YYYY-MM-DD HH:mm:ss").toDate();
        user.save();
    
    }
};
exports.removeFromOnline = async (userId)=>{
    const user = await User.findById(userId);
    if(user != null){
        user.is_online = false;
        user.last_login = moment().utc(moment.tz(Date.now(), "Africa/Addis_Ababa"), "YYYY-MM-DD HH:mm:ss").toDate();
        user.save();    
    }
};