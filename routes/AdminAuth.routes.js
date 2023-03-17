const express = require("express");
// import middlewares
const { validateAdminUserRole, validateSuperAdmin } = require("../middleware/AdminMiddleWare");

// import user controllers
const { createAdminUserAccount, 
    getAllusers,
    updateUser,deleteUser, verifyAdminAccountWithOtp, 
    suspendUser, getUser, getAdminUsers,
    loginAdminWithOtp } = require("../controllers/AdminAuth.Controller");

const router = express.Router();

router.post("/verify-otp/",verifyAdminAccountWithOtp);
router.post("/login/",loginAdminWithOtp);

// Admin Auth Router
router.post("/create/",validateAdminUserRole,createAdminUserAccount);
router.get("/all/",validateAdminUserRole,getAllusers);
router.get("/users/:user_type/",validateAdminUserRole,getAdminUsers);
router.get("/:id/",validateAdminUserRole,getUser);
// Super Admin role

router.delete("/admin/delete/:id", validateAdminUserRole, deleteUser)
router.put("/admin/update/:id", validateAdminUserRole,updateUser)
router.put("/admin/deactivate/:id",validateAdminUserRole,suspendUser)


module.exports = router;
  