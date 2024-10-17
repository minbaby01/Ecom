const express = require("express");

const { addToCart, getCart, updateCartProduct, deleteCartProduct } = require("../../controllers/shop/cart-controller");

const router = express.Router();
router.get('/:userId', getCart);
router.post('/', addToCart);
router.put('/', updateCartProduct);
router.delete('/:userId/:productId', deleteCartProduct)

module.exports = router;