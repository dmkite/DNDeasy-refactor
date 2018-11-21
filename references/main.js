const races = require('../second-refactor/data/races')
const equipment = require('../second-refactor/data/equipment')
const languages = require('../second-refactor/data/languages')
const skills = require('../second-refactor/data/skills')
const subraces = require('../second-refactor/data/subraces')
const spells = require('../second-refactor/data/spells')
const classes = require('../second-refactor/data/classes')
const startingEquipment = require('../startingEquipment')
const features = require('../features')
const statNames = ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma']
const displayBoard = {
    element: document.querySelector('#displayBoard'),
    clear: function(){
        const self = this
        self.element.innerHTML = ''
    },
    display: function(inputArray){
        const self = this
        let content = []
        for(let inputEntry of inputArray){
            const name = inputEntry.name
            const img = inputEntry.img
            const desc = inputEntry.img
            let info1
            let info2
            let info3

            if(inputArray === races){
                
                statBonus = ''
                for (let i = 0; i < inputEntry.ability_bonuses.length; i++) {
                    if (inputEntry.ability_bonuses[i] > 0) {
                        statBonus += `+${inputEntry.ability_bonuses[i]} ${statNames[i]}<br>`
                    }
                }
                let traitString = ''

                for (let trait in inputEntry.traits) {
                    traitString += `${trait.name}<br>`
                }
                info1 = `StatBonus: ${statBonus}`
                info2 = `Features: ${traitString}`
                info3 = `Speed: ${inputEntry.speed}`
            }
            
            if (inputArray === classes){
                info1 = `Hit Die: ${inputEntry.hit_die}`
                info2 = `Saving Throws: ${inputEntry.saving_throws[0].name}, ${inputEntry.saving_throws[0].name}`
            }
            
            content.push(this.htmlTemplate(img, name, desc, info1, info2, info3))
        }
        self.element.innerHTML = content.join('\n')
        self.prepForSelection()
    },
    prepForSelection: function(){
            let self = this
            if(self.choicesLeft === 0){
                self.choicesLeft = 1
            }
            let cards = document.querySelectorAll('.card')
            for(let card of cards){
                card.addEventListener('click', function (e) { 
                    user.select(e)
                })
            }
        
    },
    choicesLeft:1,
    userInput:'',
    htmlTemplate: function(img = 'img/dwarf.jpg', name, desc = '', info1 = '', info2 = '', info3 =''){
        return `<div class="card">
                <img class="card-img-top cardImg" src="${img}" alt="Image of ${name}">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5> 
                </div>
                <div class="hidden raceDisplay">
                    <p>${desc}</p>
                    <p>${info1}</p>
                    <p>${info2}</p>
                    <p>${info3}</p>
                </div>
                <div class="gradient${Math.floor(Math.random() * 12) + 1} cardImg"></div>
            </div>

            <div class="hidden hidden-desc displaySubchoice">${desc}</div>`
    },
    diceRoll: function(numDice, numSides) {
        let statNums = []
        for (let i = 0; i < numDice; i++) {
            let score = Math.floor(Math.random() * numSides) + 1
            statNums.push(score)
        }
        return statNums
        },
    statGen: function(rollFn, numDice, numSides, numTimes) {
        let stats = []
        for (let i = 0; i < numTimes; i++) {
            let statNums = rollFn(numDice, numSides)
            statNums.sort((a, b) => a - b)
            statNums.shift()
            stats.push(statNums.reduce((acc, num) => acc + num, 0))
        }
        return stats
    },
    generateHP: function() {
                    let counter = 20
                    let hitDie = classes[user.classIndex].hit_die
                    let rollingDie = setInterval(function () {
                        let diceNum = displayBoard.diceRoll(1, hitDie)
                        document.querySelector('.dice').textContent = diceNum[0]
                        counter--
                        if (counter === 0) {
                            clearInterval(rollingDie)
                            setTimeout(function () { document.querySelector('.dice').classList.add('animatedNum') }, 0)
                            let rolledNum = document.querySelector('.dice').textContent
                            const HP = Number(Math.floor((user.progress[14][1] - 10) / 2)) + Number(rolledNum)

                            next.classList.remove('inactive')
                            next.onclick = function () {
                                user.progress.push(HP)
                            }
                        }
                    }, 100)

                    document.querySelector('.dice').onclick = null

    },
    playerForm: function(){
        const self = this
        self.clear()
        self.element.innerHTML = `
        <form id="userInput">
            <label for="name">Character Name:</label>
            <input class="backstory" id="name" type="text" required maxlength="25" pattern="[A-Za-z]>
            <label>Character Traits:</label>
            <textarea class="backstory" id"traits" maxlength="150"></textarea>
            <label for="ideals">Character Ideals:</label>
            <textarea class="backstory" id="ideals" maxlength="150"></textarea>
            <label for="bonds">Character Bonds:</label>
            <textarea class="backstory" id="bonds" maxlength="150"></textarea>
            <label for="flaws">Character Flaws:</label>
            <textarea class="backstory" id="flaws" maxlength="150"></textarea>
        </form>`
    }
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
                tempResult.push(selection.children[1].children[0].textContent)
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
        
        let storageString = localStorage.getItem('storedUser')
        let storageArray = JSON.parse(storageString)
        storageArray.pop()
        storageString = JSON.stringify(storageArray)
        localStorage.setItem('storedUser', storageString)
        
        if(storageArray.length > 1){
            user.progress = storageArray[storageArray.length - 1].progress
        }
        else{
            user.progress = []
        }
        displayBoard.choicesLeft = 0
        return createDNDChar()
    },

    select: function(e){
        const card = e.currentTarget
        const next = document.querySelector('#next')

        if (card.classList.contains('selected')) {   
            displayBoard.choicesLeft++                           
            card.classList.toggle('selected')          
        }
        else {                                                 
            if (displayBoard.choicesLeft > 0) {                       
                displayBoard.choicesLeft--                            
                card.classList.toggle('selected')            
            }
            else {                                                  
                alert('You have no choices left')
            }
        }

        if (displayBoard.choicesLeft === 0) {
            next.classList.remove('inactive')
            next.onclick = user.storeAndProceed
        }
        else {
            next.classList.add('inactive')
            next.onclick = null
        }
        document.querySelector('#prompter span').textContent = displayBoard.choicesLeft
        },
        statSelect: function(e){
            let statNums = document.querySelectorAll('.statNum')
            for(statNum of statNums){
                statNum.onclick = function(e){
                    e.currentTarget.classList.toggle('statSelected')
                }
            }

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
            displayBoard.htmlTemplate(undefined, option.name, undefined, undefined, undefined, undefined, desc, undefined)
        )

    }
    displayBoard.element.innerHTML = subchoiceTemplate.join('\n')
    displayBoard.choicesLeft = race[options].choose
    const cards = document.querySelectorAll('.card')
    for (let card of cards) {
        card.onclick = function (e) { user.select(e) }
    }
}


function dataDisplay(choiceArray, dataArray, preventDupe = true) {
    if (choiceArray === null) {
        choiceArray = []
        for (let item of dataArray) {
            choiceArray.push(item.name)
        }
    }
    
    let itemHTML = []
    //prevent duplication
    if(preventDupe){
        for(let itemIndex in choiceArray){
            
            if (user.progress.includes(choiceArray[itemIndex])){
                choiceArray.splice(itemIndex, 1)
            }
            for(let progressPoint of user.progress){
                
                if(progressPoint === null){continue}
                if(progressPoint.includes(choiceArray[itemIndex])){
                    choiceArray.splice(itemIndex, 1, null)
                }
            }
        }
        choiceArray = choiceArray.filter(choice => choice !== null)
    }

    for (let itemChoice of choiceArray) {
        for (let item of dataArray) {
            if (itemChoice === item.name) {
                itemHTML.push(
                    displayBoard.htmlTemplate(undefined, item.name, undefined, undefined, undefined, item.desc, undefined)
                )
            }
        }
        
        displayBoard.element.innerHTML = itemHTML.join('')
        displayBoard.prepForSelection()
    }
}





function equipmentFunction(firstOption, secondOptions, choiceNum) {
    let equipmentOptions = []
    let idOptions = []
    if (firstOption !== null) {
        equipmentOptions.push(firstOption)
        idOptions.push(firstOption.item.name.split(' ').join(''))
    }

    for (let option of secondOptions) {
        equipmentOptions.push(option)
        idOptions.push(option.item.name.split(' ').join(''))
    }

    let equipmentHTML = []

    for (let i = 0; i < equipmentOptions.length; i++) {
        
        let damageVal = equipment[Number(equipmentOptions[i].item.url) - 1].damage

        if (!!damageVal) {
            let optionHTML = `<label for="${idOptions[i]}">${equipmentOptions[i].item.name} (x${equipmentOptions[i].quantity}) | ${damageVal.dice_count}d${damageVal.dice_value} ${damageVal.damage_type.name}
            
                    <input type="radio" id="${idOptions[i]}" name="equipmentChoice${choiceNum}">
            </label>`
            
            equipmentHTML.push(optionHTML)
        }
        else {
            let optionHTML = `<label for="${idOptions[i]}">${equipmentOptions[i].item.name} (x${equipmentOptions[i].quantity}) 
                <input type="radio" id="${idOptions[i]}" name="equipmentChoice${choiceNum}">
            </label>
                `
            equipmentHTML.push(optionHTML)
        }
    }
    displayBoard.element.innerHTML += `<form id="equipmentForm${choiceNum}"><h2>Equipment Choice ${choiceNum}</h2>${equipmentHTML.join('')}</form>`

    choiceNum++
    if (choiceNum === 2) {
        equipmentFunction(startingEquipment[user.classIndex].choice_2[0].from[0], startingEquipment[user.classIndex].choice_2[1].from, choiceNum)
        
    }

    else if (choiceNum === 3 && !!startingEquipment[user.classIndex].choice_3) {
        equipmentFunction(startingEquipment[user.classIndex].choice_3[0].from[0], startingEquipment[user.classIndex].choice_3[1].from, choiceNum)
        
    }

    else if (choiceNum === 4 && !!startingEquipment[user.classIndex].choice_4) {
        
        equipmentFunction(startingEquipment[user.classIndex].choice_4[0].from[0], startingEquipment[user.classIndex].choice_4[1].from, choiceNum)
    }
    else if (choiceNum === 5 && !!startingEquipment[user.classIndex].choice_5) {
        
        equipmentFunction(null, startingEquipment[user.classIndex].choice_5[0].from, choiceNum)
    }
    const next = document.querySelector('#next')
    next.classList.add('inactive')
    next.onclick = null

    document.addEventListener('change', function () {
        let selectionCt = document.querySelectorAll('h2').length
        let selectedCt = 0
        let inputs = document.querySelectorAll('input')
        for (let input of inputs) {
            if (input.checked) { selectedCt++ }
        }

        if (selectionCt === selectedCt) {
            next.classList.remove('inactive')
            next.onclick = function () { 
                let equipmentArray = []
                let inputs = document.querySelectorAll('input')
                for(let input of inputs){
                    if (input.checked){
                        equipmentArray.push(input.parentElement.textContent)
                    }
                }
                user.progress.push(equipmentArray)
                return createDNDChar()
             }
        }
    })
}

function spellDisplay(className, level) {
    let spellHTML = {
        attack: [],
        utility: [],
        strategy: [],
        support: []
    }

    displayBoard.element.innerHTML = ''
    for (let spell of spells) {
        if (spell.level === level) {
            for (let classList of spell.classes) {
                if (classList.name === className) {

                    let spellCardHTML =  displayBoard.htmlTemplate(undefined, spell.name, spell.desc[0], `Range: ${spell.range}`, `Duration: ${spell.duration}`, `Casting Time: ${spell.casting_time}`)

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

    for(let key in spellHTML){
        if (spellHTML[key].length > 0){
            displayBoard.element.innerHTML += 
                `<button class="btn spellButton" type="button" data-toggle="collapse" data-target="#attackSpells" aria-expanded="false" aria-controls="attackSpells">Attack Spells <span class="numSpellsSelected"></span></button>

                <div class="collapse" id="attackSpells">
                    <div class="horizontalScroll">
                        ${spellHTML[key].join('')}
                    </div>
                </div>`
        }
        
    }
    let cardImgs = document.querySelectorAll('.cardImg')
    for(let img of cardImgs){
        img.classList.add('hidden')
    }

    displayBoard.prepForSelection()

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

displayBoard.element.addEventListener('click',function(){
    document.querySelector('#prompter span').textContent = displayBoard.choicesLeft
})


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

user.progress = ['Half-Elf', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
user.raceIndex = 6
user.classIndex = 0
function createDNDChar(){
    console.log(user.progress)
    controlBoard.back.onclick = user.revertProg
    controlBoard.back.classList.remove('inactive')
    switch(user.progress.length){
        case 0:
            controlBoard.back.onclick = null
            controlBoard.back.classList.add('inactive')
            displayBoard.clear()
            document.querySelector('#user').classList.toggle('inactive')
            displayBoard.display(races)
            // displayBoard.prepForSelection()
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
                let subraceArray = subraces.filter(subrace => subrace.race.name === user.progress[0])
                displayBoard.display(subraceArray)
 
                
                // displayBoard.prepForSelection()   
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
            displayBoard.display(classes)//classTemplateFn)
            // displayBoard.prepForSelection()
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
                let instrumentChoices = classes[user.classIndex].proficiency_choices[1] 
                for (let instrument of instrumentChoices.from) {
                    skillChoiceArray.push(instrument.name)
                }
                dataDisplay(skillChoiceArray, equipment)
                displayBoard.choicesLeft = instrumentChoices.choose
            }
            else{
                user.choiceSkipped()
            }
            break
        
        case 8:
            if (user.progress[5] === 'Monk' ) {
                let skillChoiceArray = []
                let toolChoices = classes[user.classIndex].proficiency_choices[2] 
                for (let item of toolChoices.from) {
                    skillChoiceArray.push(item.name)
                }
                dataDisplay(skillChoiceArray, equipment)
                displayBoard.choicesLeft = toolChoices.choose
            }
            else {
                user.choiceSkipped()
            }
            break
        
        case 9:
        
            if(user.classIndex >= 1 && user.classIndex <= 3 || user.classIndex >= 9){
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

        case 12: 
            //class feature choices
            controlBoard.updatePrompt(`${classes[user.classIndex].name} Choices`)
            console.log(user.progress)
            if(user.classIndex === 4 ){
                function featureChoices(){
                    for(let feature of features){
                        if(feature.class.name === user.progress[5] && !!feature.choice){
                            displayBoard.element.innerHTML = `${feature.desc}`
                            for(let choice of feature.choice.from){
                                displayBoard.element.innerHTML += `<p>${choice.name}</p><p>${choice.desc[0]}</p>`
                            }
                        } 

                    }
                }
                featureChoices()
            }
            else if(user.classIndex === 8){
                let rogueSkillArray = []
                
                if(user.progress[2] !== null){
                    for (let skill of user.progress[2]){
                        rogueSkillArray.push(skill)
                    }
                }

                for(let skill of user.progress[6]){
                    rogueSkillArray.push(skill)
                }
                
                
                dataDisplay(rogueSkillArray, skills, false)
                displayBoard.choicesLeft = 2
                controlBoard.updatePrompt('Choose 2 skills that receive a +4 bonus')
            }

            else if( user.classIndex === 9){
                displayBoard.element.innerHTML = `
                <div class="card" style="width: 100%;">
                        <img class="card-img-top" src="" alt="Image of Wild Magic">
                        <div class="card-body">
                            <h5 class="card-title">Wild Magic</h5>
                            <p class="card-text">You can manipulate the forces of chance and chaos to gain advantage on one attack roll, ability check, or saving throw. Once you do so, you must finish a long rest before you can use this feature again.
                            <br>Your spellcasting can unleash surges of untamed magic. Immediately after you cast a sorcerer spell of 1st level or higher, the DM can have you roll a d20. If you roll a 1, roll on the Wild Magic Surge table to create a random magical effect.</p>
                        </div>
                    </div>
                    <div class="card dragonAncestry" style="width: 100%;">
                        <img class="card-img-top" src="" alt="Image of Draconic Bloodline">
                        <div class="card-body">
                            <h5 class="card-title">Draconic Bloodline</h5>
                            <p class="card-text">'At 1st level, you choose one type of dragon as your ancestor. The damage type associated with each dragon is used by features you gain later.
                            <br>You can speak, read, and write Draconic. Additionally, whenever you make a Charisma check when interacting with dragons, your proficiency bonus is doubled if it applies to the check.</p>
                        </div>
                    </div>`
                    displayBoard.prepForSelection()
            }
            else{
                user.choiceSkipped()
            }
            break

        case 13:
            let draconicArray = []
            if(user.progress[12] === 'Draconic Bloodline'){
                controlBoard.updatePrompt('Select your draconic ancestry')
                let draconicArray = []
                for(let feature of features){
                    if(feature.index === 305){
                        for(let ancestorType of feature.choice.from){
                            draconicArray.push(
                                `<label name="ancestry">
                                    ${ancestorType.name}
                                    <input type="radio" value=${ancestorType.name.split(' ').join('')}>
                                <label>`
                            )
                        }
                    }
                }
                
                displayBoard.element.innerHTML = `<form id="draconicAncestry">${draconicArray.join('')}</form>`
                displayBoard.choicesLeft = 1
                displayBoard.element.addEventListener('change', function(){
                    let inputs = document.querySelectorAll('#draconicAncestry input')
                    for(let input of inputs){
                        if(input.selected === true){
                            document.querySelector('#next').classList.remove('inactive')
                        }
                    }
                })
            }
            else{
                user.choiceSkipped()
            }
            break
        
        case 14: 
            displayBoard.clear()
            controlBoard.updatePrompt('Allocate Stats')
            document.querySelector('#prompter span').style.display = 'none'

            let stats = displayBoard.statGen(displayBoard.diceRoll, 4, 6, 6)

//generate stats and render
            let statHolderHTML = []
            let statNumHTML = []
            let raceBonusData = races[user.raceIndex].ability_bonuses
            let subraceBonusData

            for(let i = 0; i < 6; i++){
                let bonusText = ''
                
                if(user.subraceIndex !== undefined){
                    subraceBonusData = subraces[subraceIndex].abilityBonuses[i]
                }
                if (!!raceBonusData[i] || !!subraceBonusData){
                    bonusText = ` (+${raceBonusData[i] || subraceBonusData})`
                }
                statHolderHTML.push(`
                    <div id="${statNames[i]}">
                        <div class="statHolder"></div>
                        ${statNames[i]} ${bonusText}
                    </div>`)
            }
            for(let i = 0; i < 6; i++){
                statNumHTML.push(`
                <div class="statNum">
                    ${stats[i]}
                </div>`)
            }
            displayBoard.element.innerHTML = `
                <div class="statHolderRow">${statHolderHTML.join('')}</div>

                <div class="statNumRow">${statNumHTML.join('')}</div>
                <button class="btn clear">Clear</button>`
                                
//add racial bonuses
            let statNums = document.querySelectorAll('.statNum')
            let statHolders = document.querySelectorAll('.statHolder')
            let statNumRow = document.querySelector('.statNumRow')
            let statHolderRow = document.querySelector('.statHolderRow')
            
            user.statSelect()
// Click and allocate
            for (let statNum of statNums) {

                statNum.onclick = function (e) {
                    for (let statNum of statNums) {
                        statNum.classList.remove('statSelected')
                    }
                    e.target.classList.toggle('statSelected')
                }
            }

            for (let statHolder of statHolders) {
                statHolder.onclick = function (e) {
                    let stat = document.querySelector('.statSelected')
                    if (e.target.children.length === 0) {
                        e.target.appendChild(stat)
                    }
                }
            }
// Revert on clear click
            document.querySelector('.clear').addEventListener('click', function () {
                for (let statNum of statNums) {
                    statNumRow.appendChild(statNum)
                    
                }
            })

            displayBoard.element.addEventListener('click', function(){
                if(statNumRow.children.length === 0){
                    next.classList.remove('inactive')

                    next.onclick = function () {
                        let allocatedStats = []
                        for (let statHolder of statHolders) {
                            allocatedStats.push(Number(statHolder.children[0].innerHTML))
                        }
                        let statArray = [allocatedStats, raceBonusData, subraceBonusData = [0,0,0,0,0,0]]
                        let statResult = statArray.reduce((acc, arr) => {
                            console.log(acc)
                            for (let i = 0; i < arr.length; i++) {
                                acc[i] += arr[i]
                            }
                            return acc
                        }, [0, 0, 0, 0, 0, 0])

                        user.progress.push(statResult)
                        return createDNDChar()
                    }
                }
                else{
                    next.onclick = null
                    next.classList.add('inactive')
                }

               
            })
            break

            case 15:
            if (user.progress[0] === 'Half-Elf') {
                console.log('didnt skip')
                document.querySelector('#Charisma').remove()
                let statNums = document.querySelectorAll('.statNum')
                let statHolders = document.querySelectorAll('.statHolder')

                for(let i = 0; i < 5; i++){
                    statNums[i].onclick = null
                    statHolders[i].onclick = null
                }

                displayBoard.choicesLeft = 2
                controlBoard.updatePrompt('As a Half-Elf add 1 point to two stats')
                next.classList.add('inactive')


                

                for (let i = 0; i < statNums.length; i++) {
                    statNums[i].onclick = function () {
                        console.log('recognizing click')

                        if (statNums[i].classList.contains('numAdded')) {
                            statNums[i].innerHTML = Number(statNums[i].innerHTML) - 1
                            statNums[i].classList.remove('numAdded')
                            displayBoard.choicesLeft++
                        }
                        else{
                            if (displayBoard.choicesLeft > 0){
                                statNums[i].innerHTML = Number(statNums[i].innerHTML) + 1
                                statNums[i].classList.add('numAdded')
                                displayBoard.choicesLeft--

                            }
                            else{
                                alert('no choices left')
                            }
                        }
                        
                    }
                }

                displayBoard.element.addEventListener('click', function(){
                    let numAdded = document.querySelectorAll('.numAdded')
                    if(numAdded.length === 2){
                        next.classList.remove('inactive')
                        next.onclick = function(){
                            console.log(user.progress[14])
                            for(let i = 0; i < statNums.length; i++){
                                if(statNums[i].classList.contains('numAdded')){
                                    user.progress[14][i] += 1
                                }
                            }
                            console.log(user.progress[14])
                            displayBoard.clear()
                            user.choiceSkipped()
                            // return createDNDChar()
                        }
                    }
                    else{
                        next.classList.add('inactive')
                        next.onclick = null
                    }
                })
            }
            else{
                user.choiceSkipped()
            }
            
            break
        
            case 16:
                controlBoard.updatePrompt('Tap to Roll Hitpoints')
                document.querySelector('#prompter span').style.display = 'none'
                displayBoard.element.innerHTML = '<div class="dice"></div>'
                document.querySelector('.dice').onclick = displayBoard.generateHP
            break

            case 17:
                controlBoard.updatePrompt('Select Alignment')
                displayBoard.clear()
                let alignment = ['Lawful Good', 'Neutral Good', 'Chaotic Good',
                                 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
                                 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil']
                let alignmentHTML = []
                for(let alignmentOption of alignment){
                    alignmentHTML.push(`<div class="alignment"><p>${alignmentOption}</p></div>`)
                }
                displayBoard.element.innerHTML = alignmentHTML.join('')
                let alignmentCard = document.querySelectorAll('.alignment')
                
                for (let card of alignmentCard) {
                    card.addEventListener('click', function (e) {
                        const card = e.currentTarget

                        if (card.classList.contains('selected')) {
                            displayBoard.choicesLeft++
                            card.classList.toggle('selected')
                        }
                        else {
                            if (displayBoard.choicesLeft > 0) {
                                displayBoard.choicesLeft--
                                card.classList.toggle('selected')
                            }
                            else {
                                alert('You have no choices left')
                            }
                        }

                        if (displayBoard.choicesLeft === 0) {
                            next.classList.remove('inactive')
                            next.onclick = function(){
                                user.progress.push(card.children[0].textContent)
                                user.saveProg()
                                return createDNDChar()
                            }

                        }
                        else {
                            next.classList.add('inactive')
                            next.onclick = null
                        }
                        document.querySelector('#prompter span').textContent = displayBoard.choicesLeft
                    
                    })
                }

            break

            case 18:
                controlBoard.updatePrompt('Provide character backstory')
                document.querySelector('#prompter span').style.display = 'none'
                next.classList.add('inactive')
                next.onclick = null
                displayBoard.playerForm()
                document.querySelector('#userInput').addEventListener('change', function(){
                    let inputs = document.querySelectorAll('.backstory')
                    let counter = 0
                    for(let input of inputs){
                        if(input.value !== ''){
                            counter++
                        }
                    }

                    if(counter === 4){
                        next.classList.remove('inactive')
                        let results = []
                        next.onclick = function(){
                            for(let input of inputs){
                                results.push(input.value)
                            }
                        }
                        user.progress.push(results)
                        return createDNDChar()
                    }
                    else{
                        next.classList.add('inactive')
                        next.onclick = null
                    }
                })
                break
         } 
         


          
    }

    