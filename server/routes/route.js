const express = require("express");
const { addUser, loginUser } = require("../controllers/userController");
const { addOrder, getOrder } = require("../controllers/orderController");
const { authentication, authorization } = require("../middleware/authentications");

const router = express.Router();

router.post("/add-user", addUser);
router.post("/login-user", loginUser);

router.post("/add-order", authentication, authorization, addOrder)
router.get("/get-order", authentication, authorization, getOrder)


module.exports = router;
