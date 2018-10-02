const languages = require('./data-objects/languages')
const races = require('./data-objects/races')
const subraces = require('./data-objects/subraces')
const skills = require('./data-objects/skills')
const backgrounds = require('./data-objects/backgrounds')
const classes = require('./data-objects/classes')
const dragonbreath = require('./data-objects/dragonbreath')
const spells = require('./data-objects/spells')


const display = require('./display')
const backFn = require('./backFn')
const userInput = require('./userInput')

const userProgress = []

function createDNDCharacter(){
    if(document.getElementById('next').classList.contains('active')){
        document.getElementById('next').classList.remove('active')
        document.getElementById('next').classList.add('inactive')
    }

    const back = document.getElementById('back')
    back.addEventListener('click', function(){backFn(userProgress, createDNDCharacter)})
   
    switch(userProgress.length){
        case 0:
            //function to display races
            document.getElementById('back').classList.remove('active')
            document.getElementById('back').classList.add('inactive')
            display(races, userProgress, createDNDCharacter)
            break
        case 1:
            //funtion to choose name
            let inputTag = '<input id="userInput" type="text" require minlength="1" placeholder ="what is your name?" value="">'
            userInput("what's in a name?", inputTag, createDNDCharacter, userProgress)
            console.log(userProgress)
            break
        case 2:
            //choose a language if applicable
            console.log('woohoo! :)', userProgress)
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

const expObj = {createDNDCharacter, userProgress}

module.exports = expObj