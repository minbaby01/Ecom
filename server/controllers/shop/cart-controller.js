const Product = require("../../models/Product");
const Cart = require("../../models/Cart");

const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {

        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            })
        }

        const product = await Product.findById(productId);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] })
        }

        const findCurrentProductIndex = cart.products.findIndex(product => product.productId.toString() === productId);

        if (findCurrentProductIndex === -1) {
            cart.products.push({ productId, quantity })
        } else {
            cart.products[findCurrentProductIndex].quantity += quantity
        }

        await cart.save();

        res.status(200).json({
            success: true,
            message: "update",
            data: cart
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        })
    }
}

const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            })
        }

        let cart = await Cart.findOne({ userId }).populate({
            path: 'products.productId',
            select: "image title price salePrice"
        });

        if (!cart) {
            cart = new Cart({ userId, products: [] })
        }

        const validProducts = cart.products.filter(product => product.id);

        if (validProducts.length < cart.products.length) {
            cart.products = validProducts
            await cart.save();
        }

        const populateCartProducts = validProducts.map(item => ({
            productId: item?.productId?._id,
            image: item?.productId?.image,
            title: item?.productId?.title,
            price: item?.productId?.price,
            salePrice: item?.productId?.salePrice,
            quantity: item?.quantity
        }))

        res.status(200).json({
            success: true,
            data: {
                ...cart._doc,
                products: populateCartProducts
            }
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        })
    }
}

const updateCartProduct = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        if (!userId || !productId || quantity <= 0) {
            res.status(400).json({
                success: false,
                message: "Invalid data",
            })
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            res.status(404).json({
                success: false,
                message: "Cart not found",
            })
        }

        const findCurrentProductIndex = cart.products.findIndex(product => product.productId.toString() === productId);
        if (findCurrentProductIndex === -1) {
            res.status(404).json({
                success: false,
                message: "Cart item not present"
            })
        }

        cart.products[findCurrentProductIndex].quantity = quantity
        await cart.save();
        await cart.populate({
            path: 'products.productId',
            select: "image title price salePrice"
        })

        const populateCartProducts = cart.products.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            message: "update",
            data: {
                ...cart._doc,
                products: populateCartProducts
            }
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        })
    }
}

const deleteCartProduct = async (req, res) => {
    const { userId, productId } = req.params;

    try {

        if (!userId || !productId) {
            res.status(400).json({
                success: false,
                message: "Invalid data",
            })
        }

        let cart = await Cart.findOne({ userId }).populate({
            path: 'products.productId',
            select: "image title price salePrice"
        });

        if (!cart) {
            res.status(404).json({
                success: false,
                message: "Cart not found",
            })
        }

        cart.products = cart.products.filter(item => item.productId._id.toString() !== productId)

        await cart.save();

        await cart.populate({
            path: 'products.productId',
            select: "image title price salePrice"
        });

        const populateCartProducts = cart.products.map(item => ({
            productId: item.productId ? item.productId._id : null,
            image: item.productId ? item.productId.image : null,
            title: item.productId ? item.productId.title : null,
            price: item.productId ? item.productId.price : null,
            salePrice: item.productId ? item.productId.salePrice : null,
            quantity: item.quantity
        }));

        res.status(200).json({
            success: true,
            message: "delete",
            data: {
                ...cart._doc,
                products: populateCartProducts
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        })
    }
}

module.exports = { addToCart, getCart, updateCartProduct, deleteCartProduct }