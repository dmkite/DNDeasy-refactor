const skills = require('./skills')
const spells= require('./spells')
const { createDNDCharacter, userProgress } = require('../main')

const classes = {
  Barbarian : {
      classType: 'Barbarian',
      hitDie: 12,
      savingThrows: ['STR', 'CON'],
      profs:{
          armor:['light armor','medium armor','shields'],
          weapons:['simple weapons', 'martial weapons']
      },
      armorType:[],
      choices: {skills: [2, {'Animal Handling':'', Athletics:'', Intimidation:'', Nature:'', Perception:'',Survival:''}]},
      equipment:['Great Axe', '2 Hand Axes', "explorer's pack",  '4 Javelins'],
      features:['Unarmored Defense'],
      desc: '',
      reverse: '',
      img: ''
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
        desc: '',
        reverse: '',
        img: '',
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
        choices: { skills: [2, {History:'', Insight:'', Medicine:'', Persuasion:'', Religion:''}], cantrips: [3, spells], spells: [2, spells] },
        equipment: ['Mace', "priest's pack", "light crossbow", 'shield', 'holy symbol'],
        features: [''],
        desc: '',
        reverse: '',
        img: '',
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
        choices: { skills: [2, { Arcana: '', 'Animal Handling': '', Insight: '', Medicine: '', Perception: '', Religion: '', Survival: '' }], cantrips: [2, spells] },
        equipment: ['Wooden Shield', 'Scimitar', "explorer's pack", 'druidic focus'],
        features: ['You can speak Druidic, the language of the druids'],
        desc: '',
        reverse: '',
        img: '',
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
        choices: { skills: [2, { Acrobatics: '', 'Animal Handling': '', Athletics: '', Insight: '', Intimidation: '', Perception: '', Survival: '' }], 'Fighting Style': [1, {Archery:'', Defense:'', Dueling:'',"Great Weapon Fighing":'', Protection:'', "Two Weapon Fighting":''}] },
        equipment: ['longbow', 'longsword', 'shield', 'light crossbow', "dungeoneer's pack"],
        features: ['Second Wind'],
        desc: '',
        reverse: '',
        img: ''
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
        choices: { skills: [2, { Acrobatics: '', Athletics: '', History:'', Insight: '', Religion: '', Stealth: ''}] },
        equipment: ['shortsword', "dungeoneer's pack", '10 darts', "artisan's tools"],
        features: ['Unarmored Defense'],
        desc: '',
        reverse: '',
        img: ''
    },
    Paladin: {
        classType: 'Paladin',
        hitDie: 10,
        savingThrows: ['WIS', 'CHA'],
        profs: {
            armor: ['all armor', 'shields'],
            weapons: ['simple weapons', 'martial weapons']
        },
        armorType: ['chain mail'],
        choices: { skills: [2, { Athletics: '', Insight: '', Intimidation:'', Medicine:'',Persuasion:'', Religion: ''}] },
        equipment: ['longsword','5 Javelins', "priest's pack", 'holy symbol'],
        features: ['Devine Sense', 'Lay on Hands'],
        desc: '',
        reverse: '',
        img: '',
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
        choices: { skills: [3, { "Animal Handling": '', Athletics: '', Insight: '', Investigation: '', Nature: '', Perception: '', Stealth: '', Survival: '' }], "Natural Explorer": [1, ['Arctic', 'Coast', 'Desert', 'Forest', 'Grassland', 'Mountain', 'Swamp']], "Favored Enemy":[1,['Aberrations', 'Beasts', 'Celestials', 'Constructs', 'Dragons', 'Elementals', 'Fey', 'Fiends', 'Giants', 'Monstrosities', 'Oozes', 'Plants', 'Undead']] },
        equipment: ['2 shortswords', "dungeoneer's pack", 'longbow'],
        features: ['Favored Enemy', 'Natural Explorer'],
        desc: '',
        reverse: '',
        img: ''
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
        choices: { skills: [4, { Acrobatics: '', Athletics: '', Deception:'', Insight: '', Intimidation: '', Investigation: '', Perception: '', Persuasion:'', 'Sleight of Hand': '', Stealth: '', Survival: '' }]/*, Expertise: [1, userProgress[10]or whichever choosing class skills is]*/ },
        equipment: ['2 shortswords', "dungeoneer's pack", 'longbow'],
        features: ['Expertise', 'Sneak Attack', "Theives' Cant"],
        desc: '',
        reverse: '',
        img: '',
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
        choices: { skills: [2, { Arcana: '', Deception: '', Insight: '', Intimidation: '', Persuasion: '', Religion: '' }], cantrips: [4, spells], spells: [2, spells], "Sorcerous Origins": [1, ['Draconic Bloodline', 'Wild Magic']] },
        equipment: ['light crossbow', 'arcane focus', "dungeongeer's Pack", '2 daggers'],
        features: ['Sorcerous Origins'],
        desc: '',
        reverse: '',
        img: '',
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
        choices: { skills: [2, { Arcana: '', Deception: '', History: '', Intimidation: '', Investigation: '', Nature: '', Religion: '' }], cantrips: [2, spells], spells: [2, spells], "Otherworldly Patrons": [1, ['The Archfey', 'The Fiend', 'The Great Old One']] },
        equipment: ['light crossbow', 'arcane focus', "dungeongeer's Pack", '2 daggers'],
        features: ['Otherworldly Patrons'],
        desc: '',
        reverse: '',
        img: '',
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
        choices: { skills: [2, { Arcana: '', History: '', Insight: '', Investigation: '', Medicine: '', Religion: '' }], cantrips: [3, spells], spells: [2, spells]},
        equipment: ['quarterstaff', 'arcane focus', "scholar's Pack", 'spellbook'],
        features: ['Otherworldly Patrons'],
        desc: '',
        reverse: '',
        img: '',
        'spellcasting ability': 'INT'
    },
}

module.exports = classes