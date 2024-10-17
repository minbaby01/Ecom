const Order = require("../../models/Order");


const createOrder = async (req, res) => {

    const { userId, cartItems, addressInfo, orderStatus, paymentMethod, paymentStatus, totalAmount, orderDate, orderUpdateDate, paymentId, payerId } = req.body;
    try {
        const newOrder = new Order({
            user: userId,
            products: products,
            addressInfo: addressInfo,
            totalPrice: totalPrice,
            paymentMethod: paymentMethod,
            paymentStatus: "Processing",
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

const capturePayment = async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

module.exports = { createOrder, capturePayment }