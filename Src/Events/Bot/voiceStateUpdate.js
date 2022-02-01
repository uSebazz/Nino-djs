const events = require('../../Data/Structures/Events');
const Client = new (require('../../Data/Structures/ClientInit'))();
const delay = require('delay');
const colors = require('colors');

module.exports = class event extends events {
	constructor(...args) {
		super(...args);
	}
	/**
	 * @param {Client} client
	 */
	run = async (client, oldState, newState) => {
		let player = client._music.players.get(oldState.guild.id);
		if (!player) return;
		if (newState.id === client.user.id && oldState.channelId && !newState.channelId) {
			client._music.destroyPlayer(player.guildId);
		}
		if (oldState.id === client.user.id) return;
		if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return;

		if (oldState.guild.members.cache.get(client.user.id).voice.channelId === oldState.channelId) {
			if (
				oldState.guild.me.voice?.channel &&
				oldState.guild.me.voice.channel.members.filter((m) => !m.user.bot).size === 0
			) {
				const vcName = oldState.guild.me.voice.channel.id;
				await delay(120000);

				const vcMembers = oldState.guild.me.voice.channel?.members.size;
				if (!vcMembers || vcMembers === 1) {
					player.disconnect();
					client._music.destroyPlayer(player.guildId);
					return player.queue.channel.send(`Me fui de <#${vcName}> ya que no hay nadie.`);
				}
			}
		}
	};
};
