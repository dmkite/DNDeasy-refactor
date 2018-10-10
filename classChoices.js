const classes = require('./data-objects/classes')
const spelldisplay = require('./spellDisplay')
const {display, select } = require('./display')
const { backFn, choiceNotPresent } = require('./backFn')

function progressChoices(progressPoint, progressLog, number, triggerFn){
    let type = progressPoint[progressLog[9][0]]
    let choices = Object.keys(type.choices)
    let currentChoice = choices[number]
    if (currentChoice === undefined) {
        choiceNotPresent(progressLog, triggerFn)
        return
    }
    let numOfChoices = progressPoint[progressLog[9][0]].choices[currentChoice][0]
    document.querySelector('#prompter').innerHTML = progressPoint[progressLog[9][0]].choices[currentChoice][2]
    
    if(currentChoice === 'cantrips'){
        console.log(type.classType, numOfChoices)
        spelldisplay(0, type.classType, numOfChoices, progressLog, triggerFn)

    }
    else if (currentChoice === 'spells') {
        spelldisplay(1, type.classType, numOfChoices, progressLog, triggerFn)
    }
    else{
        display(progressPoint[progressLog[9][0]].choices[currentChoice], progressLog, triggerFn)
    }
}

module.exports = progressChoices

