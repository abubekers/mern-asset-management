const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const { checkUserAuth } = require("../middleware/authMiddleware");

// router.use(checkUserAuth);

router.get("/", customerController.customer_index);
router.post("/", customerController.customer_create);
router.patch("/:id", customerController.customer_update);
router.delete("/:id", customerController.customer_delete);
// router.get("/:id", customerController.customer_creator);
router.get("/:id", customerController.customer_single);

module.exports = router;
