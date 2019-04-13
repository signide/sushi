const storage = require('../config/storage.js');
const bot = require('../bot.js');

const command = {};

command.name = 'prefix';

command.action = async (msg, args) => {
  if (!args[0]) {
    const guild = await storage.getItem(msg.channel.guild.id, {});
    if (guild.prefix.length === 1) {
      return msg.channel.createMessage(`The prefix is set to \`${guild.prefix}\``);
    }
    return msg.channel.createMessage(`Prefixes are set to \`${guild.prefix}\``);
  }
  bot.registerGuildPrefix(msg.channel.guild.id, args);
  await storage.editItem(msg.channel.guild.id, (guildConfig) => {
    const guild = guildConfig;
    guild.prefix = args;
    return guild;
  }, {});
  return msg.channel.createMessage(`The guild prefix is now set to \`${args.join(' ')}\`.`);
};

command.options = {
  description: 'Sets the guild prefix',
  errorMessage: 'Something went wrong with that command.',
  fullDescription: 'Say ;prefix [prefix] to set the guild prefix. ',
  invalidUsageMessage: `Say ;prefix [prefix] to set the guild prefix.
  This can be a single prefix or a space-separated list of prefixes.`,
  requirements: {
    permissions: { administrator: true },
  },
};

module.exports = command;
