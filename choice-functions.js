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
const {standardTemplate, radioTemplate} = require('./templates')
const stats = require('./stats')

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

function allocateStats(){
    let statNums = stats.prepForStats()
}



module.exports = {raceChoice, extraRaceChoices, subraceChoice, skillDisplay, subraceExtraChoices, classSkillChoice, classExtraChoices, spellChoices, equipmentChoices, classFeatureChoices, allocateStats }