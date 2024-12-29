const Product = require("../../models/Product")


const searchProducts = async (req, res) => {    
    try {
        const { keyword } = req.params;
        
        if (!keyword || typeof keyword !== "string" || keyword.trim().length < 3) {
            return res.status(400).json({
                success: false,
                message: "Input wrong"
            });
        }

        const regEx = new RegExp(keyword, 'i');

        const createSearchQuery = {
            $or: [
                { title: regEx },
                { description: regEx },
                { category: regEx },
                { brand: regEx }
            ]
        }

        const searchResults = await Product.find(createSearchQuery).limit(5);

        res.status(200).json({
            success: true,
            data: searchResults
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

module.exports = { searchProducts }