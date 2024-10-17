const express = require("express");

const {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, handleImageUpload} = require("../../controllers/admin/product-controller");

const {upload} = require("../../helpers/cloudinary");

const router = express.Router();

router.post('/upload-image', upload.single("my_file"), handleImageUpload);
router.get('/get/:id', getProductById);
router.get('/get', getAllProducts);
router.post('/add', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;