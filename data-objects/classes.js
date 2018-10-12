const skills = require('./skills')
// const spells= require('./spells') just trying this 
// const spells = require('./../spellList')
const spells = require('./../test')
const { createDNDCharacter, userProgress } = require('../main')

const { Acrobatics, 'Animal Handling': animalHandling, Arcana, Athletics, Deception, History, Insight, Intimidation, Investigation, Medicine, Nature, Perception, Performance, Persuasion, Religion, 'Sleight of Hand': sleightOfHand, Stealth, Survival } = skills
const classes = {
  Barbarian : {
      classType: 'Barbarian',
      hitDie: 12,
      savingThrows: ['STR', 'CON'],
      profs:{
          armor:['light armor','medium armor','shields'],
          weapons:['simple weapons', 'martial weapons']
      },
      armorType:[''],
      choices: {skills: [2, {animalHandling, Athletics, Intimidation, Nature, Perception, Survival}]},
      equipment:['Great Axe', '2 Hand Axes', "explorer's pack",  '4 Javelins'],
      features:['Unarmored Defense'],
      desc: 'The Animanlistic Fighter',
      reverse: 'high hit points, pick 2 skills, unarmored defense',
      img: 'img/barbarian.jpg'
  },
    Bard: {
        classType: 'Bard',
        hitDie:8,
        savingThrows: ['DEX', 'CHA'],
        profs: {
            armor: ['light armor'],
            weapons: ['simple weapons', 'Hand crossbows', 'longswords', 'rapiers', 'shortswords']
        },
        armorType: ['leather'],
        choices:  { skills: [3, skills], cantrips: [2, spells], spells:[4, spells] }, 
        equipment: ['Rapier', "diplomat's pack", "lute", 'dagger'],
        features: ['Bardic Inspiration'],
        desc: 'The Ultimate Cheerleader',
        reverse: '',
        img: 'img/bard.jpg',
        'spellcasting ability': 'CHA'
    },
    Cleric: {
        classType: 'Cleric',
        hitDie: 8,
        savingThrows: ['WIS', 'CHA'],
        profs: {
            armor: ['light armor', 'medium armor', 'shields'],
            weapons: ['all simple weapons']
        },
        armorType: ['scale'],
        choices: { skills: [2, {History, Insight, Medicine, Persuasion, Religion}], cantrips: [3, spells], spells: [2, spells] },
        equipment: ['Mace', "priest's pack", "light crossbow", 'shield', 'holy symbol'],
        features: [''],
        desc: "The Worshipper",
        reverse: 'blah blah',
        img: 'img/cleric.jpg',
        'spellcasting ability': 'WIS'
    },
    Druid: {
        classType: 'Druid',
        hitDie: 8,
        savingThrows: ['INT', 'WIS'],
        profs: {
            armor: ['light armor', 'medium armor', 'shields'],
            weapons: ['clubs', 'daggers','darts', 'javelins', 'maces', 'quarterstaffs', 'scimitars', 'sickles', 'slings', 'spears']
        },
        armorType: ['leather'],
        choices: { skills: [2, { Arcana, animalHandling, Insight, Medicine, Perception, Religion, Survival }], cantrips: [2, spells] },
        equipment: ['Wooden Shield', 'Scimitar', "explorer's pack", 'druidic focus'],
        features: ['You can speak Druidic, the language of the druids'],
        desc: 'The Nature Witch',
        reverse: '',
        img: 'img/druid.jpg',
        'spellcasting ability': 'WIS'
    },
    Fighter: {
        classType: 'Fighter',
        hitDie: 10,
        savingThrows: ['STR', 'CON'],
        profs: {
            armor: ['all armor', 'shields'],
            weapons: ['simple weapons', 'martial weapons']
        },
        armorType: ['scale'],
        choices: { skills: [2, { Acrobatics, animalHandling, Athletics, Insight, Intimidation, Perception, Survival }], 'Fighting Style': [1, {Archery:'', Defense:'', Dueling:'',"Great Weapon Fighing":'', Protection:'', "Two Weapon Fighting":''}, '<h2>Fight me!</h2><p>You get to choose how you fight on the battle field. Are you defenseive? Ranged? A one-on-one fighter?</p>'] },
        equipment: ['longbow', 'longsword', 'shield', 'light crossbow', "dungeoneer's pack"],
        features: ['Second Wind'],
        desc: 'The Seasoned Soldier',
        reverse: '',
        img: 'img/fighter.jpg'
    },
    Monk: {
        classType: 'Monk',
        hitDie: 8,
        savingThrows: ['STR', 'DEX'],
        profs: {
            armor: [],
            weapons: ['simple weapons', 'short swords']
        },
        armorType: [''],
        choices: { skills: [2, { Acrobatics, Athletics, History, Insight, Religion, Stealth}] },
        equipment: ['shortsword', "dungeoneer's pack", '10 darts', "artisan's tools"],
        features: ['Unarmored Defense'],
        desc: 'The Martial Artist',
        reverse: '',
        img: 'img/monk.jpg'
    },
    Paladin: {
        classType: 'Paladin',
        hitDie: 10,
        savingThrows: ['WIS', 'CHA'],
        profs: {
            armor: ['all armor', 'shields'],
            weapons: ['simple weapons', 'martial weapons']
        },
        armorType: ['chain'],
        choices: { skills: [2, { Athletics, Insight, Intimidation, Medicine, Persuasion, Religion }] },
        equipment: ['longsword','5 Javelins', "priest's pack", 'holy symbol'],
        features: ['Devine Sense', 'Lay on Hands'],
        desc: 'The Holy Warrior',
        reverse: '',
        img: 'img/paladin.jpg',
        'spellcasting ability': 'CHA'
    },
    Ranger: {
        classType: 'Ranger',
        hitDie: 10,
        savingThrows: ['STR', 'DEX'],
        profs: {
            armor: ['light armor', 'medium armor', 'shields'],
            weapons: ['simple weapons', 'martial weapons']
        },
        armorType: ['scale'],
        choices: { skills: [3, { animalHandling, Athletics, Insight, Investigation, Nature, Perception, Stealth, Survival }], "Natural Explorer": [1, {Arctic: 'snow capped mountains and frigid wastelands', Coast: 'Sandy beaches and lowlands', Desert: "Little water, lots of sand", Forest: 'Wooded, shady areas', Grassland: 'Plains and flatlands with little topography', Mountain: 'Rocky cliffs, high elevations', Swamp: 'Muddy quagmires ripe with wildlife'}, '<h2>Favored Terrain</h2><p>As a Ranger you spend a lot of time outside. In your favored terrain you can move quickly and quietly. You also can recall information about it and cannot become lost within it</p>'], "Favored Enemy":[1,{Aberrations: 'Ghosts and ghouls', Beasts: 'Monstrous wildlife', Celestials: 'Angels from the heavens', Constructs: 'Golems and magical robots', Dragons: 'You know what a dragon is', Elementals: 'element-based monsters', Fey:'I dont know what this is', Fiends: 'Vicious cretins', Giants: 'Big things that want to smash you', Monstrosities: 'Unnatural beasts', Oozes: 'gelatinous monsters', Plants: 'J0ust plants... you fight ferns', Undead: 'ZOMBIES!'}, "<h2>Favored Enemy</h2><p>As a Ranger you spend a lot of time outdoors, fighting beasts. Pick the type of beast you've fought the most.</p>"] },
        equipment: ['2 shortswords', "dungeoneer's pack", 'longbow'],
        features: ['Favored Enemy', 'Natural Explorer'],
        desc: 'The Fighter on the Outskirts',
        reverse: 'More!',
        img: 'img/ranger.jpg'
    },
    Rogue: {
        classType: 'Rogue',
        hitDie: 8,
        savingThrows: ['INT', 'DEX'],
        profs: {
            armor: ['light armor'],
            weapons: ['simple weapons', 'hand crossbows', 'longswords', 'rapiers', 'shortswords'],
            tools:["Theive's Tools"]
        },
        armorType: ['scale'],
        choices: { skills: [4, { Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Persuasion, sleightOfHand, Stealth, Survival }]/*, Expertise: [1, userProgress[10]or whichever choosing class skills is]*/ },
        equipment: ['2 shortswords', "dungeoneer's pack", 'longbow'],
        features: ['Expertise', 'Sneak Attack', "Theives' Cant"],
        desc: 'The Dastardly Infiltrator',
        reverse: '',
        img: 'img/rogue.jpg',
        'spellcasting ability': 'INT'
    },
    Sorcerer: {
        classType: 'Sorcerer',
        hitDie: 6,
        savingThrows: ['CON', 'CHA'],
        profs: {
            armor: [''],
            weapons: ['daggers','darts','slings','quarterstaffs', 'light crossbows'],
        },
        armorType: ['scale'],
        choices: { skills: [2, { Arcana, Deception, Insight, Intimidation, Persuasion, Religion }], cantrips: [4, spells], spells: [2, spells], "Sorcerous Origins": [1, {'Draconic Bloodline': 'Your dad is a dragon', 'Wild Magic':''}, "<h2>Your Sorcerous Origins</h2><p>You have been magical your entire life pick why:</p>"] },
        equipment: ['light crossbow', 'arcane focus', "dungeongeer's Pack", '2 daggers'],
        features: ['Sorcerous Origins'],
        desc: 'The Spellcaster By Birth',
        reverse: '',
        img: 'img/darkElf.jpg',
        'spellcasting ability': 'CHA'
    },
    Warlock: {
        classType: 'Warlock',
        hitDie: 8,
        savingThrows: ['WIS', 'CHA'],
        profs: {
            armor: ['light armor'],
            weapons: ['simple weapons'],
        },
        armorType: ['leather'],
        choices: { skills: [2, { Arcana, Deception, History, Intimidation, Investigation, Nature, Religion }], cantrips: [2, spells], spells: [2, spells], "Otherworldly Patrons": [1, {'The Archfey': "y'know... it's a fey", 'The Fiend': 'llll', 'The Great Old One':'your grandma basically'}, "<h2>Title</h2><p>desc</p>"] },
        equipment: ['light crossbow', 'arcane focus', "dungeongeer's Pack", '2 daggers'],
        features: ['Otherworldly Patrons'],
        desc: 'The Spellcaster By Devilish Dealings',
        reverse: '',
        img: 'img/warlock.jpg',
        'spellcasting ability':'CHA'
    },
    Wizard: {
        classType: 'Wizard',
        hitDie: 6,
        savingThrows: ['INT', 'WIS'],
        profs: {
            armor: [''],
            weapons: ['daggers', 'darts', 'slings', 'quarterstaffs', 'light crossbows'],
        },
        armorType: [''],
        choices: { skills: [2, { Arcana, History, Insight, Investigation, Medicine, Religion }], cantrips: [3, spells], spells: [2, spells]},
        equipment: ['quarterstaff', 'arcane focus', "scholar's Pack", 'spellbook'],
        features: [],
        desc: "The Spellcaster By Studying",
        reverse: '',
        img: 'img/wizard.jpg',
        'spellcasting ability': 'INT'
    },
}

module.exports = classes