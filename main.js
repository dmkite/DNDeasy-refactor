const languages = require('./data-objects/languages')
const races = require('./data-objects/races')
const subraces = require('./data-objects/subraces')
const skills = require('./data-objects/skills')
const backgrounds = require('./data-objects/backgrounds')
const classes = require('./data-objects/classes')
const dragonbreath = require('./data-objects/dragonbreath')
const alignment = require('./data-objects/alignment')
// const spells = require('./data-objects/spells')
const classChoices = require('./classChoices')

const { display, select } = require('./display')
const spellList = require('./spellList')
const prepareSpellOptions = require('./spellDisplay')
const {backFn, choiceNotPresent} = require('./backFn')
const userInput = require('./userInput')



const userProgress = []

function createDNDCharacter(){
    
    console.log(userProgress, 'at beginning of CDC')
    // if(document.getElementById('next').classList.contains('active')){
    //     document.getElementById('next').classList.remove('active')
    //     document.getElementById('next').classList.add('inactive')
    // }

    const back = document.getElementById('back')
    back.addEventListener('click', function(){backFn(userProgress, createDNDCharacter)})
    

    switch(userProgress.length){
        case 0:
            //function to display races
            display(races, userProgress, createDNDCharacter)
            break
        case 1:
            //funtion to choose name
            let inputTag = '<input id="userInput" type="text" require minlength="1" placeholder ="what is your name?" value="">'
            userInput("what's in a name?", inputTag, createDNDCharacter, userProgress)

            break
        case 2:
            // choose a language if applicable
            if(!races[userProgress[0][0]].choices || !races[userProgress[0][0]].choices.languages){
                choiceNotPresent(userProgress, createDNDCharacter)
                
            }
            else{
                display(races[userProgress[0][0]].choices.languages, userProgress, createDNDCharacter, 'languages')
            }
            break
        case 3:
            //choose skills if applicable
            if(!races[userProgress[0][0]].choices || !races[userProgress[0][0]].choices.skills){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                display(races[userProgress[0][0]].choices.skills, userProgress, createDNDCharacter)
            }
            break
        case 4:
            //choose stats if applicable
            if(!races[userProgress[0][0]].choices || !races[userProgress[0][0]].choices.stats){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                display(races[userProgress[0][0]].choices.stats, userProgress, createDNDCharacter)
            }
            break
        case 5: 
            //choose dragon breath if applicable
            if(userProgress[0][0] !== 'Dragonborn'){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                console.log('is dragonborn')
                display(races.Dragonborn.choices.weapons, userProgress, createDNDCharacter)
            }
            break
        case 6:
            //choose subrace if applicable
            if(!races[userProgress[0][0]].choices || !races[userProgress[0][0]].choices.subrace){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                display(races[userProgress[0][0]].choices.subrace, userProgress, createDNDCharacter)
            }
            break
        case 7: 
            //choose spell
            if(userProgress[6] === null || userProgress[6][0] !== 'High Elf'){
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else{
                prepareSpellOptions(0, null, 1, userProgress, createDNDCharacter)
            }
            break
        case 8:
            if (userProgress[6] === null || userProgress[6][0] !== 'High Elf') {
                choiceNotPresent(userProgress, createDNDCharacter)
            }
            else {
                display(subraces.Elf[userProgress[6][0]].choices.languages, userProgress, createDNDCharacter, 'languages')
            }
            break
        case 9:
            //choose class
            display(classes, userProgress, createDNDCharacter)
            break
        case 10:
            //choose skills
            // console.log(userProgress[9])
            // display(classes[userProgress[9][0]].choices.skills, userProgress, createDNDCharacter)
            classChoices(userProgress, 0, createDNDCharacter)
            
            break
        case 11:
            //choose class choices 2
            classChoices(userProgress, 1, createDNDCharacter)
            break
        case 12: 
            //choose class choices 3
            classChoices(userProgress, 2, createDNDCharacter)
            break
        case 13:
            //choose class choices 4
            classChoices(userProgress, 3, createDNDCharacter)
            break
        case 14: 
            //choose alignment
            display(alignment, userProgress, createDNDCharacter)
            console.log(alignment)
            break
        case 15:
            //choose background
            break
        case 16:
            //choose background
            break
        case 17:
            //traits
            break
        case 18:
            //ideals
            break
        case 19:
            //bonds
            break
        case 20:
            // flaws
            break
        default:
            return 'youre done!'
    }
    
}

createDNDCharacter()

const expObj = {createDNDCharacter, userProgress}

module.exports = expObj