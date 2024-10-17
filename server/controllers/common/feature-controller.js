const Feature = require('../../models/Feature')

const addFeatureImage = async (req, res) => {
    const { image } = req.body;
    
    try {
        const featuresImages = await Feature.create({ image })

        res.status(201).json({
            success: true,
            data: featuresImages
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

const getFeatureImage = async (req, res) => {

    try {
        const images = await Feature.find({})

        res.status(201).json({
            success: true,
            data: images
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

module.exports = {addFeatureImage, getFeatureImage }