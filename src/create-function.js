const user = require('./user')
const races = require('../data/races')
const subraces = require('../data/subraces')
const choiceFns = require('./choice-functions')
const { addIndex } = require('./selection')
const languages = require('../data/languages')
const spells = require('../data/spells')
const classes = require('../data/classes')
const render = require('./final-render')

const displayBoard = document.querySelector('#displayBoard')
const next = document.querySelector('#next')

function createDNDChar() {
    displayBoard.innerHTML = ''
    next.classList.add('inactive')
    switch (user.log.length) {
        case 0:
            choiceFns.raceChoice(races, createDNDChar)
            break
        case 1:
            addIndex(user.log[0], races, 'raceId')
            choiceFns.extraRaceChoices(createDNDChar)
            break
        case 2:
            if (user.log[0] == 'Half-Elf') return choiceFns.skillDisplay(2)
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
            render.finalRender()
    }
}

module.exports = createDNDChar