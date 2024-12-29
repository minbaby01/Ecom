const express = require("express");

const {createOrder, getOrdersByUser, capturePayment, getOrderDetail} = require("../../controllers/shop/order-controller");

const router = express.Router();

router.post('/create', createOrder);
// router.post('/capture', capturePayment)
router.get('/get/:userId', getOrdersByUser);
router.get('/details/:id', getOrderDetail);

module.exports = router;