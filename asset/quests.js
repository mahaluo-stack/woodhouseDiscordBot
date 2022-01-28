//edit quests add or remove from welcome message

const quests = [
    RETRO_ACCESS = {
        ['key']: 'retroaccess',
        ['name']: 'lord retro access',
        ['level']: '50+',
        ['blockers']: 0,
        ['healers']: 0,
        ['free']: 8,
    },
    BLOOD_BROTHERS = { 
        ['key']: 'bloodbrothers',
        ['name']: 'blood brothers',
        ['level']: '40+',
        ['blockers']: 0,
        ['healers']: 0,
        ['free']: 4,
    },
    CHILDREN = { 
        ['key']: 'children',
        ['name']: 'children of the revolution',
        ['level']: '50+',
        ['blockers']: 0,
        ['healers']: 0,
        ['free']: 4,
    },
    DARK_TRAILS = { 
        ['key']: 'darktrails',
        ['name']: 'dark trails',
        ['level']: '100+',
        ['blockers']: 1,
        ['healers']: 1,
        ['free']: 3,
    },
    DEMON_HELMET = { 
        ['key']: 'demonhelmet',
        ['name']: 'demon helmet',
        ['level']: '100+',
        ['blockers']: 1,
        ['healers']: 1,
        ['free']: 6,
    },
    ELEMENTAL_SPHERES = { 
        ['key']: 'elementalspheres',
        ['name']: 'elemental spheres',
        ['level']: '80+',
        ['blockers']: 0,
        ['healers']: 0,
        ['free']: 4,
    },
    KILMARESH = { 
        ['key']: 'kilmaresh',
        ['name']: 'kilmaresh',
        ['level']: '200+',
        ['blockers']: 1,
        ['healers']: 2,
        ['free']: 6,
    },
    OPTICORDING = {
        ['key']: 'opticording',
        ['name']: 'opticording sphere',
        ['level']: '100+',
        ['blockers']: 0,
        ['healers']: 0,
        ['free']: 5,
    },
    ORDER_OF_LION = {
        ['key']: 'lionorder',
        ['name']: 'the order of the lion',
        ['level']: '250+',
        ['blockers']: 0,
        ['healers']: 0,
        ['free']: 5,
    },
    POI = {
        ['key']: 'poi',
        ['name']: 'the pits of inferno',
        ['level']: '80+',
        ['blockers']: 1,
        ['healers']: 1,
        ['free']: 6,
    },
    INQ = {
        ['key']: 'inq',
        ['name']: 'the inquisition',
        ['level']: '100+',
        ['blockers']: 1,
        ['healers']: 1,
        ['free']: 6,
    },
    WOTE = {
        ['key']: 'wote',
        ['name']: 'the wrath of the emperor',
        ['level']: '80+',
        ['blockers']: 1,
        ['healers']: 1,
        ['free']: 3,
    },
    JOURNEY = {
        ['key']: 'journey',
        ['name']: 'a pirates tail: the journey',
        ['level']: '100+',
        ['blockers']: 0,
        ['healers']: 0,
        ['free']: 5,
    },
    SUPPLIES = {
        ['key']: 'supplies',
        ['name']: 'a pirates tail: supply mission',
        ['level']: '100+',
        ['blockers']: 0,
        ['healers']: 0,
        ['free']: 5,
    },
]

module.exports = {
    getFormat: function() {

        let res = '';
    
        quests.forEach((quest) => {
            res = res + quest.name + ': ' + '**' + quest.key + '**\n';
        });
        
        return res;
    },
    getArray: function() {
        return quests;
    }
}
