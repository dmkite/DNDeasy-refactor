const classes = require('./data-objects/classes')
const spelldisplay = require('./spellDisplay')
const {display, select } = require('./display')
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

