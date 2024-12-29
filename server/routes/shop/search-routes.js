const express = require("express");
const rateLimit = require('express-rate-limit');

const { searchProducts } = require("../../controllers/shop/search-controller");

const router = express.Router();

const searchRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 15,
    message: {
        success: false,
        message: 'too fast',
    },
});



router.get('/:keyword', searchRateLimiter ,searchProducts);

module.exports = router;