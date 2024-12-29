const mongoose = require('mongoose');

const ProductReviewSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    orderId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    reviewMsg: {
        type: String,
        required: true,
    },
    reviewValue: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

const ProductReview = mongoose.model('ProductReview', ProductReviewSchema);
module.exports = ProductReview;