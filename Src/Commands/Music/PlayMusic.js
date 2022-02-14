const {
	Message,
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	MessageAttachment,
} = require('discord.js');
const command = require('../../Data/Structures/Commands');
const { SpotifyItemType } = require('@lavaclient/spotify');
const { convertTime } = require('../../Data/Utils/Functions/Time');

class PlayMusic extends command {
	constructor(client) {
		super(client, {
			name: 'play',
			description: ['Play your favorite music', 'Reproduce tu música favorita!'],
			aliases: ['p'],
			usage: ['play [song/Spotify]', 'play [canción/Spotify]'],
			example: ['play Clairo', 'play Trueno Feel me'],
			userPerms: [],
			botPerms: [],
			category: 'Music',
			cooldown: 10,
			blacklist: true,
			nsfw: false,
			vote: false,
			devs: false,
			enable: true,
		});
	}
	/**
	 * @param { Message } message
	 * @param { String[] } args
	 */
	async run(message, args, lang) {
		/**
		 * @type {import('../../data/structures/ClientInit')}
		 */
		const client = this.client;

		try {
			const { channel } = message.member.voice;
			if (!channel)
				return message.reply(
					client._lang.__mf(
						{
							phrase: 'music.play.channel',
							locale: lang,
						},
						{
							user: client._clear(message.author.tag),
							emoji: client._emotes.fail,
						}
					)
				);
			if (!channel.permissionsFor(client.user.id).has('VIEW_CHANNEL'))
				return message.reply(
					client._lang.__mf(
						{
							phrase: 'error.view',
							locale: lang,
						},
						{
							user: client._clear(message.author.tag),
							emoji: client._emotes.fail,
						}
					)
				);
			if (!channel.permissionsFor(client.user.id).has('CONNECT'))
				return message.reply(
					client._lang.__mf(
						{
							phrase: 'error.connect',
							locale: lang,
						},
						{
							user: client._clear(message.author.tag),
							emoji: client._emotes.fail,
						}
					)
				);
			if (!channel.permissionsFor(client.user.id).has('SPEAK'))
				return message.reply(
					client._lang.__mf(
						{
							phrase: 'error.speak',
							locale: lang,
						},
						{
							user: client._clear(message.author.tag),
							emoji: client._emotes.fail,
						}
					)
				);
			let query = args.join(' ');
			if (!query)
				return message.reply(
					client._lang.__mf(
						{
							phrase: 'music.play.args',
							locale: lang,
						},
						{
							user: client._clear(message.author.tag),
							emoji: client._emotes.pending,
						}
					)
				);
			let player = client._music.players.get(message.guildId);

			if (player && player.channelId !== channel.id)
				return message.reply(
					client._lang.__mf(
						{
							phrase: 'music.play.igual',
							locale: lang,
						},
						{
							user: client._clear(message.author.tag),
							emoji: client._emotes.fail,
							tag: client.user.tag,
						}
					)
				);
			let queueHistory = client._queueHistory.get(message.guild.id);
			if (Number(query) && queueHistory.length > 0) {
				const index = String(Number(query) - 1);
				query = queueHistory[index].title;
			}

			let tracks = [];

			if (client._music.spotify.isSpotifyUrl(query)) {
				const item = await client._music.spotify.load(query);
				if (!item) return;
				switch (item.type) {
					case SpotifyItemType.Track: {
						const track = await item.resolveYoutubeTrack();
						tracks = [track];
						message.channel.send({
							embeds: [
								new MessageEmbed()
									.setDescription(
										client._lang.__mf(
											{
												phrase: 'music.play.track',
												locale: lang,
											},
											{
												track: item.name,
												uri: query,
												emoji: client._emotes.music,
												user: message.author.toString(),
												art: item.artists[0].name,
												time: convertTime(item.data.duration_ms),
											}
										)
									)
									.setColor(client._colors.Invisible),
							],
						});
						break;
					}
					case SpotifyItemType.Artist: {
						const tracks = await item.resolveYoutubeTracks();
						message.channel.send({
							embeds: [
								new MessageEmbed()
									.setDescription(
										client._lang.__mf(
											{
												phrase: 'music.play.track2',
												locale: lang,
											},
											{
												track: tracks.length,
												emoji: client._emotes.music,
												art: item.name,
												uri: query,
												user: message.author.toString(),
												follow: item.data.followers.total,
												gen: item.data.genres[0],
											}
										)
									)
									.setThumbnail(item.data.images[1].url)
									.setColor(client._colors.Invisible),
							],
						});
						break;
					}
					case SpotifyItemType.Album: {
						const tracks = await item.resolveYoutubeTracks();
						message.channel.send({
							embeds: [
								new MessageEmbed()
									.setDescription(
										client._lang.__mf(
											{
												phrase: 'music.play.album',
												locale: lang,
											},
											{
												album: item.name,
												track: tracks.length,
												emoji: client._emotes.music,
												desc: item.data.label ? item.data.label : 'No',
												art: item.data.artists[0].name,
											}
										)
									)
									.setThumbnail(item.data.images[1].url)
									.setColor(client._colors.Invisible),
							],
						});
						break;
					}
					case SpotifyItemType.Playlist: {
						const tracks = await item.resolveYoutubeTracks();
						message.channel.send({
							embeds: [
								new MessageEmbed()
									.setDescription(
										client._lang.__mf(
											{
												phrase: 'music.play.track3',
												locale: lang,
											},
											{
												emoji: client._emotes.music,
												name: item.data.name,
												desc: item.data.description ? item.data.description : 'No',
												uri: query,
												track: tracks.length,
												dc: item.owner.display_name,
											}
										)
									)
									.setColor(client._colors.Invisible),
							],
						});
						break;
					}
					default: {
						return message.reply(
							client._lang.__({
								phrase: 'music.play.found',
								locale: lang,
							})
						);
					}
				}
			} else {
				const results = await client._music.rest.loadTracks(
					/^https?:\/\//.test(query) ? query : `ytsearch:${query}`
				);

				switch (results.loadType) {
					case 'LOAD_FAILED': {
						message.reply(
							client._lang.__mf(
								{
									phrase: 'music.play.error',
									locale: lang,
								},
								{
									emoji: client._emotes.burrito,
								}
							)
						);
						break;
					}
					case 'NO_MATCHES': {
						message.reply(
							client._lang.__({
								phrase: 'music.play.found',
								locale: lang,
							})
						);
						break;
					}
					case 'PLAYLIST_LOADED': {
						tracks = results.tracks;
						message.reply({
							embeds: [
								new MessageEmbed()
									.setDescription(
										client._lang.__mf(
											{
												phrase: 'music.play.playlist',
												locale: lang,
											},
											{
												name: results.playlistInfo.name,
												uri: query,
												emoji: client._emotes.music,
												track: tracks.length,
											}
										)
									)
									.setColor(client._colors.Invisible),
							],
						});
						break;
					}
					case 'TRACK_LOADED':
					case 'SEARCH_RESULT': {
						const [track] = results.tracks;
						tracks = [track];
						message.channel.send({
							embeds: [
								new MessageEmbed()
									.setDescription(
										client._lang.__mf(
											{
												phrase: 'music.play.trackload',
												locale: lang,
											},
											{
												name: track.info.title,
												time: convertTime(track.info.length),
												uri: track.info.uri,
												emoji: client._emotes.music,
											}
										)
									)
									.setColor(client._colors.Invisible),
							],
						});
						break;
					}
				}
			}

			if (!player) {
				player = client._music.createPlayer(message.guildId);
				player.queue.channel = message.channel;
				await player.connect(channel.id, { deafened: true });
			}
			const started = player.playing || player.paused;

			await player.queue.add(tracks, {
				requester: message.author.id,
			});
			if (!started) {
				await player.setVolume(50);
				await player.queue.start();
			}
		} catch (e) {
			await message.channel.send({ content: 'Ocurrió un error inesperado.' });
			console.log(e);
		}
	}
};
module.exports = PlayMusic