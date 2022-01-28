const bosses = require('../asset/bosses');
const quests = require('../asset/quests');
const emojis = require('../asset/emojis');

const embeds = require('./embeds');
const botUtil = require('./botUtil');

module.exports = {
    format: async function (message) {

        try {
            return embeds.response(verifyDate(verifyKey()));
        } catch (error) {
            botUtil.error(message.guild.id, error);
        }

        function verifyKey() {
            let toLower = message.content.toLowerCase();
            if (message.channel.name == 'woodhouses-bosses') {
                return bosses.getArray().find(boss => toLower.includes(boss.key));
            }
            else if (message.channel.name == 'woodhouses-quests') {
                return quests.getArray().find(quest => toLower.includes(quest.key));
            }
        }

        function verifyDate(event) {

            let date, time;
            const split = message.content.split(' ');
            const member = message.guild.members.cache.get(message.author.id);
            const timeReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
            const today = new Date();

            split.forEach((word) => {
                let noBold = word.replace(/\*/g, '');
                let numbers = noBold.match(/\d+/g);
                if (numbers != null) {
                    if (noBold.includes('/')) date = noBold;
                    if (noBold.includes(':')) time = noBold;
                }
            });

            if (!time || !time.match(timeReg).length > 0) {
                throw 'bad time format';
            }
            else if (!date) {
                throw 'bad date format';
            }
            else {
                const splitDate = date.split('/');
                const fullDate = new Date(today.getFullYear().toString() + '-' + splitDate[1] + '-' + splitDate[0]);
                if (fullDate < today) {
                    throw 'date has expired';
                }
                else {
                    return res = {
                        host: member.displayName,
                        name: event['name'],
                        date,
                        time,
                        blockers: event['blockers'],
                        healers: event['healers'],
                        free: event['free']
                    }
                }
            }
        }
    },
    handleReaction: async function (reaction, user, add) {

        const member = reaction.message.guild.members.cache.get(user.id);
        const nickname = member.displayName;
        const event = reaction.message.embeds[0];
        const participants = reaction.message.embeds[0].description.split('\n');

        if (add) {
            try {
                if (verifyEmoji()) {
                    if (verifyUser()) {
                        return {
                            color: event['color'],
                            title: event['title'],
                            author: event['author'],
                            description: getDescription(),
                            fields: event['fields'],
                        }
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            } catch (error) {
                botUtil.error(reaction.message.guild.id, error);
            }
        }
        else {
            return {
                color: event['color'],
                title: event['title'],
                author: event['author'],
                description: getDescription(),
                fields: event['fields'],
            }
        }

        function verifyEmoji() {
            switch (reaction.emoji.name) {
                case emojis['knight']['emoji']:
                case emojis['druid']['emoji']:
                case emojis['sorcerer']['emoji']:
                case emojis['paladin']['emoji']:
                    return true;
                default:
                    botUtil.error(reaction.message.guild.id, 'bad emoji');
                    return false;
            }
        }

        function verifyUser() {

            let res = true;

            if (reaction.message.embeds[0].description.includes(nickname)) {
                botUtil.error(reaction.message.guild.id, 'multiple reacts');
                res = false;
            }
            else {
                participants.forEach((participant) => {
                    if (participant.length > 10) {
                        botUtil.error(reaction.message.guild.id, 'no free spots');
                        res = false;
                    }
                });
            }

            return res;
        }

        function getDescription() {

            let flag = false;
            let participantString = '';

            participants.forEach((participant) => {
                if (!add && participant.includes(nickname)) {
                    participantString = participantString + '\n' + participant.substring(0, (participant.indexOf(':') + 1));
                    flag = true;
                }
                else {
                    participantString = participantString + '\n' + participant;
                }
                if (participant.length < 10 && !flag) {
                    if (participant.includes('blocker') && reaction.emoji.name === emojis['knight']['emoji']) {
                        participantString = participantString + nickname + ' ' + reaction.emoji.name;
                        flag = true;
                    }
                    else if (participant.includes('healer') && reaction.emoji.name === emojis['druid']['emoji']) {
                        participantString = participantString + nickname + ' ' + reaction.emoji.name;
                        flag = true;
                    }
                    else if (participant.includes('free')) {
                        participantString = participantString + nickname + ' ' + reaction.emoji.name;
                        flag = true;
                    }
                }
            });

            return participantString;
        }
    }
}

