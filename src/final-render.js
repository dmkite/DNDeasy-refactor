const templates = require('./templates')
const user = require('./user')
const races = require('../data/races')
const subraces = require('../data/subraces')
const skills = require('../data/skills')

function finalRender() {
    headerInfo()
    statInfo()
    skillInfo()
    utilityInfo()
    EquipmentInfo()
    if((!!user.log[2] && user.log[1] == 'High Elf') || !!user.log[9] || !!user.log[10]) spellInfo()
    backstoryInfo()
}

function headerInfo() {
    let subrace = user.log[2]
    if (user.raceId === 6) subrace = null
    displayBoard.innerHTML = `
    <div class="top">
        <h3>${user.log[22][0]}</h3>    
        <p>Level 1 ${user.log[5]} | ${user.log[20]} </p>
        <p>${subrace || user.log[0]} | ${user.log[21]}</p>
    </div>`
}



function statInfo() {
    let finalStats = races[user.raceId].ability_bonuses

    if (!!user.log[2] && !Array.isArray(user.log[2])) finalStats = combineArrays(finalStats, subraces[user.subraceId].ability_bonuses)
    finalStats = combineArrays(finalStats, user.log[17])

    if (!!user.log[18]) {
        let bonus = figureDifference(user.log[17], user.log[18])
        finalStats = combineArrays(finalStats, bonus)
    }
    displayBoard.innerHTML += templates.statRender(finalStats)
}


function modCalc(num) {
    let result = Number(Math.floor((num - 10) / 2))
    if (result > 0) return `+${result}`
    return result
}

function combineArrays(arr1, arr2) {
    const newArr = []
    for (let i = 0; i < arr1.length; i++) {
        newArr[i] = Number(arr1[i]) + Number(arr2[i])
    }
    return newArr
}

function figureDifference(arr1, arr2) {
    const newArr = []
    for (let i = 0; i < arr2.length; i++) {
        if (Number(arr1[i]) < Number(arr2[i])) newArr[i] = 1
        else newArr[i] = 0
    }
    newArr.push(0)
    return newArr
}

function skillInfo(){
    let skillArray = user.log[6]
    if(user.raceId === 6 ){
        for(let skill of user.log[2]){
            skillArray.push(skill)
        }
    }
    for(let skill of user.log[20]){
        skillArray.push(skill)
    }
    document.querySelector('.accordion').innerHTML += templates.skillTemplate(skills)
    addBonus(skillArray)
}

function addBonus(arr){
    const skillHolders = document.querySelectorAll('.skillHolder')
    for(let skillHolder of skillHolders){
        for(let skill of arr){
            if(skill === skillHolder.textContent) skillHolder.children[0].textContent = '+2 '
            if (skillHolder.textContent === user.log[16]) skillHolder.children[0].textContent = '+4 '
        }
    }
}

function figureSpeed(){
    if(user.subraceId === 4) return 35
    else if(user.raceId === 0 || user.raceId === 2 || user.raceId === 5) return 25
    else return 20
}
function utilityInfo(){
    document.querySelector('.accordion').innerHTML += templates.utilityTemplate()
}

function EquipmentInfo(){
    equipArray = []
    for(let i = 11; i <= 15; i++){
        if(!user.log[i]) break
        for(let item of user.log[i]){
            equipArray.push(item)
        }
    }
    document.querySelector('.accordion').innerHTML += templates.equipmentTemplate(equipArray)
}

function spellInfo(){
    spellArray = []
    if (!!user.log[2] && user.log[1] === 'High Elft') spellArray.push(user.log[2])
    if (!!user.log[9]) user.log[9].forEach(spell => spellArray.push(spell))
    if (!!user.log[10]) user.log[10].forEach(spell => spellArray.push(spell))
    document.querySelector('.accordion').innerHTML += templates.spellTemplate(spellArray)
}

function backstoryInfo(){
    document.querySelector('.accordion').innerHTML += templates.backstoryTemplate(user.log[22])
}

module.exports = {modCalc, finalRender, figureSpeed}