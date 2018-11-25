(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const {display, readyToGo, skipDisplay, selectFrom, preventDupe, createSpellList, addQuantity, prepForRadioSelection, createChoiceArray, displayFighterChoice, displayRogueChoice, displaySorcererChoice} = require('./selection')
const {addDifferentListeners} = require('./utils')
const languages = require('./data/languages')
const equipment = require('./data/equipment')
const user = require('./user')
const races = require('./data/races')
const subraces = require('./data/subraces')
const skills = require('./data/skills')
const spells = require('./data/spells')
const classes = require('./data/classes')
const startingEquip = require('./data/startingEquipment')
const {standardTemplate, radioTemplate, backStoryForm, alignmentTemplate} = require('./templates')
const stats = require('./stats')
const hp = require('./hp')
const backgrounds = require('./data/backgrounds')
const forms = require('./forms.js')

function raceChoice(array, returnFn){
    user.numChoices = 1
    display(array, standardTemplate)
    addDifferentListeners('#displayBoard', ['click', 'touch'], function(){readyToGo(returnFn)})  
}

function extraRaceChoices(returnFn){
    user.numChoices = 1
    if(user.raceId === 3 || user.raceId === 6){
        display(languages, standardTemplate)
    } 
    else if(user.raceId === 0){
        selectFrom(races[user.raceId].starting_proficiency_options, equipment)
    }
    else if(user.raceId === 4){
        display(races[4].trait_options.from, standardTemplate)
    }
    else{
        return skipDisplay(returnFn)
    }

    addDifferentListeners('#displayBoard', ['click', 'touch'], function () { readyToGo(returnFn) })  
}

function subraceChoice(returnFn){
    
    if(races[user.raceId].subraces.length === 0) return skipDisplay(returnFn)
    user.numChoices = 1
    selectFrom(races[user.raceId].subraces, subraces)
}

function skillDisplay(numChoices, list = null) {
    user.numChoices = numChoices
    if (!!list) {
        let optionsArray = skills.reduce((acc, skill) => {
            for (let item of list) {
                if (item.name === skill.name){ acc.push(skill)}
            }
            return acc
        }, [])
        let result = preventDupe(optionsArray)
        
        return display(result)
    }
    let result = preventDupe(skills)
    display(result, standardTemplate)
}


function subraceExtraChoices(key, array, returnFn){
    user.numChoices = 0
    if (user.log[2] == 'High Elf') { 
        user.numChoices = 1
        selectFrom(subraces[user.subraceId][key], array)
    }
    else return skipDisplay(returnFn)
}

function classSkillChoice(returnFn){
    user.numChoices = classes[user.classId].proficiency_choices[0].choose
    skillDisplay(user.numChoices, classes[user.classId].proficiency_choices[0].from)
    addDifferentListeners('#displayBoard', ['click', 'touch'], function () { readyToGo(returnFn) })  
}

function classExtraChoices(returnFn){
    if( (user.classId === 5 || user.classId === 1) && user.log.length === 7){
        user.classId === 5 ? user.numChoices = 1 : user.numChoices = 3
        selectFrom(classes[user.classId].proficiency_choices[1], equipment)
        return addDifferentListeners('#displayBoard', ['click', 'touch'], function () { readyToGo(returnFn) })  
    } 
    else if(user.classId === 5){
        user.numChoices = 1
        selectFrom(classes[user.classId].proficiency_choices[2], equipment)
        return addDifferentListeners('#displayBoard', ['click', 'touch'], function () { readyToGo(returnFn) })  
    } 
    skipDisplay(returnFn)
}

function spellChoices(lvl, returnFn){
    const id = user.classId
    if(id >= 1 && id <= 3 || id >= 9){
        let spellList = createSpellList(lvl, spells)
        if (!lvl) user.numChoices = classes[user.classId].spellcasting.cantrips
        else user.numChoices = classes[user.classId].spellcasting.first_level
        if (!user.numChoices){ return skipDisplay(returnFn)}
        display(spellList, standardTemplate)
        addDifferentListeners('#displayBoard', ['click', 'touch'], function () { readyToGo(returnFn) })  
    }
    else skipDisplay(returnFn)
}

function equipmentChoices(num, returnFn){
    let equipOpts = startingEquip[user.classId][`choice_${num}`]
    if (!equipOpts)return skipDisplay(returnFn)
    const quantityArray = []
    let choiceArray = createChoiceArray(equipOpts, quantityArray)
    selectFrom(choiceArray, equipment, radioTemplate)
    addQuantity(quantityArray)
    prepForRadioSelection()
    displayBoard.innerHTML = `<h2>Equipment Choice ${num}</h2> ${displayBoard.innerHTML}`
}

function classFeatureChoices(returnFn){
    user.numChoices = 1
    if (user.classId === 4) return displayFighterChoice()
    if (user.classId === 8) return displayRogueChoice()
    if (user.classId === 9) return displaySorcererChoice()

    skipDisplay(returnFn)
}

function allocateStats(returnFn){
    stats.prepForStats()
    addDifferentListeners('#displayBoard', ['click', 'touch'], function () { stats.readyToGo(returnFn, !document.querySelector('#stats').children.length) })  
}

function upgradeStats(returnFn){
    if(user.raceId !== 6) return skipDisplay(returnFn)
    stats.addBonusStats()
    addDifferentListeners('#displayBoard', ['click', 'touch'], function () { stats.readyToGo(returnFn, document.querySelectorAll('.added').length === 2) })  
}

function rollHP(returnFn){
    document.querySelector('#displayBoard').innerHTML = '<div class="dice"></div>'
    const dice = document.querySelector('.dice')
    dice.onclick = function(){hp(returnFn)}
}

function backgroundChoice(returnFn){
    user.numChoices = 1
    display(backgrounds)
    addDifferentListeners('#displayBoard', ['click', 'touch'], function () { readyToGo(returnFn)})
}

function backStory(returnFn){
    document.querySelector('#displayBoard').innerHTML = backStoryForm()
    addDifferentListeners('#displayBoard', ['click', 'touch', 'keydown'], function () { forms.readyToGo(returnFn) })

}

function alignment(returnFn){
    user.numChoices = 1
    document.querySelector('#displayBoard').innerHTML = alignmentTemplate()
    forms.prepForSelection()
    addDifferentListeners('#displayBoard', ['click', 'touch'], function () { forms.addAlign(returnFn)})
}


module.exports = {raceChoice, extraRaceChoices, subraceChoice, skillDisplay, subraceExtraChoices, classSkillChoice, classExtraChoices, spellChoices, equipmentChoices, classFeatureChoices, allocateStats, upgradeStats, rollHP, backgroundChoice, backStory, alignment }
},{"./data/backgrounds":2,"./data/classes":3,"./data/equipment":4,"./data/languages":5,"./data/races":6,"./data/skills":7,"./data/spells":8,"./data/startingEquipment":9,"./data/subraces":10,"./forms.js":11,"./hp":12,"./selection":14,"./stats":15,"./templates":16,"./user":17,"./utils":18}],2:[function(require,module,exports){
const languages = require('./languages')

const backgrounds = [
    {
    name: "Acolyte",
    index:1,
    skills: ['Insight', 'Religion'], 
    choices:{languages: [2, languages]},
    equipment: ['holy symbol', 'prayer book', '5 sticks of incense', 'vestments', 'common clothes', '15 GP'],
    desc:'',
    img: 'img/acolyte.jpg'
  },
   {
    name: "Charlatan",
    index: 2,
    skills: ['Deception', 'Sleight of Hand'],
    profs:{tools:['disguise kit', 'forgery kit']},
    equipment: ['fine clothes', 'disguise kit', 'tools of a con of your choice', '15 GP'],
    desc: '',
    img: 'img/charlatan.jpg'
  },
  {
    name: "Criminal",
    index: 3,
    skills: ['Deception', 'Stealth'],
    profs: { tools: ['One type of gaming set', "thieve's tools"] },
    equipment: ['crowbar', 'dark common clothes', '15 GP'],
    desc: '',
    img: 'img/criminal.jpg'
    
  },
  {
    name:"Entertainer",
    index: 4,
    skills: ['Acrobatics', 'Performance'],
    profs: { tools: ['disguise kit', 'musical instrument'] },
    equipment: ['musical instrument', 'the favor of an admirer', 'costume', '15 GP'],
    desc: '',
    img: 'img/entertainer.jpg'
  },
  {
    name: "Folk Hero",
    index: 5,
    skills: ['Animal Handling', 'Survival'],
    profs: { tools: ["artisan's tools", 'land vehicles'] },
    equipment: ["artisan's tools of your choice", 'shovel', 'iron pot', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/folkHero.jpg'
  },
  { 
    name: "Guild Artisan",
    index: 6,
    skills: ['Insight', 'Persuasion'],
    profs: { tools: ["artisan's tools", 'land vehicles'] },
    choices: { languages: [1, languages] },
    equipment: ["artisan's tools of your choice", 'a letter of introduction from your guild', "traveler's clothes", '15 GP'],
    desc: '',
    img: 'img/stoutHalfling.jpg'
  },
  {
    name: "Hermit",
    index: 7,
    skills: ['Medicine', 'Religion'],
    profs: { tools: ['herbalism kit'] },
    choices: { languages: [1, languages] },
    equipment: ['scroll case full of notes from studies or prayers', 'winter blanket', 'common clothes', 'herbalism kit', '5 GP'],
    desc: '',
    img: 'img/hermit.jpg'
  },
  {
    name: "Noble",
    index: 8,
    skills: ['History', 'Persuasion'],
    profs: { tools: ['One type of gaming set'] },
    choices: { languages: [1, languages] },
    equipment: ['scroll of pedigree', 'signet ring', 'fine clothes', '25 GP'],
    desc: '',
    img: 'img/noble.jpg'
  },
  {
    name: "Outlander",
    index: 9,
    skills: ['Athletics', 'Survival'],
    profs: { tools: ['musical instrument'] },
    choices: { languages: [1, languages] },
    equipment: ['staff', 'hunting trap', 'trophy from an animal you killed', "traveler's kit", '10 GP'],
    desc: '',
    img: 'img/outlander.jpg'
  },
  {
    name: "Sage",
    index: 10,
    skills: ['Arcana', 'History'],
    choices: { languages: [2, languages] },
    equipment: ['bottle of black ink', 'quill', 'small knife', 'letter from dead colleague posing an unanswered question', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/wizard.jpg'
  },
  {
    name: "Sailor",
    index: 11,
    skills: ['Athletics', 'Perception'],
    profs: { tools: ["navigator's tools", 'water vehicles'] },
    equipment: ['club', 'silk rope (50ft)', 'lucky charm', "common clothes", '10 GP'],
    desc: '',
    img: 'img/sailor.jpg'
  },
  {
    name: "Soldier",
    index: 12,
    skills: ['Athletics', 'Intimidation'],
    profs: { tools: ['disguise kit', 'land vehicles'] },
    equipment: ['insignia of rank', 'trophy from a fallen enemy', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/soldier.jpg'
  },
  {
    name:"Urchin",
    index: 13,
    skills: ['Sleight of Hand', 'Stealth'],
    profs: { tools: ['disguise kit', "thieves' tools"] },
    equipment: ['small knife', 'map of home town', 'pet mouse', 'a toke to remember your parents', 'common clothes', '10 GP'],
    desc: '',
    img: 'img/urchin.jpg'
  }
]

module.exports = backgrounds
},{"./languages":5}],3:[function(require,module,exports){
const classes = [
	{
		"index": 1,
		"name": "Barbarian",
		img: 'img/barbarian.jpg',
		"hit_die": 12,
		"proficiency_choices": [
			{
				"choose": 2,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/106",
						"name": "Animal Handling"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/108",
						"name": "Athletics"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/112",
						"name": "Intimidation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/115",
						"name": "Nature"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/116",
						"name": "Perception"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/122",
						"name": "Survival"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "Light armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/1"
			},
			{
				"name": "Medium armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/2"
			},
			{
				"name": "Shields",
				"url": "http://www.dnd5eapi.co/api/proficiencies/18"
			},
			{
				"name": "Simple weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/19"
			},
			{
				"name": "Martial weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/20"
			}
		],
		"saving_throws": [
			{
				"name": "STR",
				"url": "http://www.dnd5eapi.co/api/ability-scores/1"
			},
			{
				"name": "CON",
				"url": "http://www.dnd5eapi.co/api/ability-scores/3"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/1",
			"class": "Barbarian"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Barbarian/levels",
			"class": "Barbarian"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/1",
				"name": "Berserker"
			}
		],
		"spellcasting": {
			
		},
		"url": "http://www.dnd5eapi.co/api/classes/1"
	},
	{
		"index": 2,
		"name": "Bard",
		img: 'img/bard.jpg',
		"hit_die": 8,
		"proficiency_choices": [
			{
				"choose": 3,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/105",
						"name": "Acrobatics"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/106",
						"name": "Animal Handling"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/107",
						"name": "Arcana"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/108",
						"name": "Athletics"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/109",
						"name": "Deception"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/110",
						"name": "History"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/111",
						"name": "Insight"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/112",
						"name": "Intimidation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/113",
						"name": "Investigation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/114",
						"name": "Medicine"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/115",
						"name": "Nature"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/116",
						"name": "Perception"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/117",
						"name": "Performance"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/118",
						"name": "Persuasion"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/119",
						"name": "Religion"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/120",
						"name": "Sleight of Hand"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/121",
						"name": "Stealth"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/122",
						"name": "Survival"
					}
				]
			},
			{
				"choose": 3,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/81",
						"name": "Bagpipes"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/82",
						"name": "Drum"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/83",
						"name": "Dulcimer"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/84",
						"name": "Flute"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/85",
						"name": "Lute"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/86",
						"name": "Lyre"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/87",
						"name": "Horn"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/88",
						"name": "Pan flute"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/89",
						"name": "Shawm"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/90",
						"name": "Viol"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "Light armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/1"
			},
			{
				"name": "Simple weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/19"
			},
			{
				"name": "Longswords",
				"url": "http://www.dnd5eapi.co/api/proficiencies/42"
			},
			{
				"name": "Rapiers",
				"url": "http://www.dnd5eapi.co/api/proficiencies/46"
			},
			{
				"name": "Shortswords",
				"url": "http://www.dnd5eapi.co/api/proficiencies/48"
			},
			{
				"name": "Crossbows, hand",
				"url": "http://www.dnd5eapi.co/api/proficiencies/54"
			}
		],
		"saving_throws": [
			{
				"name": "DEX",
				"url": "http://www.dnd5eapi.co/api/ability-scores/2"
			},
			{
				"name": "CHA",
				"url": "http://www.dnd5eapi.co/api/ability-scores/6"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/2",
			"class": "Bard"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Bard/levels",
			"class": "Bard"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/2",
				"name": "Lore"
			}
		],
		"spellcasting": {
            cantrips: 2,
            first_level:4,
            ability: 'CHA',
            slots: null
		},
		"url": "http://www.dnd5eapi.co/api/classes/2"
	},
	{
		"index": 3,
		"name": "Cleric",
		img: 'img/cleric.jpg',
		"hit_die": 8,
		"proficiency_choices": [
			{
				"choose": 2,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/110",
						"name": "History"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/111",
						"name": "Insight"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/114",
						"name": "Medicine"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/118",
						"name": "Persuasion"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/119",
						"name": "Religion"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "Light armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/1"
			},
			{
				"name": "Medium armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/2"
			},
			{
				"name": "Shields",
				"url": "http://www.dnd5eapi.co/api/proficiencies/18"
			},
			{
				"name": "Simple weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/19"
			}
		],
		"saving_throws": [
			{
				"name": "WIS",
				"url": "http://www.dnd5eapi.co/api/ability-scores/5"
			},
			{
				"name": "CHA",
				"url": "http://www.dnd5eapi.co/api/ability-scores/6"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/3",
			"class": "Cleric"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Cleric/levels",
			"class": "Cleric"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/3",
				"name": "Life"
			}
		],
		"spellcasting": {
            cantrips: 3,
            first_level: null,
            ability: 'WIS',
            slots: null
		},
		"url": "http://www.dnd5eapi.co/api/classes/3"
	},
	{
		"index": 4,
		"name": "Druid",
		img: 'img/druid.jpg',
		"hit_die": 8,
		"proficiency_choices": [
			{
				"choose": 2,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/106",
						"name": "Animal Handling"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/107",
						"name": "Arcana"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/111",
						"name": "Insight"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/114",
						"name": "Medicine"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/115",
						"name": "Nature"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/116",
						"name": "Perception"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/119",
						"name": "Religion"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/122",
						"name": "Survival"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "Light armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/1"
			},
			{
				"name": "Medium armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/2"
			},
			{
				"name": "Shields",
				"url": "http://www.dnd5eapi.co/api/proficiencies/18"
			},
			{
				"name": "Clubs",
				"url": "http://www.dnd5eapi.co/api/proficiencies/21"
			},
			{
				"name": "Daggers",
				"url": "http://www.dnd5eapi.co/api/proficiencies/22"
			},
			{
				"name": "Javelins",
				"url": "http://www.dnd5eapi.co/api/proficiencies/25"
			},
			{
				"name": "Maces",
				"url": "http://www.dnd5eapi.co/api/proficiencies/27"
			},
			{
				"name": "Quarterstaffs",
				"url": "http://www.dnd5eapi.co/api/proficiencies/28"
			},
			{
				"name": "Sickles",
				"url": "http://www.dnd5eapi.co/api/proficiencies/29"
			},
			{
				"name": "Spears",
				"url": "http://www.dnd5eapi.co/api/proficiencies/30"
			},
			{
				"name": "Darts",
				"url": "http://www.dnd5eapi.co/api/proficiencies/32"
			},
			{
				"name": "Slings",
				"url": "http://www.dnd5eapi.co/api/proficiencies/34"
			},
			{
				"name": "Scimitars",
				"url": "http://www.dnd5eapi.co/api/proficiencies/47"
			},
			{
				"name": "Herbalism Kit",
				"url": "http://www.dnd5eapi.co/api/proficiencies/93"
			}
		],
		"saving_throws": [
			{
				"name": "INT",
				"url": "http://www.dnd5eapi.co/api/ability-scores/4"
			},
			{
				"name": "WIS",
				"url": "http://www.dnd5eapi.co/api/ability-scores/5"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/4",
			"class": "Druid"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Druid/levels",
			"class": "Druid"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/4",
				"name": "Land"
			}
		],
		"spellcasting": {
            cantrips: 2,
            first_level: null,
            ability: 'WIS',
            slots: null
		},
		"url": "http://www.dnd5eapi.co/api/classes/4"
	},
	{
		"index": 5,
		"name": "Fighter",
		img: 'img/fighter.jpg',
		"hit_die": 10,
		"proficiency_choices": [
			{
				"choose": 2,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/105",
						"name": "Acrobatics"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/106",
						"name": "Animal Handling"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/108",
						"name": "Athletics"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/110",
						"name": "History"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/111",
						"name": "Insight"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/112",
						"name": "Intimidation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/116",
						"name": "Perception"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/122",
						"name": "Survival"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "All armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/4"
			},
			{
				"name": "Shields",
				"url": "http://www.dnd5eapi.co/api/proficiencies/18"
			},
			{
				"name": "Simple weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/19"
			},
			{
				"name": "Martial weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/20"
			}
		],
		"saving_throws": [
			{
				"name": "STR",
				"url": "http://www.dnd5eapi.co/api/ability-scores/1"
			},
			{
				"name": "CON",
				"url": "http://www.dnd5eapi.co/api/ability-scores/3"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/5",
			"class": "Fighter"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Fighter/levels",
			"class": "Fighter"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/5",
				"name": "Champion"
			}
		],
		"spellcasting": {
			
		},
		"url": "http://www.dnd5eapi.co/api/classes/5"
	},
	{
		"index": 6,
		"name": "Monk",
		img: 'img/monk.jpg',
		"hit_die": 8,
		"proficiency_choices": [
            {
                "choose": 2,
                "type": "proficiencies",
                "from": [
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/105",
                        "name": "Acrobatics"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/108",
                        "name": "Athletics"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/110",
                        "name": "History"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/111",
                        "name": "Insight"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/119",
                        "name": "Religion"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/121",
                        "name": "Stealth"
                    }
                ]
            },
			{
				"choose": 1,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/81",
						"name": "Bagpipes"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/82",
						"name": "Drum"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/83",
						"name": "Dulcimer"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/84",
						"name": "Flute"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/85",
						"name": "Lute"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/86",
						"name": "Lyre"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/87",
						"name": "Horn"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/88",
						"name": "Pan flute"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/89",
						"name": "Shawm"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/90",
						"name": "Viol"
					}
				]
            },
            {
                "choose": 1,
                "type": "proficiencies",
                "from": [
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/58",
                        "name": "Alchemist’s supplies"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/59",
                        "name": "Brewer's supplies"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/60",
                        "name": "Calligrapher's supplies"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/61",
                        "name": "Carpenter's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/62",
                        "name": "Cartographer's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/63",
                        "name": "Cobbler's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/64",
                        "name": "Cook's utensils"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/65",
                        "name": "Glassblower's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/66",
                        "name": "Jeweler's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/67",
                        "name": "Leatherworker's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/68",
                        "name": "Mason's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/69",
                        "name": "Painter's supplies"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/70",
                        "name": "Potter's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/71",
                        "name": "Smith's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/72",
                        "name": "Tinker's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/73",
                        "name": "Weaver's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/74",
                        "name": "Woodcarver's tools"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/75",
                        "name": "Disguise kit"
                    },
                    {
                        "url": "http://www.dnd5eapi.co/api/proficiencies/76",
                        "name": "Forgery kit"
                    }
                ]
            }			
		],
		"proficiencies": [
			{
				"name": "Simple weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/19"
			},
			{
				"name": "Shortswords",
				"url": "http://www.dnd5eapi.co/api/proficiencies/48"
			}
		],
		"saving_throws": [
			{
				"name": "STR",
				"url": "http://www.dnd5eapi.co/api/ability-scores/1"
			},
			{
				"name": "DEX",
				"url": "http://www.dnd5eapi.co/api/ability-scores/2"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/6",
			"class": "Monk"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Monk/levels",
			"class": "Monk"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/6",
				"name": "Open Hand"
			}
		],
		"spellcasting": {
			
		},
		"url": "http://www.dnd5eapi.co/api/classes/6"
	},
	{
		"index": 7,
		"name": "Paladin",
		img: 'img/paladin.jpg',
		"hit_die": 10,
		"proficiency_choices": [
			{
				"choose": 2,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/108",
						"name": "Athletics"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/111",
						"name": "Insight"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/112",
						"name": "Intimidation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/114",
						"name": "Medicine"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/118",
						"name": "Persuasion"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/119",
						"name": "Religion"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "All armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/4"
			},
			{
				"name": "Shields",
				"url": "http://www.dnd5eapi.co/api/proficiencies/18"
			},
			{
				"name": "Simple weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/19"
			},
			{
				"name": "Martial weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/20"
			}
		],
		"saving_throws": [
			{
				"name": "WIS",
				"url": "http://www.dnd5eapi.co/api/ability-scores/5"
			},
			{
				"name": "CHA",
				"url": "http://www.dnd5eapi.co/api/ability-scores/6"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/7",
			"class": "Paladin"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Paladin/levels",
			"class": "Paladin"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/7",
				"name": "Devotion"
			}
		],
		"spellcasting": {
			
		},
		"url": "http://www.dnd5eapi.co/api/classes/7"
	},
	{
		"index": 8,
		"name": "Ranger",
		img: 'img/ranger.jpg',
		"hit_die": 10,
		"proficiency_choices": [
			{
				"choose": 3,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/106",
						"name": "Animal Handling"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/108",
						"name": "Athletics"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/111",
						"name": "Insight"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/113",
						"name": "Investigation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/115",
						"name": "Nature"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/116",
						"name": "Perception"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/121",
						"name": "Stealth"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/122",
						"name": "Survival"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "Light armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/1"
			},
			{
				"name": "Medium armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/2"
			},
			{
				"name": "Shields",
				"url": "http://www.dnd5eapi.co/api/proficiencies/18"
			},
			{
				"name": "Simple weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/19"
			},
			{
				"name": "Martial weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/20"
			}
		],
		"saving_throws": [
			{
				"name": "STR",
				"url": "http://www.dnd5eapi.co/api/ability-scores/1"
			},
			{
				"name": "DEX",
				"url": "http://www.dnd5eapi.co/api/ability-scores/2"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/8",
			"class": "Ranger"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Ranger/levels",
			"class": "Ranger"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/8",
				"name": "Hunter"
			}
		],
		"spellcasting": {
			"url": "http://www.dnd5eapi.co/api/spellcasting/5",
			"class": "Ranger"
		},
		"url": "http://www.dnd5eapi.co/api/classes/8"
	},
	{
		"index": 9,
		"name": "Rogue",
		img: 'img/rogue.jpg',
		"hit_die": 8,
		"proficiency_choices": [
			{
				"choose": 4,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/105",
						"name": "Acrobatics"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/108",
						"name": "Athletics"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/109",
						"name": "Deception"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/111",
						"name": "Insight"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/112",
						"name": "Intimidation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/113",
						"name": "Investigation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/116",
						"name": "Perception"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/117",
						"name": "Performance"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/118",
						"name": "Persuasion"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/120",
						"name": "Sleight of Hand"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/121",
						"name": "Stealth"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "Light armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/1"
			},
			{
				"name": "Simple weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/19"
			},
			{
				"name": "Longswords",
				"url": "http://www.dnd5eapi.co/api/proficiencies/42"
			},
			{
				"name": "Rapiers",
				"url": "http://www.dnd5eapi.co/api/proficiencies/46"
			},
			{
				"name": "Shortswords",
				"url": "http://www.dnd5eapi.co/api/proficiencies/48"
			},
			{
				"name": "Crossbows, hand",
				"url": "http://www.dnd5eapi.co/api/proficiencies/54"
			},
			{
				"name": "Thieves' Tools",
				"url": "http://www.dnd5eapi.co/api/proficiencies/96"
			}
		],
		"saving_throws": [
			{
				"name": "DEX",
				"url": "http://www.dnd5eapi.co/api/ability-scores/2"
			},
			{
				"name": "INT",
				"url": "http://www.dnd5eapi.co/api/ability-scores/4"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/9",
			"class": "Rogue"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Rogue/levels",
			"class": "Rogue"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/9",
				"name": "Thief"
			}
		],
		"spellcasting": {
			
		},
		"url": "http://www.dnd5eapi.co/api/classes/9"
	},
	{
		"index": 10,
		"name": "Sorcerer",
		img: 'img/sorcerer.jpg',
		"hit_die": 6,
		"proficiency_choices": [
			{
				"choose": 2,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/107",
						"name": "Arcana"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/109",
						"name": "Deception"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/111",
						"name": "Insight"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/112",
						"name": "Intimidation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/118",
						"name": "Persuasion"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/119",
						"name": "Religion"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "Daggers",
				"url": "http://www.dnd5eapi.co/api/proficiencies/22"
			},
			{
				"name": "Quarterstaffs",
				"url": "http://www.dnd5eapi.co/api/proficiencies/28"
			},
			{
				"name": "Darts",
				"url": "http://www.dnd5eapi.co/api/proficiencies/32"
			},
			{
				"name": "Slings",
				"url": "http://www.dnd5eapi.co/api/proficiencies/34"
			}
		],
		"saving_throws": [
			{
				"name": "CON",
				"url": "http://www.dnd5eapi.co/api/ability-scores/3"
			},
			{
				"name": "CHA",
				"url": "http://www.dnd5eapi.co/api/ability-scores/6"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/10",
			"class": "Sorcerer"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Sorcerer/levels",
			"class": "Sorcerer"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/10",
				"name": "Draconic"
			}
		],
		"spellcasting": {
            cantrips: 4,
            first_level: 2,
            ability: 'CHA',
            slots: null
		},
		"url": "http://www.dnd5eapi.co/api/classes/10"
	},
	{
		"index": 11,
		"name": "Warlock",
		img: 'img/warlock.jpg',
		"hit_die": 8,
		"proficiency_choices": [
			{
				"choose": 2,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/107",
						"name": "Arcana"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/109",
						"name": "Deception"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/110",
						"name": "History"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/112",
						"name": "Intimidation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/113",
						"name": "Investigation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/115",
						"name": "Nature"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/119",
						"name": "Religion"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "Light armor",
				"url": "http://www.dnd5eapi.co/api/proficiencies/1"
			},
			{
				"name": "Simple weapons",
				"url": "http://www.dnd5eapi.co/api/proficiencies/19"
			}
		],
		"saving_throws": [
			{
				"name": "WIS",
				"url": "http://www.dnd5eapi.co/api/ability-scores/5"
			},
			{
				"name": "CHA",
				"url": "http://www.dnd5eapi.co/api/ability-scores/6"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/11",
			"class": "Warlock"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Warlock/levels",
			"class": "Warlock"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/11",
				"name": "Fiend"
			}
		],
		"spellcasting": {
            cantrips: 2,
            first_level: 2,
            ability: 'CHA',
            slots: null
		},
		"url": "http://www.dnd5eapi.co/api/classes/11"
	},
	{
		"index": 12,
		"name": "Wizard",
		img: 'img/wizard.jpg',
		"hit_die": 6,
		"proficiency_choices": [
			{
				"choose": 2,
				"type": "proficiencies",
				"from": [
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/107",
						"name": "Arcana"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/110",
						"name": "History"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/111",
						"name": "Insight"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/113",
						"name": "Investigation"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/114",
						"name": "Medicine"
					},
					{
						"url": "http://www.dnd5eapi.co/api/proficiencies/119",
						"name": "Religion"
					}
				]
			}
		],
		"proficiencies": [
			{
				"name": "Daggers",
				"url": "http://www.dnd5eapi.co/api/proficiencies/22"
			},
			{
				"name": "Quarterstaffs",
				"url": "http://www.dnd5eapi.co/api/proficiencies/28"
			},
			{
				"name": "Darts",
				"url": "http://www.dnd5eapi.co/api/proficiencies/32"
			},
			{
				"name": "Slings",
				"url": "http://www.dnd5eapi.co/api/proficiencies/34"
			}
		],
		"saving_throws": [
			{
				"name": "INT",
				"url": "http://www.dnd5eapi.co/api/ability-scores/4"
			},
			{
				"name": "WIS",
				"url": "http://www.dnd5eapi.co/api/ability-scores/5"
			}
		],
		"starting_equipment": {
			"url": "http://www.dnd5eapi.co/api/startingequipment/12",
			"class": "Wizard"
		},
		"class_levels": {
			"url": "http://www.dnd5eapi.co/api/classes/Wizard/levels",
			"class": "Wizard"
		},
		"subclasses": [
			{
				"url": "http://www.dnd5eapi.co/api/subclasses/12",
				"name": "Evocation"
			}
		],
		"spellcasting": {
            cantrips: 3,
            first_level: null,
            ability: 'INT',
            slots: null
		},
		"url": "http://www.dnd5eapi.co/api/classes/12"
	}
]
module.exports = classes
},{}],4:[function(require,module,exports){
const equipment = [{
	"index": 1,
	"name": "Club",
	"equipment_category": "Weapon",
	"weapon_category:": "Simple",
	"weapon_range": "Melee",
	"category_range": "Simple Melee",
	"cost": {
		"quantity": 1,
		"unit": "sp"
	},
	"damage": {
		"dice_count": 1,
		"dice_value": 4,
		"damage_type": {
			"url": "http://www.dnd5eapi.co/api/damage-types/2",
			"name": "Bludgeoning"
		}
	},
	"range": {
		"normal": 5,
		"long": null
	},
	"weight": 2,
	"properties": [{
		"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
		"name": "Light"
	}, {
		"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
		"name": "Monk"
	}],
	"url": "1"
}, {
		"index": 2,
		"name": "Dagger",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 1,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"url": "2"
	}, {
		"index": 3,
		"name": "Greatclub",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 2,
			"unit": "sp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 10,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "3"
	}, {
		"index": 4,
		"name": "Handaxe",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"url": "4"
	}, {
		"index": 5,
		"name": "Javelin",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"throw_range": {
			"normal": 30,
			"long": 120
		},
		"url": "5"
	}, {
		"index": 6,
		"name": "Light hammer",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"url": "6"
	}, {
		"index": 7,
		"name": "Mace",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 4,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"url": "7"
	}, {
		"index": 8,
		"name": "Quarterstaff",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 2,
			"unit": "sp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 4,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"2h_damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"url": "8"
	}, {
		"index": 9,
		"name": "Sickle",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"url": "9"
	}, {
		"index": 10,
		"name": "Spear",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Melee",
		"category_range": "Simple Melee",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"2h_damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"url": "10"
	}, {
		"index": 11,
		"name": "Crossbow, light",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Ranged",
		"category_range": "Simple Ranged",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 5,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1",
			"name": "Ammunition"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/5",
			"name": "Loading"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "11"
	}, {
		"index":11.5,
		"name": "Leather armor & Longbow",
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		}
	}, {
		"index": 12,
		"name": "Dart",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Ranged",
		"category_range": "Simple Ranged",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 0.25,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"url": "12"
	}, {
		"index": 13,
		"name": "Shortbow",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Ranged",
		"category_range": "Simple Ranged",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1",
			"name": "Ammunition"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "13"
	}, {
		"index": 14,
		"name": "Sling",
		"equipment_category": "Weapon",
		"weapon_category:": "Simple",
		"weapon_range": "Ranged",
		"category_range": "Simple Ranged",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 0,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1",
			"name": "Ammunition"
		}],
		"url": "14"
	}, {
		"index": 15,
		"name": "Battleaxe",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 4,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}],
		"2h_damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"url": "15"
	}, {
		"index": 16,
		"name": "Flail",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [],
		"url": "16"
	}, {
		"index": 17,
		"name": "Glaive",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 20,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 6,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/6",
			"name": "Reach"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "17"
	}, {
		"index": 18,
		"name": "Greataxe",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 12,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 7,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "18"
	}, {
		"index": 19,
		"name": "Greatsword",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 2,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 6,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "19"
	}, {
		"index": 20,
		"name": "Halberd",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 20,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 6,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/6",
			"name": "Reach"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "20"
	}, {
		"index": 21,
		"name": "Lance",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 12,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 6,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/6",
			"name": "Reach"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/7",
			"name": "Special"
		}],
		"special": ["You have disadvantage when you use a lance to attack a target within 5 feet of you. Also, a lance requires two hands to wield when you aren't mounted."],
		"url": "21"
	}, {
		"index": 22,
		"name": "Longsword",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}],
		"2h_damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"url": "22"
	}, {
		"index": 23,
		"name": "Maul",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 2,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 10,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "23"
	}, {
		"index": 24,
		"name": "Morningstar",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 4,
		"properties": [],
		"url": "24"
	}, {
		"index": 25,
		"name": "Pike",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 18,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/6",
			"name": "Reach"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "25"
	}, {
		"index": 26,
		"name": "Rapier",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}],
		"url": "26"
	}, {
		"index": 27,
		"name": "Scimitar",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}],
		"url": "27"
	}, {
		"index": 28,
		"name": "Shortsword",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/11",
			"name": "Monk"
		}],
		"url": "28"
	}, {
		"index": 29,
		"name": "Trident",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 4,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}],
		"throw_range": {
			"normal": 20,
			"long": 60
		},
		"url": "29"
	}, {
		"index": 30,
		"name": "War pick",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [],
		"url": "30"
	}, {
		"index": 31,
		"name": "Warhammer",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/10",
			"name": "Versatile"
		}],
		"2h_damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/2",
				"name": "Bludgeoning"
			}
		},
		"url": "31"
	}, {
		"index": 32,
		"name": "Whip",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Melee",
		"category_range": "Martial Melee",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 4,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/2",
			"name": "Finesse"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/6",
			"name": "Reach"
		}],
		"url": "32"
	}, {
		"index": 33,
		"name": "Blowgun",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Ranged",
		"category_range": "Martial Ranged",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 1,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 1,
		"properties": [{
			"name": "Ammunition",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1"
		}, {
			"name": "Loading",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/5"
		}],
		"url": "33"
	}, {
		"index": 34,
		"name": "Crossbow, hand",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Ranged",
		"category_range": "Martial Ranged",
		"cost": {
			"quantity": 75,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 6,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"name": "Ammunition",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"name": "Loading",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/5"
		}],
		"url": "34"
	}, {
		"index": 35,
		"name": "Crossbow, heavy",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Ranged",
		"category_range": "Martial Ranged",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 10,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 18,
		"properties": [{
			"name": "Ammunition",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/4",
			"name": "Light"
		}, {
			"name": "Loading",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/5"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "35"
	}, {
		"index": 36,
		"name": "Longbow",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Ranged",
		"category_range": "Martial Ranged",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 8,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/8",
				"name": "Piercing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 2,
		"properties": [{
			"name": "Ammunition",
			"url": "http://www.dnd5eapi.co/api/weapon-properties/1"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/3",
			"name": "Heavy"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/9",
			"name": "Two-Handed"
		}],
		"url": "36"
	}, {
		"index": 37,
		"name": "Net",
		"equipment_category": "Weapon",
		"weapon_category:": "Martial",
		"weapon_range": "Ranged",
		"category_range": "Martial Ranged",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"damage": {
			"dice_count": 1,
			"dice_value": 0,
			"damage_type": {
				"url": "http://www.dnd5eapi.co/api/damage-types/12",
				"name": "Slashing"
			}
		},
		"range": {
			"normal": 5,
			"long": null
		},
		"weight": 3,
		"properties": [{
			"url": "http://www.dnd5eapi.co/api/weapon-properties/8",
			"name": "Thrown"
		}, {
			"url": "http://www.dnd5eapi.co/api/weapon-properties/7",
			"name": "Special"
		}],
		"special": ["A Large or smaller creature hit by a net is restrained until it is freed. A net has no effect on creatures that are formless, or creatures that are Huge or larger. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the net (AC 10) also frees the creature without harming it, ending the effect and destroying the net. When you use an action, bonus action, or reaction to attack with a net, you can make only one attack regardless of the number of attacks you can normally make."],
		"throw_range": {
			"normal": 5,
			"long": 15
		},
		"url": "37"
	}, {
		"index": 38,
		"name": "Padded",
		"equipment_category": "Armor",
		"armor_category": "Light",
		"armor_class": {
			"base": 11,
			"dex_bonus": true,
			"max_bonus": null
		},
		"str_minimum": 0,
		"stealth_disadvantage": true,
		"weight": 8,
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"url": "38"
	}, {
		"index": 39,
		"name": "Leather",
		"equipment_category": "Armor",
		"armor_category": "Light",
		"armor_class": {
			"base": 11,
			"dex_bonus": true,
			"max_bonus": null
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 10,
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"url": "39"
	}, {
		"index": 40,
		"name": "Studded Leather",
		"equipment_category": "Armor",
		"armor_category": "Light",
		"armor_class": {
			"base": 12,
			"dex_bonus": true,
			"max_bonus": null
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 13,
		"cost": {
			"quantity": 45,
			"unit": "gp"
		},
		"url": "40"
	}, {
		"index": 41,
		"name": "Hide",
		"equipment_category": "Armor",
		"armor_category": "Medium",
		"armor_class": {
			"base": 12,
			"dex_bonus": true,
			"max_bonus": 2
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 12,
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"url": "41"
	}, {
		"index": 42,
		"name": "Chain Shirt",
		"equipment_category": "Armor",
		"armor_category": "Medium",
		"armor_class": {
			"base": 13,
			"dex_bonus": true,
			"max_bonus": 2
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 20,
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"url": "42"
	}, {
		"index": 43,
		"name": "Scale Mail",
		"equipment_category": "Armor",
		"armor_category": "Medium",
		"armor_class": {
			"base": 14,
			"dex_bonus": true,
			"max_bonus": 2
		},
		"str_minimum": 0,
		"stealth_disadvantage": true,
		"weight": 45,
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"url": "43"
	}, {
		"index": 44,
		"name": "Breastplate",
		"equipment_category": "Armor",
		"armor_category": "Medium",
		"armor_class": {
			"base": 14,
			"dex_bonus": true,
			"max_bonus": 2
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 20,
		"cost": {
			"quantity": 400,
			"unit": "gp"
		},
		"url": "44"
	}, {
		"index": 45,
		"name": "Half Plate",
		"equipment_category": "Armor",
		"armor_category": "Medium",
		"armor_class": {
			"base": 15,
			"dex_bonus": true,
			"max_bonus": 2
		},
		"str_minimum": 0,
		"stealth_disadvantage": true,
		"weight": 40,
		"cost": {
			"quantity": 750,
			"unit": "gp"
		},
		"url": "45"
	}, {
		"index": 46,
		"name": "Ring Mail",
		"equipment_category": "Armor",
		"armor_category": "Heavy",
		"armor_class": {
			"base": 14,
			"dex_bonus": false,
			"max_bonus": null
		},
		"str_minimum": 0,
		"stealth_disadvantage": true,
		"weight": 40,
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"url": "46"
	}, {
		"index": 47,
		"name": "Chain Mail",
		"equipment_category": "Armor",
		"armor_category": "Heavy",
		"armor_class": {
			"base": 16,
			"dex_bonus": false,
			"max_bonus": null
		},
		"str_minimum": 13,
		"stealth_disadvantage": true,
		"weight": 55,
		"cost": {
			"quantity": 75,
			"unit": "gp"
		},
		"url": "47"
	}, {
		"index": 48,
		"name": "Splint",
		"equipment_category": "Armor",
		"armor_category": "Heavy",
		"armor_class": {
			"base": 17,
			"dex_bonus": false,
			"max_bonus": null
		},
		"str_minimum": 15,
		"stealth_disadvantage": true,
		"weight": 60,
		"cost": {
			"quantity": 200,
			"unit": "gp"
		},
		"url": "48"
	}, {
		"index": 49,
		"name": "Plate",
		"equipment_category": "Armor",
		"armor_category": "Heavy",
		"armor_class": {
			"base": 18,
			"dex_bonus": false,
			"max_bonus": null
		},
		"str_minimum": 15,
		"stealth_disadvantage": true,
		"weight": 65,
		"cost": {
			"quantity": 1500,
			"unit": "gp"
		},
		"url": "49"
	}, {
		"index": 50,
		"name": "Shield",
		"equipment_category": "Armor",
		"armor_category": "Shield",
		"armor_class": {
			"base": 2,
			"dex_bonus": false,
			"max_bonus": null
		},
		"str_minimum": 0,
		"stealth_disadvantage": false,
		"weight": 6,
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"url": "50"
	}, {
		"index": 51,
		"name": "Abacus",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 2,
		"url": "51"
	}, {
		"index": 52,
		"name": "Acid (vial)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["As an action, you can splash the contents of this vial onto a creature within 5 feet of you or throw the vial up to 20 feet, shattering it on impact. In either case, make a ranged attack against a creature or object, treating the acid as an improvised weapon.", "On a hit, the target takes 2d6 acid damage."],
		"url": "52"
	}, {
		"index": 53,
		"name": "Alchemist's fire (flask)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"desc": ["This sticky, adhesive fluid ignites when exposed to air.", "As an action, you can throw this flask up to 20 feet, shattering it on impact. Make a ranged attack against a creature or object, treating the alchemist's fire as an improvised weapon.", "On a hit, the target takes 1d4 fire damage at the start of each of its turns. A creature can end this damage by using its action to make a DC 10 Dexterity check to extinguish the flames."],
		"weight": 1,
		"url": "53"
	}, {
		"index": 54,
		"name": "Arrow",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Ammunition",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 1,
		"url": "54"
	}, {
		"index": 55,
		"name": "Blowgun needle",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Ammunition",
		"cost": {
			"quantity": 2,
			"unit": "cp"
		},
		"weight": 1,
		"url": "55"
	}, {
		"index": 56,
		"name": "Crossbow bolt",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Ammunition",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 1.5,
		"url": "56"
	}, {
		"index": 57,
		"name": "Sling bullet",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Ammunition",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 1.5,
		"url": "57"
	}, {
		"index": 58,
		"name": "Amulet",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Holy Symbol",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["A holy symbol is a representation of a god or pantheon. It might be an amulet depicting a symbol representing a deity, the same symbol carefully engraved or inlaid as an emblem on a shield, or a tiny box holding a fragment of a sacred relic.", "Appendix B lists the symbols commonly associated with many gods in the multiverse. A cleric or paladin can use a holy symbol as a spellcasting focus. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield."],
		"url": "58"
	}, {
		"index": 59,
		"name": "Antitoxin (vial)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["A creature that drinks this vial of liquid gains advantage on saving throws against poison for 1 hour. It confers no benefit to undead or constructs."],
		"url": "59"
	}, {
		"index": 60,
		"name": "Crystal",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Arcane focus",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus."],
		"url": "60"
	}, {
		"index": 61,
		"name": "Orb",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Arcane focus",
		"cost": {
			"quantity": 20,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus."],
		"url": "61"
	}, {
		"index": 62,
		"name": "Rod",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Arcane focus",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus."],
		"url": "62"
	}, {
		"index": 63,
		"name": "Staff",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Arcane focus",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 4,
		"desc": ["An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus."],
		"url": "63"
	}, {
		"index": 64,
		"name": "Wand",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Arcane focus",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["An arcane focus is a special item— an orb, a crystal, a rod, a specially constructed staff, a wand-like length of wood, or some similar item— designed to channel the power of arcane spells. A sorcerer, warlock, or wizard can use such an item as a spellcasting focus."],
		"url": "64"
	}, {
		"index": 65,
		"name": "Backpack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 5,
		"url": "65"
	}, {
		"index": 66,
		"name": "Ball bearings (bag of 1,000)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["As an action, you can spill these tiny metal balls from their pouch to cover a level, square area that is 10 feet on a side.", "A creature moving across the covered area must succeed on a DC 10 Dexterity saving throw or fall prone.", "A creature moving through the area at half speed doesn't need to make the save."],
		"url": "66"
	}, {
		"index": 67,
		"name": "Barrel",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 70,
		"url": "67"
	}, {
		"index": 68,
		"name": "Basket",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 4,
			"unit": "sp"
		},
		"weight": 2,
		"url": "68"
	}, {
		"index": 69,
		"name": "Bedroll",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 7,
		"url": "69"
	}, {
		"index": 70,
		"name": "Bell",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 0,
		"url": "70"
	}, {
		"index": 71,
		"name": "Blanket",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 3,
		"url": "71"
	}, {
		"index": 72,
		"name": "Block and tackle",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["A set of pulleys with a cable threaded through them and a hook to attach to objects, a block and tackle allows you to hoist up to four times the weight you can normally lift."],
		"url": "72"
	}, {
		"index": 73,
		"name": "Book",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["A book might contain poetry, historical accounts, information pertaining to a particular field of lore, diagrams and notes on gnomish contraptions, or just about anything else that can be represented using text or pictures. A book of spells is a spellbook (described later in this section)."],
		"url": "73"
	}, {
		"index": 74,
		"name": "Bottle, glass",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 2,
		"url": "74"
	}, {
		"index": 75,
		"name": "Bucket",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 2,
		"url": "75"
	}, {
		"index": 76,
		"name": "Caltrops",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 2,
		"desc": ["As an action, you can spread a bag of caltrops to cover a square area that is 5 feet on a side.", "Any creature that enters the area must succeed on a DC 15 Dexterity saving throw or stop moving this turn and take 1 piercing damage.", "Taking this damage reduces the creature's walking speed by 10 feet until the creature regains at least 1 hit point.", "A creature moving through the area at half speed doesn't need to make the save."],
		"url": "76"
	}, {
		"index": 77,
		"name": "Candle",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 0,
		"desc": ["For 1 hour, a candle sheds bright light in a 5-foot radius and dim light for an additional 5 feet."],
		"url": "77"
	}, {
		"index": 78,
		"name": "Case, crossbow bolt",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["This wooden case can hold up to twenty crossbow bolts."],
		"url": "78"
	}, {
		"index": 79,
		"name": "Case, map or scroll",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["This cylindrical leather case can hold up to ten rolled-up sheets of paper or five rolled-up sheets of parchment."],
		"url": "79"
	}, {
		"index": 80,
		"name": "Chain (10 feet)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 10,
		"desc": ["A chain has 10 hit points. It can be burst with a successful DC 20 Strength check."],
		"url": "80"
	}, {
		"index": 81,
		"name": "Chalk (1 piece)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 0,
		"url": "81"
	}, {
		"index": 82,
		"name": "Chest",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 25,
		"url": "82"
	}, {
		"index": 83,
		"name": "Clothes, common",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 3,
		"url": "83"
	}, {
		"index": 84,
		"name": "Clothes, costume",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 4,
		"url": "84"
	}, {
		"index": 85,
		"name": "Clothes, fine",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"weight": 6,
		"url": "85"
	}, {
		"index": 86,
		"name": "Clothes, traveler's",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 4,
		"url": "86"
	}, {
		"index": 87,
		"name": "Component pouch",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 2,
		"desc": [" A component pouch is a small, watertight leather belt pouch that has compartments to hold all the material components and other special items you need to cast your spells, except for those components that have a specific cost (as indicated in a spell's description)."],
		"url": "87"
	}, {
		"index": 88,
		"name": "Crowbar",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["Using a crowbar grants advantage to Strength checks where the crowbar's leverage can be applied."],
		"url": "88"
	}, {
		"index": 89,
		"name": "Sprig of mistletoe",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Druidic focus",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another special wood, a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, and teeth from sacred animals. A druid can use such an object as a spellcasting focus."],
		"url": "89"
	}, {
		"index": 90,
		"name": "Totem",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Druidic focus",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another special wood, a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, and teeth from sacred animals. A druid can use such an object as a spellcasting focus."],
		"url": "90"
	}, {
		"index": 91,
		"name": "Wooden staff",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Druidic focus",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 4,
		"desc": ["A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another special wood, a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, and teeth from sacred animals. A druid can use such an object as a spellcasting focus."],
		"url": "91"
	}, {
		"index": 92,
		"name": "Yew wand",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Druidic focus",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["A druidic focus might be a sprig of mistletoe or holly, a wand or scepter made of yew or another special wood, a staff drawn whole out of a living tree, or a totem object incorporating feathers, fur, bones, and teeth from sacred animals. A druid can use such an object as a spellcasting focus."],
		"url": "92"
	}, {
		"index": 93,
		"name": "Emblem",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Holy Symbol",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["A holy symbol is a representation of a god or pantheon. It might be an amulet depicting a symbol representing a deity, the same symbol carefully engraved or inlaid as an emblem on a shield, or a tiny box holding a fragment of a sacred relic.", "Appendix B lists the symbols commonly associated with many gods in the multiverse. A cleric or paladin can use a holy symbol as a spellcasting focus. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield."],
		"url": "93"
	}, {
		"index": 94,
		"name": "Fishing tackle",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 4,
		"desc": ["This kit includes a wooden rod, silken line, corkwood bobbers, steel hooks, lead sinkers, velvet lures, and narrow netting."],
		"url": "94"
	}, {
		"index": 95,
		"name": "Flask or tankard",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "cp"
		},
		"weight": 1,
		"url": "95"
	}, {
		"index": 96,
		"name": "Grappling hook",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 4,
		"url": "96"
	}, {
		"index": 97,
		"name": "Hammer",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 3,
		"url": "97"
	}, {
		"index": 98,
		"name": "Hammer, sledge",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 10,
		"url": "98"
	}, {
		"index": 99,
		"name": "Holy water (flask)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["As an action, you can splash the contents of this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. In either case, make a ranged attack against a target creature, treating the holy water as an improvised weapon.", "If the target is a fiend or undead, it takes 2d6 radiant damage.", "A cleric or paladin may create holy water by performing a special ritual.", "The ritual takes 1 hour to perform, uses 25 gp worth of powdered silver, and requires the caster to expend a 1st-level spell slot."],
		"url": "99"
	}, {
		"index": 100,
		"name": "Hourglass",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 1,
		"url": "100"
	}, {
		"index": 101,
		"name": "Hunting trap",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"desc": ["When you use your action to set it, this trap forms a saw-toothed steel ring that snaps shut when a creature steps on a pressure plate in the center. The trap is affixed by a heavy chain to an immobile object, such as a tree or a spike driven into the ground.", "A creature that steps on the plate must succeed on a DC 13 Dexterity saving throw or take 1d4 piercing damage and stop moving. Thereafter, until the creature breaks free of the trap, its movement is limited by the length of the chain (typically 3 feet long).", "A creature can use its action to make a DC 13 Strength check, freeing itself or another creature within its reach on a success. Each failed check deals 1 piercing damage to the trapped creature."],
		"weight": 25,
		"url": "101"
	}, {
		"index": 102,
		"name": "Ink (1 ounce bottle)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 0,
		"url": "102"
	}, {
		"index": 103,
		"name": "Ink pen",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "cp"
		},
		"weight": 0,
		"url": "103"
	}, {
		"index": 104,
		"name": "Jug or pitcher",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "cp"
		},
		"weight": 4,
		"url": "104"
	}, {
		"index": 105,
		"name": "Climber's Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 12,
		"desc": ["A climber's kit includes special pitons, boot tips, gloves, and a harness. You can use the climber's kit as an action to anchor yourself; when you do, you can't fall more than 25 feet from the point where you anchored yourself, and you can't climb more than 25 feet away from that point without undoing the anchor."],
		"url": "105"
	}, {
		"index": 106,
		"name": "Disguise Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["This pouch of cosmetics, hair dye, and small props lets you create disguises that change your physical appearance. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to create a visual disguise."],
		"url": "106"
	}, {
		"index": 107,
		"name": "Forgery Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["This small box contains a variety of papers and parchments, pens and inks, seals and sealing wax, gold and silver leaf, and other supplies necessary to create convincing forgeries of physical documents. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to create a physical forgery of a document."],
		"url": "107"
	}, {
		"index": 108,
		"name": "Herbalism Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["This kit contains a variety of instruments such as clippers, mortar and pestle, and pouches and vials used by herbalists to create remedies and potions. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to identify or apply herbs. Also, proficiency with this kit is required to create antitoxin and potions of healing."],
		"url": "108"
	}, {
		"index": 109,
		"name": "Healer's Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["This kit is a leather pouch containing bandages, salves, and splints. The kit has ten uses. As an action, you can expend one use of the kit to stabilize a creature that has 0 hit points, without needing to make a Wisdom (Medicine) check."],
		"url": "109"
	}, {
		"index": 110,
		"name": "Mess Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 2,
			"unit": "sp"
		},
		"weight": 1,
		"desc": ["This tin box contains a cup and simple cutlery. The box clamps together, and one side can be used as a cooking pan and the other as a plate or shallow bowl."],
		"url": "110"
	}, {
		"index": 111,
		"name": "Poisoner's Kit",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Kit",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["A poisoner's kit includes the vials, chemicals, and other equipment necessary for the creation of poisons. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to craft or use poisons."],
		"url": "111"
	}, {
		"index": 112,
		"name": "Ladder (10-foot)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"weight": 25,
		"url": "112"
	}, {
		"index": 113,
		"name": "Lamp",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 1,
		"desc": ["A lamp casts bright light in a 15-foot radius and dim light for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil."],
		"url": "113"
	}, {
		"index": 114,
		"name": "Lantern, bullseye",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["A bullseye lantern casts bright light in a 60-foot cone and dim light for an additional 60 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil."],
		"url": "114"
	}, {
		"index": 115,
		"name": "Lantern, hooded",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["A hooded lantern casts bright light in a 30-foot radius and dim light for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil. As an action, you can lower the hood, reducing the light to dim light in a 5-foot radius."],
		"url": "115"
	}, {
		"index": 116,
		"name": "Lock",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["A key is provided with the lock. Without the key, a creature proficient with thieves' tools can pick this lock with a successful DC 15 Dexterity check. Your GM may decide that better locks are available for higher prices."],
		"url": "116"
	}, {
		"index": 117,
		"name": "Magnifying glass",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 100,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["This lens allows a closer look at small objects. It is also useful as a substitute for flint and steel when starting fires. Lighting a fire with a magnifying glass requires light as bright as sunlight to focus, tinder to ignite, and about 5 minutes for the fire to ignite.", "A magnifying glass grants advantage on any ability check made to appraise or inspect an item that is small or highly detailed."],
		"url": "117"
	}, {
		"index": 118,
		"name": "Manacles",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 6,
		"desc": ["These metal restraints can bind a Small or Medium creature. Escaping the manacles requires a successful DC 20 Dexterity check. Breaking them requires a successful DC 20 Strength check.", "Each set of manacles comes with one key. Without the key, a creature proficient with thieves' tools can pick the manacles' lock with a successful DC 15 Dexterity check. Manacles have 15 hit points."],
		"url": "118"
	}, {
		"index": 119,
		"name": "Mirror, steel",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 0.5,
		"url": "119"
	}, {
		"index": 120,
		"name": "Oil (flask)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"weight": 1,
		"desc": ["Oil usually comes in a clay flask that holds 1 pint.", "As an action, you can splash the oil in this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. Make a ranged attack against a target creature or object, treating the oil as an improvised weapon.", "On a hit, the target is covered in oil. If the target takes any fire damage before the oil dries (after 1 minute), the target takes an additional 5 fire damage from the burning oil.", "You can also pour a flask of oil on the ground to cover a 5-foot-square area, provided that the surface is level.", "If lit, the oil burns for 2 rounds and deals 5 fire damage to any creature that enters the area or ends its turn in the area. A creature can take this damage only once per turn."],
		"url": "120"
	}, {
		"index": 121,
		"name": "Paper (one sheet)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "sp"
		},
		"weight": 0,
		"url": "121"
	}, {
		"index": 122,
		"name": "Parchment (one sheet)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"weight": 0,
		"url": "122"
	}, {
		"index": 123,
		"name": "Perfume (vial)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 0,
		"url": "123"
	}, {
		"index": 124,
		"name": "Pick, miner's",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 10,
		"url": "124"
	}, {
		"index": 125,
		"name": "Piton",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 0.25,
		"url": "125"
	}, {
		"index": 126,
		"name": "Poison, basic (vial)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 100,
			"unit": "gp"
		},
		"weight": 0,
		"desc": ["You can use the poison in this vial to coat one slashing or piercing weapon or up to three pieces of ammunition. Applying the poison takes an action. A creature hit by the poisoned weapon or ammunition must make a DC 10 Constitution saving throw or take 1d4 poison damage. Once applied, the poison retains potency for 1 minute before drying."],
		"url": "126"
	}, {
		"index": 127,
		"name": "Pole (10-foot)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 7,
		"url": "127"
	}, {
		"index": 128,
		"name": "Pot, iron",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 10,
		"url": "128"
	}, {
		"index": 129,
		"name": "Potion of healing",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 0.5,
		"desc": ["A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points. Drinking or administering a potion takes an action."],
		"url": "129"
	}, {
		"index": 130,
		"name": "Pouch",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 1,
		"desc": ["A cloth or leather pouch can hold up to 20 sling bullets or 50 blowgun needles, among other things. A compartmentalized pouch for holding spell components is called a component pouch (described earlier in this section)."],
		"url": "130"
	}, {
		"index": 131,
		"name": "Quiver",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["A quiver can hold up to 20 arrows."],
		"url": "131"
	}, {
		"index": 132,
		"name": "Ram, portable",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 4,
			"unit": "gp"
		},
		"weight": 35,
		"desc": ["You can use a portable ram to break down doors. When doing so, you gain a +4 bonus on the Strength check. One other character can help you use the ram, giving you advantage on this check."],
		"url": "132"
	}, {
		"index": 133,
		"name": "Rations (1 day)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 2,
		"desc": ["Rations consist of dry foods suitable for extended travel, including jerky, dried fruit, hardtack, and nuts."],
		"url": "133"
	}, {
		"index": 134,
		"name": "Reliquary",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Holy Symbol",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["A holy symbol is a representation of a god or pantheon. It might be an amulet depicting a symbol representing a deity, the same symbol carefully engraved or inlaid as an emblem on a shield, or a tiny box holding a fragment of a sacred relic.", "Appendix B lists the symbols commonly associated with many gods in the multiverse. A cleric or paladin can use a holy symbol as a spellcasting focus. To use the symbol in this way, the caster must hold it in hand, wear it visibly, or bear it on a shield."],
		"url": "134"
	}, {
		"index": 135,
		"name": "Robes",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 4,
		"url": "135"
	}, {
		"index": 136,
		"name": "Rope, hempen (50 feet)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 10,
		"desc": ["Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check."],
		"url": "136"
	}, {
		"index": 137,
		"name": "Rope, silk (50 feet)",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check."],
		"url": "137"
	}, {
		"index": 138,
		"name": "Sack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 0.5,
		"url": "138"
	}, {
		"index": 139,
		"name": "Scale, merchant's",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["A scale includes a small balance, pans, and a suitable assortment of weights up to 2 pounds. With it, you can measure the exact weight of small objects, such as raw precious metals or trade goods, to help determine their worth."],
		"url": "139"
	}, {
		"index": 140,
		"name": "Sealing wax",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 0,
		"url": "140"
	}, {
		"index": 141,
		"name": "Shovel",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 5,
		"url": "141"
	}, {
		"index": 142,
		"name": "Signal whistle",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "cp"
		},
		"weight": 0,
		"url": "142"
	}, {
		"index": 143,
		"name": "Signet ring",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 0,
		"url": "143"
	}, {
		"index": 144,
		"name": "Soap",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "cp"
		},
		"weight": 0,
		"url": "144"
	}, {
		"index": 145,
		"name": "Spellbook",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["Essential for wizards, a spellbook is a leather-bound tome with 100 blank vellum pages suitable for recording spells."],
		"url": "145"
	}, {
		"index": 146,
		"name": "Spike, iron",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"weight": 5,
		"url": "146"
	}, {
		"index": 147,
		"name": "Spyglass",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1000,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["Objects viewed through a spyglass are magnified to twice their size."],
		"url": "147"
	}, {
		"index": 148,
		"name": "Tent, two-person",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 20,
		"desc": ["A simple and portable canvas shelter, a tent sleeps two."],
		"url": "148"
	}, {
		"index": 149,
		"name": "Tinderbox",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 1,
		"desc": ["This small container holds flint, fire steel, and tinder (usually dry cloth soaked in light oil) used to kindle a fire. Using it to light a torch—or anything else with abundant, exposed fuel—takes an action.", "Lighting any other fire takes 1 minute."],
		"url": "149"
	}, {
		"index": 150,
		"name": "Torch",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 1,
		"desc": ["A torch burns for 1 hour, providing bright light in a 20-foot radius and dim light for an additional 20 feet. If you make a melee attack with a burning torch and hit, it deals 1 fire damage."],
		"url": "150"
	}, {
		"index": 151,
		"name": "Vial",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 0,
		"url": "151"
	}, {
		"index": 152,
		"name": "Waterskin",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 2,
			"unit": "sp"
		},
		"weight": 5,
		"url": "152"
	}, {
		"index": 153,
		"name": "Whetstone",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Standard Gear",
		"cost": {
			"quantity": 1,
			"unit": "cp"
		},
		"weight": 1,
		"url": "153"
	}, {
		"index": 154,
		"name": "Burglar's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 16,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "66",
			"quantity": 1
		}, {
			"item_url": "77",
			"quantity": 5
		}, {
			"item_url": "88",
			"quantity": 1
		}, {
			"item_url": "97",
			"quantity": 1
		}, {
			"item_url": "125",
			"quantity": 10
		}, {
			"item_url": "115",
			"quantity": 1
		}, {
			"item_url": "120",
			"quantity": 2
		}, {
			"item_url": "133",
			"quantity": 5
		}, {
			"item_url": "149",
			"quantity": 1
		}, {
			"item_url": "152",
			"quantity": 1
		}, {
			"item_url": "136",
			"quantity": 1
		}],
		"url": "154"
	}, {
		"index": 155,
		"name": "Diplomat's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 39,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "82",
			"quantity": 1
		}, {
			"item_url": "79",
			"quantity": 2
		}, {
			"item_url": "85",
			"quantity": 5
		}, {
			"item_url": "102",
			"quantity": 1
		}, {
			"item_url": "103",
			"quantity": 1
		}, {
			"item_url": "113",
			"quantity": 1
		}, {
			"item_url": "120",
			"quantity": 2
		}, {
			"item_url": "121",
			"quantity": 5
		}, {
			"item_url": "123",
			"quantity": 1
		}, {
			"item_url": "140",
			"quantity": 1
		}, {
			"item_url": "144",
			"quantity": 1
		}],
		"url": "155"
	}, {
		"index": 156,
		"name": "Dungeoneer's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 12,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "88",
			"quantity": 1
		}, {
			"item_url": "97",
			"quantity": 1
		}, {
			"item_url": "125",
			"quantity": 10
		}, {
			"item_url": "150",
			"quantity": 10
		}, {
			"item_url": "133",
			"quantity": 10
		}, {
			"item_url": "152",
			"quantity": 1
		}, {
			"item_url": "136",
			"quantity": 1
		}],
		"url": "156"
	}, {
		"index": 157,
		"name": "Entertainer's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 40,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "69",
			"quantity": 1
		}, {
			"item_url": "84",
			"quantity": 2
		}, {
			"item_url": "77",
			"quantity": 5
		}, {
			"item_url": "133",
			"quantity": 5
		}, {
			"item_url": "152",
			"quantity": 1
		}, {
			"item_url": "106",
			"quantity": 1
		}],
		"url": "157"
	}, {
		"index": 158,
		"name": "Explorer's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "69",
			"quantity": 1
		}, {
			"item_url": "110",
			"quantity": 1
		}, {
			"item_url": "149",
			"quantity": 1
		}, {
			"item_url": "150",
			"quantity": 10
		}, {
			"item_url": "133",
			"quantity": 10
		}, {
			"item_url": "152",
			"quantity": 1
		}, {
			"item_url": "106",
			"quantity": 1
		}],
		"url": "158"
	}, {
		"index": 159,
		"name": "Priest's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 19,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "71",
			"quantity": 1
		}, {
			"item_url": "77",
			"quantity": 10
		}, {
			"item_url": "149",
			"quantity": 1
		}, {
			"item_url": "133",
			"quantity": 2
		}, {
			"item_url": "152",
			"quantity": 1
		}],
		"url": "159"
	}, {
		"index": 160,
		"name": "Scholar's Pack",
		"equipment_category": "Adventuring Gear",
		"gear_category": "Equipment Pack",
		"cost": {
			"quantity": 40,
			"unit": "gp"
		},
		"contents": [{
			"item_url": "65",
			"quantity": 1
		}, {
			"item_url": "73",
			"quantity": 1
		}, {
			"item_url": "102",
			"quantity": 1
		}, {
			"item_url": "103",
			"quantity": 1
		}, {
			"item_url": "122",
			"quantity": 10
		}],
		"url": "160"
	}, {
		"index": 161,
		"name": "Alchemist's supplies",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 8,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "161"
	}, {
		"index": 162,
		"name": "Brewer's supplies",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 20,
			"unit": "gp"
		},
		"weight": 9,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "162"
	}, {
		"index": 163,
		"name": "Calligrapher's supplies",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "163"
	}, {
		"index": 164,
		"name": "Carpenter's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 8,
			"unit": "gp"
		},
		"weight": 6,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "164"
	}, {
		"index": 165,
		"name": "Cartographer's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 15,
			"unit": "gp"
		},
		"weight": 6,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "165"
	}, {
		"index": 166,
		"name": "Cobbler's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "166"
	}, {
		"index": 167,
		"name": "Cook's utensils",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 8,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "167"
	}, {
		"index": 168,
		"name": "Glassblower's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "168"
	}, {
		"index": 169,
		"name": "Jeweler's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "169"
	}, {
		"index": 170,
		"name": "Leatherworker's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 5,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "170"
	}, {
		"index": 171,
		"name": "Mason's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 8,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "171"
	}, {
		"index": 172,
		"name": "Painter's supplies",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "172"
	}, {
		"index": 173,
		"name": "Potter's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 10,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "173"
	}, {
		"index": 174,
		"name": "Smith's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 20,
			"unit": "gp"
		},
		"weight": 8,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "174"
	}, {
		"index": 175,
		"name": "Tinker's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 50,
			"unit": "gp"
		},
		"weight": 10,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "175"
	}, {
		"index": 176,
		"name": "Weaver's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "176"
	}, {
		"index": 177,
		"name": "Woodcarver's tools",
		"equipment_category": "Tools",
		"tool_category": "Artisan's Tools",
		"cost": {
			"quantity": 1,
			"unit": "gp"
		},
		"weight": 5,
		"desc": ["These special tools include the items needed to pursue a craft or trade. The table shows examples of the most common types of tools, each providing items related to a single craft. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools in your craft. Each type of artisan's tools requires a separate proficiency."],
		"url": "177"
	}, {
		"index": 178,
		"name": "Dice set",
		"equipment_category": "Tools",
		"tool_category": "Gaming Sets",
		"cost": {
			"quantity": 1,
			"unit": "sp"
		},
		"weight": 0,
		"desc": ["This item encompasses a wide range of game pieces, including dice and decks of cards (for games such as Three-Dragon Ante). A few common examples appear on the Tools table, but other kinds of gaming sets exist. If you are proficient with a gaming set, you can add your proficiency bonus to ability checks you make to play a game with that set. Each type of gaming set requires a separate proficiency."],
		"url": "178"
	}, {
		"index": 179,
		"name": "Playing card set",
		"equipment_category": "Tools",
		"tool_category": "Gaming Sets",
		"cost": {
			"quantity": 5,
			"unit": "sp"
		},
		"weight": 0,
		"desc": ["This item encompasses a wide range of game pieces, including dice and decks of cards (for games such as Three-Dragon Ante). A few common examples appear on the Tools table, but other kinds of gaming sets exist. If you are proficient with a gaming set, you can add your proficiency bonus to ability checks you make to play a game with that set. Each type of gaming set requires a separate proficiency."],
		"url": "179"
	}, {
		"index": 180,
		"name": "Bagpipes",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"weight": 6,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "180"
	}, {
		"index": 181,
		"name": "Drum",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 6,
			"unit": "gp"
		},
		"weight": 3,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "181"
	}, {
		"index": 182,
		"name": "Dulcimer",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 10,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "182"
	}, {
		"index": 183,
		"name": "Flute",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "183"
	}, {
		"index": 184,
		"name": "Lute",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 35,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "184"
	}, {
		"index": 185,
		"name": "Lyre",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "185"
	}, {
		"index": 186,
		"name": "Horn",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 3,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "186"
	}, {
		"index": 187,
		"name": "Pan flute",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 12,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "187"
	}, {
		"index": 188,
		"name": "Shawm",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 2,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "188"
	}, {
		"index": 189,
		"name": "Viol",
		"equipment_category": "Tools",
		"tool_category": "Musical Instrument",
		"cost": {
			"quantity": 30,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["Several of the most common types of musical instruments are shown on the table as examples. If you have proficiency with a given musical instrument, you can add your proficiency bonus to any ability checks you make to play music with the instrument. A bard can use a musical instrument as a spellcasting focus. Each type of musical instrument requires a separate proficiency."],
		"url": "189"
	}, {
		"index": 190,
		"name": "Navigator's tools",
		"equipment_category": "Tools",
		"tool_category": "Other Tools",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 2,
		"desc": ["This set of instruments is used for navigation at sea. Proficiency with navigator's tools lets you chart a ship's course and follow navigation charts. In addition, these tools allow you to add your proficiency bonus to any ability check you make to avoid getting lost at sea."],
		"url": "190"
	}, {
		"index": 191,
		"name": "Thieves' tools",
		"equipment_category": "Tools",
		"tool_category": "Other Tools",
		"cost": {
			"quantity": 25,
			"unit": "gp"
		},
		"weight": 1,
		"desc": ["This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your proficiency bonus to any ability checks you make to disarm traps or open locks."],
		"url": "191"
	}]

module.exports = equipment
},{}],5:[function(require,module,exports){
const languages = [{
	"index": 1,
	"name": "Common",
	"type": "Standard",
	"typical_speakers": ["Humans"],
	"script": "Common",
	"url": "http://www.dnd5eapi.co/api/languages/1"
}, {
	"index": 2,
	"name": "Dwarvish",
	"type": "Standard",
	"typical_speakers": ["Dwarves"],
	"script": "Dwarvish",
	"url": "http://www.dnd5eapi.co/api/languages/2"
}, {
	"index": 3,
	"name": "Elvish",
	"type": "Standard",
	"typical_speakers": ["Elves"],
	"script": "Elvish",
	"url": "http://www.dnd5eapi.co/api/languages/3"
}, {
	"index": 4,
	"name": "Giant",
	"type": "Standard",
	"typical_speakers": ["Ogres", "Giants"],
	"script": "Dwarvish",
	"url": "http://www.dnd5eapi.co/api/languages/4"
}, {
	"index": 5,
	"name": "Gnomish",
	"type": "Standard",
	"typical_speakers": ["Gnomes"],
	"script": "Dwarvish",
	"url": "http://www.dnd5eapi.co/api/languages/5"
}, {
	"index": 6,
	"name": "Goblin",
	"type": "Standard",
	"typical_speakers": ["Goblinoids"],
	"script": "Dwarvish",
	"url": "http://www.dnd5eapi.co/api/languages/6"
}, {
	"index": 7,
	"name": "Halfling",
	"type": "Standard",
	"typical_speakers": ["Halflings"],
	"script": "Common",
	"url": "http://www.dnd5eapi.co/api/languages/7"
}, {
	"index": 8,
	"name": "Orc",
	"type": "Standard",
	"typical_speakers": ["Orcs"],
	"script": "Dwarvish",
	"url": "http://www.dnd5eapi.co/api/languages/8"
}, {
	"index": 9,
	"name": "Abyssal",
	"type": "Exotic",
	"typical_speakers": ["Demons"],
	"script": "Infernal",
	"url": "http://www.dnd5eapi.co/api/languages/9"
}, {
	"index": 10,
	"name": "Celestial",
	"type": "Exotic",
	"typical_speakers": ["Celestials"],
	"script": "Celestial",
	"url": "http://www.dnd5eapi.co/api/languages/10"
}, {
	"index": 11,
	"name": "Draconic",
	"type": "Exotic",
	"typical_speakers": ["Dragons", "Dragonborn"],
	"script": "Draconic",
	"url": "http://www.dnd5eapi.co/api/languages/11"
}, {
	"index": 12,
	"name": "Deep Speech",
	"type": "Exotic",
	"typical_speakers": ["Mindflayers", "Beholders"],
	"script": "none",
	"url": "http://www.dnd5eapi.co/api/languages/12"
}, {
	"index": 13,
	"name": "Infernal",
	"type": "Exotic",
	"typical_speakers": ["Devils", "Tieflings"],
	"script": "Infernal",
	"url": "http://www.dnd5eapi.co/api/languages/13"
}, {
	"index": 14,
	"name": "Primordial",
	"type": "Exotic",
	"typical_speakers": ["Elementa;s"],
	"script": "Dwarvish",
	"url": "http://www.dnd5eapi.co/api/languages/14"
}, {
	"index": 15,
	"name": "Sylvan",
	"type": "Exotic",
	"typical_speakers": ["Fey Creatures"],
	"script": "Elvish",
	"url": "http://www.dnd5eapi.co/api/languages/15"
}, {
	"index": 16,
	"name": "Undercommon",
	"type": "Exotic",
	"typical_speakers": ["Underdark Traders"],
	"script": "Elvish",
	"url": "http://www.dnd5eapi.co/api/languages/16"
}]

module.exports = languages
},{}],6:[function(require,module,exports){
const races = [
	{
		"index": 1,
		"name": "Dwarf",
		"speed": 30,
		"ability_bonuses": [
			0,
			0,
			2,
			0,
			0,
			0
		],
		"alignment": "Most dwarves are lawful, believing firmly in the benefits of a well-ordered society. They tend toward good as well, with a strong sense of fair play and a belief that everyone deserves to share in the benefits of a just order.",
		"age": "Dwarves mature at the same rate as humans, but they’re considered young until they reach the age of 50. On average, they live about 350 years.",
		"size": "Medium",
		"size_description": "Dwarves stand between 4 and 5 feet tall and average about 150 pounds. Your size is Medium.",
		"starting_proficiencies": [
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/20",
				"name": "Battleaxes"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/24",
				"name": "Handaxes"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/26",
				"name": "Light hammers"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/51",
				"name": "Warhammers"
			}
		],
		"starting_proficiency_options": {
			"choose": 1,
			"type": "proficiencies",
			"from": [
				{
					"url": "http://www.dnd5eapi.co/api/proficiencies/71",
					"name": "Smith's tools"
				},
				{
					"url": "http://www.dnd5eapi.co/api/proficiencies/59",
					"name": "Brewer's supplies"
				},
				{
					"url": "http://www.dnd5eapi.co/api/proficiencies/68",
					"name": "Mason's tools"
				}
			]
		},
		"languages": [
			{
				"url": "http://www.dnd5eapi.co/api/languages/1",
				"name": "Common"
			},
			{
				"url": "http://www.dnd5eapi.co/api/languages/2",
				"name": "Dwarvish"
			}
		],
		"language_options": {
			
		},
		"language_desc": "You can speak, read, and write Common and Dwarvish. Dwarvish is full of hard consonants and guttural sounds, and those characteristics spill over into whatever other language a dwarf might speak.",
		"traits": [
			{
				"name": "Darkvision (Dwarf)",
				"url": "http://www.dnd5eapi.co/api/traits/1"
			},
			{
				"name": "Dwarven Resilience",
				"url": "http://www.dnd5eapi.co/api/traits/2"
			},
			{
				"name": "Stonecunning",
				"url": "http://www.dnd5eapi.co/api/traits/3"
			}
		],
		"subraces": [
			{
				"url": "http://www.dnd5eapi.co/api/subraces/1",
				"name": "Hill Dwarf"
			},
			{
				"url": "http://www.dnd5eapi.co/api/subraces/4",
				"name": "Mountain Dwarf"
			}
		],
        "url": "http://www.dnd5eapi.co/api/races/1",
        "img": "img/dwarf.jpg"
    },
	{
		"index": 2,
		"name": "Elf",
		"speed": 30,
		"ability_bonuses": [
			0,
			2,
			0,
			0,
			0,
			0
		],
		"age": "Although elves reach physical maturity at about the same age as humans, the elven understanding of adulthood goes beyond physical growth to encompass worldly experience. An elf typically claims adulthood and an adult name around the age of 100 and can live to be 750 years old.",
		"alignment": "Elves love freedom, variety, and self-expression, so they lean strongly toward the gentler aspects of chaos. They value and protect others’ freedom as well as their own, and they are more often good than not. The drow are an exception; their exile has made them vicious and dangerous. Drow are more often evil than not.",
		"size": "Medium",
		"size_description": "Elves range from under 5 to over 6 feet tall and have slender builds. Your size is Medium.",
		"starting_proficiencies": [
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/116",
				"name": "Skill: Perception"
			}
		],
		"starting_proficiency_options": {},
		"languages": [
			{
				"url": "http://www.dnd5eapi.co/api/languages/1",
				"name": "Common"
			},
			{
				"url": "http://www.dnd5eapi.co/api/languages/3",
				"name": "Elvish"
			}
		],
		"language_options": {
			
		},
		"language_desc": "You can speak, read, and write Common and Elvish. Elvish is fluid, with subtle intonations and intricate grammar. Elven literature is rich and varied, and their songs and poems are famous among other races. Many bards learn their language so they can add Elvish ballads to their repertoires.",
		"traits": [
			{
				"name": "Darkvision (Elf)",
				"url": "http://www.dnd5eapi.co/api/traits/5"
			},
			{
				"name": "Fey Ancestry",
				"url": "http://www.dnd5eapi.co/api/traits/6"
			},
			{
				"name": "Trance",
				"url": "http://www.dnd5eapi.co/api/traits/7"
			}
		],
		"subraces": [
			{
				"url": "http://www.dnd5eapi.co/api/subraces/2",
				"name": "High Elf"
			},
			{
				"url": "http://www.dnd5eapi.co/api/subraces/2",
				"name": "Wood Elf"
			},
			{
				"url": "http://www.dnd5eapi.co/api/subraces/2",
				"name": "Dark Elf (Drow)"
			}
		],
        "url": "http://www.dnd5eapi.co/api/races/2",
        "img": "img/elf.jpg"
	},
	{
		"index": 3,
		"name": "Halfling",
		"speed": 25,
		"ability_bonuses": [
			0,
			2,
			0,
			0,
			0,
			0
		],
		"age": "A halfling reaches adulthood at the age of 20 and generally lives into the middle of his or her second century.",
		"alignment": "Most halflings are lawful good. As a rule, they are good-hearted and kind, hate to see others in pain, and have no tolerance for oppression. They are also very orderly and traditional, leaning heavily on the support of their community and the comfort of their old ways.",
		"size": "Small",
		"size_description": "Halflings average about 3 feet tall and weigh about 40 pounds. Your size is Small.",
		"starting_proficiencies": [],
		"starting_proficiency_options": {},
		"languages": [
			{
				"url": "http://www.dnd5eapi.co/api/languages/1",
				"name": "Common"
			},
			{
				"url": "http://www.dnd5eapi.co/api/languages/7",
				"name": "Halfling"
			}
		],
		"language_options": {},
		"language_desc": "You can speak, read, and write Common and Halfling. The Halfling language isn’t secret, but halflings are loath to share it with others. They write very little, so they don’t have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings speak Common to converse with the people in whose lands they dwell or through which they are traveling.",
		"traits": [
			{
				"name": "Brave",
				"url": "http://www.dnd5eapi.co/api/traits/21"
			},
			{
				"name": "Halfling Nimbleness",
				"url": "http://www.dnd5eapi.co/api/traits/22"
			},
			{
				"name": "Lucky",
				"url": "http://www.dnd5eapi.co/api/traits/23"
			}
		],
		"subraces": [
			{
				"url": "http://www.dnd5eapi.co/api/subraces/3",
				"name": "Lightfoot Halfling"
			}
		],
        "url": "http://www.dnd5eapi.co/api/races/3",
        "img": "img/halfling.jpg"
	},
	{
		"index": 4,
		"name": "Human",
		"speed": 30,
		"ability_bonuses": [
			1,
			1,
			1,
			1,
			1,
			1
		],
		"age": "Humans reach adulthood in their late teens and live less than a century.",
		"alignment": "Humans tend toward no particular alignment. The best and the worst are found among them.",
		"size": "Medium",
		"size_description": "Humans vary widely in height and build, from barely 5 feet to well over 6 feet tall. Regardless of your position in that range, your size is Medium.",
		"starting_proficiencies": [],
		"starting_proficiency_options": {},
		"languages": [
			{
				"url": "http://www.dnd5eapi.co/api/languages/1",
				"name": "Common"
			}
		],
		"language_options": {
			"choose": 1,
			"type": "languages",
			"from": [
				{
					"url": "http://www.dnd5eapi.co/api/languages/2",
					"name": "Dwarvish"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/3",
					"name": "Elvish"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/4",
					"name": "Giant"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/5",
					"name": "Gnomish"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/6",
					"name": "Goblin"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/7",
					"name": "Halfling"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/8",
					"name": "Orc"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/9",
					"name": "Abyssal"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/10",
					"name": "Celestial"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/11",
					"name": "Draconic"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/12",
					"name": "Deep Speech"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/13",
					"name": "Infernal"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/14",
					"name": "Primordial"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/15",
					"name": "Sylvan"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/16",
					"name": "Undercommon"
				}
			]
		},
		"language_desc": "You can speak, read, and write Common and one extra language of your choice. Humans typically learn the languages of other peoples they deal with, including obscure dialects. They are fond of sprinkling their speech with words borrowed from other tongues: Orc curses, Elvish musical expressions, Dwarvish military phrases, and so on.",
		"traits": [],
		"subraces": [],
        "url": "http://www.dnd5eapi.co/api/races/4",
        "img": "img/human.jpg"
	},
	{
		"index": 5,
		"name": "Dragonborn",
		"speed": 30,
		"ability_bonuses": [
			2,
			0,
			0,
			0,
			0,
			1
		],
		"alignment": " Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war between good and evil. Most dragonborn are good, but those who side with evil can be terrible villains.",
		"age": "Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.",
		"size": "Medium",
		"size_description": "Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.",
		"starting_proficiencies": [],
		"starting_proficiency_options": {},
		"languages": [
			{
				"url": "http://www.dnd5eapi.co/api/languages/1",
				"name": "Common"
			},
			{
				"url": "http://www.dnd5eapi.co/api/languages/11",
				"name": "Draconic"
			}
		],
		"language_options": {
			
		},
		"language_desc": "You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.",
		"traits": [
			{
				"name": "Draconic Anscestry",
				"url": "http://www.dnd5eapi.co/api/traits/24"
			},
			{
				"name": "Breath Weapon",
				"url": "http://www.dnd5eapi.co/api/traits/25"
			},
			{
				"name": "Damage Resistance (Dragonborn)",
				"url": "http://www.dnd5eapi.co/api/traits/36"
			}
			
		],
		"trait_options": 
			{
				"choose": 1,
				"from": [
					{
						"name": "Breath Weapon (Black)",
						"url": "http://www.dnd5eapi.co/api/traits/26"					
					},
					{
						"name": "Breath Weapon (Blue)",
						"url": "http://www.dnd5eapi.co/api/traits/27"					
					},
					{
						"name": "Breath Weapon (Brass)",
						"url": "http://www.dnd5eapi.co/api/traits/28"					
					},
					{
						"name": "Breath Weapon (Bronze)",
						"url": "http://www.dnd5eapi.co/api/traits/29"					
					},
					{
						"name": "Breath Weapon (Copper)",
						"url": "http://www.dnd5eapi.co/api/traits/30"					
					},
					{
						"name": "Breath Weapon (Gold)",
						"url": "http://www.dnd5eapi.co/api/traits/31"					
					},
					{
						"name": "Breath Weapon (Green)",
						"url": "http://www.dnd5eapi.co/api/traits/32"					
					},
					{
						"name": "Breath Weapon (Red)",
						"url": "http://www.dnd5eapi.co/api/traits/33"					
					},
					{
						"name": "Breath Weapon (Silver)",
						"url": "http://www.dnd5eapi.co/api/traits/34"					
					},
					{
						"name": "Breath Weapon (White)",
						"url": "http://www.dnd5eapi.co/api/traits/35"					
					}
				],
				"type": "trait"
			},
		"subraces": [],
        "url": "http://www.dnd5eapi.co/api/races/5",
        "img": "img/dragonborn.jpg"
	},
	{
		"index": 6,
		"name": "Gnome",
		"speed": 25,
		"ability_bonuses": [
			0,
			0,
			0,
			2,
			0,
			0
		],
		"alignment": "Gnomes are most often good. Those who tend toward law are sages, engineers, researchers, scholars, investigators, or inventors. Those who tend toward chaos are minstrels, tricksters, wanderers, or fanciful jewelers. Gnomes are good-hearted, and even the tricksters among them are more playful than vicious.",
		"age": " Gnomes mature at the same rate humans do, and most are expected to settle down into an adult life by around age 40. They can live 350 to almost 500 years.",
		"size": "Small",
		"size_description": "Gnomes are between 3 and 4 feet tall and average about 40 pounds. Your size is Small.",
		"starting_proficiencies": [],
		"starting_proficiency_options": {},
		"languages": [
			{
				"url": "http://www.dnd5eapi.co/api/languages/1",
				"name": "Common"
			},
			{
				"url": "http://www.dnd5eapi.co/api/languages/5",
				"name": "Gnomish"
			}
		],
		"language_options": {
			
		},
		"language_desc": " You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.",
		"traits": [
			{
				"name": "Darkvision (Gnome)",
				"url": "http://www.dnd5eapi.co/api/traits/42"
			},
			{
				"name": "Gnome Cunning",
				"url": "http://www.dnd5eapi.co/api/traits/43"
			}
			
		],
		"trait_options": {},
		"subraces": [
			{
				"url": "http://www.dnd5eapi.co/api/subraces/7",
				"name": "Forest Gnome"
			},
			{
				"url": "http://www.dnd5eapi.co/api/subraces/8",
				"name": "Rock Gnome"
			}
		],
        "url": "http://www.dnd5eapi.co/api/races/6",
        "img": "img/gnome.jpg"
	},
	{
		"index": 7,
		"name": "Half-Elf",
		"speed": 30,
		"ability_bonuses": [
			0,
			0,
			0,
			0,
			0,
			2
		],
		"alignment": "Half-elves share the chaotic bent of their elven heritage. They value both personal freedom and creative expression, demonstrating neither love of leaders nor desire for followers. They chafe at rules, resent others' demands, and sometimes prove unreliable, or at least unpredictable.",
		"age": "Half-elves mature at the same rate humans do and reach adulthood around the age of 20. They live much longer than humans, however, often exceeding 180 years.",
		"size": "Medium",
		"size_description": "Half-elves are about the same size as humans, ranging from 5 to 6 feet tall. Your size is Medium.",
		"starting_proficiencies": [],
		"starting_proficiency_options": {},
		"languages": [
			{
				"url": "http://www.dnd5eapi.co/api/languages/1",
				"name": "Common"
			},
			{
				"url": "http://www.dnd5eapi.co/api/languages/3",
				"name": "Elvish"
			}
		],
		"language_options": {
			"choose": 1,
			"type": "languages",
			"from": [
				{
					"url": "http://www.dnd5eapi.co/api/languages/2",
					"name": "Dwarvish"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/3",
					"name": "Elvish"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/4",
					"name": "Giant"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/5",
					"name": "Gnomish"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/6",
					"name": "Goblin"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/7",
					"name": "Halfling"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/8",
					"name": "Orc"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/9",
					"name": "Abyssal"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/10",
					"name": "Celestial"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/11",
					"name": "Draconic"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/12",
					"name": "Deep Speech"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/13",
					"name": "Infernal"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/14",
					"name": "Primordial"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/15",
					"name": "Sylvan"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/16",
					"name": "Undercommon"
				}
			]
		},
		"language_desc": "You can speak, read, and write Common, Elvish, and one extra language of your choice.",
		"traits": [
			{
				"name": "Darkvision (Half-Elf)",
				"url": "http://www.dnd5eapi.co/api/traits/48"
			},
			{
				"name": "Fey Ancestry",
				"url": "http://www.dnd5eapi.co/api/traits/49"
			},
			{
				"name": "Skill Versatility",
				"url": "http://www.dnd5eapi.co/api/traits/50"
			}
			
		],
		"trait_options": {},
		"subraces": [],
        "url": "http://www.dnd5eapi.co/api/races/7",
        "img": "img/half-elf.jpg"
	},
	{
		"index": 8,
		"name": "Half-Orc",
		"speed": 30,
		"ability_bonuses": [
			2,
			0,
			1,
			0,
			0,
			0
		],
		"alignment": " Half-orcs inherit a tendency toward chaos from their orc parents and are not strongly inclined toward good. Half-orcs raised among orcs and willing to live out their lives among them are usually evil.",
		"age": "Half-orcs mature a little faster than humans, reaching adulthood around age 14. They age noticeably faster and rarely live longer than 75 years.",
		"size": "Medium",
		"size_description": "Half-orcs are somewhat larger and bulkier than humans, and they range from 5 to well over 6 feet tall. Your size is Medium.",
		"starting_proficiencies": [
			{
				"name": "Skill: Intimidation",
				"url": "http://www.dnd5eapi.co/api/proficiencies/112"
			}
		],
		"starting_proficiency_options": {},
		"languages": [
			{
				"url": "http://www.dnd5eapi.co/api/languages/1",
				"name": "Common"
			},
			{
				"url": "http://www.dnd5eapi.co/api/languages/8",
				"name": "Orcish"
			}
		],
		"language_options": {},
		"language_desc": "You can speak, read, and write Common and Orc. Orc is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.",
		"traits": [
			{
				"name": "Darkvision (Half-Orc)",
				"url": "http://www.dnd5eapi.co/api/traits/51"
			},
			{
				"name": "Savage Attacks",
				"url": "http://www.dnd5eapi.co/api/traits/52"
			},
			{
				"name": "Restless Endurance",
				"url": "http://www.dnd5eapi.co/api/traits/53"
			}
			
		],
		"trait_options": {},
		"subraces": [],
        "url": "http://www.dnd5eapi.co/api/races/8",
        "img": "img/half-orc.jpg"
	},
	{
		"index": 9,
		"name": "Tiefling",
		"speed": 30,
		"ability_bonuses": [
			2,
			0,
			1,
			0,
			0,
			0
		],
		"alignment": "Tieflings might not have an innate tendency toward evil, but many of them end up there. Evil or not, an independent nature inclines many tieflings toward a chaotic alignment.",
		"age": "Tieflings mature at the same rate as humans but live a few years longer.",
		"size": "Medium",
		"size_description": "Tieflings are about the same size and build as humans. Your size is Medium.",
		"starting_proficiencies": [],
		"starting_proficiency_options": {},
		"languages": [
			{
				"url": "http://www.dnd5eapi.co/api/languages/1",
				"name": "Common"
			},
			{
				"url": "http://www.dnd5eapi.co/api/languages/9",
				"name": "Infernal"
			}
		],
		"language_options": {},
		"language_desc": "You can speak, read, and write Common and Infernal.",
		"traits": [
			{
				"name": "Darkvision (Tiefling)",
				"url": "http://www.dnd5eapi.co/api/traits/54"
			},
			{
				"name": "Hellish Resistance",
				"url": "http://www.dnd5eapi.co/api/traits/55"
			},
			{
				"name": "Infernal Legacy",
				"url": "http://www.dnd5eapi.co/api/traits/56"
			}
		],
		"trait_options": {},
		"subraces": [],
        "url": "http://www.dnd5eapi.co/api/races/9",
        "img": "img/tiefling.jpg"
	}
]

module.exports = races
},{}],7:[function(require,module,exports){
const skills = [{
	"index": 1,
	"name": "Acrobatics",
	"desc": ["Your Dexterity (Acrobatics) check covers your attempt to stay on your feet in a tricky situation, such as when you’re trying to run across a sheet of ice, balance on a tightrope, or stay upright on a rocking ship’s deck. The GM might also call for a Dexterity (Acrobatics) check to see if you can perform acrobatic stunts, including dives, rolls, somersaults, and flips."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/1",
		"name": "STR"
	},
	"url": "http://www.dnd5eapi.co/api/skills/1"
}, {
	"index": 2,
	"name": "Animal Handling",
	"desc": ["When there is any question whether you can calm down a domesticated animal, keep a mount from getting spooked, or intuit an animal’s intentions, the GM might call for a Wisdom (Animal Handling) check. You also make a Wisdom (Animal Handling) check to control your mount when you attempt a risky maneuver."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/5",
		"name": "WIS"
	},
	"url": "http://www.dnd5eapi.co/api/skills/2"
}, {
	"index": 3,
	"name": "Arcana",
	"desc": ["Your Intelligence (Arcana) check measures your ability to recall lore about spells, magic items, eldritch symbols, magical traditions, the planes of existence, and the inhabitants of those planes."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/4",
		"name": "INT"
	},
	"url": "http://www.dnd5eapi.co/api/skills/3"
}, {
	"index": 4,
	"name": "Athletics",
	"desc": ["Your Strength (Athletics) check covers difficult situations you encounter while climbing, jumping, or swimming."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/1",
		"name": "STR"
	},
	"url": "http://www.dnd5eapi.co/api/skills/4"
}, {
	"index": 5,
	"name": "Deception",
	"desc": ["Your Charisma (Deception) check determines whether you can convincingly hide the truth, either verbally or through your actions. This deception can encompass everything from misleading others through ambiguity to telling outright lies. Typical situations include trying to fast- talk a guard, con a merchant, earn money through gambling, pass yourself off in a disguise, dull someone’s suspicions with false assurances, or maintain a straight face while telling a blatant lie."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/6",
		"name": "CHA"
	},
	"url": "http://www.dnd5eapi.co/api/skills/5"
}, {
	"index": 6,
	"name": "History",
	"desc": ["Your Intelligence (History) check measures your ability to recall lore about historical events, legendary people, ancient kingdoms, past disputes, recent wars, and lost civilizations."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/4",
		"name": "INT"
	},
	"url": "http://www.dnd5eapi.co/api/skills/6"
}, {
	"index": 7,
	"name": "Insight",
	"desc": ["Your Wisdom (Insight) check decides whether you can determine the true intentions of a creature, such as when searching out a lie or predicting someone’s next move. Doing so involves gleaning clues from body language, speech habits, and changes in mannerisms."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/5",
		"name": "WIS"
	},
	"url": "http://www.dnd5eapi.co/api/skills/7"
}, {
	"index": 8,
	"name": "Intimidation",
	"desc": ["When you attempt to influence someone through overt threats, hostile actions, and physical violence, the GM might ask you to make a Charisma (Intimidation) check. Examples include trying to pry information out of a prisoner, convincing street thugs to back down from a confrontation, or using the edge of a broken bottle to convince a sneering vizier to reconsider a decision."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/6",
		"name": "CHA"
	},
	"url": "http://www.dnd5eapi.co/api/skills/8"
}, {
	"index": 9,
	"name": "Investigation",
	"desc": ["When you look around for clues and make deductions based on those clues, you make an Intelligence (Investigation) check. You might deduce the location of a hidden object, discern from the appearance of a wound what kind of weapon dealt it, or determine the weakest point in a tunnel that could cause it to collapse. Poring through ancient scrolls in search of a hidden fragment of knowledge might also call for an Intelligence (Investigation) check."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/4",
		"name": "INT"
	},
	"url": "http://www.dnd5eapi.co/api/skills/9"
}, {
	"index": 10,
	"name": "Medicine",
	"desc": ["A Wisdom (Medicine) check lets you try to stabilize a dying companion or diagnose an illness."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/5",
		"name": "WIS"
	},
	"url": "http://www.dnd5eapi.co/api/skills/10"
}, {
	"index": 11,
	"name": "Nature",
	"desc": ["Your Intelligence (Nature) check measures your ability to recall lore about terrain, plants and animals, the weather, and natural cycles."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/4",
		"name": "INT"
	},
	"url": "http://www.dnd5eapi.co/api/skills/11"
}, {
	"index": 12,
	"name": "Perception",
	"desc": ["Your Wisdom (Perception) check lets you spot, hear, or otherwise detect the presence of something. It measures your general awareness of your surroundings and the keenness of your senses. For example, you might try to hear a conversation through a closed door, eavesdrop under an open window, or hear monsters moving stealthily in the forest. Or you might try to spot things that are obscured or easy to miss, whether they are orcs lying in ambush on a road, thugs hiding in the shadows of an alley, or candlelight under a closed secret door."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/5",
		"name": "WIS"
	},
	"url": "http://www.dnd5eapi.co/api/skills/12"
}, {
	"index": 13,
	"name": "Performance",
	"desc": ["Your Charisma (Performance) check determines how well you can delight an audience with music, dance, acting, storytelling, or some other form of entertainment."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/6",
		"name": "CHA"
	},
	"url": "http://www.dnd5eapi.co/api/skills/13"
}, {
	"index": 14,
	"name": "Persuasion",
	"desc": ["When you attempt to influence someone or a group of people with tact, social graces, or good nature, the GM might ask you to make a Charisma (Persuasion) check. Typically, you use persuasion when acting in good faith, to foster friendships, make cordial requests, or exhibit proper etiquette. Examples of persuading others include convincing a chamberlain to let your party see the king, negotiating peace between warring tribes, or inspiring a crowd of townsfolk."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/6",
		"name": "CHA"
	},
	"url": "http://www.dnd5eapi.co/api/skills/14"
}, {
	"index": 15,
	"name": "Religion",
	"desc": ["Your Intelligence (Religion) check measures your ability to recall lore about deities, rites and prayers, religious hierarchies, holy symbols, and the practices of secret cults."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/4",
		"name": "INT"
	},
	"url": "http://www.dnd5eapi.co/api/skills/15"
}, {
	"index": 16,
	"name": "Sleight of Hand",
	"desc": ["Whenever you attempt an act of legerdemain or manual trickery, such as planting something on someone else or concealing an object on your person, make a Dexterity (Sleight of Hand) check. The GM might also call for a Dexterity (Sleight of Hand) check to determine whether you can lift a coin purse off another person or slip something out of another person’s pocket."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/2",
		"name": "DEX"
	},
	"url": "http://www.dnd5eapi.co/api/skills/16"
}, {
	"index": 17,
	"name": "Stealth",
	"desc": ["Make a Dexterity (Stealth) check when you attempt to conceal yourself from enemies, slink past guards, slip away without being noticed, or sneak up on someone without being seen or heard."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/2",
		"name": "DEX"
	},
	"url": "http://www.dnd5eapi.co/api/skills/17"
}, {
	"index": 18,
	"name": "Survival",
	"desc": ["The GM might ask you to make a Wisdom (Survival) check to follow tracks, hunt wild game, guide your group through frozen wastelands, identify signs that owlbears live nearby, predict the weather, or avoid quicksand and other natural hazards."],
	"ability_score": {
		"url": "http://www.dnd5eapi.co/api/ability-scores/5",
		"name": "WIS"
	},
	"url": "http://www.dnd5eapi.co/api/skills/18"
}]

module.exports = skills
},{}],8:[function(require,module,exports){
const spells = [
{ name: `Acid Splash`,
 attack: true,
desc: [`You hurl a bubble of acid. Choose one creature within range, or choose two creatures within range that are within 5 feet of each other. A target must succeed on a dexterity saving throw or take 1d6 acid damage.`, 
`This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`], 
range: `60 feet`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Alarm`, 
utility:true,
desc: [`You set an alarm against unwanted intrusion. Choose a door, a window, or an area within range that is no larger than a 20-foot cube. Until the spell ends, an alarm alerts you whenever a Tiny or larger creature touches or enters the warded area. When you cast the spell, you can designate creatures that won't set off the alarm. You also choose whether the alarm is mental or audible.`, 
`A mental alarm alerts you with a ping in your mind if you are within 1 mile of the warded area. This ping awakens you if you are sleeping.`, 
`An audible alarm produces the sound of a hand bell for 10 seconds within 60 feet.`], 
range: `30 feet`, 
duration: `8 hours`, 
concentration: `no`, 
casting_time: `1 minute`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/8`, 
name: `Ranger` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Bane`, 
strategy: true,
desc: [`Up to three creatures of your choice that you can see within range must make charisma saving throws. Whenever a target that fails this saving throw makes an attack roll or a saving throw before the spell ends,  the target must roll a d4 and subtract the number rolled from the attack roll or saving throw.`],  higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.`], 
range: `30 feet`, 
duration: `Up to 1 minute`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }] }, 

{ name: `Bless`,
support: true,
desc: [`You bless up to three creatures of your choice within range. Whenever a target makes an attack roll or a saving throw before the spell ends, the target can roll a d4 and add the number rolled to the attack roll or saving throw.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st.`], 
range: `30 feet`, 
duration: `Up to 1 minute`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }] }, 

{ name: `Burning Hands`, 
attack: true,
desc: [`As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.`, 
`The fire ignites any flammable objects in the area that aren't being worn or carried.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, the damage increases by 1d6 for each slot level above 1st.`], 
range: `Self`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Charm Person`, 
strategy:true,
desc: [`You attempt to charm a humanoid you can see within range. It must make a wisdom saving throw, and does so with advantage if you or your companions are fighting it. If it fails the saving throw, it is charmed by you until the spell ends or until you or your companions do anything harmful to it. The charmed creature regards you as a friendly acquaintance. When the spell ends, the creature knows it was charmed by you.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, you can target one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.`], 
range: `30 feet`, 
duration: `1 hour`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Chill Touch`, 
attack: true,
desc: [`You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can't regain hit points until the start of your next turn. Until then, the hand clings to the target.`, 
`If you hit an undead target, it also has disadvantage on attack rolls against you until the end of your next turn.`, `This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`], 
range: `120 feet`, 
duration: `1 round`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Color Spray`,
strategy: true, 
desc: [`A dazzling array of flashing, colored light springs from your hand. Roll 6d10; the total is how many hit points of creatures this spell can effect. Creatures in a 15-foot cone originating from you are affected in ascending order of their current hit points (ignoring unconscious creatures and creatures that can't see).`, 
`Starting with the creature that has the lowest current hit points, each creature affected by this spell is blinded until the spell ends. Subtract each creature's hit points from the total before moving on to the creature with the next lowest hit points. A creature's hit points must be equal to or less than the remaining total for that creature to be affected.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, roll an additional 2d10 for each slot level above 1st.`], 
range: `Self`, 
duration: `1 round`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Command`, 
strategy: true,
desc: [`You speak a one-word command to a creature you can see within range. The target must succeed on a wisdom saving throw or follow the command on its next turn. The spell has no effect if the target is undead, if it doesn't understand your language, or if your command is directly harmful to it.`, 
`Some typical commands and their effects follow. You might issue a command other than one described here. If you do so, the DM determines how the target behaves. If the target can't follow your command, the spell ends.`,`Approach.`, 
` The target moves toward you by the shortest and most direct route,ending its turn if it moves within 5 feet of you.`, 
`Drop`, 
` The target drops whatever it is holding and then ends its turn.`, 
`Flee.`, 
` The target spends its turn moving away from you by the fastest available means.`, 
`Grovel.`, 
` The target falls prone and then ends its turn.`, 
`Halt.`, 
` The target doesn't move and takes no actions. A flying creature stays aloft, provided that it is able to do so. If it must move to stay aloft, it flies the minimum distance needed to remain in the air.`], higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, you can affect one additional creature for each slot level above 1st. The creatures must be within 30 feet of each other when you target them.`], 
range: `60 feet`, 
duration: `1 round`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }] }, 

{ name: `Comprehend Languages`, 
utility: true,
desc: [`For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minute to read one page of text.`, 
`This spell doesn't decode secret messages in a text or a glyph, such as an arcane sigil, that isn't part of a written language.`], 
range: `Self`, 
duration: `1 hour`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Create or Destroy Water`, 
utility: true,
desc: [`You either create or destroy water.`, 
`Create Water.`, 
` You create up to 10 gallons of clean water within range in an open container. Alternatively, the water falls as rain in a 30-foot cube within range.`, 
`Destroy Water.`, 
` You destroy up to 10 gallons of water in an open container within range. Alternatively, you destroy fog in a 30-foot cube within range.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, you create or destroy 10 additional gallons of water, or the size of the cube increases by 5 feet, for each slot level above 1st.`], 
range: `30 feet`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }] },

{ name: `Cure Wounds`, 
support: true,
desc: [`A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.`], 
range: `Touch`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }, 
{ url: `http://www.dnd5eapi.co/api/classes/8`, 
name: `Ranger` }] }, 

{ name: `Dancing Lights`, 
utility: true,
desc: [`You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. You can also combine the four lights into one glowing vaguely humanoid form of Medium size. Whichever form you choose, each light sheds dim light in a 10-foot radius.`, 
`As a bonus action on your turn, you can move the lights up to 60 feet to a new spot within range. A light must be within 20 feet of another light created by this spell, and a light winks out if it exceeds the spell's range.`], 
range: `120 feet`, 
duration: `Up to 1 minute`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Detect Evil and Good`, 
utility: true,
desc: [`For the duration, you know if there is an aberration, celestial, elemental, fey, fiend, or undead within 30 feet of you, as well as where the creature is located. Similarly, you know if there is a place or object within 30 feet of you that has been magically consecrated or desecrated.`, 
`The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.`], 
range: `Self`, 
duration: `Up to 10 minutes`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }] },

{ name: `Detect Magic`, 
utility: true,
desc: [`For the duration, you sense the presence of magic within 30 feet of you. If you sense magic in this way, you can use your action to see a faint aura around any visible creature or object in the area that bears magic, and you learn its school of magic, if any.`, 
`The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.`], 
range: `Self`, 
duration: `Up to 10 minutes`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }, 
{ url: `http://www.dnd5eapi.co/api/classes/8`, 
name: `Ranger` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Detect Poison and Disease`, 
utility: true,
desc: [`For the duration, you can sense the presence and location of poisons, poisonous creatures, and diseases within 30 feet of you. You also identify the kind of poison, poisonous creature, or disease in each case.`, 
`The spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt.`], 
range: `Self`, 
duration: `Up to 10 minutes`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }, 
{ url: `http://www.dnd5eapi.co/api/classes/8`, 
name: `Ranger` }] },

{ name: `Disguise Self`, 
utility: true,
desc: [`You make yourself, including your clothing, armor, weapons, and other belongings on your person, look different until the spell ends or until you use your action to dismiss it. You can seem 1 foot shorter or taller and can appear thin, fat, or in between. You can't change your body type, so you must adopt a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you.`, 
`The changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel your head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.`, 
`To discern that you are disguised, a creature can use its action to inspect your apperance and must succeed on an Intelligence (Investigation) check against your spell save DC.`], 
range: `Self`, 
duration: `1 hour`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Divine Favor`, 
attack: true,
desc: [`Your prayer empowers you with divine radiance. Until the spell ends, 
your weapon attacks deal an extra 1d4 radiant damage on a hit.`], 
range: `Self`, 
duration: `Up to 1 minute`, 
concentration: `yes`, 
casting_time: `1 bonus action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }] }, 

{ name: `Eldritch Blast`, 
attack: true,
desc: [`A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, 
the target takes 1d10 force damage.`], 
higher_level: [`The spell creates more than one beam when you reach higher levels: two beams at 5th level, 
three beams at 11th level, 
and four beams at 17th level. You can direct the beams at the same target or at different ones. Make a separate attack roll for each beam.`], 
range: `120 feet`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }] }, 

{ name: `Entangle`, 
strategy: true,
desc: [`Grasping weeds and vines sprout from the ground in a 20-foot square starting form a point within range. For the duration, 
these plants turn the ground in the area into difficult terrain.`, 
`A creature in the area when you cast the spell must succeed on a strength saving throw or be restrained by the entangling plants until the spell ends. A creature restrained by the plants can use its action to make a Strength check against your spell save DC. On a success, 
it frees itself.`, 
`When the spell ends, 
the conjured plants wilt away.`], 
range: `90 feet`, 
duration: `Up to 1 minute`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }] }, 

{ name: `Expeditious Retreat`, 
strategy: true,
desc: [`This spell allows you to move at an incredible pace. When you cast this spell, 
and then as a bonus action on each of your turns until the spell ends, 
you can take the Dash action.`], 
range: `Self`, 
duration: `Up to 10 minutes`, 
concentration: `yes`, 
casting_time: `1 bonus action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Faerie Fire`, 
utility: true,
desc: [`Each object in a 20-foot cube within range is outlined in blue, 
green, 
or violet light (your choice). Any creature in the area when the spell is cast is also outlined in light if it fails a dexterity saving throw. For the duration, 
objects and affected creatures shed dim light in a 10-foot radius.`, 
`Any attack roll against an affected creature or object has advantage if the attacker can see it, 
and the affected creature or object can't benefit from being invisible.`], 
range: `60 feet`, 
duration: `Up to 1 minute`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }] }, 

{ name: `False Life`, 
support: true,
desc: [`Bolstering yourself with a necromantic facsimile of life, 
you gain 1d4 + 4 temporary hit points for the duration.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, 
you gain 5 additional temporary hit points for each slot level above 1st.`], 
range: `Self`, 
duration: `1 hour`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Feather Fall`, 
utility:true,
desc: [`Choose up to five falling creatures within range. A falling creature's rate of descent slows to 60 feet per round until the spell ends. If the creature lands before the spell ends, 
it takes no falling damage and can land on its feet, 
and the spell ends for that creature.`], 
range: `60 feet`, 
duration: `1 minute`, 
concentration: `no`, 
casting_time: `1 reaction`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Floating Disk`, 
utility: true,
desc: [`This spell creates a circular, 
horizontal plane of force, 
3 feet in diameter and 1 inch thick, 
that floats 3 feet above the ground in an unoccupied space of your choice that you can see within range. The disk remains for the duration, 
and can hold up to 500 pounds. If more weight is placed on it, 
the spell ends, 
and everything on the disk falls to the ground.`, 
`The disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, 
the disk follows you so that it remains within 20 feet of you. If can move across uneven terrain, 
up or down stairs, 
slopes and the like, 
but it can't cross an elevation change of 10 feet or more. For example, 
the disk can't move across a 10-foot-deep pit, 
nor could it leave such a pit if it was created at the bottom.`, 
`If you move more than 100 feet away from the disk (typically because it can't move around an obstacle to follow you), 
the spell ends.`], 
range: `30 feet`, 
duration: `1 hour`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Fog Cloud`, 
utility: true,
desc: [`You create a 20-foot-radius sphere of fog centered on a point within range. The sphere spreads around corners, 
and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater speed (at least 10 miles per hour) disperses it.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, 
the radius of the fog increases by 20 feet for each slot level above 1st.`], 
range: `120 feet`, 
duration: `Up to 1 hour`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/8`, 
name: `Ranger` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Grease`, 
utility: true,
desc: [`Slick grease covers the ground in a 10-foot square centered on a point within range and turns it into difficult terrain for the duration.`, 
`When the grease appears, 
each creature standing in its area must succeed on a dexterity saving throw or fall prone. A creature that enters the area or ends its turn there must also succeed on a dexterity saving throw or fall prone.`], 
range: `60 feet`, 
duration: `1 minute`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Guidance`, 
strategy: true,
desc: [`You touch one willing creature. Once before the spell ends, 
the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends.`], 
range: `Touch`, 
duration: `Up to 1 minute`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }] }, 

{ name: `Guiding Bolt`, 
attack: true,
desc: [`A flash of light streaks toward a creature of your choice within range. Make a ranged spell attack against the target. On a hit, 
the target takes 4d6 radiant damage, 
and the next attack roll made against this target before the end of your next turn has advantage, 
thanks to the mystical dim light glittering on the target until then.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, 
the damage increases by 1d6 for each slot level above 1st.`], 
range: `120 feet`, 
duration: `1 round`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }] }, 

{ name: `Healing Word`, 
support: true,
desc: [`A creature of your choice that you can see within range regains hit points equal to 1d4 + your spellcasting ability modifier. This spell has no effect on undead or constructs.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, 
the healing increases by 1d4 for each slot level above 1st.`], 
range: `60 feet`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 bonus action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }] }, 

{ name: `Heroism`, 
utility: true,
desc: [`A willing creature you touch is imbued with bravery. Until the spell ends, 
the creature is immune to being frightened and gains temporary hit points equal to your spellcasting ability modifier at the start of each of its turns. When the spell ends, 
the target loses any remaining temporary hit points from this spell.`], 
range: `Touch`, 
duration: `Up to 1 minute`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }] }, 

{ name: `Hideous Laughter`, 
strategy: true,
desc: [`A creature of your choice that you can see within range perceives everything as hilariously funny and falls into fits of laughter if this spell affects it. The target must succeed on a wisdom saving throw or fall prone, 
becoming incapacitated and unable to stand up for the duration. A creature with an Intelligence score of 4 or less isn't affected.`, 
`At the end of each of its turns, 
and each time it takes damage, 
the target can make another wisdom saving throw. The target had advantage on the saving throw if it's triggered by damage. On a success, 
the spell ends.`], 
range: `30 feet`, 
duration: `Up to 1 minute`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Identify`, 
utility: true,
desc: [`You choose one object that you must touch throughout the casting of the spell. If it is a magic item or some other magic-imbued object, 
you learn its properties and how to use them, 
whether it requires attunement to use, 
and how many charges it has, 
if any. You learn whether any spells are affecting the item and what they are. If the item was created by a spell, 
you learn which spell created it.`, 
`If you instead touch a creature throughout the casting, 
you learn what spells, 
if any, 
are currently affecting it.`], 
range: `Touch`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 minute`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Illusory Script`, 
utility: true,
desc: [`You write on parchment, 
paper, 
or some other suitable writing material and imbue it with a potent illusion that lasts for the duration.`, 
`To you and any creatures you designate when you cast the spell, 
the writing appears normal, 
written in your hand, 
and conveys whatever meaning you intended when you wrote the text. To all others, 
the writing appears as if it were written in an unknown or magical script that is unintelligible. Alternatively, 
you can cause the writing to appear to be an entirely different message, 
written in a different hand and language, 
though the language must be one you know.`, 
`Should the spell be dispelled, 
the original script and the illusion both disappear.`, 
`A creature with truesight can read the hidden message.`], 
range: `Touch`, 
duration: `10 days`, 
concentration: `no`, 
casting_time: `1 minute`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Inflict Wounds`, 
attack: true,
desc: [`Make a melee spell attack against a creature you can reach. On a hit, 
the target takes 3d10 necrotic damage.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, 
the damage increases by 1d10 for each slot level above 1st.`], 
range: `Touch`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }] }, 

{ name: `Jump`, 
utility: true,
desc: [`You touch a creature. The creature's jump distance is tripled until the spell ends.`], 
range: `Touch`, 
duration: `1 minute`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/8`, 
name: `Ranger` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Light`, 
utility: true,
desc: [`You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, 
the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.`, 
`If you target an object held or worn by a hostile creature, 
that creature must succeed on a dexterity saving throw to avoid the spell.`], 
range: `Touch`, 
duration: `1 hour`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Longstrider`, 
utility: true,
desc: [`You touch a creature. The target's speed increases by 10 feet until the spell ends.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, 
you can target one additional creature for each spell slot above 1st.`], 
range: `Touch`, 
duration: `1 hour`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/8`, 
name: `Ranger` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Mage Armor`, 
support: true,
desc: [`You touch a willing creature who isn't wearing armor, 
and a protective magical force surrounds it until the spell ends. The target's base AC becomes 13 + its Dexterity modifier. The spell ends if the target dons armor or if you dismiss the spell as an action.`], 
range: `Touch`, 
duration: `8 hours`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Mage Hand`, 
utility: true,
desc: [`A spectral, 
floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.`, 
`You can use your action to control the hand. You can use the hand to manipulate an object, 
open an unlocked door or container, 
stow or retrieve an item from an open container, 
or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.`, 
`The hand can't attack, 
activate magic items, 
or carry more than 10 pounds.`], 
range: `30 feet`, 
duration: `1 minute`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Magic Missile`, 
attack: true,
desc: [`You create three glowing darts of magical force. Each dart hits a creature of your choice that you can see within range. A dart deals 1d4 + 1 force damage to its target. The darts all strike simultaneously, 
and you can direct them to hit one creature or several.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, 
the spell creates one more dart for each slot level above 1st.`], 
range: `120 feet`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Mending`, 
utility: true,
desc: [`This spell repairs a single break or tear in an object you touch, 
such as a broken key, 
a torn cloak, 
or a leaking wineskin. As long as the break or tear is no longer than 1 foot in any dimension, 
you mend it, 
leaving no trace of the former damage.`, 
`This spell can physically repair a magic item or construct, 
but the spell can't restore magic to such an object.`], 
range: `Touch`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 minute`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Message`, 
utility: true,
desc: [`You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.`, 
`You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 
1 foot of stone, 
1 inch of common metal, 
a thin sheet of lead, 
or 3 feet of wood blocks the spell. The spell doesn't have to follow a straight line and can travel freely around corners or through openings.`], 
range: `120 feet`, 
duration: `1 round`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Minor Illusion`, 
utility: true,
desc: [`You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.`, 
`If you create a sound, 
its volume can range from a whisper to a scream. It can be your voice, 
someone else's voice, 
a lion's roar, 
a beating of drums, 
or any other sound you choose. The sound continues unabated throughout the duration, 
or you can make discrete sounds at different times before the spell ends.`, 
`If you create an image of an objectâ€”such as a chair, 
muddy footprints, 
or a small chestâ€”it must be no larger than a 5-foot cube. The image can't create sound, 
light, 
smell, 
or any other sensory effect. Physical interaction with the image reveals it to be an illusion, 
because things can pass through it.`, 
`If a creature uses its action to examine the sound or image, 
the creature can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, 
the illusion becomes faint to the creature.`], 
range: `30 feet`, 
duration: `1 minute`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Prestidigitation`, 
utility: true,
desc: [`This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within 'range':`, 
`You create an instantaneous, 
harmless sensory effect, 
such as a shower of sparks, 
a puff of wind, 
faint musical notes, 
or an odd odor.`, 
`You instantaneously light or snuff out a candle, 
a torch, 
or a small campfire.`, 
`You instantaneously clean or soil an object no larger than 1 cubic foot.`, 
`You chill, 
warm, 
or flavor up to 1 cubic foot of nonliving material for 1 hour.`, 
`You make a color, 
a small mark, 
or a symbol appear on an object or a surface for 1 hour.`, 
`You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.`, 
`If you cast this spell multiple times, 
you can have up to three of its non-instantaneous effects active at a time, 
and you can dismiss such an effect as an action.`], 
range: `10 feet`, 
duration: `1 hour`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Produce Flame`, 
attack: true,
desc: [`A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The spell ends if you dismiss it as an action or if you cast it again.`, 
`You can also attack with the flame, 
although doing so ends the spell. When you cast this spell, 
or as an action on a later turn, 
you can hurl the flame at a creature within 30 feet of you. Make a ranged spell attack. On a hit, 
the target takes 1d8 fire damage.`, 
`This spell's damage increases by 1d8 when you reach 5th level (2d8), 
11th level (3d8), 
and 17th level (4d8).`], 
range: `Self`, 
duration: `10 minutes`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }] }, 

{ name: `Protection from Evil and Good`,
strategy: true, 
desc: [`Until the spell ends, 
one willing creature you touch is protected against certain types of creatures: aberrations, 
celestials, 
elementals, 
fey, 
fiends, 
and undead.`, 
`The protection grants several benefits. Creatures of those types have disadvantage on attack rolls against the target. The target also can't be charmed, 
frightened, 
or possessed by them. If the target is already charmed, 
frightened, 
or possessed by such a creature, 
the target has advantage on any new saving throw against the relevant effect.`], 
range: `Touch`, 
duration: `Up to 10 minutes`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Purify Food and Drink`, 
utility: true,
desc: [`All nonmagical food and drink within a 5-foot radius sphere centered on a point of your choice within range is purified and rendered free of poison and disease.`], 
range: `10 feet`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }] }, 

{ name: `Ray of Frost`, 
attack: true,
desc: [`A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, 
it takes 1d8 cold damage, 
and its speed is reduced by 10 feet until the start of your next turn.`, 
`The spell's damage increases by 1d8 when you reach 5th level (2d8), 
11th level (3d8), 
and 17th level (4d8).`], 
range: `60 feet`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Resistance`, 
strategy: true,
desc: [`You touch one willing creature. Once before the spell ends, 
the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after making the saving throw. The spell then ends.`], 
range: `Touch`, 
duration: `Up to 1 minute`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }] }, 

{ name: `Sacred Flame`, 
attack: true,
desc: [`Flame-like radiance descends on a creature that you can see within range. The target must succeed on a dexterity saving throw or take 1d8 radiant damage. The target gains no benefit from cover for this saving throw.`, 
`The spell's damage increases by 1d8 when you reach 5th level (2d8), 
11th level (3d8), 
and 17th level (4d8).`], 
range: `60 feet`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }] }, 

{ name: `Sanctuary`, 
strategy:true,
desc: [`You ward a creature within range against attack. Until the spell ends, 
any creature who targets the warded creature with an attack or a harmful spell must first make a wisdom saving throw. On a failed save, 
the creature must choose a new target or lose the attack or spell. This spell doesn't protect the warded creature from area effects, 
such as the explosion of a fireball.`, 
`If the warded creature makes an attack or casts a spell that affects an enemy creature, 
this spell ends.`], 
range: `30 feet`, 
duration: `1 minute`, 
concentration: `no`, 
casting_time: `1 bonus action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }] }, 

{ name: `Shield`, 
strategy: true,
desc: [`An invisible barrier of magical force appears and protects you. Until the start of your next turn, 
you have a +5 bonus to AC, 
including against the triggering attack, 
and you take no damage from magic missile.`], 
range: `Self`, 
duration: `1 round`, 
concentration: `no`, 
casting_time: `1 reaction`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Shield of Faith`, 
support: true,
desc: [`A shimmering field appears and surrounds a creature of your choice within range, 
granting it a +2 bonus to AC for the duration.`], 
range: `60 feet`, 
duration: `Up to 10 minutes`, 
concentration: `yes`, 
casting_time: `1 bonus action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }, 
{ url: `http://www.dnd5eapi.co/api/classes/7`, 
name: `Paladin` }] }, 

{ name: `Shillelagh`, 
strategy:true,
desc: [`The wood of a club or a quarterstaff you are holding is imbued with nature's power. For the duration, 
you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, 
and the weapon's damage die becomes a d8. The weapon also becomes magical, 
if it isn't already. The spell ends if you cast it again or if you let go of the weapon.`], 
range: `Touch`, 
duration: `1 minute`, 
concentration: `no`, 
casting_time: `1 bonus action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }] }, 

{ name: `Shocking Grasp`, 
attack:true,
desc: [`Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, 
the target takes 1d8 lightning damage, 
and it can't take reactions until the start of its next turn.`, 
`The spell's damage increases by 1d8 when you reach 5th level (2d8), 
11th level (3d8), 
and 17th level (4d8).`], 
range: `Touch`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Silent Image`, 
utility: true,
desc: [`You create the image of an object, 
a creature, 
or some other visible phenomenon that is no larger than a 15-foot cube. The image appears at a spot within range and lasts for the duration. The image is purely visual; it isn't accompanied by sound, 
smell, 
or other sensory effects.`, 
`You can use your action to cause the image to move to any spot within range. As the image changes location, 
you can alter its appearance so that its movements appear natural for the image. For example, 
if you create an image of a creature and move it, 
you can alter the image so that it appears to be walking.`, 
`Physical interaction with the image reveals it to be an illusion, 
because things can pass through it. A creature that uses its action to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your spell save DC. If a creature discerns the illusion for what it is, 
the creature can see through the image.`], 
range: `60 feet`, 
duration: `Up to 10 minutes`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] },

{ name: `Sleep`,
strategy:true,
desc: [`This spell sends creatures into a magical slumber. Roll 5d8; the total is how many hit points of creatures this spell can affect. Creatures within 20 feet of a point you choose within range are affected in ascending order of their current hit points (ignoring unconscious creatures).`, 
`Starting with the creature that has the lowest current hit points, 
each creature affected by this spell falls unconscious until the spell ends, 
the sleeper takes damage, 
or someone uses an action to shake or slap the sleeper awake. Subtract each creature's hit points from the total before moving on to the creature with the next lowest hit points. A creature's hit points must be equal to or less than the remaining total for that creature to be affected.`, 
`Undead and creatures immune to being charmed aren't affected by this spell.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, 
roll an additional 2d8 for each slot level above 1st.`], 
range: `90 feet`, 
duration: `1 minute`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] },

{ name: `Speak with Animals`,
utility: true, 
desc: [`You gain the ability to comprehend and verbally communicate with beasts for the duration. The knowledge and awareness of many beasts is limited by their intelligence, 
but at a minimum, 
beasts can give you information about nearby locations and monsters, 
including whatever they can perceive or have perceived within the past day. You might be able to persuade a beast to perform a small favor for you, 
at the DM's discretion.`], 
range: `Self`, 
duration: `10 minutes`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/8`, 
name: `Ranger` }] }, 

{ name: `Thaumaturgy`,
utility: true, 
desc: [`You manifest a minor wonder, 
a sign of supernatural power, 
within range. You create one of the following magical effects within range.`, 
`- Your voice booms up to three times as loud as normal for 1 minute.`, 
`- You cause flames to flicker, 
brighten, 
dim, 
or change color for 1 minute.`, 
`- You cause harmless tremors in the ground for 1 minute.`, 
`- You create an instantaneous sound that originates from a point of your choice within range, 
such as a rumble of thunder, 
the cry of a raven, 
or ominous whispers.`, 
`- You instantaneously cause an unlocked door or window to fly open or slam shut.`, 
`- You alter the appearance of your eyes for 1 minute.`, 
`If you cast this spell multiple times, 
you can have up to three of its 1-minute effects active at a time, 
and you can dismiss such an effect as an action.`], 
range: `30 feet`, 
duration: `1 minute`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/3`, 
name: `Cleric` }] }, 

{ name: `Thunderwave`, 
attack: true,
desc: [`A wave of thunderous force sweeps out from you. Each creature in a 15-foot cube originating from you must make a constitution saving throw. On a failed save, 
a creature takes 2d8 thunder damage and is pushed 10 feet away from you. On a successful save, 
the creature takes half as much damage and isn't pushed.`, 
`In addition, 
unsecured objects that are completely within the area of effect are automatically pushed 10 feet away from you by the spell's effect, 
and the spell emits a thunderous boom audible out to 300 feet.`], 
higher_level: [`When you cast this spell using a spell slot of 2nd level or higher, 
the damage increases by 1d8 for each slot level above 1st.`], 
range: `Self`, 
duration: `Instantaneous`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/4`, 
name: `Druid` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `True Strike`, 
strategy: true,
desc: [`You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target's defenses. On your next turn, 
you gain advantage on your first attack roll against the target, 
provided that this spell hasn't ended.`], 
range: `30 feet`, 
duration: `Up to 1 round`, 
concentration: `yes`, 
casting_time: `1 action`, 
level: 0, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/10`, 
name: `Sorcerer` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }, 

{ name: `Unseen Servant`, 
utility: true,
desc: [`This spell creates an invisible, 
mindless, 
shapeless force that performs simple tasks at your command until the spell ends. The servant springs into existence in an unoccupied space on the ground within range. It has AC 10, 
1 hit point, 
and a Strength of 2, 
and it can't attack. If it drops to 0 hit points, 
the spell ends.`, 
`Once on each of your turns as a bonus action, 
you can mentally command the servant to move up to 15 feet and interact with an object. The servant can perform simple tasks that a human servant could do, 
such as fetching things, 
cleaning, 
mending, 
folding clothes, 
lighting fires, 
serving food, 
and pouring wind. Once you give the command, 
the servant performs the task to the best of its ability until it completes the task, 
then waits for your next command.`, 
`If you command the servant to perform a task that would move it more than 60 feet away from you, 
the spell ends.`], 
range: `60 feet`, 
duration: `1 hour`, 
concentration: `no`, 
casting_time: `1 action`, 
level: 1, 
classes: [{ url: `http://www.dnd5eapi.co/api/classes/2`, 
name: `Bard` }, 
{ url: `http://www.dnd5eapi.co/api/classes/11`, 
name: `Warlock` }, 
{ url: `http://www.dnd5eapi.co/api/classes/12`, 
name: `Wizard` }] }]

module.exports = spells
},{}],9:[function(require,module,exports){
const startingEquipment = [{
	"index": 1,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/1",
		"name": "Barbarian"
	},
	"starting_equipment": [{
		"item": { "url": "158", "name": "Explorer's Pack"}, "quantity": 1}, {
		"item": { "url": "5", "name": "Javelin"}, "quantity": 4}],
	"choices_to_make": 2,
	"choice_1": [
        {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "18", "name": "Greataxe"}, "quantity": 1}]
        },
     {
		"choose": 1,
		"type": "equipment",
		"from": [
			{"item": { 
				"url": "15", 
				"name": "Battleaxe"}, 
			"quantity": 1
			}, {
			"item": { "url": "16", "name": "Flail"}, "quantity": 1}, {
			"item": { "url": "17", "name": "Glaive"}, "quantity": 1}, {
			"item": { "url": "18", "name": "Greataxe"}, "quantity": 1}, {
			"item": { "url": "19", "name": "Greatsword"}, "quantity": 1}, {
			"item": { "url": "20", "name": "Halberd"}, "quantity": 1}, {
			"item": { "url": "21", "name": "Lance"}, "quantity": 1}, {
			"item": { "url": "22", "name": "Longsword"}, "quantity": 1}, {
			"item": { "url": "23", "name": "Maul"}, "quantity": 1}, {
			"item": { "url": "24", "name": "Morningstar"}, "quantity": 1}, {
			"item": { "url": "25", "name": "Pike"}, "quantity": 1}, {
			"item": { "url": "26", "name": "Rapier"}, "quantity": 1}, {
			"item": { "url": "27", "name": "Scimitar"}, "quantity": 1}, {
			"item": { "url": "28", "name": "Shortsword"}, "quantity": 1}, {
			"item": { "url": "29", "name": "Trident"}, "quantity": 1}, {
			"item": { "url": "30", "name": "War pick"}, "quantity": 1}, {
			"item": { "url": "31", "name": "Warhammer"}, "quantity": 1}, {
			"item": { "url": "32", "name": "Whip"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 2}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}, {
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "12", "name": "Dart"}, "quantity": 1}, {
			"item": { "url": "13", "name": "Shortbow"}, "quantity": 1}, {
			"item": { "url": "14", "name": "Sling"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/1"
}, {
	"index": 2,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/2",
		"name": "Bard"
	},
	"starting_equipment": [{
		"item": { "url": "39", "name": "Leather"}, "quantity": 1}, {
		"item": { "url": "2", "name": "Dagger"}, "quantity": 1}],
	"choices_to_make": 3,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "26", "name": "Rapier"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "22", "name": "Longsword"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}, {
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "12", "name": "Dart"}, "quantity": 1}, {
			"item": { "url": "13", "name": "Shortbow"}, "quantity": 1}, {
			"item": { "url": "14", "name": "Sling"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "155", "name": "Diplomat's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "157", "name": "Entertainer's Pack"}, "quantity": 1}]
	}],
	"choice_3": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "184", "name": "Lute"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "180", "name": "Bagpipes"}, "quantity": 1}, {
			"item": { "url": "181", "name": "Drum"}, "quantity": 1}, {
			"item": { "url": "182", "name": "Dulcimer"}, "quantity": 1}, {
			"item": { "url": "183", "name": "Flute"}, "quantity": 1}, {
			"item": { "url": "184", "name": "Lute"}, "quantity": 1}, {
			"item": { "url": "185", "name": "Lyre"}, "quantity": 1}, {
			"item": { "url": "186", "name": "Horn"}, "quantity": 1}, {
			"item": { "url": "187", "name": "Pan flute"}, "quantity": 1}, {
			"item": { "url": "188", "name": "Shawm"}, "quantity": 1}, {
			"item": { "url": "189", "name": "Viol"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/2"
}, {
	"index": 3,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/3",
		"name": "Cleric"
	},
	"starting_equipment": [{
	"item": { "url": "50", "name": "Shield"}, "quantity": 1}],
	"choices_to_make": 5,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "7", "name": "Mace" },"quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "31", "name": "Warhammer" }, "quantity": 1,	
			"prerequisites": [{
				"type": "proficiency",
				"proficiency": { "url": "http://www.dnd5eapi.co/api/proficiencies/51", "name": "Warhammers" }
			}]
		}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "43", "name": "Scale Mail"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "39", "name": "Leather"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "47", "name": "Chain Mail"}, "quantity": 1,	"prerequisites": [{
				"type": "proficiency",
				"proficiency":{ "url": "http://www.dnd5eapi.co/api/proficiencies/14", "name": "Chain Mail" }
			}]
		}]
	}],
	"choice_3": [{
		"choose": 2,
		"type": "equipment",
		"from": [{
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "56", "name": "Crossbow bolt"}, "quantity": 20}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}, {
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "12", "name": "Dart"}, "quantity": 1}, {
			"item": { "url": "13", "name": "Shortbow"}, "quantity": 1}, {
			"item": { "url": "14", "name": "Sling"}, "quantity": 1}]
	}],
	"choice_4": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "159", "name": "Priest's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "158", "name": "Explorer's Pack"}, "quantity": 1}]
	}],
	"choice_5": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "58", "name": "Amulet"}, "quantity": 1}, {
			"item": { "url": "93", "name": "Emblem"}, "quantity": 1}, {
			"item": { "url": "134", "name": "Reliquary"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/3"
}, {
	"index": 4,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/4",
		"name": "Druid"
	},
	"starting_equipment": [{
		"item": { "url": "39", "name": "Leather"}, "quantity": 1}, {
		"item": { "url": "158", "name": "Explorer's Pack"}, "quantity": 1}],
	"choices_to_make": 3,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "50", "name": "Shield"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}, {
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "12", "name": "Dart"}, "quantity": 1}, {
			"item": { "url": "13", "name": "Shortbow"}, "quantity": 1}, {
			"item": { "url": "14", "name": "Sling"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "27", "name": "Scimitar"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}]
	}],
	"choice_3": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "89", "name": "Sprig of mistletoe"}, "quantity": 1}, {
			"item": { "url": "90", "name": "Totem"}, "quantity": 1}, {
			"item": { "url": "91", "name": "Wooden staff"}, "quantity": 1}, {
			"item": { "url": "92", "name": "Yew wand"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/4"
}, {
	"index": 5,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/5",
		"name": "Fighter"
	},
"starting_equipment": [],
	"choices_to_make": 5,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "47", "name": "Chain Mail"}, "quantity": 1}]
	}, {
		"choose": 3,
		"type": "equipment",
		"from": [{
			"item": { "url": "39", "name": "Leather armor & Longbow"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
		"item": { "url": "50", "name": "Shield"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "15", "name": "Battleaxe"}, "quantity": 1}, {
			"item": { "url": "16", "name": "Flail"}, "quantity": 1}, {
			"item": { "url": "17", "name": "Glaive"}, "quantity": 1}, {
			"item": { "url": "18", "name": "Greataxe"}, "quantity": 1}, {
			"item": { "url": "19", "name": "Greatsword"}, "quantity": 1}, {
			"item": { "url": "20", "name": "Halberd"}, "quantity": 1}, {
			"item": { "url": "21", "name": "Lance"}, "quantity": 1}, {
			"item": { "url": "22", "name": "Longsword"}, "quantity": 1}, {
			"item": { "url": "23", "name": "Maul"}, "quantity": 1}, {
			"item": { "url": "24", "name": "Morningstar"}, "quantity": 1}, {
			"item": { "url": "25", "name": "Pike"}, "quantity": 1}, {
			"item": { "url": "26", "name": "Rapier"}, "quantity": 1}, {
			"item": { "url": "27", "name": "Scimitar"}, "quantity": 1}, {
			"item": { "url": "28", "name": "Shortsword"}, "quantity": 1}, {
			"item": { "url": "29", "name": "Trident"}, "quantity": 1}, {
			"item": { "url": "30", "name": "War pick"}, "quantity": 1}, {
			"item": { "url": "31", "name": "Warhammer"}, "quantity": 1}, {
			"item": { "url": "32", "name": "Whip"}, "quantity": 1}, {
			"item": { "url": "33", "name": "Blowgun"}, "quantity": 1}, {
			"item": { "url": "34", "name": "Crossbow, hand"}, "quantity": 1}, {
			"item": { "url": "35", "name": "Crossbow, heavy"}, "quantity": 1}, {
			"item": { "url": "36", "name": "Longbow"}, "quantity": 1}, {
			"item": { "url": "37", "name": "Net"}, "quantity": 1}]
	}],
	"choice_3": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 2}]
	}],
	"choice_4": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "156", "name": "Dungeoneer's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "158", "name": "Explorer's Pack"}, "quantity": 1}]
	}],
	"choice_5": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "15", "name": "Battleaxe"}, "quantity": 1}, {
			"item": { "url": "16", "name": "Flail"}, "quantity": 1}, {
			"item": { "url": "17", "name": "Glaive"}, "quantity": 1}, {
			"item": { "url": "18", "name": "Greataxe"}, "quantity": 1}, {
			"item": { "url": "19", "name": "Greatsword"}, "quantity": 1}, {
			"item": { "url": "20", "name": "Halberd"}, "quantity": 1}, {
			"item": { "url": "21", "name": "Lance"}, "quantity": 1}, {
			"item": { "url": "22", "name": "Longsword"}, "quantity": 1}, {
			"item": { "url": "23", "name": "Maul"}, "quantity": 1}, {
			"item": { "url": "24", "name": "Morningstar"}, "quantity": 1}, {
			"item": { "url": "25", "name": "Pike"}, "quantity": 1}, {
			"item": { "url": "26", "name": "Rapier"}, "quantity": 1}, {
			"item": { "url": "27", "name": "Scimitar"}, "quantity": 1}, {
			"item": { "url": "28", "name": "Shortsword"}, "quantity": 1}, {
			"item": { "url": "29", "name": "Trident"}, "quantity": 1}, {
			"item": { "url": "30", "name": "War pick"}, "quantity": 1}, {
			"item": { "url": "31", "name": "Warhammer"}, "quantity": 1}, {
			"item": { "url": "32", "name": "Whip"}, "quantity": 1}, {
			"item": { "url": "33", "name": "Blowgun"}, "quantity": 1}, {
			"item": { "url": "34", "name": "Crossbow, hand"}, "quantity": 1}, {
			"item": { "url": "35", "name": "Crossbow, heavy"}, "quantity": 1}, {
			"item": { "url": "36", "name": "Longbow"}, "quantity": 1}, {
			"item": { "url": "37", "name": "Net"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/5"
}, {
	"index": 6,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/6",
		"name": "Monk"
	},
	"starting_equipment": [{
	"item": { "url": "12", "name": "Dart"}, "quantity": 10}],
	"choices_to_make": 2,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "28", "name": "Shortsword"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}, {
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "12", "name": "Dart"}, "quantity": 1}, {
			"item": { "url": "13", "name": "Shortbow"}, "quantity": 1}, {
			"item": { "url": "14", "name": "Sling"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "156", "name": "Dungeoneer's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "158", "name": "Explorer's Pack"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/6"
}, {
	"index": 7,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/7",
		"name": "Paladin"
	},
	"starting_equipment": [{
	"item": { "url": "47", "name": "Chain Mail"}, "quantity": 1}],
	"choices_to_make": 5,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
		"item": { "url": "50", "name": "Shield"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "15", "name": "Battleaxe"}, "quantity": 1}, {
			"item": { "url": "16", "name": "Flail"}, "quantity": 1}, {
			"item": { "url": "17", "name": "Glaive"}, "quantity": 1}, {
			"item": { "url": "18", "name": "Greataxe"}, "quantity": 1}, {
			"item": { "url": "19", "name": "Greatsword"}, "quantity": 1}, {
			"item": { "url": "20", "name": "Halberd"}, "quantity": 1}, {
			"item": { "url": "21", "name": "Lance"}, "quantity": 1}, {
			"item": { "url": "22", "name": "Longsword"}, "quantity": 1}, {
			"item": { "url": "23", "name": "Maul"}, "quantity": 1}, {
			"item": { "url": "24", "name": "Morningstar"}, "quantity": 1}, {
			"item": { "url": "25", "name": "Pike"}, "quantity": 1}, {
			"item": { "url": "26", "name": "Rapier"}, "quantity": 1}, {
			"item": { "url": "27", "name": "Scimitar"}, "quantity": 1}, {
			"item": { "url": "28", "name": "Shortsword"}, "quantity": 1}, {
			"item": { "url": "29", "name": "Trident"}, "quantity": 1}, {
			"item": { "url": "30", "name": "War pick"}, "quantity": 1}, {
			"item": { "url": "31", "name": "Warhammer"}, "quantity": 1}, {
			"item": { "url": "32", "name": "Whip"}, "quantity": 1}, {
			"item": { "url": "33", "name": "Blowgun"}, "quantity": 1}, {
			"item": { "url": "34", "name": "Crossbow, hand"}, "quantity": 1}, {
			"item": { "url": "35", "name": "Crossbow, heavy"}, "quantity": 1}, {
			"item": { "url": "36", "name": "Longbow"}, "quantity": 1}, {
			"item": { "url": "37", "name": "Net"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "5", "name": "Javelin"}, "quantity": 5}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}, {
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "12", "name": "Dart"}, "quantity": 1}, {
			"item": { "url": "13", "name": "Shortbow"}, "quantity": 1}, {
			"item": { "url": "14", "name": "Sling"}, "quantity": 1}]
	}],
	"choice_3": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "159", "name": "Priest's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "158", "name": "Explorer's Pack"}, "quantity": 1}]
	}],
	"choice_4": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "58", "name": "Amulet"}, "quantity": 1}, {
			"item": { "url": "93", "name": "Emblem"}, "quantity": 1}, {
			"item": { "url": "134", "name": "Reliquary"}, "quantity": 1}]
	}],
	"choice_5": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "15", "name": "Battleaxe"}, "quantity": 1}, {
			"item": { "url": "16", "name": "Flail"}, "quantity": 1}, {
			"item": { "url": "17", "name": "Glaive"}, "quantity": 1}, {
			"item": { "url": "18", "name": "Greataxe"}, "quantity": 1}, {
			"item": { "url": "19", "name": "Greatsword"}, "quantity": 1}, {
			"item": { "url": "20", "name": "Halberd"}, "quantity": 1}, {
			"item": { "url": "21", "name": "Lance"}, "quantity": 1}, {
			"item": { "url": "22", "name": "Longsword"}, "quantity": 1}, {
			"item": { "url": "23", "name": "Maul"}, "quantity": 1}, {
			"item": { "url": "24", "name": "Morningstar"}, "quantity": 1}, {
			"item": { "url": "25", "name": "Pike"}, "quantity": 1}, {
			"item": { "url": "26", "name": "Rapier"}, "quantity": 1}, {
			"item": { "url": "27", "name": "Scimitar"}, "quantity": 1}, {
			"item": { "url": "28", "name": "Shortsword"}, "quantity": 1}, {
			"item": { "url": "29", "name": "Trident"}, "quantity": 1}, {
			"item": { "url": "30", "name": "War pick"}, "quantity": 1}, {
			"item": { "url": "31", "name": "Warhammer"}, "quantity": 1}, {
			"item": { "url": "32", "name": "Whip"}, "quantity": 1}, {
			"item": { "url": "33", "name": "Blowgun"}, "quantity": 1}, {
			"item": { "url": "34", "name": "Crossbow, hand"}, "quantity": 1}, {
			"item": { "url": "35", "name": "Crossbow, heavy"}, "quantity": 1}, {
			"item": { "url": "36", "name": "Longbow"}, "quantity": 1}, {
			"item": { "url": "37", "name": "Net"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/7"
}, {
	"index": 8,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/8",
		"name": "Ranger"
	},
	"starting_equipment": [{
		"item": { "url": "36", "name": "Longbow"}, "quantity": 1}, {
		"item": { "url": "54", "name": "Arrow"}, "quantity": 20}],
	"choices_to_make": 3,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "43", "name": "Scale Mail"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "28", "name": "Shortsword"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "156", "name": "Dungeoneer's Pack"}, "quantity": 2}]
	}, {
		"choose": 2,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}]
	}],
	"choice_3": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "156", "name": "Dungeoneer's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "158", "name": "Explorer's Pack"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/8"
}, {
	"index": 9,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/9",
		"name": "Rogue"
	},
	"starting_equipment": [{
		"item": { "url": "39", "name": "Leather"}, "quantity": 1}, {
		"item": { "url": "2", "name": "Dagger"}, "quantity": 2}, {
		"item": { "url": "191", "name": "Thieves’ tools"}, "quantity": 1}],
	"choices_to_make": 3,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "26", "name": "Rapier"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "28", "name": "Shortsword"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 2,
		"type": "equipment",
		"from": [{
			"item": { "url": "13", "name": "Shortbow"}, "quantity": 1}, {
			"item": { "url": "54", "name": "Arrow"}, "quantity": 20}]
	}, {
		"choose": 2,
		"type": "equipment",
		"from": [{
			"item": { "url": "28", "name": "Shortsword"}, "quantity": 1}]
	}],
	"choice_3": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "154", "name": "Burglar's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "156", "name": "Dungeoneer's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "158", "name": "Explorer's Pack"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/9"
}, {
	"index": 10,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/10",
		"name": "Sorcerer"
	},
	"starting_equipment": [{
	"item": { "url": "2", "name": "Dagger"}, "quantity": 2}],
	"choices_to_make": 3,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "56", "name": "Crossbow bolt"}, "quantity": 20}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}, {
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "12", "name": "Dart"}, "quantity": 1}, {
			"item": { "url": "13", "name": "Shortbow"}, "quantity": 1}, {
			"item": { "url": "14", "name": "Sling"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "87", "name": "Component pouch"}, "quantity": 2}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "60", "name": "Crystal"}, "quantity": 1}, {
			"item": { "url": "61", "name": "Orb"}, "quantity": 1}, {
			"item": { "url": "62", "name": "Rod"}, "quantity": 1}, {
			"item": { "url": "63", "name": "Staff"}, "quantity": 1}, {
			"item": { "url": "64", "name": "Wand"}, "quantity": 1}]
	}],
	"choice_3": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "156", "name": "Dungeoneer's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "158", "name": "Explorer's Pack"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/10"
}, {
	"index": 11,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/11",
		"name": "Warlock"
	},
	"starting_equipment": [{
		"item": { "url": "2", "name": "Dagger"}, "quantity": 2}, {
		"item": { "url": "39", "name": "Leather"}, "quantity": 1}],
	"choices_to_make": 4,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "56", "name": "Crossbow bolt"}, "quantity": 20}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}, {
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "12", "name": "Dart"}, "quantity": 1}, {
			"item": { "url": "13", "name": "Shortbow"}, "quantity": 1}, {
			"item": { "url": "14", "name": "Sling"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "87", "name": "Component pouch"}, "quantity": 2}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "60", "name": "Crystal"}, "quantity": 1}, {
			"item": { "url": "61", "name": "Orb"}, "quantity": 1}, {
			"item": { "url": "62", "name": "Rod"}, "quantity": 1}, {
			"item": { "url": "63", "name": "Staff"}, "quantity": 1}, {
			"item": { "url": "64", "name": "Wand"}, "quantity": 1}]
	}],
	"choice_3": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "160", "name": "Scholar's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "156", "name": "Dungeoneer's Pack"}, "quantity": 1}]
	}],
	"choice_4": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "1", "name": "Club"}, "quantity": 1}, {
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}, {
			"item": { "url": "3", "name": "Greatclub"}, "quantity": 1}, {
			"item": { "url": "4", "name": "Handaxe"}, "quantity": 1}, {
			"item": { "url": "5", "name": "Javelin"}, "quantity": 1}, {
			"item": { "url": "6", "name": "Light hammer"}, "quantity": 1}, {
			"item": { "url": "7", "name": "Mace"}, "quantity": 1}, {
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}, {
			"item": { "url": "9", "name": "Sickle"}, "quantity": 1}, {
			"item": { "url": "10", "name": "Spear"}, "quantity": 1}, {
			"item": { "url": "11", "name": "Crossbow, light"}, "quantity": 1}, {
			"item": { "url": "12", "name": "Dart"}, "quantity": 1}, {
			"item": { "url": "13", "name": "Shortbow"}, "quantity": 1}, {
			"item": { "url": "14", "name": "Sling"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/11"
}, {
	"index": 12,
	"class": {
		"url": "http://www.dnd5eapi.co/api/classes/12",
		"name": "Wizard"
	},
	"starting_equipment": [{
	"item": { "url": "145", "name": "Spellbook"}, "quantity": 1}],
	"choices_to_make": 4,
	"choice_1": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "2", "name": "Dagger"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "8", "name": "Quarterstaff"}, "quantity": 1}]
	}],
	"choice_2": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "87", "name": "Component pouch"}, "quantity": 2}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "60", "name": "Crystal"}, "quantity": 1}, {
			"item": { "url": "61", "name": "Orb"}, "quantity": 1}, {
			"item": { "url": "62", "name": "Rod"}, "quantity": 1}, {
			"item": { "url": "63", "name": "Staff"}, "quantity": 1}, {
			"item": { "url": "64", "name": "Wand"}, "quantity": 1}]
	}],
	"choice_3": [{
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "160", "name": "Scholar's Pack"}, "quantity": 1}]
	}, {
		"choose": 1,
		"type": "equipment",
		"from": [{
			"item": { "url": "156", "name": "Dungeoneer's Pack"}, "quantity": 1}]
	}],
	"url": "http://www.dnd5eapi.co/api/startingequipment/12"
}]

module.exports = startingEquipment
},{}],10:[function(require,module,exports){
const subraces = [
	{
		"index": 1,
		"name": "Hill Dwarf",
		"race": {
			"url": "http://www.dnd5eapi.co/api/races/1",
			"name": "Dwarf"
		},
		"desc": "As a hill dwarf, you have keen senses, deep intuition, and remarkable resilience.",
		"ability_bonuses": [
			0,
			0,
			0,
			0,
			1,
			0
		],
		"starting_proficiencies:": [],
		"starting_proficiency_options": {

		},
		"languages": [],
		"language_options": {

		},
		"racial_traits": [
			{
				"url": "http://www.dnd5eapi.co/api/traits/4",
				"name": "Dwarven Toughness"
			}
		],
		"racial_trait_options": {},
		"url": "http://www.dnd5eapi.co/api/subraces/1"
	},
	{
		"index": 2,
		"name": "High Elf",
		"race": {
			"url": "http://www.dnd5eapi.co/api/races/2",
			"name": "Elf"
		},
		"desc": "As a high elf, you have a keen mind and a mastery of at least the basics of magic. In many fantasy gaming worlds, there are two kinds of high elves. One type is haughty and reclusive, believing themselves to be superior to non-elves and even other elves. The other type is more common and more friendly, and often encountered among humans and other races.",
		"ability_bonuses": [
			0,
			0,
			0,
			1,
			0,
			0
		],
		"starting_proficiencies:": [
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/42",
				"name": "Longswords"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/48",
				"name": "Shortswords"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/33",
				"name": "Shortbows"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/56",
				"name": "Longbows"
			}
		],
		"starting_proficiency_options": {

		},
		"languages": [],
		"language_options": {
			"choose": 1,
			"from": [
				{
					"url": "http://www.dnd5eapi.co/api/languages/2",
					"name": "Dwarvish"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/4",
					"name": "Giant"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/5",
					"name": "Gnomish"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/6",
					"name": "Goblin"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/7",
					"name": "Halfling"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/8",
					"name": "Orc"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/9",
					"name": "Abyssal"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/10",
					"name": "Celestial"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/11",
					"name": "Draconic"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/12",
					"name": "Deep Speech"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/13",
					"name": "Infernal"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/14",
					"name": "Primordial"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/15",
					"name": "Sylvan"
				},
				{
					"url": "http://www.dnd5eapi.co/api/languages/16",
					"name": "Undercommon"
				}
			],
			"type": "language"
		},
		"racial_traits": [],
		"racial_trait_options":
		{
			"choose": 1,
			"from": [
				{
					"url": "http://www.dnd5eapi.co/api/traits/9",
					"name": "Light"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/10",
					"name": "Mage Hand"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/11",
					"name": "Mending"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/12",
					"name": "Message"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/13",
					"name": "Minor Illusion"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/14",
					"name": "Acid Splash"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/15",
					"name": "Prestidigitation"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/16",
					"name": "Ray of Frost"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/17",
					"name": "Shocking Grasp"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/18",
					"name": "True Strike"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/19",
					"name": "Chill Touch"
				},
				{
					"url": "http://www.dnd5eapi.co/api/traits/20",
					"name": "Dancing Lights"
				}
			],
			"type": "trait"
		}
		,
		"url": "http://www.dnd5eapi.co/api/subraces/2",
		img: 'img/high-elf.jpg'
	},
	{
		"index": 3,
		"name": "Lightfoot Halfling",
		"race": {
			"url": "http://www.dnd5eapi.co/api/races/3",
			"name": "Halfling"
		},
		"desc": "As a lightfoot halfling, you can easily hide from notice, even using other people as cover. You’re inclined to be affable and get along well with others. Lightfoots are more prone to wanderlust than other halflings, and often dwell alongside other races or take up a nomadic life.",
		"ability_bonuses": [
			0,
			0,
			0,
			0,
			0,
			1
		],
		"starting_proficiencies:": [],
		"starting_proficiency_options": {

		},
		"languages": [],
		"language_options": {

		},
		"racial_traits": [
			{
				"url": "http://www.dnd5eapi.co/api/traits/23",
				"name": "Naturally Stealthy"
			}
		],
		"racial_trait_options": {},
		"url": "http://www.dnd5eapi.co/api/subraces/3"
	},
	{
		"index": 4,
		"name": "Mountain Dwarf",
		"race": {
			"url": "http://www.dnd5eapi.co/api/races/1",
			"name": "Dwarf"
		},
		"desc": "As a mountain dwarf, you're strong and hardy, accustomed to a difficult life in rugged terrain. You're probably on the tall side (for a dwarf), and tend toward lighter coloration.",
		"ability_bonuses": [
			2,
			0,
			0,
			0,
			0,
			0
		],
		"starting_proficiencies:": [
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/2",
				"name": "Medium armor"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/3",
				"name": "Heavy armor"
			}
		],
		"starting_proficiency_options": {},
		"languages": [],
		"language_options": {

		},
		"racial_traits": [],
		"racial_trait_options": {},
		"url": "http://www.dnd5eapi.co/api/subraces/4"
	},
	{
		"index": 5,
		"name": "Wood Elf",
		"race": {
			"url": "http://www.dnd5eapi.co/api/races/2",
			"name": "Elf"
		},
		"desc": "As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly through your native forrests.",
		"ability_bonuses": [
			0,
			0,
			0,
			0,
			1,
			0
		],
		"starting_proficiencies:": [
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/42",
				"name": "Longswords"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/48",
				"name": "Shortswords"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/33",
				"name": "Shortbows"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/56",
				"name": "Longbows"
			}
		],
		"starting_proficiency_options": {},
		"languages": [],
		"language_options": {

		},
		"racial_traits": [
			{
				"url": "http://www.dnd5eapi.co/api/traits/37",
				"name": "Fleet of Foot"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/38",
				"name": "Mask of the Wild"
			}
		],
		"racial_trait_options": {},
		"url": "http://www.dnd5eapi.co/api/subraces/5",
		img: 'img/wood-elf.jpg'
	},
	{
		"index": 6,
		"name": "Dark Elf (Drow)",
		"race": {
			"url": "http://www.dnd5eapi.co/api/races/2",
			"name": "Elf"
		},
		"desc": "As a wood elf, you have keen senses and intuition, and your fleet feet carry you quickly through your native forrests.",
		"ability_bonuses": [
			0,
			0,
			0,
			0,
			0,
			1
		],
		"starting_proficiencies:": [
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/46",
				"name": "Rapiers"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/48",
				"name": "Shortswords"
			},
			{
				"url": "http://www.dnd5eapi.co/api/proficiencies/54",
				"name": "Crossbows, hand"
			}
		],
		"starting_proficiency_options": {},
		"languages": [],
		"language_options": {

		},
		"racial_traits": [
			{
				"url": "http://www.dnd5eapi.co/api/traits/39",
				"name": "Superior Darkvision"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/40",
				"name": "Sunlight Sensitivity"
			},
			{
				"url": "http://www.dnd5eapi.co/api/traits/41",
				"name": "Drow Magic"
			}
		],
		"racial_trait_options": {},
		"url": "http://www.dnd5eapi.co/api/subraces/6",
		img: 'img/dark-elf.jpg'
	}
]

module.exports = subraces
},{}],11:[function(require,module,exports){
const user = require('./user')
const races = require('./data/races')
const classes = require('./data/classes')
const backgrounds = require('./data/backgrounds')
const subraces = require('./data/subraces')
const displayBoard = document.querySelector('#displayBoard')
function readyToGo(returnFn){
    const inputs = document.querySelectorAll('.backstory')
    for( let input of inputs ){
        if(!input.value){
            document.querySelector('#next').onclick = null
            document.querySelector('#next').classList.add('inactive')
            return false
        }
    }
    document.querySelector('#next').onclick = function(){
        addToLog()
        return returnFn()
    }
    document.querySelector('#next').classList.remove('inactive')
}

function addToLog(){
    let inputs = document.querySelectorAll('.backstory')
    let backstoryArray = []
    for(let input of inputs){
        backstoryArray.push(input.value)
    }
    user.log.push(backstoryArray)
}

function finalRender(){
    headerInfo()
    // statInfo()

}

function headerInfo(){
    let subrace = user.log[2]
    if(user.raceId === 6) subrace = null
    displayBoard.innerHTML = `
    <div class="top">
        <h3>${user.log[22][0]}</h3>    
        <p>Level 1 ${user.log[5]} | ${user.log[20]} </p>
        <p>${subrace || user.log[0]} | ${user.log[21]}</p>
    </div>`
}

function statInfo(){
    let finalStats = races[user.raceId].ability_bonuses
    if(!!user.log[2] && !Array.isArray(user.log[2]) ) finalStats = combineArrays(finalStats, subraces[user.subraceId].ability_bonuses)
    finalStats = combineArrays(finalStats, user.log[17])
    if(!!user.log[18]){
        let bonus = figureDifference(user.log[17], user.log[18])
        finalStats = combineArrays(finalStats, bonus)
    }
    return statTemplate(finalStats)
}

function statTemplate(arr){
    displabyBoard.innerHTML += `
    <div class="accordion" id="accordionExample">
        <div class="card">
            <div class="card-header" id="headingOne">
            <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Collapsible Group Item #1
                </button>
            </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                    <div class="finalStat">
                        <p class="statName">STR</p>
                        <div class="rawStat">${arr[0]}</div>
                        <div class="mod">${modCalc(arr[0])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">DEX</p>
                        <div class="rawStat">${arr[1]}</div>
                        <div class="mod">${modCalc(arr[1])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">CON</p>
                        <div class="rawStat">${arr[2]}</div>
                        <div class="mod">${modCalc(arr[2])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">INT</p>
                        <div class="rawStat">${arr[3]}</div>
                        <div class="mod">${modCalc(arr[3])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">WIS</p>
                        <div class="rawStat">${arr[4]}</div>
                        <div class="mod">${modCalc(arr[4])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">CHA</p>
                        <div class="rawStat">${arr[5]}</div>
                        <div class="mod">${modCalc(arr[5])}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}

function modCalc(num){
    return Number(Math.floor((num - 10) / 2))
}

function combineArrays(arr1, arr2){
    const newArr = []
    for(let i = 0; i < arr1.length; i++){
        newArr[i] = arr1[i] + arr2[i]
    }
    return newArr
}

function figureDifference(arr1, arr2){
    const newArr = []
    for(let i = 0; i < arr2.length; i++){
        if(arr1[i] < arr2[i]) newArr[i] = 1
        else newArr[i = 0]
    }
    newarr.push(0)
    return newArr
}

function prepForSelection(){
    let choices = document.querySelectorAll('.alignment')
    for (let choice of choices){
        choice.onclick = function(e){select(e)}
    }
}

function select(e) {
    if (user.numChoices > 0) {
        e.target.onclick = null
        e.target.classList.add('selected')
        user.numChoices--
        e.target.onclick = function (e) { unselect(e) }
    }
    else {
        return false
    }
}

function unselect(e) {
    e.target.onclick = null
    e.target.classList.remove('selected')
    e.target.onclick = function (e) { select(e) }
    user.numChoices++
}

function addAlign(returnFn){
    document.querySelector('#next').onclick = function(){
        user.log.push(document.querySelector('.selected').textContent)
        return returnFn()
    }
}



module.exports = {readyToGo, finalRender, prepForSelection, addAlign}
},{"./data/backgrounds":2,"./data/classes":3,"./data/races":6,"./data/subraces":10,"./user":17}],12:[function(require,module,exports){
const classes = require('./data/classes')
const user = require('./user')
const stats = require('./stats')

function HPGen(returnFn) {
    let counter = 20
    let hitDie = classes[user.classId].hit_die
    let rollingDie = setInterval(function () {
        let diceNum = stats.diceRoll(1, hitDie)
        document.querySelector('.dice').textContent = diceNum[0]
        counter--
        if (counter === 0) {
            clearInterval(rollingDie)
            setTimeout(function () { 
                document.querySelector('.dice').classList.add('animatedNum') 
                addHP(returnFn)
            }, 0)
    }
     }, 100)
}


function addHP(returnFn){
    const dice = document.querySelector('.dice')
    let rolledNum = dice.textContent
    const HP = Number(Math.floor((user.log[17][2] - 10) / 2)) + Number(rolledNum)
    dice.onclick = null
    user.log.push(HP)
    document.querySelector('#next').classList.remove('inactive')
    document.querySelector('#next').onclick = returnFn
}





module.exports = HPGen
},{"./data/classes":3,"./stats":15,"./user":17}],13:[function(require,module,exports){
const user = require('./user')
const races = require('./data/races')
const subraces = require('./data/subraces')
const choiceFns = require('./choice-functions')
const {addIndex} = require('./selection')
const languages = require('./data/languages')
const spells = require('./data/spells')
const classes = require('./data/classes')
const forms = require('./forms')

const displayBoard = document.querySelector('#displayBoard')
const next = document.querySelector('#next')

function createDNDChar(){
    displayBoard.innerHTML = ''
    next.classList.add('inactive')
    switch(user.log.length){
        case 0:
            choiceFns.raceChoice(races, createDNDChar)
            break
        case 1: 
            addIndex(user.log[0], races, 'raceId')
            choiceFns.extraRaceChoices(createDNDChar)
            break
        case 2:
            if(user.log[0] =='Half-Elf') return choiceFns.skillDisplay(2)
            choiceFns.subraceChoice(createDNDChar)
            break
        case 3:
            addIndex(user.log[2], subraces, 'subraceId')
            choiceFns.subraceExtraChoices('racial_trait_options', spells, createDNDChar)
            break
        case 4:
            choiceFns.subraceExtraChoices('language_options', languages, createDNDChar)
            break
        case 5:
            choiceFns.raceChoice(classes, createDNDChar)
            break
        case 6:
            addIndex(user.log[5], classes, 'classId')
            choiceFns.classSkillChoice(createDNDChar)
            break
        case 7:
            choiceFns.classExtraChoices(createDNDChar)
            break
        case 8:
            choiceFns.classExtraChoices(createDNDChar)
            break
        case 9:
            choiceFns.spellChoices(0, createDNDChar)
            break
        case 10:
            choiceFns.spellChoices(1, createDNDChar)
            break
        case 11:
            choiceFns.equipmentChoices(1, createDNDChar)
            break
        case 12:
            choiceFns.equipmentChoices(2, createDNDChar)
            break
        case 13:
            choiceFns.equipmentChoices(3, createDNDChar)
            break
        case 14:
            choiceFns.equipmentChoices(4, createDNDChar)
            break
        case 15:
            choiceFns.equipmentChoices(5, createDNDChar)
            break
        case 16:
            choiceFns.classFeatureChoices(createDNDChar)
            break
        case 17:
            choiceFns.allocateStats(createDNDChar)
            break
        case 18:
            choiceFns.upgradeStats(createDNDChar)
            break
        case 19:
            choiceFns.rollHP(createDNDChar)
            break
        case 20:
            choiceFns.backgroundChoice(createDNDChar)
            break
        case 21:
            choiceFns.alignment(createDNDChar)
            break
        case 22: 
            choiceFns.backStory(createDNDChar)
            break
        default:
            forms.finalRender()
    }
}

createDNDChar()



module.exports = createDNDChar
},{"./choice-functions":1,"./data/classes":3,"./data/languages":5,"./data/races":6,"./data/spells":8,"./data/subraces":10,"./forms":11,"./selection":14,"./user":17}],14:[function(require,module,exports){
const user = require('./user')
const { standardTemplate, infoPageHTML, classchoiceTemplate, sorcererTemplate } = require('./templates')
const { addListenersToMany } = require('./utils')
const races = require('./data/races')
const skills = require('./data/skills')


const displayBoard = document.querySelector('#displayBoard')

function display(arr, templateType = standardTemplate) {
    let result = arr.map(item => templateType(item))
    displayBoard.innerHTML = result.join('')
    prepCards(arr)
}

function prepCards(arr) {
    addListenersToMany('.select', 'click', function (e) { select(e) })
    addListenersToMany('.more', 'click', function (e) { showInfo(e, arr) })
}

function select(e) {
    if (user.numChoices > 0) {
        e.target.onclick = null
        e.target.parentElement.classList.add('selected')
        user.numChoices--
        e.target.onclick = function (e) { unselect(e) }
        e.target.textContent = 'unselect'
    }
    else{
        return false
    }
}

function unselect(e) {
    e.target.onclick = null
    e.target.parentElement.classList.remove('selected')
    e.target.onclick = function(e){select(e)}
    user.numChoices++
    e.target.textContent = 'select'
}

function showInfo(e, arr) {
    let id = e.target.getAttribute('data-id')
    createInfoPage(id, arr)
}

function createInfoPage(index, arr) {
    let specificItem = arr[index - 1]
    displayBoard.innerHTML += infoPageHTML(specificItem)
    document.querySelector('.back').onclick = function (e) { slideOut(e) }
}


function slideOut(e) {
    setTimeout(function () {
        e.target.parentElement.style.animation = 'slideOut .5s ease-in'
        setTimeout(function () {
            e.target.parentElement.remove()
        }, 500)
    }, 0)
}

function readyToGo(returnFn) {
    if (user.numChoices === 0) {
        document.querySelector('#next').classList.remove('inactive')
        document.querySelector('#next').onclick = function () {
            addSelection()
            return returnFn()
        }
    }
    else{
        document.querySelector('#next').classList.add('inactive')
        document.querySelector('#next').onclick = null
    }
}

function addSelection() {
    let selected = Array.from(document.querySelectorAll('.selected'))
    const toLog = selected.reduce((acc, selection) => {
        acc.push(selection.children[2].textContent)
        return acc
    }, [])
    if (toLog.length === 1) user.log.push(toLog[0])
    else user.log.push(toLog)
}

function addIndex(name, array, indexType){
    if(!name) return false
    for (let item of array){
        if (item.name === name){
            user[indexType] = item.index - 1
        } 
    }
}

function skipDisplay(returnFn){
    user.log.push(null)
    return returnFn()
}


function selectFrom(choiceObj, originArray, templateType = standardTemplate) {
    let choiceArray
    if ( Array.isArray(choiceObj) ) choiceArray = choiceObj.map(item => item.name)
    else choiceArray = choiceObj.from.map(item => item.name)
    let displayArray = matchByName(originArray, choiceArray)
    display(displayArray, templateType)
}


function matchByName(masterArray, optionArray) {
    let result = masterArray.reduce((acc, item) => {
        for (let choice of optionArray) {
            if (item.name === choice) acc.push(item)
        }
        return acc
    }, [])
    return result
}

function preventDupe(arr){
    let result = arr.reduce((acc, item) => {
        for (let entry of user.log) {
            if (entry === item.name) { return acc }
            if (Array.isArray(entry)) {
                for (let subEntry of entry) {
                    if (subEntry === item.name) { return acc }
                }
            }
        }
        acc.push(item)
        return acc
    }, [])
    return result
}

function createSpellList(lvl, spells) {
    let spellList = spells.reduce((acc, spell) => {
        for (let classType of spell.classes) {
            if (spell.level === lvl && classType.name === user.log[5]){ 
                acc.push(spell)
            }
        }
        return acc
    }, [])
    return spellList
}

function createChoiceArray(array, quantityArray) {
    let result = array.reduce((acc, item) => {
        for (let equipment of item.from) {
            equipment.item.quantity = equipment.quantity
            quantityArray.push(equipment.quantity)
            acc.push(equipment.item)
        }
        return acc
    }, [])
    return result
}

function addQuantity(array) {
    const labels = document.querySelectorAll('label')
    for (let i = 0; i < labels.length; i++) {
        labels[i].textContent += `(x${array[i]})`
    }
}

function prepForRadioSelection() {
    let radios = document.querySelectorAll('input')
    let radioStatus = false
    for (let radio of radios) {
        if (radio.checked) {
            radioStatus = true;
            break
        }
    }
    if (radioStatus) {
        addSelectedListener()
        document.querySelector('#next').classList.remove('inactive')
        document.querySelector('#next').onclick = function () {
            addSelection()
            return returnFn()
        }
    }
}

function addSelectedListener(){
    displayBoard.addEventListener('click', function(){
        let radios = document.querySelectorAll('input')
        for(let radio of radios){
            if(radio.checked) radio.classList.add('selected')
            else radio.classList.remove('selected')
        }
    })
}

function displayFighterChoice(){
    let choice = features.filter(feature => feature.index === 131)
    const options = choice.choice.from
    display(options, classChoiceTemplate)
}

function displayRogueChoice(index){
    let skillOptions = user.log[6];
    if (!!user.log[2]) skillOptions.push(user.log[2][0], user.log[2][1]) 
    skillOptions = skillOptions.reduce((acc, skill) =>{
       let item = {}
       item.name = skill
       acc.push(item)
       return acc
    }, [])
    selectFrom(skillOptions, skills)
    displayBoard.innerHTML = `<h2>Select a skill to receive a +4 bonus</h2> ${displayBoard.innerHTML}`
}

function displaySorcererChoice(){
    displayBoard.innerHTML = sorcererTemplate()
    prepCards()
}
module.exports = {display, readyToGo, addIndex, skipDisplay, selectFrom, preventDupe, createSpellList, createChoiceArray, addQuantity, prepForRadioSelection, displayFighterChoice, displayRogueChoice, displaySorcererChoice, addSelection}

},{"./data/races":6,"./data/skills":7,"./templates":16,"./user":17,"./utils":18}],15:[function(require,module,exports){
const utils = require('./utils')
const user = require('./user')
const {statTemplate, statUpgrade} = require('./templates')
const selection = require('./selection')

function diceRoll(numDice, numSides) {
    let statNums = []
    for (let i = 0; i < numDice; i++) {
        let score = Math.floor(Math.random() * numSides) + 1
        statNums.push(score)
    }
    return statNums
}

function statGen(numDice, numSides, numTimes) {
    let stats = []
    for (let i = 0; i < numTimes; i++) {
        let statNums = diceRoll(numDice, numSides)
        statNums.sort((a, b) => a - b)
        statNums.shift()
        stats.push(statNums.reduce((acc, num) => acc + num, 0))
    }
    return stats
}

function prepForStats(statArr){
    const stats = statArr || statGen(4, 6, 6)
    document.querySelector('#displayBoard').innerHTML = statTemplate(stats)
    clickToAllocate()
}

function clickToAllocate(){
    utils.addListenersToMany('.stat', 'click', function(e){prepForAllocation(e)})
}

function prepForAllocation(e){
    let selected = document.querySelectorAll('.selectedStat')
    for(let selection of selected){ selection.classList.remove('selectedStat') }
    e.target.classList.add('selectedStat')
    e.target.onclick = function(e){unselect(e)}
    prepHolders()
}


function prepHolders(){
    const statHolders = document.querySelectorAll('.statType')
    utils.addListenersToMany('.statType', 'click', function(e){addToHolder(e)})
}

function addToHolder(e){
    if(e.target.children.length > 0) return false
    let statNum = document.querySelector('.selectedStat')
    e.target.appendChild(statNum)

}

function readyToGo(returnFn, condition) {
    if (condition) {
        document.querySelector('#next').classList.remove('inactive')
        document.querySelector('#next').onclick = function () {
            addStats()
            return returnFn()

        }
    }
    else {
        document.querySelector('#next').classList.add('inactive')
        document.querySelector('#next').onclick = null
    }
}

function addStats(){
    const statTypes = document.querySelectorAll('.statType')
    const statArray = []
    for (let stat of statTypes){
        statArray.push(stat.children[0].textContent)
    }
    user.log.push(statArray)
}

function addBonusStats(){
    user.numChoices = 2
    document.querySelector('#displayBoard').innerHTML = statUpgrade(user.log[17])
    utils.addListenersToMany('.statType', 'click', function(e){addOne(e)})
    
}

function addOne(e){
    if (user.numChoices > 0 && !e.target.classList.contains('added')) {
        e.target.onclick = null
        e.target.classList.add('added')
        user.numChoices--
        e.target.children[0].textContent = Number(e.target.children[0].textContent) + 1
        e.target.onclick = function (e) { removeOne(e) }
    }
    else {
        return false
    }
}

function removeOne(e){
    e.target.onclick = null
    e.target.classList.remove('added')
    e.target.onclick = function (e) { addOne(e) }
    user.numChoices++
    e.target.children[0].textContent = Number(e.target.children[0].textContent) - 1
}



module.exports = {prepForStats, prepForAllocation, readyToGo, addBonusStats, diceRoll}
},{"./selection":14,"./templates":16,"./user":17,"./utils":18}],16:[function(require,module,exports){
const user = require('./user')

function standardTemplate(item) {
    return`
    <div class="card">
        <button class="select" type="button">select</button>
        <img src="${item.img}" alt="Image of ${item.name}">
        <h3>${item.name}</h3>
        <p>${item.desc}</p>
        <button class="more" type="button" data-id="${item.index}">more</button>
    </div>`
}

function infoPageHTML(item){
    
    return `
    <div class="infoPage">
        <button type="button" class="back">back</button>
        <h2>${item.name}</h2>
    </div>`
}

function radioTemplate(item){
    const id = item.name.split(' ').join('')
    if(item.damage){
        return `
        <input id="${id}" type="radio" name="equipmentChoice">
        <label for="${id}">
            ${item.name} | ${item.damage.dice_count}d${item.damage.dice_value} ${item.damage.damage_type.name}
        </label>
        `
    }
    else{
        return `
    <input id="${id}" type="radio" name="equipmentChoice">
    <label for="${id}">
        ${item.name} | 
    </label>
    `
    }
}

function classChoiceTemplate(item){
    return `
    <div class="card">
        <button class="select" type="button">select</button>
        <img src="${item.img}" alt="Image of ${item.name}">
        <h2>${item.name}</h2>
        <p>${item.desc[0]}</p>
    </div>`
}

function sorcererTemplate(){
    return `
    <div class="card">
        <button class="select" type="button">select</button>
        <img src="" alt="Image of Wild Magic">
        <h2>Wild Magic</h2>
        <p>You can manipulate the forces of chance and chaos to gain advantage on one attack roll, ability check, or saving throw. Once you do so, you must finish a long rest before you can use this feature again.
        <br>Your spellcasting can unleash surges of untamed magic. Immediately after you cast a sorcerer spell of 1st level or higher, the DM can have you roll a d20. If you roll a 1, roll on the Wild Magic Surge table to create a random magical effect.</p>
    </div>
    <div class="card">
        <img class="card-img-top" src="" alt="Image of Draconic Bloodline">
        <h2>Draconic Bloodline</h2>
        <p >At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.
        <br>You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.</p>     
    </div>`          
}

function statTemplate(statArr){

   return `
   <div class="row">
    <div id="statHolder" class="col-sm-12 col-md-6">
            <div class="statType">STR</div>
            <div class="statType">DEX</div>
            <div class="statType">CON</div>
            <div class="statType">INT</div>
            <div class="statType">WIS</div>
            <div class="statType">CHA</div>
        </div>
        <div id="stats" class="col-sm-12 col-md-6">
            <div class="stat">${statArr[0]}</div>
            <div class="stat">${statArr[1]}</div>
            <div class="stat">${statArr[2]}</div>
            <div class="stat">${statArr[3]}</div>
            <div class="stat">${statArr[4]}</div>
            <div class="stat">${statArr[5]}</div>
        </div>
    </div>
    <button class="reset" type="button">reset</button>`
}

function statUpgrade(statArr){ 
    return `    
        <div class="statType">STR <span>${statArr[0]}</span></div>
        <div class="statType">DEX<span>${statArr[1]}</span></div>
        <div class="statType">CON<span>${statArr[2]}</span></div>
        <div class="statType">INT<span>${statArr[3]}</span></div>
        <div class="statType">WIS<span>${statArr[4]}</span></div>
        `
}

function backStoryForm(){
    return `
    <label for="name" required>Name:</label>
    <input class="backstory" type="text" id="name">

    <label for="traits">Traits:</label>
    <textarea class="backstory" name="traits" id="traits" maxlength="150"></textarea>

    <label for="ideals">Ideals:</label>
    <textarea class="backstory" name="ideals" id="ideals" maxlength="150"></textarea>

    <label for="bonds">Bonds:</label>
    <textarea class="backstory" name="bonds" id="bonds" maxlength="150"></textarea>

    <label for="flaws">Flaws:</label>
    <textarea class="backstory" name="flaws" id="flaws" maxlength="150"></textarea>
    `
}

function alignmentTemplate(){
    return `
    <div class="row">
        <div class="alignment">Lawful<br>Good</div>
        <div class="alignment">Neutral<br>Good</div>
        <div class="alignment">Chaotic<br>Good</div>
        <div class="alignment">Lawful<br>Neutral</div>
        <div class="alignment">True<br>Neutral</div>
        <div class="alignment">Chaotic<br>Nautral</div>
        <div class="alignment">Lawful<br>Evil</div>
        <div class="alignment">Neutral<br>Evil</div>
        <div class="alignment">Chaotic<br>Evil</div>
    </div>`
}



module.exports = {standardTemplate, infoPageHTML, radioTemplate, classChoiceTemplate, sorcererTemplate, statTemplate, statUpgrade, backStoryForm, alignmentTemplate}

},{"./user":17}],17:[function(require,module,exports){
// const user = {
//     log: [],
//     raceId: undefined,
//     subraceId: undefined,
//     classId: undefined,
//     numChoices: 1
// }

const user = {
    log: [
        "Half-Elf", 
        "Infernal", 
        ["Acrobatics", "Animal Handling"], 
        null, 
        null, 
        "Bard", 
        ["Arcana", "Athletics", "Deception"], 
        ["Bagpipes", "Drum", "Dulcimer"], 
        null, 
        ["Dancing Lights", "Light"], 
        ["Bane", "Charm Person", "Comprehend Languages", "Cure Wounds"], 
        [], 
        [], 
        [], 
        null, 
        null, 
        null, 
        ["9", "13", "17", "14", "9", "8"],
        ["10", "14", "17", "14", "9"], 
        8,
        "Acolyte",
        "Chaotic Evil",
        ['dlyan', 'asg', 'asdf', 'awfew', 'aawg']],
    classId: 1,
    raceId: 6,
    subraceId: undefined,
    numChoices: 1
}

module.exports = user//{user, testUser}
},{}],18:[function(require,module,exports){


function addListenersToMany(element, listenerType, fn) {
    const elements = document.querySelectorAll(element)
    elements.forEach(ele => ele.addEventListener(listenerType, fn))

}

function addDifferentListeners(element, listenerArray, fn){
    listenerArray.forEach(listener => addListenersToMany(element, listener, fn))
}


module.exports = {addListenersToMany, addDifferentListeners}
},{}]},{},[13]);
