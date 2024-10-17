const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userId: String, 
    address: String,
    city: String,
    phone:  String
}, { timestamps: true })

const Address = mongoose.model('Address ', AddressSchema);
module.exports = Address;