const utils = require('./utils')
const user = require('./user')
const {statTemplate, statUpgrade} = require('./templates')
const selection = require('./selection')

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

function prepForStats(statArr){
    const stats = statArr || statGen(4, 6, 6)
    document.querySelector('#displayBoard').innerHTML = statTemplate(stats)
    clickToAllocate()
}

function clickToAllocate(){
    utils.addListenersToMany('.stat', 'click', function(e){prepForAllocation(e)})
}

function prepForAllocation(e){
    let selected = document.querySelectorAll('.selectedStat')
    for(let selection of selected){ selection.classList.remove('selectedStat') }
    e.target.classList.add('selectedStat')
    e.target.onclick = function(e){unselect(e)}
    prepHolders()
}


function prepHolders(){
    const statHolders = document.querySelectorAll('.statType')
    utils.addListenersToMany('.statType', 'click', function(e){addToHolder(e)})
}

function addToHolder(e){
    if(e.target.children.length > 0) return false
    let statNum = document.querySelector('.selectedStat')
    e.target.appendChild(statNum)

}

function readyToGo(returnFn, condition) {
    if (condition) {
        document.querySelector('#next').classList.remove('inactive')
        document.querySelector('#next').onclick = function () {
            addStats()
            return returnFn()

        }
    }
    else {
        document.querySelector('#next').classList.add('inactive')
        document.querySelector('#next').onclick = null
    }
}

function addStats(){
    const statTypes = document.querySelectorAll('.statType')
    const statArray = []
    for (let stat of statTypes){
        statArray.push(stat.children[0].textContent)
    }
    user.log.push(statArray)
}

function addBonusStats(){
    user.numChoices = 2
    document.querySelector('#displayBoard').innerHTML = statUpgrade(user.log[17])
    utils.addListenersToMany('.statType', 'click', function(e){addOne(e)})
    
}

function addOne(e){
    if (user.numChoices > 0 && !e.target.classList.contains('added')) {
        e.target.onclick = null
        e.target.classList.add('added')
        user.numChoices--
        e.target.children[0].textContent = Number(e.target.children[0].textContent) + 1
        e.target.onclick = function (e) { removeOne(e) }
    }
    else {
        return false
    }
}

function removeOne(e){
    e.target.onclick = null
    e.target.classList.remove('added')
    e.target.onclick = function (e) { addOne(e) }
    user.numChoices++
    e.target.children[0].textContent = Number(e.target.children[0].textContent) - 1
}



module.exports = {prepForStats, prepForAllocation, readyToGo, addBonusStats, diceRoll}