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
const { addRaceData, addSubraceData, addClassData, addClassChoices, addBackgroundData, addStatData} = require('./createUserObj')
const createCharSheet = require('./createCharSheet')
const characterProg = require('./charProg')
const progressbar = document.querySelector('#progress')
const { storeProgress, revertProgress } = require('./storeProgress')


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
    skills:[],
    background:'',
    traits:'',
    bonds:'',
    ideals:'',
    flaws:'',
    classType: '',
    savingThrow: []

}


const userProgress = []

function createDNDCharacter(){
    console.log(userObj)
    
    const prompter = document.querySelector('#prompter')
    const charProg = document.querySelector('#charProg')

    

    switch(userProgress.length){
        case 0:
            //function to display races
            prompter.innerHTML = '<h2>Choose your race</h2><p>Humans are the most common people in the worlds of DND, but they live and work alongside dozens of fantastic species, each with their own strengths and weaknesses</p>'
            display(races, userProgress, createDNDCharacter)
            break
        case 1:
            document.querySelector('#back').classList.toggle('hidden')
            document.querySelector('#save').classList.toggle('hidden')
    
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
            userObj.name = userProgress[1][0]
            
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
            if (userProgress[3] !== null) { userObj.skills.push(userProgress[3]) }
            
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
            prompter.innerHTML = `<h2>Are you a good ${userObj.classType} or a bad ${userObj.classType}?</h2> <p>Alignment is a 2 axis decision. Are you prone to selflessness or selfishness? Are you prone to order or spontaneity?</p>`
            display(alignment, userProgress, createDNDCharacter)
            
            break
        case 15:
            //add alignment to user object
            userObj.alignment = userProgress[14]

            //change progressbar
            progressbar.className = 'forty'

            //choose background
            prompter.innerHMTL = '<h2>Pick a background</h2> <p>What were you doing before your adventure?</p>'
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
            if(userProgress[15] !== null){userObj.languages.push(userProgress[15][0])}
            console.log('added bonus background languages', userObj)
            //attribute stats
            prompter.innnerHTML = '<h2>Parsel out your stats</h2> <p>Stats have been generated for you, decide where you want to attribute them.</p>'
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
            userObj.HP += userProgress[18]

            //change progressbar
            progressbar.className = 'seventy'

            //traits
            prompter.innerHTML = '<h2>What are your personality traits?</h2><p>Spend some time thinking about this, it makes the role playing experience much easier!</p>'
            let inputTag2 = `<textarea id="userInput" type="text" require maxlength="140" placeholder="How would you describe ${userProgress[1][0]}?" value="" autofocus></textarea>`
            userInput(inputTag2, createDNDCharacter, userProgress)

            break
        case 20:
            //add traits to user object
            userObj.traits = userProgress[19]
            
            //change progressbar
            progressbar.className = 'eighty'

            //ideals
            prompter.innerHTML = '<h2>What are your ideals?</h2><p>What is important to your character?</p>'

            let inputTag3 = `<textarea id="userInput" type="text" require maxlength="140" placeholder ="what does ${userProgress[1][0]} stand for?" value="" autofocus></textarea>`
            userInput(inputTag3, createDNDCharacter, userProgress)

            break
        case 21:
            //add ideals to user object
            userObj.ideals = userProgress[20]

            //change progressbar
            progressbar.className = 'ninety'

            //bonds
            prompter.innerHTML = '<h2>What are your bonds?</h2><p>Who or what does your character value?</p>'
            inputTag4 = `<textarea id="userInput" type="text" require maxlength="140" placeholder ="what is ${userProgress[1][0]} connected to?" value="" autofocus></textarea>`
            userInput(inputTag4, createDNDCharacter, userProgress)

            break
        case 22:
            //add bonds to user object 
            userObj.bonds = userProgress[21]

            //change progressbar
            progressbar.className = 'hundred'

            // flaws
            prompter.innerHTML = "<h2>What's wrong with you'?</h2><p>Everybody's got them, what are your character's weaknesses?</p>"
            inputTag5 = `<textarea id="userInput" type="text" require maxlength="140" placeholder ="what are ${userProgress[1][0]}'s flaws?" value="" autofocus></textarea>`
            userInput(inputTag5, createDNDCharacter, userProgress)
            break
        default:
            //add bonds to user object 
            userObj.flaws = userProgress[22]
            console.log(userObj)
            createCharSheet(userObj)
            return
    }
    characterProg(userObj)   
    storeProgress(userObj, userProgress)
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