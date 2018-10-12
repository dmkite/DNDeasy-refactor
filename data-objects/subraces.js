const languages = require('./languages')


const subraces = {
    Dwarf:{
        'Hill Dwarf' : {
            subType: 'Hill Dwarf',
            desc: "Equal parts tough and wise, Hill Dwarves get a bonus Hit Point and higher Wisdom score",
            stats:{
                WIS: 1},
            HP:1,
            img: 'img/hillDwarf.jpg',
            reverse: '+1 WIS, +1HP'
        },
        
        'Mountain Dwarf' : {
            subType:'Mountain Dwarf',
            desc: "Taller than average, Mountain Dwarves have a considerably higher Strength score",
            stats:{
                STR: 2
            },
            profs: {
            armor:['light armor', 'medium armor']
            },
            reverse: "+2 STR <br> Proficient in light & medium armor",
            img: 'img/mountainDwarf.jpg'
        }
    },
    Elf:{
        'High Elf' : {
        subType: 'High Elf',
        desc: "High Elves have considerable education and knowledge of magic. They have a higher Intelligence score know an additional language and spell",
        stats: {
            INT: 1},
        profs: {
            weapons: ['longsword', 'shortsword', 'longbow', 'shortbow']},
        spells: ['+1 cantrip'],
        language:['+1 language'],
        choices: {languages: [1, languages],
                    spells: [1, 'spells'],
            },
        reverse:'+1 INT, +1 Cantrip, +1 Language',
        img: 'img/highElf.jpg'
        },
        
        'Wood Elf' : {
            subType: 'Wood Elf',
            desc: "Wood Elves have a higher Wisdom score, can move more swiftly, and can hide well in nature",
            stats: {
                WIS: 1},
            profs: {
                weapons:['longsword', 'shortsword', 'longbow', 'shortbow']},
            speed: 35,
            features: ['can attempt to hide even when lightly obscured by foliage, rain, snow, mist, or other natural phenomena'],
            reverse: '+1 WIS, 35 speed, Hide in natural phenomena',
            img: 'img/woodElf.jpg'
        },
        
        'Dark Elf' : {
            subType: 'Dark Elf',
            desc: 'Dark Elves have pitch black skin, can see exceptionally well in the dark, and know the spell <i>Dancing Lights</i>',
            stats:{
            CHA: 1},
            features: ['Darkvision:120ft', 'Disadvantage on attacks in direct sunlight'],
            spells: ['Dancing Lights'],
            profs: {
                weapons: ['rapiers', 'shortswords', 'hand crossbows']
            },
            reverse:'+Superior Darkvision, +<i>Dancing Lights</i>',
            img: 'img/darkElf.jpg'
        }
    },
    Halfling:{
        "Lightfoot Halfling" : {
            subType: 'Lightfoot Halfling',
            desc: 'These Halflings have a higher Charisma score and are naturally stealthy',
            stats:{
                CHA:1},
            features: ['Can attempt to hide behind a creature at least one size larger than you'],
            reverse: '+1 CHA, Hide behind creatures',
            img: 'img/lightfootHalfling.jpg'
        },
        
        "Stout Halfling" : {
            subType: 'Stout Halfling',
            desc: 'Stout Halflings are sturdier, having a higher Constitution score, and a resistance to poison',
            stats:{
                CON:1},
            features: ['Advantage on saving throws against poison, resistance against poison damage'],
            reverse: '+1 CON, Poison resistant',
            img: 'img/stoutHalfling.jpg'
        }
    },
    Gnome: {
        "Forest Gnome" : {
            subType:'Forest Gnome',
            desc: "Forest Gnomes have a higher Dexterity score, can communicate with small animals, and know the spell <i>Minor Illusion</i>",
            stats:{
                DEX: 1},
            features: ['You can communicate simple ideas with small beasts'],
            spells: ['Minor Illusion'],
            reverse: '+1 DEX, +<i>Minor Illusion</i>, Can Communicate with small beasts',
            img: 'img/forestGnome.jpg'
        },
        
        "Rock Gnome" : {
            subType: 'Rock Gnome',
            desc: 'Rock Gnomes are sturdier than their cousins and are proficient tinkerers',
            stats:{
                CON: 1},
            features:['When making a history cehck related to technology, magic, or alchemy, add twice your proficiency bonus'],
            profs: {
                other: ["artisan's tools"]
            },
            reverse: '+1 CON, Advantage on checks, Proficient in artisan tools',
            img: 'img/rockGnome.jpg'
        }
    }
}  


module.exports = subraces