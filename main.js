const races = require('./races')
const equipment = require('./equipment')
const languages = require('./languages')
const skills = require('./skills')
const subraces = require('./subraces')
const spells = require('./spells')
const classes = require('./classes')
const startingEquipment = require('./startingEquipment')

const displayBoard = {
    element: document.querySelector('#displayBoard'),
    clear: function(){
        const self = this
        self.element.innerHTML = ''
    },
    display: function(inputArray, displayFn){
        const self = this
        let content = []
        for(let i = 0; i < inputArray.length; i++){
            content.push(displayFn(inputArray[i]))
        }
        self.element.innerHTML = content.join('\n')
    },
    prepForSelection: function(){
            let self = this
            if(self.choicesLeft === 0){
                self.choicesLeft = 1
            }
            let cards = document.querySelectorAll('.card')
            for(let card of cards){
                card.addEventListener('click', function (e) { 
                    select(e)
                })
            }
        
    },
    choicesLeft:1,
    userInput:''
}

let user = {
    progress: [],
    choiceSkipped: function(){
        const self = this
        self.progress.push(null)
        return createDNDChar()
    },
    addSelected: function(){
        const selections = document.querySelector('.selected')
    }, 
    storeAndProceed: function(){
        
        const selections = document.querySelectorAll('.selected')
        if (selections.length > 1) {
            let tempResult = []
            for (let selection of selections) {
                tempResult.push(selection)
            }
            user.progress.push(tempResult)
        }
        else {
            user.progress.push(selections[0].children[1].children[0].textContent)
        }
        user.saveProg()  
        createDNDChar()
    },
    saveProg: function () {
        if (!!localStorage.getItem('storedUser')) {
            let stringStorage = localStorage.getItem('storedUser')
            let storageArray = JSON.parse(stringStorage)
            storageArray.push(user)
            stringStorage = JSON.stringify(storageArray)
            localStorage.setItem('storedUser', stringStorage)
        }
    },
    revertProg: function(){
        let stringStorage = localStorage.getItem('storedUser')
        let storageArray = JSON.parse(stringStorage)
        storageArray.pop()
        let mostRecentlyStored = storageArray[storageArray.length - 1]
        console.log(storageArray)
        let lastLog = mostRecentlyStored.progress
        

        let lastDecision = lastLog[lastLog.length - 1]
        //returns last item of array

        if (lastDecision !== null) {
            user = storageArray[storageArray.length - 1]
        }
        else {
            while (lastDecision === null) {
                storageArray.pop()
                mostRecentlyStored = storageArray[storageArray.length - 1]
                lastLog = mostRecentlyStored.progress
                lastDecision = lastLog[lastLog.length - 1]
            }

            storageString = JSON.stringify(storageArray)

            localStorage.setItem('storedUser', storageString)

            user = storageArray[storageArray.length - 1]
        }

        createDNDChar()
    }

}

const controlBoard = {
    element:document.querySelector('#controls'),
    updatePrompt: function(prompt){
        if(!!document.querySelector('#prompter')){
            document.querySelector('#prompter').remove()
        }
        
        let prompter = document.createElement('div')
        prompter.id = 'prompter'
        document.querySelector('body').appendChild(prompter)

        document.querySelector('#prompter').textContent = prompt
        let span = document.createElement('span')
        document.querySelector('#prompter').appendChild(span)
        document.querySelector('#prompter span').textContent = displayBoard.choicesLeft
    },
    back: document.querySelector('#back')
}

function raceTemplateFn({name, speed, ability_bonuses, traits, img}){
    const statNames = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']
    statBonus = ''
    for(let i = 0; i < ability_bonuses.length; i ++){
        if(ability_bonuses[i] > 0){
            statBonus += `+${ability_bonuses[i]} ${statNames[i]}<br>`
        }
    }
    let traitString = ''

    for (let trait in traits){
        traitString += `${trait.name}<br>`
    }

    return `<div class="card">
        <img class="card-img-top" src="${img}" alt="Image of ${name}">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <ul class="list-group list-group-flush hidden">
            <li class="list-group-item">Stat Bonuses:<br>${statBonus}</li>
            <li class="list-group-item">Racial Features:<br>${traitString}</li>
        </ul>
        <div class="card-body hidden">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
        </div>
</div>`
}

function displaySubchoice(race, options, dataObj) {
    let optionArray = race[options].from
    let subchoiceTemplate = []
    for (let option of optionArray) {
        let desc
        for (let item of dataObj) {
            if (item.name === option.name) {
                if(!!item.desc){
                    desc = item.desc[0]
                }
                else{
                    desc = 'No description available'
                }
            }
        }
        subchoiceTemplate.push(
            `<div class="card">
                <img class="card-img-top" src="https://via.placeholder.com/300" alt="Image of ${option.name}">
                <div class="card-body">
                    <h5 class="card-title">${option.name}</h5>
                </div>
            </div>
            
            <div class="hidden hidden-desc">${desc}</div>`
        )

    }
    displayBoard.element.innerHTML = subchoiceTemplate.join('\n')
    displayBoard.choicesLeft = race[options].choose
    const cards = document.querySelectorAll('.card')
    for (let card of cards) {
        card.onclick = function (e) { select(e) }
    }
}

function select(e){
    const card = e.currentTarget
    const next = document.querySelector('#next')
    for(let child of displayBoard.element.children){
        if(child.classList.contains('hidden-desc')){
            child.classList.add('hidden')
        }
    }

    if (card.classList.contains('selected')) {   //if you select an item that has already been selected
        displayBoard.choicesLeft++                              //add a choice to the list
        card.classList.toggle('selected')            //remvoe 'selected' class
    }
    else {                                                  //if you select an item that has not been selected
        if (displayBoard.choicesLeft > 0) {                         //if you have choices left
            displayBoard.choicesLeft--                              //reduce choices left
            card.classList.toggle('selected')            // give item a class of selected
        }
        else{                                                  //if you don't have choices left
            alert('You have no choices left')
        }
    }

    
    if(displayBoard.choicesLeft === 0){    
        next.classList.remove('inactive')
        next.onclick = user.storeAndProceed
    }
    else{
        next.classList.add('inactive')
        next.onclick = null
    }

    if (card.nextElementSibling !== null){
        card.nextElementSibling.classList.toggle('hidden')        
    }

    document.querySelector('#prompter span').textContent = displayBoard.choicesLeft
}

function dataDisplay(choiceArray, dataArray) {
    if (choiceArray === null) {
        choiceArray = []
        for (let item of dataArray) {
            choiceArray.push(item.name)
        }
    }
    
    let itemHTML = []
    for (let itemChoice of choiceArray) {
        for (let item of dataArray) {
            if (itemChoice === item.name) {
                itemHTML.push(
                    `<div class="card">
                        <img class="card-img-top" src="" alt="Image of ${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <ul class="list-group list-group-flush hidden">
                            <li class="list-group-item">Racial Features:<br>${item.desc}</li>
                        </ul>
                        <div class="card-body hidden">
                            <a href="#" class="card-link">Card link</a>
                            <a href="#" class="card-link">Another link</a>
                        </div>
                    </div>`
                )
            }
        }
        
        displayBoard.element.innerHTML = itemHTML.join('')
        displayBoard.prepForSelection()
    }
}

function subraceTemplateFn({ name, desc, ability_bonuses, racial_traits }) {
    const statNames = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']
    statBonus = ''
    for (let i = 0; i < ability_bonuses.length; i++) {
        if (ability_bonuses[i] > 0) {
            statBonus += `+${ability_bonuses[i]} ${statNames[i]}<br>`
        }
    }
    let traitString = ''

    for (let trait in racial_traits) {
        traitString += `${racial_traits.name}<br>`
    }

    return `<div class="card">
                                <img class="card-img-top" src="" alt="Image of ${name}">
                                <div class="card-body">
                                    <h5 class="card-title">${name}</h5>
                                    <p class="card-text">${desc}</p>
                                </div>
                                <ul class="list-group list-group-flush hidden">
                                    <li class="list-group-item">Stat Bonuses:<br>${statBonus}</li>
                                    <li class="list-group-item">Racial Features:<br>${traitString}</li>
                                </ul>
                                <div class="card-body hidden">
                                    <a href="#" class="card-link">Card link</a>
                                    <a href="#" class="card-link">Another link</a>
                                </div>
                            </div>`
}

//Procedural
document.querySelector('.btn-secondary').addEventListener('click', function(){
    let storageKeys = Object.keys(localStorage)
    document.querySelector('body').innerHTML += '<b id="error">you have nothing to load</b>'

})

document.querySelector('.btn-primary').addEventListener('click', function () {
    let storage = []
    let stringStorage = JSON.stringify(storage)
    localStorage.setItem('storedUser', stringStorage)
    createDNDChar()
})


function createDNDChar(){
    controlBoard.back.onclick = user.revertProg
    controlBoard.back.classList.remove('inactive')
    switch(user.progress.length){
        case 0:
            controlBoard.back.onclick = null
            controlBoard.back.classList.add('inactive')
            displayBoard.clear()
            document.querySelector('#user').classList.toggle('inactive')
            displayBoard.display(races, raceTemplateFn)
            displayBoard.prepForSelection()
            controlBoard.updatePrompt("Here's your prompt")
            break

        case 1:
            for (let race of races) {
                if (race.name === user.progress[0]) {
                    user.raceIndex = race.index - 1
                }
            }

            //determine proficiency/language/trait options
            if ( races[user.raceIndex].name === 'Dwarf' ){
                displaySubchoice(races[user.raceIndex], 'starting_proficiency_options', equipment)
                controlBoard.updatePrompt('Select a tool proficiency')
            }
            else if (races[user.raceIndex].name === "Half-Elf" || races[user.raceIndex].name === "Human" ){
                displaySubchoice(races[user.raceIndex], 'language_options', languages)
                controlBoard.updatePrompt('Select another language')
            }
            else if (races[user.raceIndex].name === "Dragonborn"){
                displaySubchoice(races[user.raceIndex], 'trait_options', equipment)
                controlBoard.updatePrompt('Select a Draconic Ancestry')
            }
            else{
                user.choiceSkipped()
            }

            break

        case 2:
            //determine subrace/features options
            if( races[user.raceIndex].name === 'Half-Elf' ){
                dataDisplay(null, skills)
                displayBoard.choicesLeft = 2
            }
            else if(races[user.raceIndex].subraces.length > 0){
                let subraceTemplate = []

                for(let subrace of subraces){
                    if(subrace.race.name === user.progress[0]){
                        subraceTemplate.push(subraceTemplateFn(subrace))
                    }
                }
                displayBoard.element.innerHTML = subraceTemplate.join('')     
                
                displayBoard.prepForSelection()   
            }
            else{
                user.choiceSkipped()
            }
            break

        case 3:
            //determine subrace options
            for (let subrace of subraces) {
                if (subrace.name === user.progress[2]) {
                    user.subraceIndex = subrace.index - 1
                }
            }
            
            if( user.progress[2] === 'High Elf'){
                displaySubchoice(subraces[user.subraceIndex], 'language_options', languages)
            }
            else{
                user.choiceSkipped()
            }
            break

        case 4:
            if (user.progress[2] === 'High Elf') {
                displaySubchoice(subraces[user.subraceIndex], 'racial_trait_options', spells)
            }
            else {
                user.choiceSkipped()
            }
            break
        
        case 5: 
            displayBoard.display(classes, classTemplateFn)
            displayBoard.prepForSelection()
            controlBoard.updatePrompt('Select your class')
            break

        case 6:
            //prof choices
            for (let classType of classes) {
                if (classType.name === user.progress[5]) {
                    user.classIndex = classType.index - 1
                }
            }
        
            let skillChoiceArray = []
            for (let skill of classes[user.classIndex].proficiency_choices[0].from){
                skillChoiceArray.push(skill.name)
            }
        
            dataDisplay(skillChoiceArray, skills)
            displayBoard.choicesLeft = classes[user.classIndex].proficiency_choices[0].choose

            controlBoard.updatePrompt(`Choose ${displayBoard.choicesLeft} skills`)
            break

        case 7:
            if( user.progress[5] === 'Monk' || user.progress[5] === 'Bard' ){
                let skillChoiceArray = []
                for (let instrument of classes[user.classIndex].proficiency_choices[1].from) {
                    skillChoiceArray.push(instrument.name)
                }
                dataDisplay(skillChoiceArray, equipment)
                displayBoard.choicesLeft = classes[user.classIndex].proficiency_choices[1].choose
            }
            else{
                user.choiceSkipped()
            }
            break
        
        case 8:
            if (user.progress[5] === 'Monk' ) {
                let skillChoiceArray = []
                for (let item of classes[user.classIndex].proficiency_choices[2].from) {
                    skillChoiceArray.push(item.name)
                }
                dataDisplay(skillChoiceArray, equipment)
                displayBoard.choicesLeft = classes[user.classIndex].proficiency_choices[2].choose
            }
            else {
                user.choiceSkipped()
            }
            break
        
        case 9:
        console.log(user.classIndex)
            if(user.classIndex >= 1 && user.classIndex <= 3 || user.classIndex >= 9){
                console.log('still went to wrong part', 'even though changed')
                displayBoard.choicesLeft = classes[user.classIndex].spellcasting.cantrips

                controlBoard.updatePrompt(`Choose ${classes[user.classIndex].spellcasting.cantrips} Cantrips`)
                
                spellDisplay(classes[user.classIndex].name, 0)
            }
            else{
                user.choiceSkipped()
            }
            break

        case 10: 
            if(user.classIndex === 1 || user.classIndex === 10 || user.classIndex === 9){
                displayBoard.choicesLeft = classes[user.classIndex].spellcasting.first_level

                controlBoard.updatePrompt(`Choose ${classes[user.classIndex].spellcasting.first_level} level 1 spells`)

                spellDisplay(classes[user.classIndex].name, 1)
            }
            else{
                user.choiceSkipped()
            }
            break

        case 11:
            controlBoard.updatePrompt('Choose your equipment')
            displayBoard.element.innerHTML = ''
            equipmentFunction(startingEquipment[user.classIndex].choice_1[0].from[0], startingEquipment[user.classIndex].choice_1[1].from, 1)
            break

    }
    }

function equipmentFunction(firstOption, secondOptions, choiceNum){
        let equipmentOptions = []
        let idOptions = []
        console.log(firstOption)
        if (firstOption !== null){
            equipmentOptions.push(firstOption)
            idOptions.push(firstOption.item.name.split(' ').join(''))
        }

        for(let option of secondOptions){
            equipmentOptions.push(option)
            idOptions.push(option.item.name.split(' ').join(''))
        }

        let equipmentHTML = []
     
        for(let i = 0; i < equipmentOptions.length; i++){
            let damageVal = equipment[Number(equipmentOptions[i].item.url) - 1].damage
            
            if(!!damageVal){
                let optionHTML = `<label for="${idOptions[i]}">${equipmentOptions[i].item.name} (x${equipmentOptions[i].quantity}) | ${damageVal.dice_count}d${damageVal.dice_value} ${damageVal.damage_type.name}</label>
                <input type="radio" id="${idOptions[i]}" name="equipmentChoice${choiceNum}">`
                equipmentHTML.push(optionHTML)
            }
            else if (!!equipment[Number(firstOption.item.url) - 1].contents){
                console.log('ok')

                optionHTML = `<label for="${idOptions[i]}">${equipmentOptions[i].item.name} (x${equipmentOptions[i].quantity}) </label>
                <input type="radio" id="${idOptions[i]}" name="equipmentChoice${choiceNum}">`
                equipmentHTML.push(optionHTML)
                // ^^ is just place holder
            }
            else{
                let optionHTML = `<label for="${idOptions[i]}">${equipmentOptions[i].item.name} (x${equipmentOptions[i].quantity}) </label>
                <input type="radio" id="${idOptions[i]}" name="equipmentChoice${choiceNum}">`
                equipmentHTML.push(optionHTML)
            }
            }
        displayBoard.element.innerHTML += `<form id="equipmentForm${choiceNum}"><h2>Equipment Choice ${choiceNum}</h2>${equipmentHTML.join('')}</form>`
        
        choiceNum++
        if(choiceNum === 2){
            equipmentFunction(startingEquipment[user.classIndex].choice_2[0].from[0], startingEquipment[user.classIndex].choice_2[1].from, choiceNum)
        }

        else if (choiceNum === 3 && !!startingEquipment[user.classIndex].choice_3){
            equipmentFunction(startingEquipment[user.classIndex].choice_3[0].from[0], startingEquipment[user.classIndex].choice_3[1].from, choiceNum)
        }

        else if (choiceNum === 4 && !!startingEquipment[user.classIndex].choice_4){
            equipmentFunction(startingEquipment[user.classIndex].choice_4[0].from[0], startingEquipment[user.classIndex].choice_4[1].from, choiceNum)
        }
        else if (choiceNum === 5 && !!startingEquipment[user.classIndex].choice_5){
            equipmentFunction(null, startingEquipment[user.classIndex].choice_5[0].from, choiceNum)
            
        }
        const next = document.querySelector('#next')
        next.classList.add('inactive')
        next.onclick = null

        document.addEventListener('change', function(){
            let selectionCt = document.querySelectorAll('h2').length
            let selectedCt = 0
            let inputs = document.querySelectorAll('input')
            for(let input of inputs){
                if (input.checked){ selectedCt++}
            }

            if(selectionCt === selectedCt){
                next.classList.remove('inactive')
                next.onclick = function(){displayBoard.element.innerHTML = ''}
            }
        })
    }

function classTemplateFn({ name, hit_die, saving_throws }) {
    return `<div class="card">
        <img class="card-img-top" src="" alt="Image of ${name}">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        <div class="card-body hidden">
            <p>Hit Die: 1d${hit_die}</p>
            <p>Saving Throws: ${saving_throws[0].name}, ${saving_throws[1].name}</p>
        </div>
    </div>`
}

function spellDisplay(className, level) {
    let spellHTML = {
        attack: [],
        utility: [],
        strategy: [],
        support: []
    }
    

    for (let spell of spells) {
        if (spell.level === level) {
            for (let classList of spell.classes) {
                if (classList.name === className) {
                    
                    let spellCardHTML = `
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">${spell.name}</h5>
                                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                        </div>
                                        <div class="card-body hidden">
                                            <p>Range: ${spell.name}</p>
                                            <p>Duration: ${spell.duration}</p>
                                            <p>Concentration: ${spell.concentration}</p>
                                            <p>Casting Time: ${spell.casting_time}</p>
                                        </div>
                                    </div>`
                    if (spell.attack) {
                        spellHTML.attack.push(spellCardHTML)
                    }
                    else if (spell.utility) {
                        spellHTML.utility.push(spellCardHTML)
                    }
                    else if (spell.strategy) {
                        spellHTML.strategy.push(spellCardHTML)
                    }
                    else {
                        spellHTML.support.push(spellCardHTML)
                    }
                }
            }
        }
    }   
    if(spellHTML.attack.length > 0){
    displayBoard.element.innerHTML = `
        <button class="btn spellButton" type="button" data-toggle="collapse" data-target="#attackSpells" aria-expanded="false" aria-controls="attackSpells">Attack Spells <span class="numSpellsSelected"></span></button>

        <div class="collapse" id="attackSpells">
            <div class="horizontalScroll">
                ${spellHTML.attack.join('')}
            </div>
        </div>`
    }
    if(spellHTML.strategy.length > 0){
        displayBoard.element.innerHTML += `<button class="btn spellButton" type="button" data-toggle="collapse" data-target="#strategySpells" aria-expanded="false" aria-controls="strategySpells">Strategy Spells<span class="numSpellsSelected"></span></button>

        <div class="collapse" id="strategySpells">
            <div class="horizontalScroll">
                ${spellHTML.strategy.join('')}
            </div>
        </div>`
    }
    if (spellHTML.utility.length > 0) {
        displayBoard.element.innerHTML += `<button class="btn spellButton" type="button" data-toggle="collapse" data-target="#utilitySpells" aria-expanded="false" aria-controls="utilitySpells">Utility Spells<span class="numSpellsSelected"></span></button>

        <div class="collapse" id="utilitySpells">
            <div class="horizontalScroll">
                ${spellHTML.utility.join('')}
            </div>
        </div>`
    }
    if(spellHTML.support.length > 0){        
        displayBoard.element.innerHTML += `<button class="btn spellButton" type="button" data-toggle="collapse" data-target="#supportSpells" aria-expanded="false" aria-controls="supportSpells">Support Spells<span class="numSpellsSelected"></span></button>

        <div class="collapse" id="supportSpells">
            <div class="horizontalScroll">
                ${spellHTML.support.join('')}
            </div>
        </div>`
    }
    
    displayBoard.prepForSelection()
    
    document.addEventListener('click', function(){
        let spellButtons = document.querySelectorAll('.spellButton')
        let horizontalScrollDivs = document.querySelectorAll('.horizontalScroll')
        
        for(let i = 0; i < horizontalScrollDivs.length; i++){
            let selectedCounter = 0
            let scrollDiv = horizontalScrollDivs[i]
            for(let child of scrollDiv.children){
                if(child.classList.contains('selected')){
                    selectedCounter++
                }
            }
            spellButtons[i].children[0].textContent = `${selectedCounter} selected`
        }
    })


        
}


