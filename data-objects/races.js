const subraces = require('./subraces')
const dragonbreath = require('./dragonbreath')
const skills = require('./skills')
const languages = require('./languages')

const races = {
     Dwarf : {
          raceType:'Dwarf',
          desc:"They're short in stature, but <i>big</i> in personality. They're the curmudgeons of the DND universe",
          names: [['Adrik', 'Kildrak', 'Vondal'],['Amber', 'Vistra', 'Mardred']],
          stats: {
              CON: 2},
          speed: 25,
          subrace: subraces.Dwarf,
          profs:{
            weapons:['battleaxe','handaxe', 'throwing hammer', 'warhammer'],
            other: ["smith's tools", "brewer's supplies", "mason's tools"]},
          features: ['Darkvision'],
          languages: ['Common', 'Dwarvish'],
          choices: {subrace: [1, subraces.Dwarf]},
          reverse:"Bold and hardy, dwarves are skilled warriors, miners and workers. They can live to e more than 400 years old and are known to hold a grudge."
      },
    Elf : {
        raceType: 'Elf',
        desc:"They're fanciful and elegant, but tend to be a little stuck up.",
        name: [['Adran', 'Heian', 'Thamior'],['Adrie', 'Lia', 'Nailo']],
        speed: 30,
        subrace: subraces.Elf,
        stats:{
          DEX: 2},
        savingThrows:[],
        skills: [],
        profs: [],
        features: ['Darkvision:60ft', 'Advg on saving throws from being charmed', "Magic, can't induce sleep"],
        HP: 0,
        spells:[],
        languages: ['Common', 'Elvish'],
        choices: {subrace: [1, subraces.Elf]},
        reverse: "Elves are a little more slender than humans. They're hauntingly beautiful and can live to be 700 years old. They're often thouht to be aloof or detatched"
      },
    Halfling : {
        raceType: 'Halfling',
        desc:'About half the size of a person, Halflings are chill and down to earth',
        name: [['Alton', 'Milo', 'Wellby'],['Andry', 'Lidda', 'Verna']],
        speed: 25,
        subrace: subraces.Halfling,
        stats:{
          DEX: 2},
        savingThrows:[],
        skills: [],
        features: ['Can reroll if roll a 1', 'Advantage on saving throws against being frightened', 'Can move through creature larger than your size'],
        HP: 0,
        spells:[],
        languages: ['Common', 'Halfling'],
        choices: {subrace: [1, subraces.Halfling]},
        reverse: "Halflings have kind hearts and are content to spend their days with good friends and good meals. They usually live around 150 years, spending their days in small communities"
    } ,
    Human : {
            raceType: 'Human',
            desc:'The tryhards of the DND world, Humans are much more adaptive and ambitious than other groups.',
            name: [['Bardeid', 'Randal', 'Chen'],['Zasheir', 'Kerri', 'Lei']],
            speed: 30,
            stats:{
              STR: 1,
              DEX: 1,
              CON: 1,
              INT: 1,
              WIS: 1,
              CHA: 1},
            savingThrows:[],
            skills: [],
            features: [],
            HP: 0,
            spells:[],
            languages: ['Common'],
            choices: {languages: [1, languages]},
            reverse: "Humans are a diverse bunch and their communities are usually welcoming of other races. Because of their short lives, other races often see them as living hectic and bustling lives"
    },   
    Dragonborn : {
        raceType: 'Dragonborn',
        desc:'Basically a dragon that stands on two feet, Dragonborn are proud and clanish',
        name: [['Arjhan', 'Balsar', 'Torinn'],['Akra', 'Kava', 'Uadjit']],
        speed: 30,
        stats:{
          STR: 2,
          CHA: 1},
        savingThrows:[],
        skills: [],
        features: [],
        HP: 0,
        weapons:[],
        spells:[],
        languages: ['Common', 'Draconic'],
        choices: {weapons: [1, dragonbreath]},
        reverse: "Dragonborn are expert crafters and they are generally driven to be the best they possibly can be. They are undyingly devoted to their clan, topping out at well over 6 feet, weighing nearly 250 pounds, and living to about 80 years old."
        
    },
     Gnome : {
        raceType: 'Gnome',
        desc:"They're tiny, eccentric tinkerers. Gnomes spend their time indulging their curiosity",
        name: [['Alston', 'Fonkin', 'Wrenn'],['Ella', 'Shamil', 'Orla']],
        speed: 25,
        subrace: subraces.Gnome,
        stats:{
          INT: 2},
        savingThrows:[],
        skills: [],
        features: ['Darkvision:60ft'],
        HP: 0,
        spells:[],
        languages: ['Common', 'Gnomish'],
        choices: {subrace: [1, subraces.Gnome]},
        reverse: "Gnomes are equally devoted to the pleasures of life and studious endeavors. They live to be about 350 to 500 yeas old and spend much of that exploring and learning."
    },
    "Half Elf" : {
        raceType: 'Half Elf',
        desc:'Half human and half elf, they resemble a mix of both, but fit in with neither.',
        dndClass: {},
        name: [['Bardeid', 'Randal', 'Chen'],['Adrie', 'Lia', 'Nailo']],
        speed: 30,
        stats:{
          CHA: 2},
        savingThrows:[],
        skills: [],
        features: ['Darkvision:60ft'],
        HP: 0,
        spells:[],
        languages: ['Common'],
        choices: {
            languages: [1, languages],
            skills: [2, skills],
            stats: [2, {CON: 1, DEX: 1, STR: 1, INT: 1, WIS: 1}]
        },
        reverse:"Half Elves often feel like they have no home of their own. They live to be about 180 years old, dying much sooner than their Elf parent, but much later than their human parent."
    },
    "Half Orc" : {
        raceType: 'Half Orc',
        desc:'Half Human and half Orc, they are often treated with prejudice and assumed to be violent brawlers',
        dndClass: {},
        name: [['Dench', 'Holg', 'Thokk'],['Baggi', 'Ovak', 'Yevelda']],
        speed: 30,
        stats:{
          STR: 2,
          CON: 1},
        savingThrows:[],
        skills: [],
        features: ['Darkvision:60ft', 'When reduced to 0HP, but not killed, you candrop to 1HP', 'When you get a cricial hit w/ a melee weapon, you can roll one damage dice again'],
        HP: 0,
        spells:[],
        languages: ['Common', 'Orc'],
        reverse: "Standing 6 to 7 feet tall and weighing over 200 pounds, Half Orcs are intimidating. They are often scarred and prone to violent and emotional outbursts due to their Orc parents."
    },
     Tiefling : {
        raceType: 'Tiefling',
        desc:'A cross between a person and a demon, Tieflings are met with distrust and are suspicious of others',
        dndClass: {},
        name: [['Akmenos', 'Ekemon', 'Skamos'],['Akta', 'Kallista', 'Rieta']],
        speed: 30,
        stats:{
          INT: 1,
          CHA: 2},
        savingThrows:[],
        skills: [],
        features: ['Darkvision:60ft', 'Resistant to fire damage'],
        HP: 0,
        spells:['Thaumaturgy'],
        languages: ['Common', 'Infernal'],
        reverse: "Tieflings are often the victims of prejudice. Their horns, tails, and fangs are fearsome, but they are not evil by nature. They generally live as long as Humans"
    }
    }
 
module.exports = races