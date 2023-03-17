const express = require("express");
// import middlewares
const { validateToken } = require("../middleware/AuthMiddleWare");
// import auth controllers
const { createAccount, loginWithOtp,
        verifyAccountWithOtp,updateAccount,
    deleteAccount, deactivateAccount, getCurrentUser, removeFromOnline, addtoOnline     
    } = require("../controllers/Auth.Controller");

const router = express.Router();


// User Account Router
router.post("/create/",createAccount);
router.post("/verify/",verifyAccountWithOtp);
router.post("/login/",loginWithOtp);
router.put("/update/",validateToken,updateAccount);
router.get("/currentuser/",validateToken,getCurrentUser);
router.put("/deactivate/",validateToken,deactivateAccount);
router.delete("/delete/",validateToken,deleteAccount);
router.get("/to-ofline",validateToken,removeFromOnline);
router.get("/to-online",validateToken,addtoOnline);


module.exports = router;