const events = require('../../Data/Structures/Events');
const Client = require('../../Data/Structures/ClientInit');
const colors = require('colors');

module.exports = class event extends events {
	constructor(...args) {
		super(...args);
	}
	/**
	 * @param {Client} client
	 */
	run = async (client) => {};
};
