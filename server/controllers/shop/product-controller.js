const Product = require("../../models/Product");

const getFilterdProducts = async (req, res) => {

    // for (let i = 0; i < 100; i++) {
    //     console.log(i);
    //     await Product.create({
    //         image: [],
    //         title: `Product ${i}`,
    //         description: `description ${i}`,
    //         category: `men`,
    //         brand: "nike",
    //         price: 1000 + i,
    //         salePrice: 1000 - i,
    //         quantity: i
    //     })
    // }

    const { category = [], brand = [], sortBy = "price-lowtohigh", page = 1 } = req.query;
    const itemPerPage = 10;

    let filters = {};

    if (category.length) {
        filters.category = { $in: category.split(',') }
    }

    if (brand.length) {
        filters.brand = { $in: brand.split(',') }
    }

    let sort = {};

    switch (sortBy) {
        case "price-lowtohigh":
            sort.price = 1;
            break;
        case "price-hightolow":
            sort.price = -1;
            break;
        case "title-atoz":
            sort.title = 1;
            break;
        case "title-ztoa":
            sort.title = -1;
            break;
        default:
            sort.price = 1;
            break;
    }
    try {
        const totalItems = await Product.countDocuments(filters);
        const totalPages = Math.ceil(totalItems / itemPerPage);
        
        const products = await Product.find(filters).skip((page -1) * itemPerPage).limit(itemPerPage).sort(sort);
        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

const getProductDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

module.exports = { getFilterdProducts, getProductDetails }