const { Node } = require('lavaclient');
const { lava_host, lava_pass, id, secret } = require('../../Data/Utils/Stack/Lavalink.js');
const Client = require('./ClientInit');

module.exports = class NinoLink extends Node {
	/**
	 * @param {Client} client
	 */
	constructor(client) {
		super({
			sendGatewayPayload: (id, payload) => client.guilds.cache.get(id).shard.send(payload),
			connection: {
				host: process.env.LAVA_IP,
				password: process.env.LAVA_PASS,
				port: 25786,
				secure: false,
			},
		});
	}
};
