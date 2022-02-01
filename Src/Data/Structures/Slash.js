/**
 * @typedef {Object} slashOptions
 */

/**
 * @param {import('discord.js').ApplicationCommandData} ApplicationCommandData
 * @param {slashOptions} [options]
 */

class NinoSlash {
	constructor(
		client,
		{
			name = null,
			description = null,
			options = [],
			type = null,
			required = false,
			category = null,
			botPerms = [],
			userPerms = [],
			nsfw = false,
			vote = false,
			devs = false,
			enable = true,
		}
	) {
		this.client = client;
		this._info = {
			name,
			description,
			options,
			type,
			required,
			category,
		};
		this._config = {
			userPerms,
			botPerms,
			nsfw,
			vote,
			devs,
			enable,
		};
	}
}
module.exports = NinoSlash;
