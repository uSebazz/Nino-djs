const events = require('../../Data/Structures/Events');
const Client = require('../../Data/Structures/ClientInit');
const {
	Message,
	MessageActionRow,
	MessageButton,
	MessageEmbed,
	MessageAttachment,
} = require('discord.js');
const GuildSchema = require('../../Data/DataBases/Models/Guild.js');
const OwnerSchema = require('../../Data/DataBases/Models/Owner');
const ms = require('@fabricio-191/ms');
const Sentry = require('@sentry/node');

validPermissions = [
	'CREATE_INSTANT_INVITE',
	'KICK_MEMBERS',
	'BAN_MEMBERS',
	'ADMINISTRATOR',
	'MANAGE_CHANNELS',
	'MANAGE_GUILD',
	'ADD_REACTIONS',
	'VIEW_AUDIT_LOG',
	'PRIORITY_SPEAKER',
	'STREAM',
	'VIEW_CHANNEL',
	'SEND_MESSAGES',
	'SEND_TTS_MESSAGES',
	'MANAGE_MESSAGES',
	'EMBED_LINKS',
	'ATTACH_FILES',
	'READ_MESSAGE_HISTORY',
	'MENTION_EVERYONE',
	'USE_EXTERNAL_EMOJIS',
	'VIEW_GUILD_INSIGHTS',
	'CONNECT',
	'SPEAK',
	'MUTE_MEMBERS',
	'DEAFEN_MEMBERS',
	'MOVE_MEMBERS',
	'USE_VAD',
	'CHANGE_NICKNAME',
	'MANAGE_NICKNAMES',
	'MANAGE_ROLES',
	'MANAGE_WEBHOOKS',
	'USE_APPLICATION_COMMANDS',
	'MANAGE_EMOJIS_AND_STICKERS',
	'USE_PUBLIC_THREADS',
	'USE_PRIVATE_TREADS',
	'MANAGE_THREADS',
];

module.exports = class event extends events {
	constructor(...args) {
		super(...args);
	}
	/**
	 * @param {Client} client
	 * @param {Message} message
	 */
	run = async (client, message) => {
		//———————————————[Variables]———————————————//
		if (!message.guild) return;
		if (message.author.bot) return;
		if (message.channel.type === 'DM') return;
		//———————————————[Variables]———————————————//

		//———————————————[Lang]———————————————//
		const Guild = message.guild;
		const defaultLang = 'en';
		let { lang } = Guild;

		if (!lang) {
			const data = await client._db.guild.findOne({ guild: message.guild.id }).lean();

			if (data) {
				Guild.lang = data.lang;
				lang = data.lang;
			} else {
				new GuildSchema({
					guild: message.guild.id,
					lang: defaultLang,
				}).save();
				Guild.lang = defaultLang;
				lang = defaultLang;
			}
		}
		//———————————————[Lang]———————————————//

		//———————————————[Prefix]———————————————//
		const defaultPrefix = 'n/';
		let { prefix } = Guild;

		if (!prefix) {
			const data = await client._db.guild.findOne({ guild: message.guild.id }).lean();

			if (data) {
				Guild.prefix = data.prefix;
				prefix = data.prefix;
			} else {
				Guild.prefix = defaultPrefix;
				prefix = defaultPrefix;
			}
		}
		//———————————————[Prefix]———————————————//

		//———————————————[Mention]———————————————//
		const mentionRegex1 = message.content.match(new RegExp(`^<@!?(${client.user.id})>`, 'gi'));
		if (mentionRegex1) {
			prefix = mentionRegex1[0];
		} else {
			prefix = prefix;
		}

		const Regex = new RegExp(`^<@!?${client.user.id}>( |)$`);
		if (message.content.match(Regex)) {
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'events.message.mention',
						locale: lang,
					},
					{
						emoji: client._emotes.wave,
						prefix: message.guild.prefix,
					}
				),
			});
		}
		//———————————————[Mention]———————————————//

		//———————————————[Permisos]———————————————//
		let permslang = {
			CREATE_INSTANT_INVITE: client._lang.__({
				phrase: 'perms.1',
				locale: lang,
			}),
			KICK_MEMBERS: client._lang.__({
				phrase: 'perms.2',
				locale: lang,
			}),
			BAN_MEMBERS: client._lang.__({
				phrase: 'perms.3',
				locale: lang,
			}),
			ADMINISTRATOR: client._lang.__({
				phrase: 'perms.4',
				locale: lang,
			}),
			MANAGE_CHANNELS: client._lang.__({
				phrase: 'perms.5',
				locale: lang,
			}),
			MANAGE_GUILD: client._lang.__({
				phrase: 'perms.6',
				locale: lang,
			}),
			ADD_REACTIONS: client._lang.__({
				phrase: 'perms.7',
				locale: lang,
			}),
			VIEW_AUDIT_LOG: client._lang.__({
				phrase: 'perms.8',
				locale: lang,
			}),
			PRIORITY_SPEAKER: client._lang.__({
				phrase: 'perms.9',
				locale: lang,
			}),
			STREAM: client._lang.__({
				phrase: 'perms.10',
				locale: lang,
			}),
			VIEW_CHANNEL: client._lang.__({
				phrase: 'perms.11',
				locale: lang,
			}),
			SEND_MESSAGES: client._lang.__({
				phrase: 'perms.12',
				locale: lang,
			}),
			SEND_TTS_MESSAGES: client._lang.__({
				phrase: 'perms.13',
				locale: lang,
			}),
			MANAGE_MESSAGES: client._lang.__({
				phrase: 'perms.14',
				locale: lang,
			}),
			EMBED_LINKS: client._lang.__({
				phrase: 'perms.15',
				locale: lang,
			}),
			ATTACH_FILES: client._lang.__({
				phrase: 'perms.16',
				locale: lang,
			}),
			READ_MESSAGE_HISTORY: client._lang.__({
				phrase: 'perms.17',
				locale: lang,
			}),
			MENTION_EVERYONE: client._lang.__({
				phrase: 'perms.18',
				locale: lang,
			}),
			USE_EXTERNAL_EMOJIS: client._lang.__({
				phrase: 'perms.19',
				locale: lang,
			}),
			VIEW_GUILD_INSIGHTS: client._lang.__({
				phrase: 'perms.20',
				locale: lang,
			}),
			CONNECT: client._lang.__({
				phrase: 'perms.21',
				locale: lang,
			}),
			SPEAK: client._lang.__({
				phrase: 'perms.22',
				locale: lang,
			}),
			MUTE_MEMBERS: client._lang.__({
				phrase: 'perms.23',
				locale: lang,
			}),
			DEAFEN_MEMBERS: client._lang.__({
				phrase: 'perms.24',
				locale: lang,
			}),
			MOVE_MEMBERS: client._lang.__({
				phrase: 'perms.25',
				locale: lang,
			}),
			USE_VAD: client._lang.__({
				phrase: 'perms.26',
				locale: lang,
			}),
			CHANGE_NICKNAME: client._lang.__({
				phrase: 'perms.27',
				locale: lang,
			}),
			MANAGE_NICKNAMES: client._lang.__({
				phrase: 'perms.28',
				locale: lang,
			}),
			MANAGE_ROLES: client._lang.__({
				phrase: 'perms.29',
				locale: lang,
			}),
			MANAGE_WEBHOOKS: client._lang.__({
				phrase: 'perms.30',
				locale: lang,
			}),
			USE_APPLICATION_COMMANDS: client._lang.__({
				phrase: 'perms.31',
				locale: lang,
			}),
			MANAGE_EMOJIS_AND_STICKERS: client._lang.__({
				phrase: 'perms.32',
				locale: lang,
			}),
			USE_PUBLIC_THREADS: client._lang.__({
				phrase: 'perms.33',
				locale: lang,
			}),
			USE_PRIVATE_TREADS: client._lang.__({
				phrase: 'perms.34',
				locale: lang,
			}),
			MANAGE_THREADS: client._lang.__({
				phrase: 'perms.35',
				locale: lang,
			}),
		};
		//———————————————[Permisos]———————————————//

		//———————————————[Permisos]———————————————//
		if (!message.content.toLocaleLowerCase().startsWith(prefix)) return;
		if (!message.channel.permissionsFor(client.user.id).has('SEND_MESSAGES')) return;
		if (!message.channel.permissionsFor(client.user.id).has('VIEW_CHANNEL')) return;

		if (!message.channel.permissionsFor(client.user.id).has('READ_MESSAGE_HISTORY')) {
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'events.message.history',
						locale: lang,
					},
					{
						user: message.author.tag,
					}
				),
			});
		}

		if (!message.channel.permissionsFor(client.user.id).has('EMBED_LINKS')) {
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'events.message.embed',
						locale: lang,
					},
					{
						user: message.author.tag,
					}
				),
			});
		}

		if (!message.channel.permissionsFor(client.user.id).has('ADD_REACTIONS')) return;
		//———————————————[Permisos]———————————————//

		//———————————————[Args]———————————————//
		const args = message.content.slice(prefix.length).trim().split(/\s+/gm);
		const commandName = args.shift().toLowerCase();
		const command =
			client._commands.get(commandName) ||
			client._commands.find(
				(command) => command._info.aliases && command._info.aliases.includes(commandName)
			);
		//———————————————[Args]———————————————//

		//———————————————[SubCommands]———————————————//
		if (!command) return;

		const datalist = await OwnerSchema.findOne({ user: message.author.id }).lean();
		if (datalist) {
			if (command._config.blacklist == true && datalist.user ? datalist.user : null) return;
		}

		if (command._config.userPerms.length) {
			let xPermissions = [];
			for (const perm of command._config.userPerms) {
				if (!validPermissions.includes(perm)) {
					return console.log('[PERMS]'.grey, `Invalid perm ${xPermissions}`);
				} else {
					if (!message.member.permissions.has(perm)) {
						xPermissions.push(permslang[perm]);
					}
				}
			}
			if (xPermissions.length) {
				return message.reply({
					content: client._lang.__mf(
						{
							phrase: 'events.message.user',
							locale: lang,
						},
						{
							user: client._clear(message.author.username),
							perm: xPermissions.join(', '),
							emoji: client._emotes.fail,
						}
					),
				});
			}
		}

		if (command._config.botPerms.length) {
			let xPermissions = [];
			for (const perm of command._config.botPerms) {
				if (!validPermissions.includes(perm)) {
					return console.log('[PERMS]'.grey, `Invalid perm ${xPermissions}`);
				} else {
					if (!message.guild.me.permissions.has(perm)) {
						xPermissions.push(permslang[perm]);
					}
				}
			}
			if (xPermissions.length) {
				return message.reply({
					content: client._lang.__mf(
						{
							phrase: 'events.message.bot',
							locale: lang,
						},
						{
							user: client._clear(message.author.username),
							perm: xPermissions.join(', '),
							emoji: client._emotes.fail,
						}
					),
				});
			}
		}
		if (command._config.nsfw == true && !message.channel.nsfw)
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'events.message.nsfw',
						locale: lang,
					},
					{
						emoji: client._emotes.nsfw,
						user: message.author.tag,
					}
				),
			});

		if (command._config.devs == true && !client._devs.includes(message.author.id)) return;
		if (command._config.enable == false && !client._devs.includes(message.author.id))
			return message.reply({
				content: client._lang.__mf(
					{
						phrase: 'events.message.disable',
						locale: lang,
					},
					{
						emoji: client._emotes.info,
						user: message.author.tag,
					}
				),
			});
		//———————————————[SubCommands]———————————————//

		//———————————————[Cooldown]———————————————//
		const id = message.author.id + command._info.name;
		const cooldown = command._config.cooldown * 1000;
		if (!client._devs.includes(message.author.id) && client._cooldowns.has(id)) {
			return message
				.reply({
					content: client._lang.__mf(
						{
							phrase: 'events.message.cooldown',
							locale: lang,
						},
						{
							emoji: client._emotes.clock,
							user: client._clear(message.author.username),
							time: ms(client._cooldowns.get(id) - Date.now(), {
								long: true,
								language: lang,
								length: 1,
							}),
						}
					),
				})
				.then((msg) => {
					setTimeout(
						() =>
							msg.delete().catch((e) => {
								console.log(e);
							}),
						5000
					);
				});
		}
		//———————————————[Cooldown]———————————————//

		//———————————————[Sentry]———————————————//
		Sentry.init({
			dsn: 'https://56b1156e681e4123812937a3e6c00acb@o1102580.ingest.sentry.io/6128910',
			tracesSampleRate: 1.0,
		});
		const transaction = Sentry.startTransaction({
			op: 'Nino',
			name: 'Nino transaction',
		});

		//———————————————[Sentry]———————————————//

		//———————————————[Run]———————————————//
		try {
			await command.run(message, args, lang, prefix);
		} catch (err) {
			message.reply({
				embeds: [
					{
						description: `${client._emotes.fail} | Ocurrió un error:\n${client._markdown(
							'js',
							err.stack
						)}`,
						color: client._colors.Invisible,
					},
				],
			});
			client.users.cache
				.get('899339781132124220')
				.send('Nuevo error, revisa sentry.')
				.catch((e) => null);
			Sentry.captureException(err);
		} finally {
			transaction.finish();
		}
		//———————————————[Run]———————————————//

		client._cooldowns.set(id, Date.now() + cooldown);
		setTimeout(() => {
			client._cooldowns.delete(id);
		}, cooldown);
	};
};
