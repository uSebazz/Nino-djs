const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
	user: String,
	time: Number,
});

module.exports = mongoose.model('Owner-Schema', ownerSchema);
