const { Node } = require('lavaclient');
const { lava_host, lava_pass, id, secret } = require('../../Data/Utils/Stack/Lavalink.js');
const { load } = require('@lavaclient/spotify');
const Client = require('./ClientInit');

load({
	client: {
		id: id,
		secret: secret,
	},
	autoResolveYoutubeTracks: true,
});

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
