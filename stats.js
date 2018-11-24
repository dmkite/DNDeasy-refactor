const utils = require('./utils')
const {statTemplate} = require('./templates')
function diceRoll(numDice, numSides) {
    let statNums = []
    for (let i = 0; i < numDice; i++) {
        let score = Math.floor(Math.random() * numSides) + 1
        statNums.push(score)
    }
    return statNums
}

function statGen(numDice, numSides, numTimes) {
    let stats = []
    for (let i = 0; i < numTimes; i++) {
        let statNums = diceRoll(numDice, numSides)
        statNums.sort((a, b) => a - b)
        statNums.shift()
        stats.push(statNums.reduce((acc, num) => acc + num, 0))
    }
    return stats
}

function prepForStats(){
    const stats = statGen(4, 6, 6)
    document.querySelector('#displayBoard').innerHTML = statTemplate(stats)
    clickToAllocate()
}

function clickToAllocate(){
    utils.addListenersToMany('.stat', 'click', function(e){prepForAllocation(e)})
}

function prepForAllocation(e){
    let selected = document.querySelectorAll('.selectedStat')
    if(selected.length > 0){return false}
    e.target.classList.add('selectedStat')
    e.target.onclick = function(e){unselect(e)}
    prepHolders()
}

function unselect(e) {
    e.target.classList.remove('selectedStat')
    clickToAllocate()
}

function prepHolders(){
    const statHolders = document.querySelectorAll('.statType')
    utils.addListenersToMany('.statType', 'click', function(e){addToHolder})
}
function addToHolder(e){
    let statNum = document.querySelector('.selectedStat')
    e.target.appendChild(statNum)

}

function HPGen() {
    let counter = 20
    let hitDie = classes[user.classId].hit_die
    let rollingDie = setInterval(function () { rollingAnimation(hitDie, counter) }, 100)
    document.querySelector('.dice').onclick = null
}

function rollingAnimation(hitDie, counter) {
    let diceNum = diceRoll(1, hitDie)
    document.querySelector('.dice').textContent = diceNum[0]
    counter--
    if (counter === 0) {
        clearInterval(rollingDie)
        setTimeout(function () { document.querySelector('.dice').classList.add('animatedNum') }, 0)
        let rolledNum = document.querySelector('.dice').textContent
        const HP = Number(Math.floor((user.progress[14][1] - 10) / 2)) + Number(rolledNum)
    }
}


module.exports = {prepForStats, prepForAllocation}