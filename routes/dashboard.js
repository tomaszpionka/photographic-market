const router = require("express").Router();
const authorize = require("../middleware/authorize");
const dashboardController = require("../controllers/dashboard");

router.get("/", authorize, dashboardController.getUsers);
router.get("/items", authorize, dashboardController.getItems);

module.exports = router;
