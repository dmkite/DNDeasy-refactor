const spells = require('./spellList')
const { createDNDCharacter, userProgress } = require('./main')
const {display, select} = require('./display')

function prepareSpellOptions(level, className, numOfChoices = 1, progressLog, triggerFn){
    let holder = document.getElementById('holder')
    holder.innerHTML = ''
    let placeholder = 'https://cdn.tutsplus.com/net/uploads/legacy/958_placeholders/placehold.gif'
    let options = []

    for(let spell of spells){
        if(spell.level === level && !!className === true){
            for(let i = 0; i < spell.classes.length; i++){
                if (className === spell.classes[i].name){
                    options.push(`<div class="card">
                        <img src="${placeholder}" alt="image of spell">
                            <h3>${spell.name}</h3>
                            <p>${spell.desc[0]}</p>
                            <div class="reverse">
                            </div>
                    </div>`)            
                }
            }
        }
        if(!!className === false){
            if(spell.level === 0){
                options.push(`<div class="card">
                    <img src="${placeholder}" alt="image of spell">
                        <h3>${spell.name}</h3>
                        <p>${spell.desc[0]}</p>
                        <div class="reverse">
                        </div>
                </div>`)
            }
        }
    }
    holder.innerHTML = options.join('\n')

    let cards = document.querySelectorAll('.card')
    let finalChoice = []
    let prepCardsForSelection = function (e) { select(e, numOfChoices, finalChoice, progressLog, triggerFn) }
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', prepCardsForSelection)
    }
}


module.exports = prepareSpellOptions
