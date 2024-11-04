const Article = require("../../models/Article");

const createArticle = async (req, res) => {
    const { productId, title, data } = req.body;

    try {
        const newArticle = await Article.create({
            productId: productId,
            title: title,
            data: data,
        })

        res.status(201).json({
            success: true,
            message: "Created",
            data: newArticle
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        });
    }
}

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find({});
        res.status(200).json({
            success: true,
            data: articles,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        });
    }
}

const getArticleById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const article = await Article.findById(id);
        res.status(200).json({
            success: true,
            data: article,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        });
    }
}

const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { productId, title, data } = req.body;
    

    try {

        const article = await Article.findByIdAndUpdate(id, { productId, title, data });

        if (!article) {
            res.status(404).json({
                success: true,
                data: article
            })
        }
        res.status(200).json({
            success: true,
            message: "Update",
            data: article
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        });
    }
}

const deleteArticle = async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findByIdAndDelete(id);

        if (!article) {
            res.status(404).json({
                success: true,
                data: article
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


module.exports = { createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle }