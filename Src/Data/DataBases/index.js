const Guild = require('./Models/Guild');
const Owner = require('./Models/Owner');

let db = {
	guild: Guild,
	owner: Owner,
};

module.exports = db;
