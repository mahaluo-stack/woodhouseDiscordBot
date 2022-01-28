const embeds = require('./embeds');
const fs = require('fs');

const process = require('process');
const path = require("path");
const filePath = path.resolve(__dirname, '../session.json')
const es = require('event-stream');

module.exports = {
    createChannels: async function (guild) {
        let category;

        guild.channels.create('WOODHOUSE', {
            type: 'GUILD_CATEGORY',
            permissionsOverwrites: [{
                deny: [
                    'MANAGE_MESSAGES',
                    'MANAGE_CHANNELS',
                ],
                allow: [
                    'SEND_MESSAGES',
                    'ADD_REACTIONS',
                    'MANAGE_MESSAGES'
                ]
            }]
        }).catch((error) => { this.error(guild.id, error) })
            .then((res) => {
                guild.channels.create('how-to-woodhouse', {
                    type: 'text',
                    position: 1,
                    permissionsOverwrites: [{
                        id: guild.id,
                        deny: [
                            'SEND_MESSAGES',
                            'ADD_REACTIONS',
                            'MANAGE_MESSAGES'
                        ]
                    }],
                    parent: res.id
                }).catch((error) => { this.error(guild.id, error) })
                    .then((res) => {
                        res.send({ embeds: [embeds.howTo()] });
                    });

                guild.channels.create('woodhouses-bosses', {
                    type: 'text',
                    position: 2,
                    permissionsOverwrites: [{
                        id: guild.id,
                        allow: [
                            'SEND_MESSAGES',
                            'ADD_REACTIONS',
                            'MANAGE_MESSAGES'
                        ]
                    }],
                    parent: res.id
                }).catch((error) => { this.error(guild.id, error) })
                    .then((res) => {
                        res.send({ embeds: [embeds.bosses()] });
                    });

                guild.channels.create('woodhouses-quests', {
                    type: 'text',
                    position: 3,
                    permissionsOverwrites: [{
                        id: guild.id,
                        allow: [
                            'SEND_MESSAGES',
                            'ADD_REACTIONS',
                            'MANAGE_MESSAGES'
                        ]
                    }],
                    parent: res.id
                }).catch((error) => { this.error(guild.id, error) })
                    .then((res) => {
                        res.send({ embeds: [embeds.quests()] });
                    });
            });
    },
    cleanChannel: async function (channel) {
        (async () => {
            let deleted;
            do {
                deleted = await channel.bulkDelete(100);
            } while (deleted.size != 0);
        })();
    },
    writeToSession: async function (sessionItem) {

        let string = JSON.stringify(sessionItem);

        if (fs.existsSync(filePath)) {

            this.readFromSession()
            .then((res) => {
                console.log('read res:',res);
                string = string + ',\n' + JSON.stringify(res);
            })
            .catch((error) => {
                this.error('read file failed', error);
            })
        }

        fs.writeFileSync(filePath, string);
    },
    removeFromSession: async function () {

    },
    readFromSession: async function () {
        try {
            let dataRead = fs.readFile(filePath, (error) => {
                if (error) {
                    throw error;
                }
            })

            return dataRead;
        } catch (error) {
            throw error;
        }
    },
    error: function (id, error) {
        let errorMsg = 'error performing action on id: ' + id + '';
        console.log(errorMsg);
        console.log(error);
    }
}