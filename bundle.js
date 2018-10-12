(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function charProg(user){
    const charProg = document.querySelector('#charProg')
    const { STR, DEX, CON, INT, WIS, CHA } = user.stats
    charProg.innerHTML = `
    <h2>Character Glance <span id="arrowDown"></span></h2>
        <div id="charContainer" class="minimize">
        <p><b>Race:</b> ${user.race}</p>
        <p><b>Name:</b> ${user.name}</p>
        <p><b>Class:</b> ${user.classType}</p>

        <p><b>Background:</b> ${user.background}</p>
        <div id="lists">
            <ul>
                <li><b>Stats</b></li>
                <li>STR: ${STR}</li>
                <li>DEX: ${DEX}</li>
                <li>CON: ${CON}</li>
                <li>INT: ${INT}</li>
                <li>WIS: ${WIS}</li>
                <li>CHA: ${CHA}</li>
            </ul>
            <ul>
                <li><b>Skills</b></li>
                <li>${user.skills.join().split(',').join(' </li> <li> ')}</li>
            </ul>

        </div>
        <ul>
            <li><b>Spells</b></li>
            <li>${user.spells.cantrips.join().split(',').join(' </li> <li> ')}</li>
            <li>${user.spells.level1.join().split(',').join(' </li> <li> ')}</li>
        </ul>
    </div>
    `
    document.querySelector('#arrowDown').addEventListener('click', function(){
        document.querySelector('#arrowDown').classList.toggle('rotate')
        document.querySelector('#charContainer').classList.toggle('minimize')
    })
}

module.exports = charProg
},{}],2:[function(require,module,exports){
const spelldisplay = require('./spellDisplay')
const {display } = require('./display')
const { choiceNotPresent } = require('./storeProgress')

function progressChoices(progressPoint, progressLog, number, triggerFn){
    let type = progressPoint[progressLog[9][0]]
    let prompter = document.querySelector('#prompter')
    let choices = Object.keys(type.choices)
    let currentChoice = choices[number]
    if (currentChoice === undefined) {
        choiceNotPresent(progressLog, triggerFn)
        return
    }
    let numOfChoices = progressPoint[progressLog[9][0]].choices[currentChoice][0]
    document.querySelector('#prompter').innerHTML = progressPoint[progressLog[9][0]].choices[currentChoice][2]
    
    if(currentChoice === 'cantrips'){
        prompter.innerHTML = '<h2>Choose your Cantrips</h2> <p>Cantrips are spells you can cast as frequently as you would like</p>'
        spelldisplay(0, type.classType, numOfChoices, progressLog, triggerFn)

    }
    else if (currentChoice === 'spells') {
        prompter.innerHTML = '<h2>Choose your Spells</h2> <p>Spells are more powerful than cantrips. You can only cast them a certain number of times</p>'
        spelldisplay(1, type.classType, numOfChoices, progressLog, triggerFn)
    }
    else{
        display(progressPoint[progressLog[9][0]].choices[currentChoice], progressLog, triggerFn)
    }
}

module.exports = progressChoices


},{"./display":15,"./spellDisplay":19,"./storeProgress":20}],3:[function(require,module,exports){
const classes = require('./data-objects/classes')
function calcMod(raw){
    return Number(Math.floor((raw - 10) / 2))
}

function calcAC(user){
    const dexMod = calcMod(user.stats.DEX)
    const armorType = classes[user.classType].armorType
    let AC
    switch(armorType){
        case 'leather':
            AC = 11 + dexMod
            break
        case 'scale':
            AC = 11 + dexMod
            break
        case 'chain':
            AC = 11 + dexMod
            break  
        case '':
            if(classes[user.classType].features.incldues('Uarmored Defense') && user.classType === 'Barbarian'){
                AC = 10 + calcMod(user.stats.CON) + dexMod
            } 
            else if (classes[user.classType].features.incldues('Uarmored Defense') && user.classType === 'Monk'){
                AC = 10 + calcMod(user.stats.WIS) + dexMod
            }
            else{
                AC = 10
            }
        default:
            AC = 10
    }
    return AC
}

function createCharSheet(user){
    let holder = document.querySelector('#holder')
    holder.classList.add('charsheet')
    holder.classList.remove('flex')
    let charsheetHTML = `
            <article id="baseInfo">
                <img id="logo" src="https://mbtskoudsalg.com/images/20-sided-dice-png-5.png" alt="dndEASY logo">
                <article id="name">${user.name}</article>
                <article id="class">${user.classType}</article>
                <article id="background">${user.background}</article>
                <article id="race">${user.race}</article>
                <article id="alignment">${user.alignment}</article>
                <article id="dc">${10 + calcMod(user.stats.INT)}</article>
            </article>
            <article id="stats">
                <h4>Stats</h4>
                <div class="mod">
                    <div class="raw">${user.stats.STR}</div>
                    <div class="modifier">${calcMod(user.stats.STR)}</div>
                    <h5>Strength</h5>
                </div>
                <div class="mod">
                    <div class="raw">${user.stats.DEX}</div>
                    <div class="modifier">${calcMod(user.stats.DEX)}</div>
                    <h5>Dexterity</h5>
                </div>
                <div class="mod">
                    <div class="raw">${user.stats.CON}</div>
                    <div class="modifier">${calcMod(user.stats.CON)}</div>
                    <h5>Constitution</h5>
                </div>
                <div class="mod">
                    <div class="raw">${user.stats.INT}</div>
                    <div class="modifier">${calcMod(user.stats.INT)}</div>
                    <h5>Intelligence</h5>
                </div>
                <div class="mod">
                    <div class="raw">${user.stats.WIS}</div>
                    <div class="modifier">${calcMod(user.stats.WIS)}</div>
                    <h5>Wisdom</h5>
                </div>
                <div class="mod">
                    <div class="raw">${user.stats.CHA}</div>
                    <div class="modifier">${calcMod(user.stats.CHA)}</div>
                    <h5>Charisma</h5>
                </div>
            </article>
            <article id="savingThrows">
                <h4>Saving Throws</h4>
                <p>+2 ${user.savingThrows[0]}</p>
                <p>+2 ${user.savingThrows[1]}</p>
                <div>
                    <h4>Speed</h4>
                    <h5>${user.speed}</h5>
                </div>
            </article>
            <article id="skills">
                <h4>Skills</h4>
                <p>+2 ${user.skills.join('</p><p>+2 ')}</p>
            </article>
            <article id="profAndLang">
                <h4>Other Proficiencies and Langauges</h4>
                <h5>Proficiencies</h5>
                <p>${user.profs.tools.join('</p><p>')}</p>
                <h5>Languages</h5>
                <p>${user.languages.join('</p><p>')}</p>
            </article>
            <article id="hp">
                <div>
                    <h4>Armor Class</h4>
                    <h5>${calcAC(user)}</h5>
                </div>
                
                <div>
                    <h4>Hit Points</h4>
                    <h5>${user.HP}</h5>
                </div>
            </article>
            <article id="attacks">
                <h4>Attacks and Spells</h4>
                <h5>Attacks</h5>
                <p>${user.equipment.weapons.join('</p><p>')}</p>
                <h5>Spells</h5>
                <h6>Cantrips</h6>
                <p>${user.spells.cantrips.join('</p><p>')}</p>
                
                <h6>Level 1 Spells</h6>
                <p>${user.spells.level1.join('</p><p>')}</p>
            </article>
            <article id="equipment">
                <h4>Equipment</h4>
                <p>${user.equipment.other.join('</p><p>')}</p>
                <p>${user.equipment.shield.join('</p><p>')}</p>
            </article>
            <article id="charInfo">
                <div>
                    <h4>Traits</h4>
                    <p>${user.traits}</p>
                </div>
                <div>
                    <h4>Ideals</h4>
                    <p>${user.ideals}</p>
                </div>
                <div>
                    <h4>Bonds</h4>
                    <p>${user.bonds}</p>
                </div>
                <div>
                    <h4>Flaws</h4>
                    <p>${user.flaws}</p>
                </div>
            </article>
            <article id="features">
                <h4>Features</h4>
                <p>${user.features.join('</p><p>')}</p>
            </article>`

    document.querySelector('#masterContainer').innerHTML = charsheetHTML
    document.querySelector('#masterContainer').id = 'charsheet'


}

module.exports = createCharSheet
},{"./data-objects/classes":7}],4:[function(require,module,exports){
function addRaceData(user, race){
    let {raceType, speed, stats, profs = null, features = null, languages} = race
    user.race = raceType
    user.speed = speed
    if(profs !== null){
      for (let profType in race.profs){
        user.profs[profType] += race.profs[profType]
      }
    }
    if(features !== null){
      user.features.push(features)
    }
    for (let stat in stats){
      user.stats[stat] += stats[stat]
    }
    user.languages.push(languages)
    return user
}
  
function addSubraceData(user, subrace){
    for(let attributes in subrace){
        switch(attributes){
        case 'subType':
            user.race = subrace.subType
            break
        case 'stats':
            for(let statName in subrace.stats){
                user.stats[statName] += subrace.stats[statName]
            }
            break
        case 'profs':
            for(let profType in subrace.profs){
                user.profs[profType].push(subrace.profs[profType])
            }
            break
        case 'speed':
            user.speed = subrace.speed
            break
        case 'features':
            for(let feature of subrace.features){
                user.features.push(feature)
            }
            
            break
        case 'HP':
            user.HP += Number(subrace.HP)
            break
        default:
            
        }
    }
} 


function addClassData(user, className){
  let {classType, hitDie, savingThrows, profs: {armor, weapons, other}, skillChoices, equipmentChoices, features} = className

  user.classType = classType
  user.savingThrows = savingThrows
  user.profs.armor = armor
  user.profs.weapons = weapons
  user.profs.other = other
  user.hitDie = hitDie
  user.features.push(features)

}

function addClassChoices(user, progressLogEntry, className, num){
    let classChoiceList = Object.keys(className.choices)
    if(classChoiceList[num] === 'cantrips'){
        for (let items of progressLogEntry){
            user.spells.cantrips.push(items)
        }
        
    }
    else if(classChoiceList[num] === 'spells'){
        for (let items of progressLogEntry) {
            user.spells.level1.push(items)
        }
    }
    else{
        user.features.push(progressLogEntry)
    }
}

function addBackgroundData(user, backgroundName){
    
    for(let skill of backgroundName.skills){
        if(user.skills.includes(skill)){
            continue
        }
        else{
            user.skills.push(skill)
        }
    }
    user.equipment.other.push(backgroundName.equipment)

    if(backgroundName.profs){user.profs.tools.push(backgroundName.profs.tools)}
}



module.exports = { addRaceData, addSubraceData, addClassData, addClassChoices, addBackgroundData }
},{}],5:[function(require,module,exports){
const alignment = {
    "Lawful Good":{
        name:"Lawful Good",
        reverse:'Combining honor and compassion',
        img:'img/lawfulGood.jpg',
        desc:''
    },
    "Neutral Good":{
        name: "Neutral Good",
        desc: 'Doing what is good without bias for or against order',
        img: 'img/neutralGood.jpg',
        desc: ''
    },
    "Chaotic Good": {
        name:'Chaotic Good',
        reverse: 'Combinng a good heart with a free spirit',
        img: 'img/chaoticGood.jpg',
        desc: ''
    },
    "Lawful Neutral":{
        name: 'Lawful Neutral',
        reverse: 'Reliable and honorable without being a zealot',
        img: 'img/lawfulNeutral.jpg',
        desc: ''
    },
    "True Neutral": {
        name:"True Neutral",
        reverse: 'Acting naturally wihout prejudice or compulsion',
        img: 'img/trueNeutral.jpg',
        desc: ''
    },
    "Chaotic Neutral": {
        name: "Chaotic Neutral",
        desc: "Freedom from societal restrictions and a do-gooder's mentality",
        img: 'img/chaoticNeutral.jpg',
        desc: ''
    },
    "Lawful Evil": {
        name:"Chaotic Neutral",
        desc: "A combination of honor and dedicated self-interest",
        img: 'img/lawfulEvil.jpg',
        desc: ''
    },
    "Neutral Evil": {
        name:"Neutral Evil",
        desc: 'An ability to advance oneself without regard for others',
        img: 'img/neutralEvil.jpg',
        desc: ''
    },
    "Chaotic Evil": {
        name:"Chaotic Evil",
        desc: 'A combination of self interest and complete freedom',
        img: 'img/chaoticEvil.jpg',
        desc: ''
    }
}

module.exports = alignment
},{}],6:[function(require,module,exports){
const languages = require('./languages')

const backgrounds = {
  Acolyte: {
    skills: ['Insight', 'Religion'], 
    choices:{languages: [2, languages]},
    equipment: ['holy symbol', 'prayer book', '5 sticks of incense', 'vestments', 'common clothes', '15 GP'],
    desc:'',
    img: 'img/acolyte.jpg'
  },
  Charlatan: {
    skills: ['Deception', 'Sleight of Hand'],
    profs:{tools:['disguise kit', 'forgery kit']},
    equipment: ['fine clothes', 'disguise kit', 'tools of a con of your choice', '15 GP'],
    desc: '',
    img: 'img/charlatan.jpg'
  },
  Criminal: {
    skills: ['Deception', 'Stealth'],
    profs: { tools: ['One type of gaming set', "thieve's tools"] },
    equipment: ['crowbar', 'dark common clothes', '15 GP'],
    desc: '',
    img: 'img/criminal.jpg'
    
  },
  Entertainer: {
    skills: ['Acrobatics', 'Performance'],
    profs: { tools: ['disguise kit', 'musical instrument'] },
    equipment: ['musical instrument', 'the favor of an admirer', 'costume', '15 GP'],
    desc: '',
    img: 'img/entertainer.jpg'
  },
  "Folk Hero": {
    skills: ['Animal Handling', 'Survival'],
    profs: { tools: ["artisan's tools", 'land vehicles'] },
    equipment: ["artisan's tools of your choice", 'shovel', 'iron pot', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/folkHero.jpg'
  },
  "Guild Artisan": {
    skills: ['Insight', 'Persuasion'],
    profs: { tools: ["artisan's tools", 'land vehicles'] },
    choices: { languages: [1, languages] },
    equipment: ["artisan's tools of your choice", 'a letter of introduction from your guild', "traveler's clothes", '15 GP'],
    desc: '',
    img: 'img/stoutHalfling.jpg'
  },
  Hermit:{
    skills: ['Medicine', 'Religion'],
    profs: { tools: ['herbalism kit'] },
    choices: { languages: [1, languages] },
    equipment: ['scroll case full of notes from studies or prayers', 'winter blanket', 'common clothes', 'herbalism kit', '5 GP'],
    desc: '',
    img: 'img/hermit.jpg'
  },
  Noble: {
    skills: ['History', 'Persuasion'],
    profs: { tools: ['One type of gaming set'] },
    choices: { languages: [1, languages] },
    equipment: ['scroll of pedigree', 'signet ring', 'fine clothes', '25 GP'],
    desc: '',
    img: 'img/noble.jpg'
  },
  Outlander: {
    skills: ['Athletics', 'Survival'],
    profs: { tools: ['musical instrument'] },
    choices: { languages: [1, languages] },
    equipment: ['staff', 'hunting trap', 'trophy from an animal you killed', "traveler's kit", '10 GP'],
    desc: '',
    img: 'img/outlander.jpg'
  },
  Sage: {
    skills: ['Arcana', 'History'],
    choices: { languages: [2, languages] },
    equipment: ['bottle of black ink', 'quill', 'small knife', 'letter from dead colleague posing an unanswered question', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/wizard.jpg'
  },
  Sailor: {
    skills: ['Athletics', 'Perception'],
    profs: { tools: ["navigator's tools", 'water vehicles'] },
    equipment: ['club', 'silk rope (50ft)', 'lucky charm', "common clothes", '10 GP'],
    desc: '',
    img: 'img/sailor.jpg'
  },
  Soldier: {
    skills: ['Athletics', 'Intimidation'],
    profs: { tools: ['disguise kit', 'land vehicles'] },
    equipment: ['insignia of rank', 'trophy from a fallen enemy', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/soldier.jpg'
  },
  Urchin: {
    skills: ['Sleight of Hand', 'Stealth'],
    profs: { tools: ['disguise kit', "thieves' tools"] },
    equipment: ['small knife', 'map of home town', 'pet mouse', 'a toke to remember your parents', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/urchin.jpg'
  }
}

module.exports = backgrounds
},{"./languages":9}],7:[function(require,module,exports){
const skills = require('./skills')
const spells = require('./spells')


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
        choices: { skills: [4, { Acrobatics, Athletics, Deception, Insight, Intimidation, Investigation, Perception, Persuasion, sleightOfHand, Stealth, Survival }] },
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
},{"./skills":11,"./spells":12}],8:[function(require,module,exports){
const dragonbreath = {
    "Black Dragon":{
        reverse:"Spit acid in a 5' by 30' line",
        desc:'',
        img:'img/blackDragon.jpg'
    },
    "Blue Dragon": {
        reverse: "Breathe lightning in a 5' by 30' line", 
        desc: '',
        img: 'img/blueDragon.jpg'
    },
    "Brass Dragon": {
        reverse:"Breathe fire in a 5' by 30' line",
        desc: '',
        img: 'img/brassDragon.jpg'
    },
    "Bronze Dragon": {
        reverse:"Breathe lightning in a 5' by 30' line",
        desc: '',
        img: 'img/bronzeDragon.jpg'
    },
    "Copper Dragon": {
        reverse: "Spit acid in a 5' by 30' line",
        desc: '',
        img: 'img/copperDragon.jpg'
    },
    "Gold Dragon": {
        reverse:"Breathe fire in a 15' cone",
        desc: '',
        img: 'img/goldDragon.jpg'
    },
    "Green Dragon": {
        reverse:"Spit poison in a 15' cone",
        desc: '',
        img: 'img/greenDragon.jpg'
    },
    "Red Dragon": {
       reverse: "Breathe fire in a 15' cone",
        desc: '',
        img: 'img/redDragon.jpg'
    },
    "Silver Dragon":{ 
        reverse:"Breathe cold air in a 15' cone",
        desc: '',
        img: 'img/silverDragon.jpg'
    },
    "White Dragon": {
        reverse: "Breathe cold air in a 15' cone",
        desc: '',
        img: 'img/whiteDragon.jpg'
    }
}

module.exports = dragonbreath
},{}],9:[function(require,module,exports){
const languages = {
    Common: {desc: 'The language common to all races', img: 'img/ranger.jpg', reverse: "Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues."},
    Elvish: { desc: 'The language of Elves', img: 'img/bard.jpg', reverse: "Elvish is fluid, with subtle intonations and intricate grammar.Elven literature is rich and varied, and their songs and poems are famous among other races."},
    Dwarvish: { desc: 'The language of Dwarves', img: 'img/wizard.jpg', reverse: "Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak."},
    Draconic: { desc: 'The language of Dragons', img: 'img/blackDragon.jpg', reverse: "Draconic is thought to be one  of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants."},
    Gnomish: { desc: 'The language of Gnomes', img: 'img/criminal.jpg', reverse: "Gnomish is renowned for its technical treatises and its catalogs of knowledge about the natural world."},
    Halfling: { desc: 'The language of Halflings', img: 'img/stoutHalfling.jpg', reverse: "The Halfling language isn’t secret, but Halflings are loath to share it w ith others. They write very little, so they don’t have a rich body of literature. Their oral tradition, however, is very strong."},
    Orc: {desc: 'The language of Orcs', img: 'img/paladin.jpg', reverse: "Orc is a harsh, grating language with hard consonants. It has no script of its own"},
    Infernal: { desc: 'The language of demons', img: 'img/tiefling.jpg', reverse: "Infernal was the language of the baatezu, a subtype of devils, and of the Nine Hells."}
}

module.exports = languages
},{}],10:[function(require,module,exports){
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
          img:'img/dwarf.jpg',
          reverse:"Bold and hardy, dwarves are skilled warriors, miners and workers. They can live to e more than 400 years old and are known to hold a grudge."
      },
    Elf : {
        raceType: 'Elf',
        desc:"They're fanciful and elegant, but tend to be a little stuck up.",
        names: [['Adran', 'Heian', 'Thamior'],['Adrie', 'Lia', 'Nailo']],
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
        img: 'img/elf.jpg',
        reverse: "Elves are a little more slender than humans. They're hauntingly beautiful and can live to be 700 years old. They're often thouht to be aloof or detatched"
      },
    Halfling : {
        raceType: 'Halfling',
        desc:'About half the size of a person, Halflings are chill and down to earth',
        names: [['Alton', 'Milo', 'Wellby'],['Andry', 'Lidda', 'Verna']],
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
        img: 'img/halfling.jpg',
        reverse: "Halflings have kind hearts and are content to spend their days with good friends and good meals. They usually live around 150 years, spending their days in small communities"
    } ,
    Human : {
            raceType: 'Human',
            desc:'The tryhards of the DND world, Humans are much more adaptive and ambitious than other groups.',
            names: [['Bardeid', 'Randal', 'Chen'],['Zasheir', 'Kerri', 'Lei']],
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
            img: 'img/human.jpg',
            reverse: "Humans are a diverse bunch and their communities are usually welcoming of other races. Because of their short lives, other races often see them as living hectic and bustling lives"
    },   
    Dragonborn : {
        raceType: 'Dragonborn',
        desc:'Basically a dragon that stands on two feet, Dragonborn are proud and clanish',
        names: [['Arjhan', 'Balsar', 'Torinn'],['Akra', 'Kava', 'Uadjit']],
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
        img: 'img/dragonborn.jpg',
        reverse: "Dragonborn are expert crafters and they are generally driven to be the best they possibly can be. They are undyingly devoted to their clan, topping out at well over 6 feet, weighing nearly 250 pounds, and living to about 80 years old."
        
    },
     Gnome : {
        raceType: 'Gnome',
        desc:"They're tiny, eccentric tinkerers. Gnomes spend their time indulging their curiosity",
        names: [['Alston', 'Fonkin', 'Wrenn'],['Ella', 'Shamil', 'Orla']],
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
        img: 'img/gnome.jpg',
        reverse: "Gnomes are equally devoted to the pleasures of life and studious endeavors. They live to be about 350 to 500 yeas old and spend much of that exploring and learning."
    },
    "Half Elf" : {
        raceType: 'Half Elf',
        desc:'Half human and half elf, they resemble a mix of both, but fit in with neither.',
        dndClass: {},
        names: [['Bardeid', 'Randal', 'Chen'],['Adrie', 'Lia', 'Nailo']],
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
        img: 'img/halfElf.jpg',
        reverse:"Half Elves often feel like they have no home of their own. They live to be about 180 years old, dying much sooner than their Elf parent, but much later than their human parent."
    },
    "Half Orc" : {
        raceType: 'Half Orc',
        desc:'Half Human and half Orc, they are often treated with prejudice and assumed to be violent brawlers',
        dndClass: {},
        names: [['Dench', 'Holg', 'Thokk'],['Baggi', 'Ovak', 'Yevelda']],
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
        img: 'img/halfOrc.jpg',
        reverse: "Standing 6 to 7 feet tall and weighing over 200 pounds, Half Orcs are intimidating. They are often scarred and prone to violent and emotional outbursts due to their Orc parents."
    },
     Tiefling : {
        raceType: 'Tiefling',
        desc:'A cross between a person and a demon, Tieflings are met with distrust and are suspicious of others',
        dndClass: {},
        names: [['Akmenos', 'Ekemon', 'Skamos'],['Akta', 'Kallista', 'Rieta']],
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
        img: 'img/tiefling.jpg',
        reverse: "Tieflings are often the victims of prejudice. Their horns, tails, and fangs are fearsome, but they are not evil by nature. They generally live as long as Humans"
    }
    }
 
module.exports = races
},{"./dragonbreath":8,"./languages":9,"./skills":11,"./subraces":13}],11:[function(require,module,exports){
const skills = {
   Acrobatics: { 
  name: 'Acrobatics',
  reverse:'Your ability to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck.',
  img:'img/acrobatics.jpg',
  desc:''
},
  'Animal Handling':{
  name: 'Animal Handling',
  reverse:
      'When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal’s intentions, you will use Animal Handling',
    img: 'img/animalHandling.jpg',
    desc: '' 
},
Arcana: {
  name: 'Arcana',
  reverse:
    'Your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes.',
  img: 'img/wizard.jpg',
  desc: '' 
},
 Athletics:{
  name: 'Athletics',
  reverse:
     'Your Athletics covers difficult situations you encounter while climbing, jumping, or swimming.',
   img: 'img/athletics.jpg',
   desc: '' 
},
Deception: {
  name: 'Deception',
  reverse:
    'Your Deception determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies.',
  img: 'img/deception.jpg',
  desc: '' 
},
History:{
  name: 'History',
  reverse:
    'Your History skill measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations.',
  img: 'img/hermit.jpg',
  desc: '' 
},
Insight:{
  name: 'Insight',
  reverse:
    'Your Insight decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone’s next move.',
  img: 'img/wizard.jpg',
  desc: '' 
},
Intimidation:{
  name: 'Intimidation',
  reverse:
    'Trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision.',
  img: 'img/intimidation.jpg',
  desc: '' 
},
Investigation:{
  name: 'Investigation',
  reverse:
    'When you look around for clues and make deductions based on those clues, you use your Investigation skills.',
  img: 'img/chaoticNeutral.jpg',
  desc: ''
},
Medicine:{
  name: 'Medicine',
  reverse:
    'A Medicine check lets you try to stabilize a dying companion or diagnose an illness.',
  img: 'img/medicine.jpg',
  desc: '' 
},
Nature:{
  name: 'Nature',
  reverse:
    'Your ability to recall lore about terrain, plants and animals, the weather, and natural cycles.',
  img: 'img/nature.jpg',
  desc: '' 
},
Perception:{
  name: 'Perception',
  reverse:
    'Your general awareness of your surroundings and the keenness of your senses, like hearing a conversation through a closed door, eavesdroping under an open window, or hearing monsters moving stealthily in the forest.',
  img: 'img/perception.jpg',
  desc: '' 
},
Performance:{
  name: 'Performance',
  reverse:
     'Performance determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment.',
  img:'img/entertainer.jpg',
  desc:'' 
},
Persuasion: {
  name: 'Persuasion',
  reverse:
    'When you attempt to influence someone or a group of people with tact, social graces, or good nature',
  img: 'img/persuasion.jpg',
  desc: '' 
},
Religion: {
  name: 'Religion',
  reverse:
     'Religion measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults.',
  img: 'img/charlatan.jpg',
  desc: ''  
},
'Sleight of Hand': {
  name: 'Sleight of Hand',
  reverse:
     'Whenever you attempt an act of trickery, such as planting something on someone else or concealing an object on your person',
  img:'img/urchin.jpg',
  desc:''
},
Stealth: {
  name: 'Stealth',
  reverse:
    'Stealth measures your ability to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard.',
  img: 'img/stealth.jpg',
  desc: ''  
},
Survival:{
  name: 'Survival',
  reverse: 'Survival is the abiltiy to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards.',
  img: 'img/survival.jpg',
  desc: ''  
}}

module.exports = skills
},{}],12:[function(require,module,exports){
const spells = {level1:null, cantrips:null}
module.exports = spells
},{}],13:[function(require,module,exports){
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
},{"./languages":9}],14:[function(require,module,exports){
const classes = require('./data-objects/classes')

function diceRoll(numDice, numSides) {
    let statNums = []
    for (let i = 0; i < numDice; i++) {
        let score = Math.floor(Math.random() * numSides) + 1
        statNums.push(score)
    }
    return statNums
}

function statGen(rollFn, numDice, numSides, numTimes) {
    let stats = []
    for (let i = 0; i < numTimes; i++) {
        let statNums = rollFn(numDice, numSides)
        statNums.sort((a, b) => a - b)
        statNums.shift()
        stats.push(statNums.reduce((acc, num) => acc + num, 0))
    }
    return stats
}

let stats = statGen(diceRoll, 4, 6, 6)

function render(statArr) {
    const holder = document.querySelector('#holder')
    holder.innerHTML = '<div class="col col1" ondrop="drop(event)" ondragover="allowDrop(event)"></div> <div class="col col2"></div>'
    for (let i = 0; i < statArr.length; i++) {
        document.querySelector('.col1').innerHTML += `<div class="numContainer" draggable="true"
ondragstart="drag(event)">${statArr[i]}</div>`
        document.querySelectorAll('.numContainer')[i].id = `num${i + 1}`
        document.querySelectorAll('.numContainer')[i].addEventListener('click', function (event) {
            event.target.style.transform = 'scale(.7)'
        })
    }
}


let statTypes = ['STR', 'CON', 'INT', 'WIS', 'CHA', 'DEX']

function displayStats(progressLog, triggerFn){
    document.querySelector('#choiceDisplay').textContent = ''
    render(stats)

    for (let i = 0; i < statTypes.length; i++) {

        document.querySelector('.col2').innerHTML +=  
        `<div class="statDropContainer">
            <span>${statTypes[i]}</span>
            <div class="statHolder" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        </div>`
        if (classes[progressLog[9][0]].savingThrows.includes(statTypes[i])) {
            document.querySelectorAll('.statHolder')[i].classList.add('special')
            document.querySelectorAll('.statHolder')[i].id = `stat${i + 1}`
            
        }
        
    }
    document.querySelector('#prompter').innerHTML += `<p>As a ${progressLog[9][0]}, ${classes[progressLog[9][0]].savingThrows.join(' and ')} are important</p>`

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
    }

    document.addEventListener('drop', function(){
        if(document.querySelector('.col1').children.length === 0){
            document.querySelector('#next').classList.remove('hidden')
            document.querySelector('#next').onclick = function(){statComplete(progressLog, triggerFn)}
        }
        else{
            document.querySelector('#next').classList.add('hidden')
        }
    })
}

function statComplete(progressLog, triggerFn){
    const userStats = {}

    let statDropContainer = document.querySelectorAll('.statDropContainer')
    let numHolder = document.querySelectorAll('.numHolder')

    for(let stat of statDropContainer){
        let statType = stat.children[0].textContent
        let statNum = stat.children[1].children[0].textContent
        userStats[statType] = statNum
    }

    progressLog.push([userStats])
    
    triggerFn()
}
module.exports = displayStats

},{"./data-objects/classes":7}],15:[function(require,module,exports){
const selectionComplete = require('./selectionComplete')
const races = require('./data-objects/races')

function display(choiceObj, progressLog, triggerFn, topic){
    
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
        if(progressLog.length > 0 && !!races[progressLog[0][0]][topic] === true ){
            if( races[progressLog[0][0]][topic].includes(choices) ){
                continue
            }

        }
        options.push(`
        <div class="card-wrapper">
        
            <div class="card">
                <div class="card-front" style="background-image:url('${choiceObj[choices].img}')">
                    <h3>${choices}</h3>
                    <p>${choiceObj[choices].desc}</p>
                    <div class="btn-turn-to-back"></div>
                </div>

                <div class="card-back">
                    <p>${choiceObj[choices].reverse}</p>
                    <div class="btn-turn-to-front"></div>
                </div>

            </div>

        </div>`)
    }
    holder.innerHTML = options.join('\n')

    let cards = document.querySelectorAll('.card')
    let finalChoice = []
    document.querySelector('#choiceDisplay').textContent = choiceCountDisplay(choiceCount)
    let prepCardsForSelection = function(e){select(e, choiceCount, finalChoice, progressLog, triggerFn)}

    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', prepCardsForSelection)
        document.querySelectorAll('.btn-turn-to-front')[i].style.visibility = 'visible';
        document.querySelectorAll('.btn-turn-to-back')[i].style.visibility = 'visible';

        document.querySelectorAll('.card-back')[i].onclick = function (event) {
            event.stopPropagation();
        }
        
        document.querySelectorAll('.btn-turn-to-front')[i].onclick = function (event) {
            event.stopPropagation();
            document.querySelectorAll('.card')[i].classList.toggle('do-flip')
        };

        document.querySelectorAll('.btn-turn-to-back')[i].onclick = function (event) {
            event.stopPropagation()
            document.querySelectorAll('.card')[i].classList.toggle('do-flip');
            
        };
    }  

    
}

function choiceCountDisplay(choicesLeft) {
    if (choicesLeft === 1) {
        return `You have 1 selection left`
    }
    else {
        return `You have ${choicesLeft} selections left`
    }
}

function select(event, numOfChoices,finalChoice, progressLog, triggerFn){
    
    let next = document.querySelector('#next')
    let choiceDisplay = document.querySelector('#choiceDisplay')
    let choiceCount = numOfChoices - finalChoice.length
    let logSelectionMoveOn = function(e){selectionComplete(progressLog, finalChoice, triggerFn)} 
   
    choiceDisplay.textContent = choiceCountDisplay(finalChoice.length)
   
    if(choiceCount !== 0){ //have choices left
        if(event.currentTarget.classList.contains('selected')){
            event.currentTarget.classList.remove('selected')
            choiceCount++
            finalChoice.splice(finalChoice.indexOf(event.currentTarget.children[0].children[0].innerHTML), 1)
            
            choiceDisplay.textContent = choiceCountDisplay(choiceCount)
        }
        else{
            event.currentTarget.classList.add('selected')
            event.currentTarget.children[0].children[2].style.visibility = 'hidden'
            choiceCount--
            finalChoice.push(event.currentTarget.children[0].children[0].textContent)

            choiceDisplay.textContent = choiceCountDisplay(choiceCount)
        }
    }
    else{                   //have no choices left
        if(event.currentTarget.classList.contains('selected')){
            event.currentTarget.classList.remove('selected')
            event.currentTarget.children[0].children[2].style.visibility = 'visible'
            choiceCount++
            finalChoice.splice(finalChoice.indexOf(event.currentTarget.children[0].children[0].innerHTML), 1)
            
            choiceDisplay.textContent = choiceCountDisplay(choiceCount)
        }
        else{
            choiceDisplay.textContent = choiceCountDisplay(choiceCount)
        }
    }
    
    if(choiceCount === 0 && finalChoice.length === numOfChoices){
        next.classList.remove('hidden')
        next.onclick = logSelectionMoveOn
    }else if(choiceCount !== 0){
        next.classList.add('hidden')
    }
    
}

module.exports = { display, select}
},{"./data-objects/races":10,"./selectionComplete":18}],16:[function(require,module,exports){
const classes = require('./data-objects/classes')

function diceRoll(numDice, numSides) {
    let statNums = []
    for (let i = 0; i < numDice; i++) {
        let score = Math.floor(Math.random() * numSides) + 1
        statNums.push(score)
    }
    return statNums
}


function hpRoll(progressLog, triggerFn){
    document.querySelector('#choiceDisplay').textContent = ''
    let hitDie = classes[progressLog[9][0]].hitDie
    document.querySelector('main').innerHTML = '<div class="dice"></div>'
    
    function generateHP(progressLog, triggerFn, hitDie) {    
        let counter = 20
        let rollingDie = setInterval(function () {
            let diceNum = diceRoll(1, hitDie)
            document.querySelector('.dice').textContent = diceNum[0]
            counter--
            if (counter === 0) {
                clearInterval(rollingDie)
                setTimeout(function () { document.querySelector('.dice').classList.add('animatedNum') }, 0)
                let rolledNum = document.querySelector('.dice').textContent
                const HP = Number(Math.floor((progressLog[17][0].CON - 10) / 2)) + Number(rolledNum)
                
                document.querySelector('#next').classList.remove('hidden')
                document.querySelector('#next').onclick = function () {
                    progressLog.push([HP])
                    triggerFn()
                }
            }
        }, 100)

        document.querySelector('.dice').removeEventListener('click', generateHP)

    }

    document.querySelector('.dice').onclick = function(){generateHP(progressLog, triggerFn, hitDie)}
}




module.exports = hpRoll

},{"./data-objects/classes":7}],17:[function(require,module,exports){
const languages = require('./data-objects/languages')
const races = require('./data-objects/races')
const subraces = require('./data-objects/subraces')
const backgrounds = require('./data-objects/backgrounds')
const classes = require('./data-objects/classes')
const progressChoices = require('./classChoices')
const { display } = require('./display')
const prepareSpellOptions = require('./spellDisplay')
const userInput = require('./userInput')
const hpRoll = require('./hpRoll')
const displayStats = require('./diceStats')
const { addRaceData, addSubraceData, addClassData, addClassChoices, addBackgroundData } = require('./createUserObj')
const createCharSheet = require('./createCharSheet')
const characterProg = require('./charProg')
const progressbar = document.querySelector('#progress')
const { storeProgress, revertProgress, choiceNotPresent } = require('./storeProgress')
const alignment = require('./data-objects/alignment')

let userObj = {
    race: '',
    name: '',
    stats: {
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0
    },
    speed: 0,
    profs: {
        weapons: [],
        armor: [],
        tools: [],
        other: [],
    },
    features: [],
    languages: [],
    spells: {
        cantrips: [],
        level1: []
    },
    HP: 0,
    AC: 0,
    DC: 0,
    equipment: {
        weapons: [],
        other: [],
        shield: []
    },
    skills: [],
    background: '',
    traits: '',
    bonds: '',
    ideals: '',
    flaws: '',
    classType: '',
    savingThrow: []
}

let userProgress = []

function createDNDCharacter(){
    
    const prompter = document.querySelector('#prompter')
    
    document.querySelector('#back').onclick = function(){
        let position = revertProgress()
        userObj = position.user
        userProgress = position.progressLog
        createDNDCharacter()
    }

    document.querySelector('#next').classList.add('hidden')

    switch(userProgress.length){
        case 0:
            let storedProgress = []
            let stringStoredProgress = JSON.stringify(storedProgress)
            localStorage.setItem('storedProgress', stringStoredProgress)
           
            //function to display races
            prompter.innerHTML = '<h2>Choose your race</h2><p>What kind of adventurer will you be?</p>'
            display(races, userProgress, createDNDCharacter)

            break
        case 1:
            document.querySelector('#back').classList.remove('hidden')
    
            //add race data to user object
            addRaceData(userObj, races[userProgress[0][0]])
            
            //change progressbar
            progressbar.className = 'ten'

            //funtion to choose name
            prompter.innerHTML = "<h2>What's in a name?</h2> <p>No one wants to go on a quest with <i>Kyle</i>... The right name can make a big difference in the world of DND</p>"
            let inputTag = '<input id="userInput" type="text" require minlength="1" placeholder ="what is your name?" value="" autofocus>'
            userInput(inputTag, createDNDCharacter, userProgress, 'names')

            break
        case 2:
            //add name to user object
            userObj.name = userProgress[1]
            
            //change progressbar
            progressbar.className = 'twenty'

            // choose a language if applicable
            prompter.innerHTML = "<h2>Stacking up Languages</h2> <p>Always spending time between worlds, Half Elves know a variety of tongues. Select a bonus language</p>"
            if(!races[userProgress[0][0]].choices || !races[userProgress[0][0]].choices.languages){
                choiceNotPresent(userProgress, createDNDCharacter)
                
            }
            else{
                display(races[userProgress[0][0]].choices.languages, userProgress, createDNDCharacter, 'languages')
            }

            break
        case 3:
            //add bonus languages if user is half elf
            if(userProgress[2] !== null){userObj.languages[0].push(userProgress[2][0])}
            
            //choose skills if applicable
            prompter.innerHTML = "<h2>Skillz</h2> <p>As a Half Elf you've spent a lot of time alone honing your sills. Pick 2 that you're proficient in.</p>"
            if(!races[userProgress[0][0]].choices || !races[userProgress[0][0]].choices.skills){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                display(races[userProgress[0][0]].choices.skills, userProgress, createDNDCharacter)
            }

            break
        case 4:
            //add bonus skills if user is half elf
            if (userProgress[3] !== null) { for (let skill of userProgress[3]) { userObj.skills.push(skill) } }

            prompter.innerHTML = "<h2>Choose your stats</h2> <p>Another benefit of being a Half Elf is deciding where your strengths lay. Pick 2 stats to receive a +1 boost.</p>"
            
            //choose stats if applicable
            if(!races[userProgress[0][0]].choices || !races[userProgress[0][0]].choices.stats){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                display(races[userProgress[0][0]].choices.stats, userProgress, createDNDCharacter)
            }
           
            break
        case 5: 
            //add bonus stats if user is half elf
            if (userProgress[4] !== null) {
                for (let stat of userProgress[4]) {
                    userObj.stats[stat]++
                }
            }
            
            //choose dragon breath if applicable
            prompter.innerHTML = "<h2>Who's your dad?</h2> <p>Dragonborn are direct descendants of <i>real</i> dragons. Pick your heritage and your bonus dragon breath weapon.</p>"
            if(userProgress[0][0] !== 'Dragonborn'){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                display(races.Dragonborn.choices.weapons, userProgress, createDNDCharacter)
            }
           
            break
        case 6:
            //add dragonbreath if user is dragonborn
            if(userProgress[5] !== null){
                userObj.equipment.weapons.push(userProgress[5][0])
            }
            
            //choose subrace if applicable
            prompter.innerHTML = `<h2>Choose a subrace</h2> <p>There's more than one kind of ${userProgress[0][0]}. Which kind are you?</p>`
            if(!races[userProgress[0][0]].choices || !races[userProgress[0][0]].choices.subrace){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                display(races[userProgress[0][0]].choices.subrace, userProgress, createDNDCharacter)
            }
            
            break
        case 7: 
            //add subrace to user object
            if(userProgress[6] !== null){
                addSubraceData(userObj, subraces[userProgress[0][0]][userProgress[6][0]])
            }
            
            //choose spell
            prompter.innerHTML = "<h2>Choose a Cantrip</h2> <p>Cantrips are spells you can cast without any trouble. You know one right off the bat because you're a High Elf</p>"
            if(userProgress[6] === null || userProgress[6][0] !== 'High Elf'){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                prepareSpellOptions(0, null, 1, userProgress, createDNDCharacter)
            }
           
            break
        case 8:
            //add bonus spell if user is high elf
            if (userProgress[7] !== null) {userObj.spells.cantrips.push(userProgress[7][0]) }
    
            //choose language
            prompter.innerHTML = "<h2>Choose another language</h2> <p>Your status as a high elf means you're familiar with lots of languages. Pick one that you're fluent in.</p>"
            if (userProgress[6] === null || userProgress[6][0] !== 'High Elf') {
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else {
                display(subraces.Elf[userProgress[6][0]].choices.languages, userProgress, createDNDCharacter, 'languages')
            }
           
            break
        case 9:
            //add bonus language if user is high elf
            if (userProgress[8] !== null) { userObj.languages[0].push(userProgress[8][0]) }

            //choose class
            prompter.innerHTML = "<h2>Choose a class</h2> <p>There are lots of different kinds of adventurers, each with their own special abilities. What kind are you?</p>"
            display(classes, userProgress, createDNDCharacter)
            
            break
        case 10:
            //add class data to user object
            addClassData(userObj, classes[userProgress[9][0]])
            userObj.classType = userProgress[9][0]

            //change progressbar
            progressbar.className = 'thirty'

            //choose skills
            prompter.innerHTML = `<h2>Choose your skills</h2> <p>As a ${userProgress[9][0]}, you're proficient in different skills. Choose your strong suits</p>`
            
            progressChoices(classes, userProgress, 0, createDNDCharacter)
            
            break
        case 11:
            // add class skills to user object
            for (let skill of userProgress[10]) { userObj.skills.push(skill) }

            //choose class choices 2
            progressChoices(classes, userProgress, 1, createDNDCharacter)
            
            break
        case 12: 
            //add class choice 2 to user object
            if(userProgress[11] !== null){addClassChoices(userObj, userProgress[11], classes[userProgress[9][0]], 1)}

            //choose class choices 3
            progressChoices(classes, userProgress, 2, createDNDCharacter)
            
            break
        case 13:
            //add class choice 3 user object
            if (userProgress[12] !== null) { addClassChoices(userObj, userProgress[12], classes[userProgress[9][0]], 2) }

            //choose class choices 4
            progressChoices(classes, userProgress, 3, createDNDCharacter)
            
            break
        case 14: 
            //add class choice 4 to user object
            if (userProgress[13] !== null) { addClassChoices(userObj, userProgress[13], classes[userProgress[9][0]], 3) }
            
            //choose alignment
            prompter.innerHTML = `<h2>Are you a good ${userObj.classType} or a bad ${userObj.classType}?</h2> <p>Alignment is a 2 axis decision. Are you prone to selflessness or selfishness? Are you prone to order or spontaneity?</p>`
            display(alignment, userProgress, createDNDCharacter)
            
            break
        case 15:
            //add alignment to user object
            userObj.alignment = userProgress[14][0]

            //change progressbar
            progressbar.className = 'forty'

            //choose background
            prompter.innerHTML = '<h2>Pick a background</h2> <p>What were you doing before your adventure?</p>'
            display(backgrounds, userProgress, createDNDCharacter)
            
            break
        case 16:
            //add background to user object
            addBackgroundData(userObj, backgrounds[userProgress[15][0]])
            userObj.background = userProgress[15][0]
            
            //change progressbar
            progressbar.className = 'fifty'

            //choose background choices 
            if(!!backgrounds[userProgress[15][0]].choices === false){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                prompter.innerHTML = `<h2>Pick your languages</h2> <p>As a ${userObj.background} you can pick an additional language.</p>`
                display(languages, userProgress, createDNDCharacter, 'languages')
            }
           
            break
        case 17:
            //add bonus background languages 
            if (userProgress[15] !== null) { userObj.languages.push(userProgress[16]) } 
            
            //attribute stats
            prompter.innerHTML = '<h2>Parsel out your stats</h2> <p>Stats have been generated for you, decide where you want to attribute them.</p>'
            displayStats(userProgress, createDNDCharacter)
           
            break
        case 18:
            //add stats to user object
            for(let stat in userProgress[17][0]){
                userObj.stats[stat] += Number(userProgress[17][0][stat])
            }

            //change progressbar
            progressbar.className = 'sixty'

            //roll HP
            prompter.innerHTML = `<h2>How tough are you?</h2> <p>Roll the dice to see how many hit points your character has. Hit points are equal to this roll plue your constitution modifier (${Math.floor((userObj.stats.CON - 10) / 2)})</p>`
            hpRoll(userProgress, createDNDCharacter)
           
            break
        case 19:
            //add HP to user object
            userObj.HP += Number(userProgress[18][0])

            //change progressbar
            progressbar.className = 'seventy'

            //traits
            prompter.innerHTML = '<h2>What are your personality traits?</h2><p>Spend some time thinking about this, it makes the role playing experience much easier!</p>'
            let inputTag2 = `<textarea id="userInput" type="text" require maxlength="140" placeholder="How would you describe ${userProgress[1]}?" value="" autofocus></textarea>`
            userInput(inputTag2, createDNDCharacter, userProgress)

            break
        case 20:
            //add traits to user object
            userObj.traits = userProgress[19]
            
            //change progressbar
            progressbar.className = 'eighty'

            //ideals
            prompter.innerHTML = '<h2>What are your ideals?</h2><p>What is important to your character?</p>'

            let inputTag3 = `<textarea id="userInput" type="text" require maxlength="140" placeholder ="what does ${userProgress[1]} stand for?" value="" autofocus></textarea>`
            userInput(inputTag3, createDNDCharacter, userProgress)

            break
        case 21:
            //add ideals to user object
            userObj.ideals = userProgress[20]

            //change progressbar
            progressbar.className = 'ninety'

            //bonds
            prompter.innerHTML = '<h2>What are your bonds?</h2><p>Who or what does your character value?</p>'
            inputTag4 = `<textarea id="userInput" type="text" require maxlength="140" placeholder ="what is ${userProgress[1]} connected to?" value="" autofocus></textarea>`
            userInput(inputTag4, createDNDCharacter, userProgress)

            break
        case 22:
            //add bonds to user object 
            userObj.bonds = userProgress[21]

            //change progressbar
            progressbar.className = 'hundred'

            // flaws
            prompter.innerHTML = "<h2>What's wrong with you?</h2><p>Everybody's got them, what are your character's weaknesses?</p>"
            inputTag5 = `<textarea id="userInput" type="text" require maxlength="140" placeholder ="what are ${userProgress[1]}'s flaws?" value="" autofocus></textarea>`
            userInput(inputTag5, createDNDCharacter, userProgress)
            
            break
        default:
            //add bonds to user object 
            userObj.flaws = userProgress[22]

            createCharSheet(userObj)
            return
    }
    characterProg(userObj)   
    storeProgress(userObj, userProgress)
}



createDNDCharacter()

const expObj = {createDNDCharacter, userProgress, userObj}

module.exports = expObj

},{"./charProg":1,"./classChoices":2,"./createCharSheet":3,"./createUserObj":4,"./data-objects/alignment":5,"./data-objects/backgrounds":6,"./data-objects/classes":7,"./data-objects/languages":9,"./data-objects/races":10,"./data-objects/subraces":13,"./diceStats":14,"./display":15,"./hpRoll":16,"./spellDisplay":19,"./storeProgress":20,"./userInput":21}],18:[function(require,module,exports){
function selectionComplete(progressLog, finalChoice, triggerFn){
    progressLog.push(finalChoice)

    document.querySelector('#next').classList.toggle('hidden')

    triggerFn()

}

module.exports = selectionComplete
},{}],19:[function(require,module,exports){

const spells = require('./data-objects/spells')

const {select} = require('./display')

function prepareSpellOptions(level, className, numOfChoices = 1, progressLog, triggerFn){
    let holder = document.getElementById('holder')
    holder.innerHTML = ''
    let options = []

    for(let spell of spells){
        if(spell.level === level && !!className === true){
            for(let i = 0; i < spell.classes.length; i++){
                if (className === spell.classes[i].name){
                    options.push(`
                        <div class="card-wrapper spell-card">
                        
                            <div class="card">
                                <div class="card-front">
                                    <h3>${spell.name}</h3>
                                    <p>${spell.desc[0]}</p>
                                    <div class="btn-turn-to-back"></div>
                                </div>

                                <div class="card-back">
                                    <p>Range: ${spell.range}</p>
                                    <p>Duration: ${spell.duration}</p>
                                    <p>Casting Time: ${spell.casting_time}</p>
                                    <div class="btn-turn-to-front"></div>
                                </div>

                            </div>

                        </div>`)            
                }
            }
        }
        if(!!className === false){
            if(spell.level === 0){
                options.push(`
                        <div class="card-wrapper">
                        
                            <div class="card">
                                <div class="card-front">
                                    <h3>${spell.name}</h3>
                                    <p>${spell.desc[0]}</p>
                                    <div class="btn-turn-to-back"></div>
                                </div>

                                <div class="card-back">
                                    <p>Back</p>
                                    <div class="btn-turn-to-front"></div>
                                </div>

                            </div>

                        </div>`)
            }
        }
    }
    holder.innerHTML = options.join('\n')

    let cards = document.querySelectorAll('.card')
    let finalChoice = []
    let prepCardsForSelection = function (e) { select(e, numOfChoices, finalChoice, progressLog, triggerFn) }
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', prepCardsForSelection)
        document.querySelectorAll('.btn-turn-to-front')[i].style.visibility = 'visible';
        document.querySelectorAll('.btn-turn-to-back')[i].style.visibility = 'visible';

        document.querySelectorAll('.btn-turn-to-front')[i].onclick = function (event) {
            event.stopPropagation();
            document.querySelectorAll('.card')[i].classList.toggle('do-flip')
        };

        document.querySelectorAll('.btn-turn-to-back')[i].onclick = function (event) {
            event.stopPropagation()
            document.querySelectorAll('.card')[i].classList.toggle('do-flip');

        };
    }
}


module.exports = prepareSpellOptions

},{"./data-objects/spells":12,"./display":15}],20:[function(require,module,exports){

function storeProgress(user, progressLog){
    let storageString = localStorage.getItem('storedProgress')
    let storage = JSON.parse(storageString)
    let toStore = { user, progressLog}
    storage.push(toStore)
    storageString = JSON.stringify(storage)
    localStorage.setItem('storedProgress', storageString)
}

function revertProgress(){
    let storageString = localStorage.getItem('storedProgress')
    let storage = JSON.parse(storageString)
    storage.pop()

    let mostRecentlyStored = storage[storage.length - 1]
    //returns object w/ user and progressLog keys

    let lastLog = mostRecentlyStored.progressLog
    //returns array
    
    let lastDecision = lastLog[lastLog.length - 1]
    //returns last item of array
    
    if(lastDecision !== null){
        return storage[storage.length - 1] 
    }
    else{
        while (lastDecision === null) {
            storage.pop()
            mostRecentlyStored = storage[storage.length - 1]
            lastLog = mostRecentlyStored.progressLog
            lastDecision = lastLog[lastLog.length - 1]
        }
           
        storageString = JSON.stringify(storage)

        localStorage.setItem('storedProgress', storageString)

        return storage[storage.length - 1]
    }
}


function choiceNotPresent(progressLog, triggerFn) {
    progressLog.push(null)
    triggerFn()
}

module.exports = { storeProgress, revertProgress, choiceNotPresent }

},{}],21:[function(require,module,exports){

const races = require('./data-objects/races')

function userInput(inputTag, triggerFn, progressLog, topic){
    const holder = document.getElementById('holder')
    document.querySelector('#choiceDisplay').textContent = ''
    holder.innerHTML = `<div id="inputScreen">${inputTag}</div>`
    if(topic === 'names'){

            holder.children[0].innerHTML += `<h3>Having trouble thinking of ${topic}?</h3><br>
            <ul>
                <li><b>Male ${progressLog[0][0]} Names:</b></li>
                <li>${races[progressLog[0][0]].names[0].join('</li><li>')}</li>
            </ul>
            <ul>
                <li><b>Female ${progressLog[0][0]} Names:</b></li>
                <li>${races[progressLog[0][0]].names[1].join('</li><li>')}</li>
            </ul>`
    }            


    document.querySelector('#userInput').addEventListener('keyup', function(e){
        if(e.target.value.length > 0){
            let next = document.querySelector('#next')
            let addUserInputToLog = function(){inputComplete(triggerFn, progressLog)}
            next.onclick = addUserInputToLog
            next.classList.remove('hidden')
        }
        else if(e.target.value.length === 0){
            next.classList.add('hidden')
        }
        
    })
    
} 

function inputComplete(triggerFn, progressLog){
    let finalInput = document.getElementById('userInput').value
    progressLog.push(finalInput)
    
    document.querySelector('#next').classList.toggle('hidden')
    triggerFn()
}

module.exports = userInput
},{"./data-objects/races":10}]},{},[17]);
