const spells = require('../data/spells')
const user = require('./user')

function spellFunction(lvl){
    const spellHTML = {
        attack: [],
        utility: [],
        strategy: [],
        support: []
    }
    const spellList = filterSpells(lvl)
    divvySpells(spellHTML, spellList)
    displaySpells(spellList)
    prepSpellSelection()
}

function spellCardTemplate(spell){
    return `
    <div class="card">
        <h5 class="title">${spell.name}</h5>
        <p> ${spell.desc.join('<br>')}</p>
        <p>Range: ${spell.range} | Casting Time: ${spell.casting_time}</p>
    </div>`
}

function divvySpells(spellHTML, filteredList){
    filteredList.forEach(spell => {
        if (spell.attack) spellHTML.attack.push(spellCardTemplate(spell))
        else if (spell.utility) spellHTML.utility.push(spellCardTemplate(spell))
        else if (spell.strategy) spellHTML.strategy.push(spellCardTemplate(spell))
        else spellHTML.support.push(spellCardTemplate(spell))
        return spellHTML
    })

    
}

function filterSpells(lvl){
    const result =  spells.reduce((acc, spell) => {
        spell.classes = classes.map(classType => classType.name)
        if(spell.level === lvl && spell.classes.includes(user.log[5])){
            acc.push(spell)
        }
        return acc
    }, [])
    return result
}

function displaySpells(spellList){
    for (let key in spellHTML) {
        if (spellHTML[key].length > 0) {
            displayBoard.element.innerHTML +=
                `<button class="btn spellButton" type="button" data-toggle="collapse" data-target="#${key}Spells" aria-expanded="false" aria-controls="${key}Spells">${key} Spells <span class="numSpellsSelected"></span></button>

                <div class="collapse" id="${key}Spells">
                    <div class="horizontalScroll">
                        ${spellHTML[key].join('')}
                    </div>
                </div>`
        }
    }
}

function prepSpellSelection(){
    document.addEventListener('click', function () {
        let spellButtons = document.querySelectorAll('.spellButton')
        let horizontalScrollDivs = document.querySelectorAll('.horizontalScroll')

        for (let i = 0; i < horizontalScrollDivs.length; i++) {
            let selectedCounter = 0
            let scrollDiv = horizontalScrollDivs[i]
            for (let child of scrollDiv.children) {
                if (child.classList.contains('selected')) {
                    selectedCounter++
                }
            }
            spellButtons[i].children[0].textContent = `${selectedCounter} selected`
        }
    })
}
   

    module.exports = spellFunction