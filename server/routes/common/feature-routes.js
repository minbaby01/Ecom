const express = require("express");

const {addFeatureImage, getFeatureImage} = require("../../controllers/common/feature-controller");

const router = express.Router();

router.get('/get', getFeatureImage);
router.post('/add', addFeatureImage);

module.exports = router;