// const spells = require('./spellList')
const spells = require('./test')
const { createDNDCharacter, userProgress } = require('./main')
const {display, select} = require('./display')

function prepareSpellOptions(level, className, numOfChoices = 1, progressLog, triggerFn){
    let holder = document.getElementById('holder')
    holder.innerHTML = ''
    let options = []

    for(let spell of spells){
        if(spell.level === level && !!className === true){
            for(let i = 0; i < spell.classes.length; i++){
                if (className === spell.classes[i].name){
                    options.push(`
                        <div class="card-wrapper spell-card">
                        
                            <div class="card">
                                <div class="card-front">
                                    <h3>${spell.name}</h3>
                                    <p>${spell.desc[0]}</p>
                                    <div class="btn-turn-to-back"></div>
                                </div>

                                <div class="card-back">
                                    <p>Range: ${spell.range}</p>
                                    <p>Duration: ${spell.duration}</p>
                                    <p>Casting Time: ${spell.casting_time}</p>
                                    <div class="btn-turn-to-front"></div>
                                </div>

                            </div>

                        </div>`)            
                }
            }
        }
        if(!!className === false){
            if(spell.level === 0){
                options.push(`
                        <div class="card-wrapper">
                        
                            <div class="card">
                                <div class="card-front">
                                    <h3>${spell.name}</h3>
                                    <p>${spell.desc[0]}</p>
                                    <div class="btn-turn-to-back"></div>
                                </div>

                                <div class="card-back">
                                    <p>Back</p>
                                    <div class="btn-turn-to-front"></div>
                                </div>

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
        document.querySelectorAll('.btn-turn-to-front')[i].style.visibility = 'visible';
        document.querySelectorAll('.btn-turn-to-back')[i].style.visibility = 'visible';

        document.querySelectorAll('.btn-turn-to-front')[i].onclick = function (event) {
            event.stopPropagation();
            document.querySelectorAll('.card')[i].classList.toggle('do-flip')
        };

        document.querySelectorAll('.btn-turn-to-back')[i].onclick = function (event) {
            event.stopPropagation()
            document.querySelectorAll('.card')[i].classList.toggle('do-flip');

        };
    }
}


module.exports = prepareSpellOptions
