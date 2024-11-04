const express = require("express");

const {createArticle, getAllArticles, getArticleById, updateArticle, deleteArticle} = require("../../controllers/admin/article-controller");

const router = express.Router();

// router.post('/upload-image', upload.single("my_file"), handleImageUpload);
router.get('/get/:id', getArticleById);
router.get('/get', getAllArticles);
router.post('/add', createArticle);
router.put('/update/:id', updateArticle);
router.delete('/delete/:id', deleteArticle);

module.exports = router;