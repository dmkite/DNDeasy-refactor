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

function prepForStats(statGen){
    document.querySelector('#displayBoard').innerHTML = statTemplate(statArr)
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


module.exports = statGen