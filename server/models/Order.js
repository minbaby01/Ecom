const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: String,
    cartId: String,
    cartItems: [
        {
            productId: String,
            title: String,
            image: Array,
            price: Number,
            quantity: Number
        }
    ],
    addressInfo: {
        addressId: String,
        address: String,
        city: String,
        phone: String,
        notes: String
    },
    orderStatus: String,
    paymentMethod: String,
    paymentStatus: String,
    totalAmount: Number,
    paymentId: String,
    payerId: String
},
    {
        timestamps: true,
    })

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;