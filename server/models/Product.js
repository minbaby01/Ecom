const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: {
        type: Array
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    brand: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;