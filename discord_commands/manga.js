/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
const kitsu = require('../common/kitsu_search.js');
const pagination = require('../common/pagination.js');
const generateKitsuEmbed = require('../common/kitsu_embed_generator.js');
const bot = require('../bot.js');

async function generateEmbeds(msg, args) {
  const response = await kitsu('manga', args.join(' '));

  if (!response.body.data[0]) {
    return 'Manga not found~';
  }

  const embeds = response.body.data.map((manga, index, data) => (
    generateKitsuEmbed('Manga', manga, msg, (index + 1), data.length, bot)
  ));

  return embeds;
}

const command = {};

command.name = 'manga';

command.action = async (msg, args) => {
  const mangaEmbeds = await generateEmbeds(msg, args);
  const data = pagination.saveData(
    msg.id,
    mangaEmbeds,
    msg.author.id,
    command.options.reactionButtonTimeout,
  );
  return msg.channel.createMessage(data[0]);
};

command.options = {
  aliases: ['m', 'mango'],
  cooldown: 3000,
  description: 'Search for an manga on Kitsu.io!',
  reactionButtonTimeout: 120000,
  usage: 'manga yuru yuri',
};

module.exports = pagination.addReactionButtons(command);