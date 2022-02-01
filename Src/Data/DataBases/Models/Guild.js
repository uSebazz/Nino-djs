const mongoose = require('mongoose');

const GuildSchema = new mongoose.Schema({
	guild: String,
	lang: { type: String },
	prefix: { type: String, default: 'n/' },
});

module.exports = mongoose.model('Guild-Schema', GuildSchema);
