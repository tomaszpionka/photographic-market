const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const authorize = require("../middleware/authorize");

const orderController = require("../controllers/order");

router.post(
  "/:item_id/:item_owner/:item_buyer",
  authorize,
  jsonParser,
  orderController.createOrder
);
router.get("/", jsonParser, orderController.getOrders);
router.put(
  "/offer/:order_id/:item_id/:process",
  authorize,
  jsonParser,
  orderController.updateProcess
);
router.put(
  "/confirm/:order_id/:item_buyer/:item_id",
  authorize,
  jsonParser,
  orderController.confirmOrder
);

module.exports = router;
