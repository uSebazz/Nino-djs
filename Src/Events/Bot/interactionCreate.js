const events = require('../../Data/Structures/Events');
const Client = new (require('../../Data/Structures/ClientInit'))();
const { Interaction } = require('discord.js');

module.exports = class event extends events {
	constructor(...args) {
		super(...args);
	}
	/**
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	run = async (client, interaction) => {
		if (interaction.isCommand()) {
			await interaction.deferReply({ ephemeral: true }).catch(() => {});
			const slash = client._slash.get(interaction.commandName);
			if (!slash) return;

			const args = [];
			let lang = interaction.guild.lang;

			for (let option of interaction.options.data) {
				if (option.type === 'SUB_COMMAND') {
					if (option.name) args.push(option.name);
					option.options?.forEach((x) => {
						if (x.value) args.push(x.value);
					});
				} else if (option.value) args.push(option.value);
			}

			slash.run(interaction, args, lang);
		}
	};
};
