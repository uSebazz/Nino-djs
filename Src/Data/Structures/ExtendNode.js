const { Node } = require('lavaclient');
const { lava_host, lava_pass } = require('../../Data/Utils/Stack/Lavalink.js');
const Client = require('./ClientInit');

module.exports = class NinoLink extends Node {
	/**
	 * @param {Client} client
	 */
	constructor(client) {
		super({
			sendGatewayPayload: (id, payload) => client.guilds.cache.get(id).shard.send(payload),
			connection: {
				host: lava_host,
				password: lava_pass,
				port: 2333,
			},
		});
	}
};
