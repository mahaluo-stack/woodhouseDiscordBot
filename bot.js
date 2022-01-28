const dotenv = require('dotenv');
dotenv.config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const botUtil = require('./component/botUtil');
const messageHandler = require('./component/messageHandler');

client.destroy();
client.login(process.env.TOKEN);

client.on('guildCreate', (guild) => {
    console.log(`woodhouse joined a new guild: ${guild.name}`);
    console.log('woodhouse: i shall fetch a rug');
    botUtil.createChannels(guild)
        .catch((error) => botUtil.error(guild.id, error))
        .then(() => {
            console.log('woodhouse: all channels are up, sir');
        })
});

client.on('ready', () => {
    console.log(`${client.user.tag} has entered the building`);
    console.log('woodhouse: i would like some new clothes');
});

client.on('messageCreate', (message) => {
    if (message.author.bot) {
        return;
    }
    else {
        switch (message.channel.name) {
            case 'woodhouses-rules':
                message.delete();
                break;
            case 'woodhouses-bosses':
            case 'woodhouses-quests':
                messageHandler.format(message)
                    .then((res) => {
                        if (res) {
                            message.channel.send({ embeds: [res] });

                            botUtil.writeToSession({
                                guild: message.guild.id,
                                res,
                            })
                            .then(() => {
                                console.log('added to session');
                            })
                            .catch((error) => { botUtil.error(message.guild.id, error) });
                        }
                    })
                    .catch((error) => { botUtil.error(message.guild.id, error) })
                    .finally(() => {
                        message.delete();
                    });
                break;
            default:
                return;
        }
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    switch (reaction.message.channel.name) {
        case 'woodhouses-rules':
            reaction.users.remove(user.id);
            break;
        case 'woodhouses-bosses':
        case 'woodhouses-quests':
            messageHandler.handleReaction(reaction, user, true)
                .catch((error) => {
                    reaction.users.remove(user.id);
                    botUtil.error(reaction.message.channel.id, error);
                })
                .then((res) => {
                    if (!res) {
                        reaction.users.remove(user.id);
                    }
                    else {
                        reaction.message.edit({ embeds: [res] });
                    }
                })
            break;
        default:
            return;
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    switch (reaction.message.channel.name) {
        case 'woodhouses-rules':
            reaction.users.remove(user.id);
            break;
        case 'woodhouses-bosses':
        case 'woodhouses-quests':
            messageHandler.handleReaction(reaction, user, false)
                .catch((error) => {
                    botUtil.error(reaction.message.channel.id, error);
                })
                .then((res) => {
                    reaction.message.edit({ embeds: [res] });
                })
                .finally(() => {
                    reaction.users.remove(user.id);
                })
            break;
        default:
            return;
    }
});
