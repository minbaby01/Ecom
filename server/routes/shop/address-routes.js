const express = require('express');

const { addAddress, getAddress, deleteAddress, updateAddress } = require('../../controllers/shop/address-controller');

const router = express.Router();

router.post('/add', addAddress);
router.get('/get/:userId', getAddress);
router.put('/update/:userId/:addressId', updateAddress);
router.delete('/delete/:userId/:addressId', deleteAddress);

module.exports = router