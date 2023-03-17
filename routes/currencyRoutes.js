const express = require("express");
const router = express.Router();
const currencyController = require("../controllers/currencyController");
const { checkUserAuth } = require("../middleware/authMiddleware");

// router.use(checkUserAuth);

router.get("/", currencyController.currency_index);
router.post("/", currencyController.currency_create_post);
router.get("/:id", currencyController.getsingledata);
router.get("/:id", currencyController.getdataForCreator);
router.patch("/:id", currencyController.currency_update);
router.delete("/:id", currencyController.currency_delete);

module.exports = router;
