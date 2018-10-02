(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const backgrounds = {
  Sailor:{
    desc: 'sailor...',
    skills: ['Animal Handling'],
    equipment: ['XYZ']
  },
  Soldier: {
    desc: 'soldier...',
    skills: ['nature'],
    equipment: ['ABC']
  },
  Urchin: {
    desc: 'urchin...',
    skills: ['perception'],
    equipment: ['DEF']
  }
}

module.exports = backgrounds
},{}],2:[function(require,module,exports){
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
      skillChoices:['animalHandling', 'athletics', 'intimidation', 'nature', 'perception','survival'],
      equipment:['Great Axe', '2 Hand Axes', "explorer's pack",  '4 Javelins'],
      features:['Unarmored Defense']
  }
}

module.exports = classes
},{}],3:[function(require,module,exports){
const dragonbreath = {
    dragonBreath1:'abc',
    dragonBreath2: 'xyz',
    dragonBreath3: 'ret'
}

module.exports = dragonbreath
},{}],4:[function(require,module,exports){
const languages = {
    Common: {desc:'The language common to all races'},
    Elvish: {desc:'The language of the Elves'},
    Dwarvish: {desc:'The language of the Dwarves'},
    Gnomish: {desc:'The language of the Gnomes'},
    Halfling: {desc:'The language of Halflings'},
    Orcish: {desc:'The language of Orcs'},
    Infernal: {desc:'The language of demons'}
}

module.exports = languages
},{}],5:[function(require,module,exports){
const subraces = require('./subraces')
const dragonbreath = require('./dragonbreath')
const skills = require('./skills')
const languages = require('./languages')

const races = {
     Dwarf : {
          raceType:'Dwarf',
          desc:'description',
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
          choices: {subrace: [1, subraces.Dwarf]}
      },
    Elf : {
        raceType: 'Elf',
        desc:'description',
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
        choices: {subrace: [1, subraces.Elf]}
      },
    Halfling : {
        raceType: 'Halfling',
        desc:'description',
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
        choices: {subrace: [1, subraces.Halfling]}
    } ,
    Human : {
            raceType: 'Human',
            desc:'description',
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
            choices: {languages: [1, languages]}
    },   
    Dragonborn : {
        raceType: 'Dragon Born',
        desc:'description',
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
        choices: {weapons: [1, dragonbreath]}
        /*=====Add something to specify dragon breath===== */
    },
     Gnome : {
        raceType: 'Gnome',
        desc:'description',
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
        choices: {subrace: [1, subraces.Gnome]}
    },
    "Half Elf" : {
        raceType: 'Half Elf',
        desc:'description',
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
        }
        /*=====add feature for choosing two ability scores to increase by 1 */
        /*====== ditto for +1 language and _2 skill proficiencies=====*/
    },
    "Half Orc" : {
        raceType: 'Half Orc',
        desc:'description',
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
        languages: ['Common', 'Orc']
    },
     Tiefling : {
        raceType: 'Tiefling',
        desc:'description',
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
        languages: ['Common', 'Infernal']
    }
    }
 
module.exports = races
},{"./dragonbreath":3,"./languages":4,"./skills":6,"./subraces":8}],6:[function(require,module,exports){
const skills = {
  Athletics: 'info on ath',
  'Animal Handling': 'blah',
  Deception: 'bla'
}

module.exports = skills
},{}],7:[function(require,module,exports){
const spells = {
    cantrips: null,
    level1: null
}

module.exports = spells
},{}],8:[function(require,module,exports){
const languages = require('./languages')
const spells = require('./spells')

const subraces = {
    Dwarf:{
        'Hill Dwarf' : {
            subType: 'Hill Dwarf',
            desc: '...',
            stats:{
                WIS: 1},
            HP:1
        },
        
        'Mountain Dwarf' : {
            subType:'Mountain Dwarf',
            desc: '...',
            stats:{
                STR: 2
            },
            profs: {
            armor:['light armor', 'medium armor']
            }
        }
    },
    Elf:{
        'High Elf' : {
        subType: 'High Elf',
        desc: '...',
        stats: {
            INT: 1},
        profs: {
            weapons: ['longsword', 'shortsword', 'longbow', 'shortbow']},
        spells: ['+1 cantrip'],
        language:['+1 language'],
        choices: {languages: [1, languages],
                    spells: [1, spells.cantrips],
                }
        },
        
        'Wood Elf' : {
            subType: 'Wood Elf',
            desc: '...',
            stats: {
                WIS: 1},
            profs: {
                weapons:['longsword', 'shortsword', 'longbow', 'shortbow']},
            speed: 35,
            features: ['can attempt to hide even when lightly obscured by foliage, rain, snow, mist, or other natural phenomena']
        },
        
        'Dark Elf' : {
            subType: 'Dark Elf',
            desc: '...',
            stats:{
            CHA: 1},
            features: ['Darkvision:120ft', 'Disadvantage on attacks in direct sunlight'],
            spells: ['Dancing Lights'],
            profs: {
                weapons:['rapiers','shortswords', 'hand crossbows']}
        }
    },
    Halfling:{
        "Lightfoot Halfling" : {
            subType: 'Lightfoot Halfling',
            desc: '...',
            stats:{
                CHA:1},
            features:['Can attempt to hide behind a creature at least one size larger than you']
        },
        
        "Stout Halfling" : {
            subType: 'Stout Halfling',
            desc: '...',
            stats:{
                CON:1},
            features:['Advantage on saving throws against poison, resistance against poison damage']
        }
    },
    "Gnome": {
        "Forest Gnome" : {
            subType:'Forest Gnome',
            desc: '...',
            stats:{
                DEX: 1},
            features: ['You can communicate simple ideas with small beasts'],
            spells: ['Minor Illusion']
        },
        
        "Rock Gnome" : {
            subType: 'Rock Gnome',
            desc: '...',
            stats:{
                CON: 1},
            features:['When making a history cehck related to technology, magic, or alchemy, add twice your proficiency bonus'],
            profs: {
                other:["artisan's tools"]}
        }
    }
}  


module.exports = subraces
},{"./languages":4,"./spells":7}],9:[function(require,module,exports){
// function displayX(type){
//     for(let i = 0; i < Object.keys(races).length; i++){
//       buildDom(getFirstEl, '#holder', createEl, 'div', appendEl)
//       let div = document.querySelectorAll('#holder div')[i]
//       div.innerHTML = `<h3>${Object.keys(type)[i]}</h3>`
//       div.classList.add('card')
//       div.appendChild(createEl('p'))
//       getXEl('p',i).innerHTML = type[Object.keys(type)[i]].desc
//       div.addEventListener('click', select)
//     }
//   }



//   function displayX(choiceArray, key){
//     document.getElementById('holder').innerHTML = ''
//     let counter = choiceArray[0]
//     let choiceList = Object.keys(choiceArray[1])
//     let userList = races[userProgress[0]][key]
//     for(let i = 0; i < userList.length; i++){
//       //in the user's race, loop through the keyword, e.g. languages, etc.
//       /*remove list  */
//       if(choiceList.includes(userList[i])){
//         choiceList.splice(choiceList.indexOf(userList[i]), 1)
//       }
//     }
//     choiceList.forEach(
//         (choice, i) =>{
//           buildDom(getFirstEl, '#holder', createEl, 'div', appendEl)
//           let div = document.querySelectorAll('#holder div')[i]
//           div.innerHTML = `<h3>${choice}</h3>`
//           div.classList.add('card')
//           div.appendChild(createEl('p'))
//           getXEl('p',i).innerHTML = races[userProgress[0]].choices[key][1][choice]
//           let numOfChoices = races[userProgress[0]].choices[key][0]
//           div.addEventListener('click', select)
//           // div.addEventListener('click', function(e){select(e, numOfChoices)})
//         }
//       )
//     }
function display(choiceObj){
    let choiceCount = 1
    if(Array.isArray(choiceObj)){
        choiceCount = choiceObj[0]
        choiceObj = choiceObj[1]
    }

    let holder = document.getElementById('holder')
    holder.innerHTML = ''

    let choiceArray = Object.keys(choiceObj)
    
    let options = []
    for(let choices of choiceArray){
        options.push(`
        <div class="card">
            <h3>${choices}</h3>
            <p>${choiceObj[choices].desc}</p>
            <div class="reverse">
            </div>
        </div>`)
    }
    holder.innerHTML = options.join('\n')

    let cards = document.querySelectorAll('.card')
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', function(e, numOfChoices){select(e, choiceCount)})
    }
    
    
}

function select(e, numOfChoices){
    let selectedItem = event.currentTarget
    if(selectedItem.classList.contains('selected')){
        selectedItem.classList.remove('selected')
        numOfChoices++
    }
    else{
        selectedItem.classList.add('selected')
        numOfChoices--
    }
    if(numOfChoices === 0){
        for(let i = 0; i < document.querySelectorAll('main div').length; i++){
            document.querySelectorAll('main div')[i].style.opacity = '.5'
        }
    }

}
module.exports = display
},{}],10:[function(require,module,exports){
const languages = require('./data-objects/languages')
const races = require('./data-objects/races')
const subraces = require('./data-objects/subraces')
const skills = require('./data-objects/skills')
const backgrounds = require('./data-objects/backgrounds')
const classes = require('./data-objects/classes')
const dragonbreath = require('./data-objects/dragonbreath')
const spells = require('./data-objects/spells')
const display = require('./display')

console.log(races, languages, subraces, skills, backgrounds, classes, dragonbreath, spells)

const userProgress = []

function createDNDCharacter(){
    switch(userProgress.length){
        case 0:
            //function to display races
            display(subraces.Elf['High Elf'].choices.languages)
            break
        case 1:
            //funtion to choose name
            break
        case 2:
            //choose a language if applicable
            break
        case 3:
            //choose skills if applicable
            break
        case 4:
            //choose stats if applicable
            break
        case 5: 
            //choose dragon breath if applicable
            break
        case 6:
            //choose subrace if applicable
            break
        case 7: 
            //choose subrace language
            break
        case 8:
            //choose cantrip
            break
        case 9:
            //choose class
            break
        case 10:
            //choose skills
            break
        case 11:
            //choose class specific traits
            break
        case 12: 
            //roll stats
            break
        case 13:
            //roll hp
            break
        case 14: 
            //choose spells
            break
        case 15:
            //traits
            break
        case 16:
            //ideals
            break
        case 17:
            //bonds
            break
        case 18:
            //flaws
            break
        case 19:
            //get char sheet
            break
        default:
            return 'youre done!'
    }
}

createDNDCharacter()
},{"./data-objects/backgrounds":1,"./data-objects/classes":2,"./data-objects/dragonbreath":3,"./data-objects/languages":4,"./data-objects/races":5,"./data-objects/skills":6,"./data-objects/spells":7,"./data-objects/subraces":8,"./display":9}]},{},[10]);
