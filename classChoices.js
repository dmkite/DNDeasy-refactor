const classes = require('./data-objects/classes')
const spelldisplay = require('./spellDisplay')
const {display, select } = require('./display')
const { backFn, choiceNotPresent } = require('./backFn')

function classChoices(progressLog, number, triggerFn){
    let classType = classes[progressLog[9][0]]
    let choices = Object.keys(classType.choices)
    let currentChoice = choices[number]
    if (currentChoice === undefined) {
        choiceNotPresent(progressLog, triggerFn)
        return
    }
    let numOfChoices = classes[progressLog[9][0]].choices[currentChoice][0]
    
    if(currentChoice === 'cantrips'){
        console.log(classType.classType, numOfChoices)
        spelldisplay(0, classType.classType, numOfChoices, progressLog, triggerFn)

    }
    else if (currentChoice === 'spells') {
        spelldisplay(1, classType.classType, numOfChoices, progressLog, triggerFn)
    }
    else{
        display(classes[progressLog[9][0]].choices[currentChoice], progressLog, triggerFn)
    }
}

module.exports = classChoices

