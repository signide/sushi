const command = {};

command.name = 'kiss';

command.action = (msg, args) => {
  if (!args[0]) {
    return msg.channel.createMessage(`${msg.author.mention} just kissed themselves?`);
  }
  return msg.channel.createMessage(`${msg.author.mention} just kissed ${args[0]}~! `);
};

command.options = {
  aliases: ['kissu'],
  cooldown: 1000,
  description: '@ someone to kiss them!',
  usage: 'kiss @sushi',
};

module.exports = command;
