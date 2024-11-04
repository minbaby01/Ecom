const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    productId: String, 
    title: String,
    data: Object,
}, { timestamps: true })

const Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;