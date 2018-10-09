const languages = require('./data-objects/languages')
const races = require('./data-objects/races')
const subraces = require('./data-objects/subraces')
const skills = require('./data-objects/skills')
const backgrounds = require('./data-objects/backgrounds')
const classes = require('./data-objects/classes')
const dragonbreath = require('./data-objects/dragonbreath')
const alignment = require('./data-objects/alignment')
// const spells = require('./data-objects/spells')
const progressChoices = require('./classChoices')
const diceStats = require('./diceStats')

const { display, select } = require('./display')
const spellList = require('./spellList')
const prepareSpellOptions = require('./spellDisplay')
const {backFn, choiceNotPresent} = require('./backFn')
const userInput = require('./userInput')
const hpRoll = require('./hpRoll')

const displayStats = require('./diceStats')
const { addRaceData, addSubraceData, addClassData, addClassChoices, addBackgroundData} = require('./createCharSheet')

let userObj = {
    race: '',
    name: '',
    stats:{
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0
    },
    speed: 0,
    profs:{
        weapons:[],
        armor:[],
        tools:[],
        other:[],
    },
    features:[],
    languages:[],
    spells:{
        cantrips:[],
        level1:[]
    },
    HP:0,
    AC:0,
    DC:0,
    equipment:{
        weapons:[],
        other:[],
        shield:[]
    },
    skills:[]
}

const userProgress = []

function createDNDCharacter(){
    
    
    

    const back = document.getElementById('back')
    back.addEventListener('click', function(){backFn(userProgress, createDNDCharacter)})
    

    switch(userProgress.length){
        case 0:
            //function to display races
            display(races, userProgress, createDNDCharacter)
            break
        case 1:
            //add race data to user object
            addRaceData(userObj, races[userProgress[0][0]])
            
            //funtion to choose name
            let inputTag = '<input id="userInput" type="text" require minlength="1" placeholder ="what is your name?" value="" autofocus>'
            userInput("what's in a name?", inputTag, createDNDCharacter, userProgress)

            break

        case 2:
            //add name to user object
            userObj.name = userProgress[1][0]
            
            // choose a language if applicable
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
            if(!races[userProgress[0][0]].choices || !races[userProgress[0][0]].choices.skills){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                display(races[userProgress[0][0]].choices.skills, userProgress, createDNDCharacter)
            }
            break
        case 4:
            //add bonus skills if user is half elf
            if (userProgress[3] !== null) { userObj.skills.push(userProgress[3]) }
            console.log(userObj, 'in case 4!!!!!!111')
            
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
            display(classes, userProgress, createDNDCharacter)
            break
        case 10:
            //add class data to user object
            addClassData(userObj, classes[userProgress[9][0]])

            //choose skills
            // console.log(userProgress[9])
            // display(classes[userProgress[9][0]].choices.skills, userProgress, createDNDCharacter)
            progressChoices(classes, userProgress, 0, createDNDCharacter)
            
            break
        case 11:
            // add class skills to user object
            userObj.skills.push(userProgress[10])

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
            display(alignment, userProgress, createDNDCharacter)
            
            break
        case 15:
            //add alignment to user object
            userObj.alignment = userProgress[14]

            //choose background
            display(backgrounds, userProgress, createDNDCharacter)
            break
        case 16:
            //add background to user object
            addBackgroundData(userObj, backgrounds[userProgress[15][0]])

            //choose background choices 
            if(!!backgrounds[userProgress[15][0]].choices === false){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                display(languages, userProgress, createDNDCharacter, 'languages')
            }
            break
        case 17:
            //add bonus background languages 
            if(userProgress[15] !== null){userObj.languages.push(userProgress[15][0])}
            console.log('added bonus background languages', userObj)
            //attribute stats
            displayStats(userProgress, createDNDCharacter)
            break
        case 18:
            //roll HP
            hpRoll(userProgress, createDNDCharacter)
            break
        case 19:
            //traits
            let inputTag2 = `<textarea id="userInput" type="text" require maxlength="140" placeholder="How would you describe ${userProgress[1][0]}?" value="" autofocus></textarea>`
            userInput('What are your traits?', inputTag2, createDNDCharacter, userProgress)

            break
        case 20:
            //ideals
            let inputTag3 = `<textarea id="userInput" type="text" require maxlength="140" placeholder ="what does ${userProgress[1][0]} stand for?" value="" autofocus></textarea>`
            userInput("what do you believe in?", inputTag3, createDNDCharacter, userProgress)

            break
        case 21:
            //bonds
            inputTag4 = `<textarea id="userInput" type="text" require maxlength="140" placeholder ="what is ${userProgress[1][0]} connected to?" value="" autofocus></textarea>`
            userInput("what are you connected to?", inputTag4, createDNDCharacter, userProgress)

            break
        case 22:
            // flaws
            inputTag5 = `<textarea id="userInput" type="text" require maxlength="140" placeholder ="what are ${userProgress[1][0]}'s flaws?" value="" autofocus></textarea>`
            userInput("what's wrong with you?", inputTag5, createDNDCharacter, userProgress)
            break
        default:

            console.log('8888888888888888', userProgress)
            return
    }
    
}

createDNDCharacter()

const expObj = {createDNDCharacter, userProgress}

module.exports = expObj

/*
REFERENCE

0: Array(1)
0: "Dwarf"
length: 1
__proto__: Array(0)
1: Array(1)
0: "jkjjkj"
length: 1
__proto__: Array(0)
2: null
3: null
4: null
5: null
6: Array(1)
0: "Hill Dwarf"
length: 1
__proto__: Array(0)
7: null
8: null
9: Array(1)
0: "Ranger"
length: 1
__proto__: Array(0)
10: Array(3)
0: "Nature"
1: "Investigation"
2: "Stealth"
length: 3
__proto__: Array(0)
11: Array(1)
0: "3"
length: 1
__proto__: Array(0)
12: Array(1)
0: "12"
length: 1
__proto__: Array(0)
13: null
14: Array(1)
0: "True Neutral"
length: 1
__proto__: Array(0)
15: Array(1)
0: "Charlatan"
length: 1
__proto__: Array(0)
16: null
17: Array(1)
0: {STR: "13", CON: "14", INT: "15", WIS: "12", CHA: "16", …}
length: 1
__proto__: Array(0)
18: Array(1)
0: 8
length: 1
__proto__: Array(0)
length: 19
*/