const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Address = require("../../models/Address");
const User = require("../../models/User");
const Product = require("../../models/Product");

const createOrder = async (req, res) => {
    const { userId, addressId, notes, paymentMethod, } = req.body;

    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            })
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }

        // await Promise.all(
        //     cart.products.map(async (item) => {
        //         const product = await Product.findById(item._id);
        //         if (!product) {
        //             return res.status(404).json({
        //                 success: false,
        //                 message: "Product not found"
        //             })
        //         }

        //         console.log(product);
                
        //         if (product.quantity - item.quantity < 0) {
        //             return res.status(404).json({
        //                 success: false,
        //                 message: "Some product change quantity, please checkout again"
        //             })
        //         }
        //     })
        // )

        const totalCartAmount = cart && cart.products && cart.products.length > 0 ?
            cart.products.reduce((sum, currentItem) => sum +
                (currentItem?.salePrice ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0) : 0;

        const newOrder = await Order.create({
            userId,
            cartItems: cart.products.map(item => ({
                productId: item?.productId,
                title: item?.title,
                image: item?.image,
                price: item?.salePrice > 0 ?? item?.price,
                quantity: item?.quantity
            })),
            addressInfo: {
                address: address?.address,
                city: address?.city,
                phone: address?.phone,
                notes: notes
            },
            totalCartAmount,
            orderStatus: 'pending',
            paymentMethod: 'cod',
            paymentStatus: 'pending',
        });

        await Cart.findByIdAndDelete(cart._id);

        res.status(201).json({
            success: true,
            orderId: newOrder._id
        })

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
        const { paymentId, payerId, orderId } = req.body;

        let order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        order.paymentStatus = "paid";
        order.orderStatus = 'confirmed';

        const getCartId = order.cartId;
        await Cart.findByIdAndDelete(getCartId);

        await order.save();
        res.status(200).json({
            success: true,
            message: "Orde confirmed",
            data: order
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

const getOrdersByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({createdAt: -1});
        
        if (!orders.length) {
            return res.status(404).json({
                success: false,
                message: "Orders not found"
            })
        }

        res.status(200).json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

const getOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        res.status(200).json({
            success: true,
            data: order
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

module.exports = { createOrder, capturePayment, getOrdersByUser, getOrderDetail }