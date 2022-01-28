const bosses = require('../asset/bosses');
const quests = require('../asset/quests');
const emojis = require('../asset/emojis');

function randomColor() {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
}

module.exports = {
    howTo: function () {
        return {
            color: randomColor(),
            title: 'welcome',
            description:
                'how to create a list: \n' +
                'command example: **faceless 22/01 19:30** \n' +
                'note the format: keyword day/month hour:minute \n' +
                'your message needs to follow this format or woodhouse will eat it \n' +
                'timezone: europe/amsterdank \n\n' +
                'something wrong or missing from a list? \n' +
                'please use the woodhouse-request channel (not added yet) \n\n' +
                'how to join a list: \n' +
                'react with an emoji based on the role you want (see below) \n' +
                'if a blocker/healer spot is free, first to react will get its respective slot \n' +
                'they should be considered main blocker/healer \n',
            fields: [
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false
                },
                {
                    name: 'knight',
                    value: emojis['knight']['emoji'] + ' dagger',
                    inline: false
                },
                {
                    name: 'druid',
                    value: emojis['druid']['emoji'] + ' apple',
                    inline: false
                },
                {
                    name: 'paladin',
                    value: emojis['paladin']['emoji'] + ' bow',
                    inline: false
                },
                {
                    name: 'sorcerer',
                    value: emojis['sorcerer']['emoji'] + ' mage',
                    inline: false
                },
            ],
            footer: {
                url: 'visit https://github.com/mahaluo-stack/woodhouseDiscordBot'
            }
        }
    },
    bosses: function () {
        return {
            color: randomColor(),
            title: 'bosses',
            description: bosses.getFormat() +
                '\n\nto join a list: \n' +
                'react with an emoji based on the role you want (see below) \n' +
                'if a blocker/healer spot is free, first to react will get its respective slot \n' +
                'they should be considered main blocker/healer \n',
            fields: [
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false
                },
                {
                    name: 'knight',
                    value: emojis['knight']['emoji'] + ' dagger',
                    inline: false
                },
                {
                    name: 'druid',
                    value: emojis['druid']['emoji'] + ' apple',
                    inline: false
                },
                {
                    name: 'paladin',
                    value: emojis['paladin']['emoji'] + ' bow',
                    inline: false
                },
                {
                    name: 'sorcerer',
                    value: emojis['sorcerer']['emoji'] + ' mage',
                    inline: false
                },
            ]
        }
    },
    quests: function () {
        return {
            color: randomColor(),
            title: 'quests',
            description: quests.getFormat() +
                '\n\nto join a list: \n' +
                'react with an emoji based on the role you want (see below) \n' +
                'if a blocker/healer spot is free, first to react will get its respective slot \n' +
                'they should be considered main blocker/healer \n',
            fields: [
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false
                },
                {
                    name: 'knight',
                    value: emojis['knight']['emoji'] + ' dagger',
                    inline: false
                },
                {
                    name: 'druid',
                    value: emojis['druid']['emoji'] + ' apple',
                    inline: false
                },
                {
                    name: 'paladin',
                    value: emojis['paladin']['emoji'] + ' bow',
                    inline: false
                },
                {
                    name: 'sorcerer',
                    value: emojis['sorcerer']['emoji'] + ' mage',
                    inline: false
                },
            ]
        }
    },
    response: function (event) {

        let participants = '\n';
        for (let i = 0; i < event['blockers']; i++) { participants = participants + 'blocker: \n' };
        for (let i = 0; i < event['healers']; i++) { participants = participants + 'healer: \n' };
        for (let i = 0; i < event['free']; i++) { participants = participants + 'free: \n' };

        return {
            color: randomColor(),
            title: event['name'],
            author: {
                name: event['host'] + ' is doing'
            },
            description: participants,
            fields: [
                {
                    name: '\u200b',
                    value: '**' + event['date'] + '**',
                    inline: true
                },
                {
                    name: '\u200b',
                    value: '**' + event['time'] + '**',
                    inline: true
                },
            ]
        }
    },
}