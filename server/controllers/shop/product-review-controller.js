const Order = require('../../models/Order')
const Product = require('../../models/Product')
const ProductReview = require('../../models/Review')

export const addProductReview = async (req, res) => {
    try {
        const { productId, userId, reviewMessage, reviewValue } = req.body;

        const order = await Order.findOne({
            userId,
            "cartItems.productId": productId,
            orderStatus: 'confirmed'
        })

        if (!order) {
            return res.status(403).json({
                success: false,
                message: "You need purchase"
            })
        }

        const isReview = await ProductReview.findOne()

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

export const getProductReview = async (req, res) => {

}