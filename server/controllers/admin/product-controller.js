const { imageUploadUtil, uploadImages } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const createProduct = async (req, res) => {
    const { image, title, description, category, brand, price, salePrice, quantity } = req.body;

    try {
        const newProduct = await Product.create({
            image: image,
            title: title,
            description: description,
            category: category,
            brand: brand,
            price: price,
            salePrice: salePrice,
            quantity: quantity
        })

        res.status(201).json({
            success: true,
            message: "Created",
            data: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).limit(5);
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        });
    }
}

const getProductById = async (req, res) => {
    const { id } = req.body;
    try {
        const product = await Product.find({ id });
        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        });
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { image, title, description, category, brand, price, salePrice, quantity } = req.body;

    try {

        const product = await Product.findByIdAndUpdate(id, { image, title, description, category, brand, price, salePrice, quantity });

        if (!product) {
            res.status(404).json({
                success: true,
                data: product
            })
        }
        res.status(200).json({
            success: true,
            message: "Update",
            data: product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({
                success: true,
                data: product
            })
        }
        res.status(200).json({
            success: true,
            message: "Deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        });
    }
}


const handleImageUpload = async (req, res) => {
    try {
        const base64s = [];
        const imgageLength = req.files.length;
        for (let i = 0; i < imgageLength; i++) {
            const b64 = Buffer.from(req.files[i].buffer).toString("base64");
            const url = "data:" + req.files[i].mimetype + ";base64," + b64;
            base64s.push(url);
        }

        const result = await uploadImages(base64s);

        return res.json({
            success: true,
            result
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Error"
        })
    }
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, handleImageUpload }