const Address = require("../../models/Address")

const addAddress = async (req, res) => {
    const { userId, address, city, phone } = req.body;
    try {

        if (!userId || !address || !city || !phone) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            })
        }

        const userAddress = await Address.create({ userId, address, city, phone });
        res.status(201).json({
            success: true,
            message: "Address Created",
            data: userAddress
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

const getAddress = async (req, res) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data",
            })
        }

        const userAddress = await Address.find({ userId });

        res.status(200).json({
            success: true,
            data: userAddress
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error",
        })
    }

}

const updateAddress = async (req, res) => {

    const { userId, addressId } = req.params;
    const formData = req.body;
    console.log(userId, addressId);
    
    try {
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data"
            })
        }

        const userAddress = await Address.findOneAndUpdate({
            _id: addressId,
            userId: userId
        }, formData,
            { new: true }
        );

        if (!userAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            })
        }

        res.status(200).json({
            success: true,
            message: " Update",
            data: userAddress
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

const deleteAddress = async (req, res) => {
    const { userId, addressId } = req.params;

    try {
        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: "Invalid data"
            })
        }

        const userAddress = await Address.findOneAndDelete({
            _id: addressId,
            userId: userId
        });

        if (!userAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "ERROR"
        })
    }
}

module.exports = { addAddress, getAddress, updateAddress, deleteAddress }